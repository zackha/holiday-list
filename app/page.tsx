'use client';

import { useState, useEffect, useCallback } from 'react';
import FilterPanel from './components/FilterPanel';
import HolidayList from './components/HolidayList';
import Pagination from './components/Pagination';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

export default function Home() {
  interface Holiday {
    id: number;
    name: string;
    date: string;
    type: string;
    country: string;
    color: string;
  }

  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [filters, setFilters] = useState({
    countryId: '',
    stateId: '',
    type: '',
    year: '',
    month: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterOptions, setFilterOptions] = useState({
    countries: [],
    states: [],
    holidayTypes: [],
  });
  const [availableStates, setAvailableStates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFilterOptions = useCallback(async () => {
    try {
      const res = await fetch('/api/filters');
      const data = await res.json();
      setFilterOptions(data);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  }, []);

  const fetchHolidays = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({ ...filters, page: page.toString() });
      const res = await fetch(`/api/holidays?${query}`);
      const data = await res.json();
      setHolidays(data.holidays);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  useEffect(() => {
    if (filters.countryId) {
      const statesForSelectedCountry = filterOptions.states.filter((state: { country_id: number }) => state.country_id === parseInt(filters.countryId));
      setAvailableStates(statesForSelectedCountry);
    } else {
      setAvailableStates([]);
      setFilters(prevFilters => ({ ...prevFilters, stateId: '' }));
    }
  }, [filters.countryId, filterOptions.states]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Holidays - PERCON', 10, 10);
    holidays.forEach((holiday, index) => {
      doc.text(`${index + 1}. ${holiday.name} - ${holiday.date} (${holiday.type})`, 10, 20 + index * 10);
    });
    doc.save('holidays.pdf');
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(holidays);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Holidays');
    XLSX.writeFile(workbook, 'holidays.xlsx');
  };

  return (
    <div className="flex items-center py-32">
      <div className="container mx-auto max-w-lg gap-6 flex flex-col">
        <FilterPanel
          filters={filters}
          filterOptions={filterOptions}
          availableStates={availableStates}
          onFilterChange={handleFilterChange}
          onDownloadPDF={downloadPDF}
          onDownloadExcel={downloadExcel}
        />
        <HolidayList holidays={holidays} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}

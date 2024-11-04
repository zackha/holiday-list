'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterPanel from './components/FilterPanel';
import HolidayList from './components/HolidayList';
import Pagination from './components/Pagination';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import GithubButton from './components/GithubButton';

export default function Home() {
  interface Holiday {
    id: number;
    name: string;
    date: string;
    type: string;
    country: string;
    color: string;
  }

  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    countryId: searchParams.get('countryId') || '',
    stateId: searchParams.get('stateId') || '',
    type: searchParams.get('type') || '',
    year: searchParams.get('year') || '',
    month: searchParams.get('month') || '',
  });

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
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

    const queryParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) queryParams.set(key, value.toString());
    });
    queryParams.set('page', '1');

    router.push(`/?${queryParams.toString()}`);
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
    <div className="flex flex-col items-center py-32">
      <div className="container mx-auto max-w-[57rem] gap-6 flex flex-col">
        <div className="w-full px-2 gap-2 flex flex-col border-b pb-5">
          <div className="text-3xl">
            Holiday Listing and Filtering Application by{' '}
            <a href="https://www.percon.io/" target="_blank" className="underline">
              PERCON A.S.
            </a>
          </div>
          <div className=" text-neutral-500">
            This project is a web application that lists holidays in Germany, the Netherlands, France, and Belgium, allowing users to filter data by country, state, holiday type,
            year, and month. The application is built with Supabase, Next.js 15, and TypeScript
          </div>
        </div>
        <FilterPanel
          filters={filters}
          filterOptions={filterOptions}
          availableStates={availableStates}
          onFilterChange={handleFilterChange}
          onDownloadPDF={downloadPDF}
          onDownloadExcel={downloadExcel}
        />
        <HolidayList holidays={holidays} isLoading={isLoading} />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={newPage => {
            setPage(newPage);

            const queryParams = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
              if (value) queryParams.set(key, value.toString());
            });
            queryParams.set('page', newPage.toString());

            router.push(`/?${queryParams.toString()}`);
          }}
        />
        <div className="items-center flex justify-center">
          <a href="https://github.com/zackha/holiday-list" className="flex items-center justify-center">
            <GithubButton className="size-8" />
          </a>
        </div>
      </div>
    </div>
  );
}

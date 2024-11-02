// app/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import FilterPanel from './components/FilterPanel';
import HolidayList from './components/HolidayList';
import Pagination from './components/Pagination';

export default function Home() {
  const [holidays, setHolidays] = useState([]);
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
    try {
      const query = new URLSearchParams({ ...filters, page: page.toString() });
      const res = await fetch(`/api/holidays?${query}`);
      const data = await res.json();
      setHolidays(data.holidays);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching holidays:', error);
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto max-w-md p-4 text-center">
        <h1 className="text-2xl font-semibold mb-4">Tatil Listesi</h1>
        <FilterPanel filters={filters} filterOptions={filterOptions} availableStates={availableStates} onFilterChange={handleFilterChange} />
        <HolidayList holidays={holidays} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}

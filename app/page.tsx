// app/page.tsx

'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const res = await fetch('/api/filters');
      const data = await res.json();
      setFilterOptions(data);
    };

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchHolidays = async () => {
      const query = new URLSearchParams(filters as any);
      query.append('page', page.toString());

      const res = await fetch(`/api/holidays?${query}`);
      const data = await res.json();
      setHolidays(data.holidays);
      setTotalPages(data.totalPages);
    };

    fetchHolidays();
  }, [filters, page]);

  useEffect(() => {
    if (filters.countryId) {
      const statesForSelectedCountry = filterOptions.states.filter(state => state.country_id === parseInt(filters.countryId));
      setAvailableStates(statesForSelectedCountry);
    } else {
      setAvailableStates([]);
      setFilters(prevFilters => ({ ...prevFilters, stateId: '' }));
    }
  }, [filters.countryId, filterOptions.states]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Filtre değiştiğinde sayfayı sıfırla
  };

  return (
    <div>
      <h1>Tatil Listesi</h1>
      <FilterPanel filters={filters} filterOptions={filterOptions} availableStates={availableStates} onFilterChange={handleFilterChange} />
      <HolidayList holidays={holidays} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

'use client';

import React from 'react';
import CountryFilter from './CountryFilter';
import StateFilter from './StateFilter';
import TypeFilter from './TypeFilter';
import YearFilter from './YearFilter';
import MonthFilter from './MonthFilter';
import ListFilter from './ListFilter';
import DownloadButtons from './DownloadButtons';

interface FilterPanelProps {
  filters: {
    countryId: string;
    stateId: string;
    type: string;
    year: string;
    month: string;
  };
  filterOptions: {
    countries: { id: number; name: string; holiday_count: number }[];
    states: { id: number; name: string; country_id: number }[];
    holidayTypes: string[];
  };
  availableStates: { id: number; name: string }[];
  onFilterChange: (newFilters: any) => void;
  onDownloadPDF: () => void;
  onDownloadExcel: () => void;
}

export default function FilterPanel({ filters, filterOptions, availableStates, onFilterChange, onDownloadPDF, onDownloadExcel }: FilterPanelProps) {
  const handleChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex px-2 justify-between">
      <div className="flex flex-wrap gap-3 mr-2">
        <ListFilter />
        <CountryFilter filters={filters} filterOptions={filterOptions} handleChange={handleChange} />
        {/*Todo //<StateFilter filters={filters} availableStates={availableStates} handleChange={handleChange} />*/}
        <TypeFilter filters={filters} filterOptions={filterOptions} handleChange={handleChange} />
        <YearFilter filters={filters} handleChange={handleChange} />
        <MonthFilter filters={filters} handleChange={handleChange} />
      </div>
      <div>
        <DownloadButtons onDownloadPDF={onDownloadPDF} onDownloadExcel={onDownloadExcel} />
      </div>
    </div>
  );
}

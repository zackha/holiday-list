'use client';

import * as React from 'react';
import { Calendar, List } from 'react-feather';

interface FilterPanelProps {
  filters: {
    countryId: string;
    stateId: string;
    type: string;
    year: string;
    month: string;
  };
  filterOptions: {
    countries: { id: number; name: string }[];
    states: { id: number; name: string; country_id: number }[];
    holidayTypes: string[];
  };
  availableStates: { id: number; name: string }[];
  onFilterChange: (newFilters: any) => void;
}

export default function FilterPanel({ filters, filterOptions, availableStates, onFilterChange }: FilterPanelProps) {
  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex justify-center gap-4">
      <div className="flex shadow-sm rounded-lg border border-neutral-200 text-neutral-700">
        <button className="px-3.5 flex items-center gap-2.5 border-r border-neutral-200 bg-indigo-50 rounded-l-md">
          <List size={16} className="text-indigo-600" />
          <span className="mt-0.5 text-black">List</span>
        </button>
        {/* To do */}
        <button className="px-3.5 flex items-center gap-2.5">
          <Calendar size={16} />
          <span className="mt-0.5">Calendar</span>
        </button>
      </div>
      <div className="flex flex-col">
        <select value={filters.countryId} onChange={e => handleChange('countryId', e.target.value)} className="p-2 border border-gray-300 rounded">
          <option value="">Tüm Ülkeler</option>
          {filterOptions.countries.map(country => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <select
          value={filters.stateId}
          onChange={e => handleChange('stateId', e.target.value)}
          disabled={!filters.countryId}
          className="p-2 border border-gray-300 rounded disabled:opacity-50">
          <option value="">Seçiniz</option>
          {availableStates.map(state => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <select value={filters.type} onChange={e => handleChange('type', e.target.value)} className="p-2 border border-gray-300 rounded">
          <option value="">Seçiniz</option>
          {filterOptions.holidayTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <select value={filters.year} onChange={e => handleChange('year', e.target.value)} className="p-2 border border-gray-300 rounded">
          <option value="">Seçiniz</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <select value={filters.month} onChange={e => handleChange('month', e.target.value)} className="p-2 border border-gray-300 rounded">
          <option value="">Seçiniz</option>
          {months.map(month => (
            <option key={month} value={String(month).padStart(2, '0')}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

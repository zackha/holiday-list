// app/components/FilterPanel.tsx

import React from 'react';

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

  return (
    <div>
      <label>
        Ülke:
        <select value={filters.countryId} onChange={e => onFilterChange({ ...filters, countryId: e.target.value })}>
          <option value="">Seçiniz</option>
          {filterOptions.countries.map(country => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Eyalet:
        <select value={filters.stateId} onChange={e => onFilterChange({ ...filters, stateId: e.target.value })} disabled={!filters.countryId}>
          <option value="">Seçiniz</option>
          {availableStates.map(state => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Tatil Tipi:
        <select value={filters.type} onChange={e => onFilterChange({ ...filters, type: e.target.value })}>
          <option value="">Seçiniz</option>
          {filterOptions.holidayTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label>
        Yıl:
        <select value={filters.year} onChange={e => onFilterChange({ ...filters, year: e.target.value })}>
          <option value="">Seçiniz</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <label>
        Ay:
        <select value={filters.month} onChange={e => onFilterChange({ ...filters, month: e.target.value })}>
          <option value="">Seçiniz</option>
          {months.map(month => (
            <option key={month} value={String(month).padStart(2, '0')}>
              {month}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

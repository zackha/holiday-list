import React from 'react';

interface TypeFilterProps {
  filters: {
    type: string;
  };
  filterOptions: {
    holidayTypes: string[];
  };
  handleChange: (key: string, value: string) => void;
}

export default function TypeFilter({ filters, filterOptions, handleChange }: TypeFilterProps) {
  return (
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
  );
}

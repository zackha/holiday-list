import React from 'react';

interface YearFilterProps {
  filters: {
    year: string;
  };
  handleChange: (key: string, value: string) => void;
}

export default function YearFilter({ filters, handleChange }: YearFilterProps) {
  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

  return (
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
  );
}

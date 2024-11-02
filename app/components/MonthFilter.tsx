import React from 'react';

interface MonthFilterProps {
  filters: {
    month: string;
  };
  handleChange: (key: string, value: string) => void;
}

export default function MonthFilter({ filters, handleChange }: MonthFilterProps) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
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
  );
}

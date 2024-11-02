import React from 'react';

interface CountryFilterProps {
  filters: {
    countryId: string;
  };
  filterOptions: {
    countries: { id: number; name: string }[];
  };
  handleChange: (key: string, value: string) => void;
}

export default function CountryFilter({ filters, filterOptions, handleChange }: CountryFilterProps) {
  return (
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
  );
}

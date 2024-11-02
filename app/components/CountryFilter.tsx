import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface Country {
  id: number;
  name: string;
}

interface CountryFilterProps {
  filters: {
    countryId: string;
  };
  filterOptions: {
    countries: Country[];
  };
  handleChange: (key: string, value: string) => void;
}

export default function CountryFilter({ filters, filterOptions, handleChange }: CountryFilterProps) {
  const selectedCountry = filterOptions.countries.find(country => country.id.toString() === filters.countryId)?.name || 'Tüm Ülkeler';

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white px-3.5 py-2.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-200 hover:bg-indigo-50 hover:text-black">
        {selectedCountry}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-6 w-5 text-neutral-700" />
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <MenuItem
            as="button"
            onClick={() => handleChange('countryId', '')}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            Tüm Ülkeler
          </MenuItem>
          {filterOptions.countries.map(country => (
            <MenuItem
              key={country.id}
              as="button"
              onClick={() => handleChange('countryId', country.id.toString())}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              {country.name}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}

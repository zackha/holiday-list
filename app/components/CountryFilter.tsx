import React, { useMemo } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Check } from 'react-feather';

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
  const selectedCountry = useMemo(
    () => filterOptions.countries.find(country => country.id.toString() === filters.countryId)?.name || 'All Countries',
    [filters.countryId, filterOptions.countries]
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white px-3.5 h-full items-center text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-200 hover:bg-indigo-50 hover:text-black whitespace-nowrap transition-all">
        {selectedCountry}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-6 w-5 text-neutral-700" />
      </MenuButton>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <MenuItems className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2">
            <MenuItem
              as="button"
              onClick={() => handleChange('countryId', '')}
              className="flex items-center gap-2 rounded transition-all w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 hover:text-black">
              <div className="h-4 w-4">{filters.countryId === '' && <Check className="h-4 w-4 text-indigo-600" />}</div>
              All Countries
            </MenuItem>
            {filterOptions.countries.map(country => (
              <MenuItem
                key={country.id}
                as="button"
                onClick={() => handleChange('countryId', country.id.toString())}
                className="flex items-center gap-2 rounded transition-all w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 hover:text-black">
                <div className="h-4 w-4">{filters.countryId === country.id.toString() && <Check className=" h-4 w-4 text-indigo-600" />}</div>
                {country.name}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

import React, { useMemo } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Check, X } from 'react-feather';

interface YearFilterProps {
  filters: {
    year: string;
  };
  handleChange: (key: string, value: string) => void;
}

export default function YearFilter({ filters, handleChange }: YearFilterProps) {
  const years = useMemo(() => Array.from({ length: 6 }, (_, i) => new Date().getFullYear() + i), []);
  const selectedYear = filters.year || 'All Years';

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white px-3.5 h-full items-center text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-200 hover:bg-indigo-50 hover:text-black whitespace-nowrap transition-all">
        {selectedYear}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-6 w-5 text-neutral-700" />
      </MenuButton>
      {filters.year && (
        <button
          onClick={() => handleChange('year', '')}
          className="-top-1.5 -right-1.5 absolute flex items-center justify-center text-white bg-red-500 rounded-full hover:bg-red-600 transition-all">
          <X className="size-3.5 m-0.5" />
        </button>
      )}
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2">
            <MenuItem
              as="button"
              onClick={() => handleChange('year', '')}
              className="flex items-center gap-2 rounded transition-all w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 hover:text-black">
              <div className="h-4 w-4">{filters.year === '' && <Check className="h-4 w-4 text-indigo-600" />}</div>
              All Years
            </MenuItem>
            {years.map(year => (
              <MenuItem
                key={year}
                as="button"
                onClick={() => handleChange('year', year.toString())}
                className="flex items-center gap-2 rounded transition-all w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 hover:text-black">
                <div className="h-4 w-4">{filters.year === year.toString() && <Check className="h-4 w-4 text-indigo-600" />}</div>
                {year}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

import React, { useMemo } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Check, X } from 'react-feather';

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
  const selectedType = useMemo(() => filterOptions.holidayTypes.find(type => type === filters.type) || 'All Types', [filters.type, filterOptions.holidayTypes]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white px-3.5 h-full items-center text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-200 hover:bg-indigo-50 hover:text-black whitespace-nowrap transition-all capitalize">
        {selectedType}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-6 w-5 text-neutral-700" />
      </MenuButton>
      {filters.type && (
        <button
          onClick={() => handleChange('type', '')}
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
        <MenuItems className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2">
            <MenuItem
              as="button"
              onClick={() => handleChange('type', '')}
              className="flex items-center gap-2 rounded transition-all w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 hover:text-black">
              <div className="h-4 w-4">{filters.type === '' && <Check className="h-4 w-4 text-indigo-600" />}</div>
              All Types
            </MenuItem>
            {filterOptions.holidayTypes.map(type => (
              <MenuItem
                key={type}
                as="button"
                onClick={() => handleChange('type', type)}
                className="flex items-center gap-2 rounded transition-all w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 hover:text-black capitalize">
                <div className="h-4 w-4">{filters.type === type && <Check className="h-4 w-4 text-indigo-600" />}</div>
                {type}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

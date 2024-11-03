import React, { useMemo } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Check, X } from 'react-feather';

interface MonthFilterProps {
  filters: {
    month: string;
  };
  handleChange: (key: string, value: string) => void;
}

export default function MonthFilter({ filters, handleChange }: MonthFilterProps) {
  const months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
  ];

  const selectedMonth = useMemo(() => months.find(month => month.value === filters.month)?.name || 'All Months', [filters.month, months]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white px-3.5 h-full items-center text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-200 hover:bg-indigo-50 hover:text-black whitespace-nowrap transition-all">
        {selectedMonth}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-6 w-5 text-neutral-700" />
      </MenuButton>
      {filters.month && (
        <button
          onClick={() => handleChange('month', '')}
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
        <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2">
            <MenuItem
              as="button"
              onClick={() => handleChange('month', '')}
              className="flex items-center gap-2 rounded transition-all w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 hover:text-black">
              <div className="h-4 w-4">{filters.month === '' && <Check className="h-4 w-4 text-indigo-600" />}</div>
              All Months
            </MenuItem>
            {months.map(month => (
              <MenuItem
                key={month.value}
                as="button"
                onClick={() => handleChange('month', month.value)}
                className="flex items-center gap-2 rounded transition-all w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 hover:text-black">
                <div className="h-4 w-4">{filters.month === month.value && <Check className="h-4 w-4 text-indigo-600" />}</div>
                {month.name}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

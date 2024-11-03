'use client';

import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Download } from 'react-feather';

interface DownloadButtonsProps {
  onDownloadPDF: () => void;
  onDownloadExcel: () => void;
}

export default function DownloadButtons({ onDownloadPDF, onDownloadExcel }: DownloadButtonsProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center group gap-x-2.5 rounded-lg bg-white px-3.5 h-9 items-center text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-200 hover:bg-indigo-50 hover:text-black whitespace-nowrap transition-all">
        <Download size={16} className="group-hover:text-indigo-600 transition-all" />
        <span className="mt-0.5">Download</span>
      </MenuButton>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none select-none">
          <div className="p-2">
            <MenuItem
              as="button"
              onClick={onDownloadPDF}
              className="flex items-center gap-2 rounded transition-all w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 hover:text-black">
              Export PDF
            </MenuItem>
            <MenuItem
              as="button"
              onClick={onDownloadExcel}
              className="flex items-center gap-2 rounded transition-all w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 hover:text-black">
              Export Excel
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

'use client';

import React, { Fragment } from 'react';
import { MapPin, Info } from 'react-feather';
import { Transition } from '@headlessui/react';

interface Holiday {
  id: number;
  name: string;
  date: string;
  country: string;
  type: string;
  color: string;
}

interface HolidayListProps {
  holidays: Holiday[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    weekDay: date.toLocaleDateString('en-US', { weekday: 'long' }),
    dayOfMonth: String(date.getDate()).padStart(2, '0'),
  };
};

export default function HolidayList({ holidays }: HolidayListProps) {
  if (holidays.length === 0) {
    return <p className="text-center text-gray-500">Tatil bulunamadı.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {holidays.map(({ id, name, date, country, type, color }) => {
        const { month, weekDay, dayOfMonth } = formatDate(date);

        return (
          <Transition
            key={id}
            as={Fragment}
            appear
            show={true}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1">
            <div className="flex flex-col xxs:flex-row gap-2 xxs:px-2">
              <div className="bg-neutral-100 w-full xxs:w-1/6 p-5 xxs:rounded-lg">
                <div className="text-lg">
                  {month} {dayOfMonth}
                </div>
                <div className="text-sm text-neutral-400">{weekDay}</div>
              </div>
              <div className="flex w-full xxs:w-5/6 p-5 xxs:rounded-lg border border-neutral-200 shadow-sm">
                <div className="flex flex-col justify-center w-1.5 self-stretch rounded-full" style={{ backgroundColor: color || '#000' }}></div>
                <div className="flex flex-col px-4 flex-grow">
                  <span className="text-lg text-neutral-800">{name}</span>
                  <div className="flex flex-col items-start xxs:flex-row xxs:gap-4 text-neutral-500 text-sm">
                    <div className="flex items-center justify-center gap-1">
                      <Info size={12} />
                      <span className="capitalize">{type}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <MapPin size={12} />
                      <span>{country}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        );
      })}
    </div>
  );
}

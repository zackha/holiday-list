'use client';

import * as React from 'react';
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/solid';

interface Holiday {
  id: number;
  name: string;
  date: string;
  country: string;
  type: string;
  color_id: string;
}

interface HolidayListProps {
  holidays: Holiday[];
}

export default function HolidayList({ holidays }: HolidayListProps) {
  if (holidays.length === 0) {
    return <p className="text-center text-gray-500">Tatil bulunamadı.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {holidays.map(holiday => {
        const date = new Date(holiday.date);
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const weekDay = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dayOfMonth = String(date.getDate()).padStart(2, '0');
        return (
          <div key={holiday.id} className="flex gap-2">
            <div className="bg-neutral-100 w-1/4 p-4 rounded-lg">
              <div className="text-lg">
                {month} {dayOfMonth}
              </div>
              <div className="text-sm text-neutral-600">{weekDay}</div>
            </div>
            <div className="flex w-3/4 p-4 rounded-lg border border-neutral-200 shadow-sm">
              <div className="w-1 rounded-full h-full" style={{ backgroundColor: holiday.color_id }}></div>
              <div className="flex flex-col px-3">
                <span className=" text-lg text-neutral-800">{holiday.name}</span>
                <div className="flex gap-4 text-neutral-500 text-sm">
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="capitalize">{holiday.type}</span>
                  </div>
                  <div className="flex items-center justify-center gap-0.5">
                    <MapPinIcon className="size-3.5" />
                    <span className="">{holiday.country}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

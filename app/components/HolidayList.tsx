'use client';

import * as React from 'react';

interface Holiday {
  id: number;
  name: string;
  date: string;
  country: string;
  type: string;
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
        const weekDay = date.toLocaleDateString('en-US', { month: 'short' });
        const dayOfMonth = String(date.getDate()).padStart(2, '0');

        return (
          <div key={holiday.id} className="p-4 rounded-3xl bg-orange-100 gap-4 flex flex-row items-center">
            <div className="text-white flex flex-col items-center px-5 py-3.5 rounded-xl bg-orange-500 gap-1 border-2 shadow-lg border-white">
              <div className="leading-none text-sm">{weekDay}</div>
              <div className="text-2xl leading-none font-bold">{dayOfMonth}</div>
            </div>
            <span className="font-semibold text-orange-600">{holiday.name}</span>
            <span className="">{holiday.country}</span>
            <span className="">{holiday.type}</span>
          </div>
        );
      })}
    </div>
  );
}

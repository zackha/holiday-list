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
    <div className="">
      {holidays.map(holiday => (
        <div key={holiday.id} className="p-4 border-b border-gray-200">
          <span className="font-semibold">{holiday.name}</span>
          <span className="text-gray-600">{holiday.date}</span>
          <span className="text-gray-700">{holiday.country}</span>
          <span className="text-gray-500 italic">{holiday.type}</span>
        </div>
      ))}
    </div>
  );
}

'use client';

import * as React from 'react';

interface Holiday {
  id: number;
  name: string;
  date: string;
}

interface HolidayListProps {
  holidays: Holiday[];
}

export default function HolidayList({ holidays }: HolidayListProps) {
  if (holidays.length === 0) {
    return <p className="text-center text-gray-500">Tatil bulunamadı.</p>;
  }

  return (
    <ul className="list-disc list-inside">
      {holidays.map(holiday => (
        <li key={holiday.id} className="py-2">
          <span className="font-semibold">{holiday.name}</span> - <span className="text-gray-600">{holiday.date}</span>
        </li>
      ))}
    </ul>
  );
}

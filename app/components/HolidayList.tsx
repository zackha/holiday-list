// app/components/HolidayList.tsx

import React from 'react';

interface HolidayListProps {
  holidays: { id: number; name: string; date: string }[];
}

export default function HolidayList({ holidays }: HolidayListProps) {
  return (
    <ul>
      {holidays.map(holiday => (
        <li key={holiday.id}>
          {holiday.name} - {holiday.date}
        </li>
      ))}
    </ul>
  );
}

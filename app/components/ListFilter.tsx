import React from 'react';
import { Calendar, List } from 'react-feather';

export default function ListFilter() {
  return (
    <div className="flex shadow-sm rounded-lg border border-neutral-200 text-neutral-700">
      <button className="px-3.5 flex items-center gap-2.5 border-r border-neutral-200 bg-indigo-50 rounded-l-md">
        <List size={16} className="text-indigo-600" />
        <span className="mt-0.5 text-black">List</span>
      </button>
      <button className="px-3.5 flex items-center gap-2.5">
        <Calendar size={16} />
        <span className="mt-0.5">Calendar</span>
      </button>
    </div>
  );
}

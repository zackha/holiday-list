'use client';

import * as React from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {page > 1 && (
        <button
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous"
          className="px-3.5 py-1 flex items-center gap-2.5 border border-neutral-200 rounded-lg shadow-sm hover:bg-indigo-50 hover:text-black transition-all group">
          <ArrowLeft size={16} className="group-hover:text-indigo-600 transition-all" />
          <span className="mt-0.5 text-black">Previous</span>
        </button>
      )}
      {page < totalPages && (
        <button
          onClick={() => onPageChange(page + 1)}
          aria-label="Next"
          className="px-3.5 py-1 flex items-center gap-2.5 border border-neutral-200 rounded-lg shadow-sm hover:bg-indigo-50 hover:text-black transition-all group">
          <span className="mt-0.5 text-black">Next</span>
          <ArrowRight size={16} className="group-hover:text-indigo-600 transition-all" />
        </button>
      )}
    </div>
  );
}

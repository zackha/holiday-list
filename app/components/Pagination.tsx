'use client';

import * as React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {page > 1 && (
        <button onClick={() => onPageChange(page - 1)} aria-label="Önceki Sayfa" className="px-4 py-2 border border-gray-300 bg-white">
          Önceki
        </button>
      )}
      {page < totalPages && (
        <button onClick={() => onPageChange(page + 1)} aria-label="Sonraki Sayfa" className="px-4 py-2 border border-gray-300 bg-white">
          Sonraki
        </button>
      )}
    </div>
  );
}

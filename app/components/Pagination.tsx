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
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Önceki Sayfa"
        className="px-4 py-2 border border-gray-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed">
        Önceki
      </button>
      <span className="mx-4">
        Sayfa {page} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Sonraki Sayfa"
        className="px-4 py-2 border border-gray-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed">
        Sonraki
      </button>
    </div>
  );
}

// app/components/Pagination.tsx

import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Önceki Sayfa
      </button>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
        Sonraki Sayfa
      </button>
    </div>
  );
}

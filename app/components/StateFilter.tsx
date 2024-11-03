import React from 'react';

interface StateFilterProps {
  filters: {
    countryId: string;
    stateId: string;
  };
  availableStates: { id: number; name: string }[];
  handleChange: (key: string, value: string) => void;
}

export default function StateFilter({ filters, availableStates, handleChange }: StateFilterProps) {
  return (
    <div className="flex flex-col">
      <select
        value={filters.stateId}
        onChange={e => handleChange('stateId', e.target.value)}
        disabled={!filters.countryId}
        className="p-2 border border-gray-300 rounded disabled:opacity-50">
        <option value="">Seçiniz</option>
        {availableStates.map(state => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
}

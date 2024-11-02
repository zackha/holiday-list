'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [holidays, setHolidays] = useState([]);
  const [filters, setFilters] = useState({
    countryId: '',
    stateId: '',
    type: '',
    year: '',
    month: '',
  });
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({
    countries: [],
    states: [],
    holidayTypes: [],
  });
  const [availableStates, setAvailableStates] = useState([]); // Seçilen ülkeye göre eyaletleri tutmak için

  // Filtre seçeneklerini yükleme
  useEffect(() => {
    const fetchFilterOptions = async () => {
      const res = await fetch('/api/filters');
      const data = await res.json();
      setFilterOptions(data);
    };

    fetchFilterOptions();
  }, []);

  // Tatil verilerini filtrelere göre çekme
  useEffect(() => {
    const fetchHolidays = async () => {
      const query = new URLSearchParams(filters as any);
      query.append('page', page.toString());

      const res = await fetch(`/api/holidays?${query}`);
      const data = await res.json();
      setHolidays(data);
    };

    fetchHolidays();
  }, [filters, page]);

  // Seçilen ülkeye göre eyalet listesini güncelleme
  useEffect(() => {
    if (filters.countryId) {
      const statesForSelectedCountry = filterOptions.states.filter((state: any) => state.country_id === parseInt(filters.countryId));
      setAvailableStates(statesForSelectedCountry);
    } else {
      setAvailableStates([]);
      setFilters(prevFilters => ({ ...prevFilters, stateId: '' })); // Eyalet seçimini sıfırla
    }
  }, [filters.countryId, filterOptions.states]);

  // Yıl ve ay için seçenekleri oluşturma
  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i); // Son 20 yılı getir
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1'den 12'ye kadar aylar

  return (
    <div>
      <h1>Tatil Listesi</h1>
      <div>
        <label>
          Ülke:
          <select value={filters.countryId} onChange={e => setFilters({ ...filters, countryId: e.target.value })}>
            <option value="">Seçiniz</option>
            {filterOptions.countries.map((country: any) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Eyalet:
          <select value={filters.stateId} onChange={e => setFilters({ ...filters, stateId: e.target.value })} disabled={!filters.countryId}>
            <option value="">Seçiniz</option>
            {availableStates.map((state: any) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tatil Tipi:
          <select value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
            <option value="">Seçiniz</option>
            {filterOptions.holidayTypes.map((type: string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Yıl:
          <select value={filters.year} onChange={e => setFilters({ ...filters, year: e.target.value })}>
            <option value="">Seçiniz</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ay:
          <select value={filters.month} onChange={e => setFilters({ ...filters, month: e.target.value })}>
            <option value="">Seçiniz</option>
            {months.map(month => (
              <option key={month} value={String(month).padStart(2, '0')}>
                {month}
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => setPage(page + 1)}>Sonraki Sayfa</button>
      </div>

      <ul>
        {holidays.map((holiday: any) => (
          <li key={holiday.id}>
            {holiday.name} - {holiday.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

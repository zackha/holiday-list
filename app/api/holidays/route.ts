import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryId = searchParams.get('countryId');
  const stateId = searchParams.get('stateId');
  const type = searchParams.get('type');
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 10;
  const start = (page - 1) * limit;

  // Ana sorgu (pagination ve toplam sayfa hesaplama için)
  let query = supabase
    .from('holidays')
    .select('id, name, date, country_id, state_id, type, countries (name)', { count: 'exact' })
    .range(start, start + limit - 1);

  if (countryId) query = query.eq('country_id', countryId);
  if (stateId) query = query.eq('state_id', stateId);
  if (type) query = query.eq('type', type);

  // Yıl ve ay filtrelemesi
  if (year && month) {
    const startDate = `${year}-${month.padStart(2, '0')}-01`;
    const endDate = new Date(parseInt(year), parseInt(month), 0).toISOString().split('T')[0];
    query = query.gte('date', startDate).lte('date', endDate);
  } else if (year) {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    query = query.gte('date', startDate).lte('date', endDate);
  } else if (month) {
    const currentYear = new Date().getFullYear();
    const startDate = `${currentYear}-${month.padStart(2, '0')}-01`;
    const endDate = new Date(currentYear, parseInt(month), 0).toISOString().split('T')[0];
    query = query.gte('date', startDate).lte('date', endDate);
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(count! / limit);

  // Ülke ismini `country` alanına ekle
  const holidays = data.map((holiday: any) => ({
    id: holiday.id,
    name: holiday.name,
    date: holiday.date,
    country: holiday.countries?.name, // Ülke adı burada
    state_id: holiday.state_id,
    type: holiday.type,
  }));

  return NextResponse.json({ holidays, totalPages });
}

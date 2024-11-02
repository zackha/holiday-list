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
  const end = start + limit - 1;

  let query = supabase.from('holidays').select('*').range(start, end);

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

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
  const { data: countries, error: countryError } = await supabase.from('countries').select('id, name');

  const { data: states, error: stateError } = await supabase.from('states').select('id, name, country_id');

  const holidayTypes = ['official', 'religious'];

  if (countryError || stateError) {
    return NextResponse.json({ error: countryError?.message || stateError?.message }, { status: 500 });
  }

  return NextResponse.json({ countries, states, holidayTypes });
}

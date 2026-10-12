import { supabase } from '@/lib/supabase';

export default async function TestSupabase() {
    const { data, error } = await supabase.from('projects').select('*');

    console.log('Data dari Supabase:', data);
    console.log('Error (jika ada):', error);

    return (
        <>

        </>
    )
}
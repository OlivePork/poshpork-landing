import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    // Test Supabase connection
    const { data, error } = await supabase.from('bookings').select('*').limit(1);
    
    if (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Supabase error',
        details: error.message 
      });
    }

    // Test insert
    const testData = {
      session_date: '2026-05-16',
      session_display: 'TEST',
      num_people: 1,
      customer_email: 'test@test.com',
      customer_name: 'Test User',
      stripe_session_id: 'test_' + Date.now(),
    };

    const { error: insertError } = await supabase.from('bookings').insert([testData]);

    if (insertError) {
      return res.status(500).json({ 
        success: false, 
        error: 'Insert failed',
        details: insertError.message 
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Supabase connection works!',
      env_check: {
        has_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        has_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    });

  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      error: err.message,
      stack: err.stack 
    });
  }
}
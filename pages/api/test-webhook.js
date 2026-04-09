import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    // Check env vars
    const hasUrl = !!process.env.SUPABASE_URL;
    const hasKey = !!process.env.SUPABASE_ANON_KEY;

    if (!hasUrl || !hasKey) {
      return res.status(200).json({
        success: false,
        env: {
          has_supabase_url: hasUrl,
          has_supabase_key: hasKey,
          supabase_url_value: process.env.SUPABASE_URL ? 'exists' : 'missing',
          supabase_key_value: process.env.SUPABASE_ANON_KEY ? 'exists' : 'missing',
        }
      });
    }

    // Try to connect to Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .limit(1);

    if (error) {
      return res.status(200).json({
        success: false,
        error: 'Supabase query failed',
        details: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Supabase connection works!',
      row_count: data?.length || 0
    });

  } catch (err) {
    return res.status(200).json({
      success: false,
      error: err.message,
      stack: err.stack
    });
  }
}
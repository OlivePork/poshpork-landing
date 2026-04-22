import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId } = req.query;

  try {
    // Get table scores
    const { data: tables, error: tablesError } = await supabase
      .from('quiz_tables')
      .select('*')
      .eq('session_id', sessionId)
      .order('total_score', { ascending: false });

    if (tablesError) throw tablesError;

    // Get top players
    const { data: players, error: playersError } = await supabase
      .from('quiz_players')
      .select('first_name, individual_score, table_id')
      .eq('session_id', sessionId)
      .order('individual_score', { ascending: false })
      .limit(10);

    if (playersError) throw playersError;

    return res.status(200).json({ tables, players });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return res.status(500).json({ error: error.message });
  }
}
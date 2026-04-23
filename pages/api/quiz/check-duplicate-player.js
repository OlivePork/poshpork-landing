import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId, email } = req.body;

  try {
    const { data: existingPlayers, error } = await supabase
      .from('quiz_players')
      .select('id, table_id')
      .eq('session_id', sessionId)
      .ilike('email', email.trim());

    if (error) throw error;

    const exists = existingPlayers && existingPlayers.length > 0;

    return res.status(200).json({ 
      exists,
      player: exists ? existingPlayers[0] : null
    });

  } catch (error) {
    console.error('Duplicate check error:', error);
    return res.status(500).json({ error: error.message });
  }
}
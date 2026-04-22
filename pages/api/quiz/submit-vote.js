import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId, playerId, votedSuspect } = req.body;

  try {
    const { data: vote, error } = await supabase
      .from('quiz_votes')
      .insert([{
        session_id: sessionId,
        player_id: playerId,
        voted_suspect: votedSuspect
      }])
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ vote });
  } catch (error) {
    console.error('Vote submission error:', error);
    return res.status(500).json({ error: error.message });
  }
}
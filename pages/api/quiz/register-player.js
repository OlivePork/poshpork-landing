import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId, tableId, firstName, email, seatNumber, telegramId, telegramUsername, platform } = req.body;

  try {
    const { data: player, error } = await supabase
      .from('quiz_players')
      .insert([{
        session_id: sessionId,
        table_id: tableId,
        first_name: firstName,
        email: email,
        seat_number: seatNumber,
        telegram_id: telegramId,
        telegram_username: telegramUsername,
        platform: platform || 'web'
      }])
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ player });
  } catch (error) {
    console.error('Player registration error:', error);
    return res.status(500).json({ error: error.message });
  }
}
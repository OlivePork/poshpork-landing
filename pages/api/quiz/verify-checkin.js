import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionDate, sessionTime, videoUrl, venueName } = req.body;

  try {
    // Create or get session template
    let session;
    const { data: existingSession } = await supabase
      .from('quiz_sessions')
      .select('*')
      .eq('session_date', sessionDate)
      .eq('session_time', sessionTime)
      .single();

    if (existingSession) {
      session = existingSession;
    } else {
      const { data: newSession, error: sessionError } = await supabase
        .from('quiz_sessions')
        .insert([{ 
          session_date: sessionDate, 
          session_time: sessionTime,
          video_url: videoUrl,
          mode: 'in-person',
          status: 'active'
        }])
        .select()
        .single();

      if (sessionError) throw sessionError;
      session = newSession;
    }

    // Generate instance code
    const { data: codeData } = await supabase.rpc('generate_instance_code', {
      session_date: sessionDate
    });

    const instanceCode = codeData || `${sessionDate}-${Date.now()}`;

    // Create game instance
    const { data: gameInstance, error: instanceError } = await supabase
      .from('game_instances')
      .insert([{
        session_id: session.id,
        instance_code: instanceCode,
        venue_name: venueName || 'Main Venue',
        status: 'waiting'
      }])
      .select()
      .single();

    if (instanceError) throw instanceError;

    // Create four tables for this game instance
    const tables = [
      { session_id: session.id, game_instance_id: gameInstance.id, table_name: 'Lady Posh Pork', theme_color: '#d4af37' },
      { session_id: session.id, game_instance_id: gameInstance.id, table_name: 'Mr Carbohydrates', theme_color: '#8B4513' },
      { session_id: session.id, game_instance_id: gameInstance.id, table_name: 'Mr Vegetable Oils', theme_color: '#FFD700' },
      { session_id: session.id, game_instance_id: gameInstance.id, table_name: 'The Bliss Brothers', theme_color: '#FF69B4' },
    ];

    const { data: createdTables, error: tablesError } = await supabase
      .from('quiz_tables')
      .insert(tables)
      .select();

    if (tablesError) throw tablesError;

    return res.status(200).json({ 
      session, 
      gameInstance,
      tables: createdTables 
    });
  } catch (error) {
    console.error('Session creation error:', error);
    return res.status(500).json({ error: error.message });
  }
}
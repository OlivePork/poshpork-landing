import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data: questions, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .order('order_number', { ascending: true });

    if (error) throw error;

    return res.status(200).json({ questions: questions || [] });
  } catch (error) {
    console.error('Questions fetch error:', error);
    return res.status(500).json({ error: error.message });
  }
}
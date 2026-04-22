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
    const { data: votes, error } = await supabase
      .from('quiz_votes')
      .select('voted_suspect')
      .eq('session_id', sessionId);

    if (error) throw error;

    // Count votes per suspect
    const voteCounts = {
      'Lady Posh Pork': 0,
      'Mr Carbohydrates': 0,
      'Mr Vegetable Oils': 0,
      'The Bliss Brothers': 0
    };

    votes.forEach(vote => {
      voteCounts[vote.voted_suspect]++;
    });

    // Find winner (most votes)
    const winner = Object.entries(voteCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];

    return res.status(200).json({ 
      voteCounts,
      winner,
      totalVotes: votes.length
    });
  } catch (error) {
    console.error('Vote results error:', error);
    return res.status(500).json({ error: error.message });
  }
}
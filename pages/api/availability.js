import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const sessions = [
  { date: '2026-05-16', capacity: 8 },
  { date: '2026-05-18', capacity: 8 },
  { date: '2026-05-23', capacity: 8 },
  { date: '2026-05-25', capacity: 8 },
  { date: '2026-05-30', capacity: 8 },
  { date: '2026-06-01', capacity: 8 },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('session_date, num_people');

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Database error', details: error.message });
    }

    const booked = {};
    if (data && data.length > 0) {
      data.forEach(booking => {
        const date = booking.session_date;
        booked[date] = (booked[date] || 0) + parseInt(booking.num_people);
      });
    }

    const availability = {};
    sessions.forEach(session => {
      availability[session.date] = session.capacity - (booked[session.date] || 0);
    });

    return res.status(200).json({ availability });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
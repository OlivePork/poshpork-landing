const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const sessions = [
  { date: '2026-05-16', capacity: 8 },
  { date: '2026-05-18', capacity: 8 },
  { date: '2026-05-23', capacity: 8 },
  { date: '2026-05-25', capacity: 8 },
  { date: '2026-05-30', capacity: 8 },
  { date: '2026-06-01', capacity: 8 },
];

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('session_date, num_people');

    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    const booked = {};
    if (data) {
      data.forEach(booking => {
        booked[booking.session_date] = (booked[booking.session_date] || 0) + booking.num_people;
      });
    }

    const availability = {};
    sessions.forEach(session => {
      availability[session.date] = session.capacity - (booked[session.date] || 0);
    });

    return res.status(200).json({ availability });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
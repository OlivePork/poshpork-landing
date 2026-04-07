import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials since env vars aren't loading
const supabase = createClient(
  'https://gpcaonwqvbdzsmypmrwk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2FvbndxdmJkenNteXBtcndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MTA3MTYsImV4cCI6MjA5MTA4NjcxNn0.Ld4zKJYqmLzOwdLep3HN-ThD8QIexMv99ib1K0ClVvA'
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
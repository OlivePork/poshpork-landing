import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const availableDates = [
  { date: '2026-05-16', day: 'Friday', time: '10:00 AM', capacity: 8 },
  { date: '2026-05-18', day: 'Sunday', time: '10:00 AM', capacity: 8 },
  { date: '2026-05-23', day: 'Friday', time: '10:00 AM', capacity: 8 },
  { date: '2026-05-25', day: 'Sunday', time: '10:00 AM', capacity: 8 },
  { date: '2026-05-30', day: 'Friday', time: '10:00 AM', capacity: 8 },
  { date: '2026-06-01', day: 'Sunday', time: '10:00 AM', capacity: 8 },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch all bookings from Supabase
    const { data, error } = await supabase
      .from('bookings')
      .select('session_date, num_people');

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }

    // Calculate booked seats per date
    const bookedSeats = {};
    data?.forEach((booking) => {
      const date = booking.session_date;
      bookedSeats[date] = (bookedSeats[date] || 0) + booking.num_people;
    });

    // Calculate available seats
    const availability = {};
    availableDates.forEach((session) => {
      const booked = bookedSeats[session.date] || 0;
      availability[session.date] = session.capacity - booked;
    });

    return res.status(200).json({ availability });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
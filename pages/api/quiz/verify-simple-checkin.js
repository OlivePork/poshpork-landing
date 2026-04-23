import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId, bookerEmail, checkinCode } = req.body;

  try {
    // Get session date
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('session_date')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    let booking = null;

    // Search by booker email if provided
    if (bookerEmail) {
      const { data: bookings, error: bookingError } = await supabase
        .from('bookings')
        .select('*')
        .ilike('customer_email', bookerEmail.trim())
        .eq('session_date', session.session_date);

      if (bookingError) throw bookingError;

      if (bookings && bookings.length > 0) {
        booking = bookings[0];
      }
    }

    // If not found by email, try check-in code
    if (!booking && checkinCode) {
      const { data: bookings, error: bookingError } = await supabase
        .from('bookings')
        .select('*')
        .eq('checkin_code', checkinCode.trim().toUpperCase())
        .eq('session_date', session.session_date);

      if (bookingError) throw bookingError;

      if (bookings && bookings.length > 0) {
        booking = bookings[0];
      }
    }

    if (!booking) {
      return res.status(404).json({ 
        error: 'Booking not found',
        message: 'No booking found with this email or code for today\'s session'
      });
    }

    // Check how many people from this booking have already checked in
    const { data: registeredPlayers, error: playersError } = await supabase
      .from('quiz_players')
      .select('id')
      .eq('session_id', sessionId)
      .or(`email.eq.${booking.customer_email}`);

    if (playersError) throw playersError;

    const numRegistered = registeredPlayers ? registeredPlayers.length : 0;

    if (numRegistered >= booking.num_people) {
      return res.status(400).json({ 
        error: 'Booking fully used',
        message: `All ${booking.num_people} spots from this booking have been used`
      });
    }

    // Success - booking is valid and has available spots
    return res.status(200).json({ 
      valid: true,
      booking: {
        id: booking.id,
        numPeople: booking.num_people,
        numRegistered: numRegistered,
        spotsRemaining: booking.num_people - numRegistered
      }
    });

  } catch (error) {
    console.error('Simple check-in verification error:', error);
    return res.status(500).json({ error: error.message });
  }
}
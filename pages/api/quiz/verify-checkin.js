import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, sessionId } = req.body;

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

    // Convert session_date to string format for comparison
    const sessionDateStr = session.session_date;

    // Search for booking by email - match on date as string
    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .ilike('customer_email', email.trim());

    if (bookingError) throw bookingError;

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ 
        error: 'Booking not found',
        message: 'No booking found with this email'
      });
    }

    // Find booking that matches session date
    const booking = bookings.find(b => {
      const bookingDate = typeof b.session_date === 'string' 
        ? b.session_date.split('T')[0] 
        : b.session_date;
      const sessionDate = typeof sessionDateStr === 'string'
        ? sessionDateStr.split('T')[0]
        : sessionDateStr;
      return bookingDate === sessionDate;
    });

    if (!booking) {
      return res.status(404).json({ 
        error: 'Booking not found',
        message: 'No booking found with this email for today\'s session'
      });
    }

    // Check if already checked in
    if (booking.checked_in) {
      return res.status(400).json({ 
        error: 'Already checked in',
        message: `This booking was already checked in at ${new Date(booking.checked_in_at).toLocaleTimeString()}`
      });
    }

    // Success - booking is valid
    return res.status(200).json({ 
      valid: true,
      booking: {
        id: booking.id,
        customerName: booking.customer_name,
        customerEmail: booking.customer_email,
        numPeople: booking.num_people,
        sessionDisplay: booking.session_display,
        checkinCode: booking.checkin_code
      }
    });

  } catch (error) {
    console.error('Check-in verification error:', error);
    return res.status(500).json({ error: error.message });
  }
}
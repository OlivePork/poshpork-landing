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

  console.log('=== VERIFY CHECKIN DEBUG ===');
  console.log('Email received:', email);
  console.log('Session ID received:', sessionId);

  try {
    // Get session date
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('session_date')
      .eq('id', sessionId)
      .single();

    console.log('Session query result:', session);
    console.log('Session error:', sessionError);

    if (sessionError || !session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Search for ALL bookings with this email first
    const { data: allBookings, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .ilike('customer_email', email.trim());

    console.log('All bookings found:', allBookings);
    console.log('Booking error:', bookingError);
    console.log('Session date to match:', session.session_date);

    if (bookingError) throw bookingError;

    if (!allBookings || allBookings.length === 0) {
      console.log('NO BOOKINGS FOUND AT ALL');
      return res.status(404).json({ 
        error: 'Booking not found',
        message: 'No booking found with this email'
      });
    }

    // Log each booking's date
    allBookings.forEach((b, i) => {
      console.log(`Booking ${i}:`, {
        email: b.customer_email,
        date: b.session_date,
        dateType: typeof b.session_date
      });
    });

    // Find booking that matches session date
    const booking = allBookings.find(b => {
      const bookingDate = typeof b.session_date === 'string' 
        ? b.session_date.split('T')[0] 
        : b.session_date;
      const sessionDate = typeof session.session_date === 'string'
        ? session.session_date.split('T')[0]
        : session.session_date;
      
      console.log('Comparing:', { bookingDate, sessionDate, match: bookingDate === sessionDate });
      return bookingDate === sessionDate;
    });

    console.log('Matched booking:', booking);

    if (!booking) {
      console.log('NO BOOKING MATCHED THE DATE');
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

    console.log('SUCCESS - returning booking');

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
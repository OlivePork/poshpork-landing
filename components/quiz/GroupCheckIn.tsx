'use client';

import { useState } from 'react';

interface GroupCheckInProps {
  sessionId: string;
  tableId: string;
  tableName: string;
  onComplete: (players: any[]) => void;
}

export default function GroupCheckIn({ 
  sessionId,
  tableId, 
  tableName, 
  onComplete 
}: GroupCheckInProps) {
  const [step, setStep] = useState<'verify' | 'register'>('verify');
  const [email, setEmail] = useState('');
  const [booking, setBooking] = useState<any>(null);
  const [currentGuestIndex, setCurrentGuestIndex] = useState(0);
  const [guests, setGuests] = useState<any[]>([]);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Verify booking
  const handleVerifyBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/quiz/verify-checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          sessionId: sessionId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.error);
        setLoading(false);
        return;
      }

      // Booking found!
      setBooking(data.booking);
      setStep('register');
      
      // Pre-fill first guest with booking email
      setGuestEmail(data.booking.customerEmail);

    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Register each guest
  const handleRegisterGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/quiz/register-player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          tableId,
          firstName: guestName,
          email: guestEmail,
          seatNumber: currentGuestIndex + 1,
          platform: 'web'
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      // Add this guest to the list
      const newGuests = [...guests, data.player];
      setGuests(newGuests);

      // Check if we're done
      if (newGuests.length >= booking.numPeople) {
        // All guests registered! Mark booking as checked in
        await fetch('/api/quiz/complete-checkin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: booking.id,
            tableId
          }),
        });

        // Complete!
        onComplete(newGuests);
      } else {
        // Move to next guest
        setCurrentGuestIndex(currentGuestIndex + 1);
        setGuestName('');
        setGuestEmail('');
      }

    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parchment rounded-lg p-8" style={{ border: '2px solid var(--gold)', maxWidth: '500px', margin: '0 auto' }}>
      
      {step === 'verify' && (
        <>
          <h2 style={{ fontSize: '32px', color: 'var(--gold)', fontFamily: 'var(--font-cinzel)', marginBottom: '10px', textAlign: 'center' }}>
            Check-In
          </h2>

          <p style={{ fontSize: '16px', color: 'var(--dark-brown)', marginBottom: '30px', textAlign: 'center', fontWeight: 'bold' }}>
            Table: {tableName}
          </p>

          <form onSubmit={handleVerifyBooking}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: 'var(--dark-brown)', marginBottom: '8px', fontFamily: 'var(--font-cinzel)' }}>
                BOOKING EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '16px',
                  border: '2px solid var(--dark-gold)',
                  borderRadius: '8px',
                  background: 'white',
                  color: 'var(--dark-brown)',
                }}
              />
              <p style={{ fontSize: '12px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
                Enter the email used when booking
              </p>
            </div>

            {error && (
              <div style={{ padding: '15px', background: '#fee', border: '2px solid #f88', borderRadius: '8px', marginBottom: '20px' }}>
                <p style={{ fontSize: '14px', color: '#c00', margin: 0, textAlign: 'center' }}>
                  ❌ {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '18px',
                fontWeight: 'bold',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)',
                color: loading ? '#666' : 'var(--charcoal)',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-cinzel)',
              }}
            >
              {loading ? 'Verifying...' : 'Verify Booking'}
            </button>
          </form>
        </>
      )}

      {step === 'register' && booking && (
        <>
          <h2 style={{ fontSize: '28px', color: 'var(--gold)', fontFamily: 'var(--font-cinzel)', marginBottom: '10px', textAlign: 'center' }}>
            Register Guests
          </h2>

          <p style={{ fontSize: '16px', color: 'var(--dark-brown)', marginBottom: '10px', textAlign: 'center', fontWeight: 'bold' }}>
            Table: {tableName}
          </p>

          <p style={{ fontSize: '14px', color: 'var(--dark-brown)', marginBottom: '30px', textAlign: 'center' }}>
            Guest {currentGuestIndex + 1} of {booking.numPeople}
          </p>

          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '30px' }}>
            {Array.from({ length: booking.numPeople }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: i < currentGuestIndex ? 'var(--gold)' : i === currentGuestIndex ? 'var(--dark-gold)' : '#ddd'
                }}
              />
            ))}
          </div>

          <form onSubmit={handleRegisterGuest}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: 'var(--dark-brown)', marginBottom: '8px', fontFamily: 'var(--font-cinzel)' }}>
                FIRST NAME
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter your first name"
                required
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '2px solid var(--dark-gold)',
                  borderRadius: '8px',
                  background: 'white',
                  color: 'var(--dark-brown)',
                }}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: 'var(--dark-brown)', marginBottom: '8px', fontFamily: 'var(--font-cinzel)' }}>
                EMAIL
              </label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '2px solid var(--dark-gold)',
                  borderRadius: '8px',
                  background: 'white',
                  color: 'var(--dark-brown)',
                }}
              />
            </div>

            {error && (
              <div style={{ padding: '15px', background: '#fee', border: '2px solid #f88', borderRadius: '8px', marginBottom: '20px' }}>
                <p style={{ fontSize: '14px', color: '#c00', margin: 0, textAlign: 'center' }}>
                  ❌ {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '18px',
                fontWeight: 'bold',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)',
                color: loading ? '#666' : 'var(--charcoal)',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-cinzel)',
              }}
            >
              {loading ? 'Registering...' : currentGuestIndex + 1 < booking.numPeople ? 'Next Guest →' : 'Start Experience →'}
            </button>
          </form>

          {/* Show registered guests */}
          {guests.length > 0 && (
            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--dark-gold)' }}>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px', textAlign: 'center' }}>
                Registered:
              </p>
              {guests.map((guest, i) => (
                <p key={i} style={{ fontSize: '14px', color: 'var(--dark-brown)', margin: '5px 0', textAlign: 'center' }}>
                  ✓ {guest.first_name}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
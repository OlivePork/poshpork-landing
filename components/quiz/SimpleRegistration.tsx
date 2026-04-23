'use client';

import { useState } from 'react';

interface SimpleRegistrationProps {
  sessionId: string;
  tableId: string;
  tableName: string;
  seatsTaken: number;
  maxSeats: number;
  onComplete: (playerData: any) => void;
}

export default function SimpleRegistration({ 
  sessionId,
  tableId,
  tableName,
  seatsTaken,
  maxSeats,
  onComplete 
}: SimpleRegistrationProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [bookerEmail, setBookerEmail] = useState('');
  const [checkinCode, setCheckinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookerEmail && !checkinCode) {
      setError('Please enter either the booker email or check-in code');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Step 1: Verify booking
      const verifyResponse = await fetch('/api/quiz/verify-simple-checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          bookerEmail: bookerEmail || null,
          checkinCode: checkinCode || null
        }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        setError(verifyData.message || verifyData.error);
        setLoading(false);
        return;
      }

      // Step 2: Check if already registered
      const checkDuplicateResponse = await fetch('/api/quiz/check-duplicate-player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          email
        }),
      });

      const duplicateData = await checkDuplicateResponse.json();

      if (duplicateData.exists) {
        setError('This email has already checked in at another table');
        setLoading(false);
        return;
      }

      // Step 3: Check table capacity
      if (seatsTaken >= maxSeats) {
        setError(`This table is full (${maxSeats}/${maxSeats} seats taken). Please choose another table.`);
        setLoading(false);
        return;
      }

      // Step 4: Register player
      const registerResponse = await fetch('/api/quiz/register-player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          tableId,
          firstName,
          email,
          seatNumber: seatsTaken + 1,
          platform: 'web'
        }),
      });

      const playerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(playerData.error);
      }

      // Step 5: Update seat count
      await fetch('/api/quiz/increment-table-seats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId }),
      });

      // Success!
      onComplete(playerData.player);

    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="parchment rounded-lg p-8" style={{ border: '2px solid var(--gold)', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '32px', color: 'var(--gold)', fontFamily: 'var(--font-cinzel)', marginBottom: '10px', textAlign: 'center' }}>
        Join the Table
      </h2>

      <p style={{ fontSize: '16px', color: 'var(--dark-brown)', marginBottom: '10px', textAlign: 'center', fontWeight: 'bold' }}>
        Table: {tableName}
      </p>

      <p style={{ fontSize: '14px', color: 'var(--dark-brown)', marginBottom: '30px', textAlign: 'center' }}>
        Seats: {seatsTaken}/{maxSeats} filled
      </p>

      {seatsTaken >= maxSeats ? (
        <div style={{ padding: '20px', background: '#fee', border: '2px solid #f88', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#c00', margin: 0, fontWeight: 'bold' }}>
            ❌ Table Full
          </p>
          <p style={{ fontSize: '14px', color: '#c00', marginTop: '10px' }}>
            This table has {maxSeats} seats and all are taken. Please choose another table.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: 'var(--dark-brown)', marginBottom: '8px', fontFamily: 'var(--font-cinzel)' }}>
              YOUR FIRST NAME
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Enter your first name"
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

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: 'var(--dark-brown)', marginBottom: '8px', fontFamily: 'var(--font-cinzel)' }}>
              YOUR EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
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

          <div style={{ 
            padding: '15px', 
            background: 'rgba(212, 175, 55, 0.1)', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px dashed var(--dark-gold)'
          }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--dark-brown)', marginBottom: '15px', textAlign: 'center' }}>
              Enter EITHER:
            </p>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: 'var(--dark-brown)', marginBottom: '8px' }}>
                BOOKER'S EMAIL
              </label>
              <input
                type="email"
                value={bookerEmail}
                onChange={(e) => setBookerEmail(e.target.value)}
                placeholder="email used to book"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  border: '2px solid var(--dark-gold)',
                  borderRadius: '8px',
                  background: 'white',
                  color: 'var(--dark-brown)',
                }}
              />
            </div>

            <p style={{ fontSize: '12px', color: '#666', textAlign: 'center', margin: '10px 0' }}>
              OR
            </p>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: 'var(--dark-brown)', marginBottom: '8px' }}>
                CHECK-IN CODE
              </label>
              <input
                type="text"
                value={checkinCode}
                onChange={(e) => setCheckinCode(e.target.value.toUpperCase())}
                placeholder="PKM-123456"
                maxLength={10}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  border: '2px solid var(--dark-gold)',
                  borderRadius: '8px',
                  background: 'white',
                  color: 'var(--dark-brown)',
                  fontFamily: 'monospace',
                  letterSpacing: '1px'
                }}
              />
            </div>
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
            {loading ? 'Joining...' : 'Join Table →'}
          </button>
        </form>
      )}
    </div>
  );
}
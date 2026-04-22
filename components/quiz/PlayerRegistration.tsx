'use client';

import { useState } from 'react';

interface PlayerRegistrationProps {
  sessionId: string;
  tableId: string;
  tableName: string;
  onComplete: (playerData: any) => void;
}

export default function PlayerRegistration({ 
  sessionId,
  tableId,
  tableName,
  onComplete 
}: PlayerRegistrationProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/quiz/register-player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          tableId,
          firstName,
          email,
          seatNumber: 1, // For now, we'll handle seat numbers later
          platform: 'web'
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      onComplete(data.player);

    } catch (error: any) {
      console.error('Registration error:', error);
      alert(error.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="parchment rounded-lg p-8" style={{ border: '2px solid var(--gold)', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '32px', color: 'var(--gold)', fontFamily: 'var(--font-cinzel)', marginBottom: '10px', textAlign: 'center' }}>
        Join The Investigation
      </h2>

      <p style={{ fontSize: '16px', color: 'var(--dark-brown)', marginBottom: '30px', textAlign: 'center', fontWeight: 'bold' }}>
        Table: {tableName}
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: 'var(--dark-brown)', marginBottom: '8px', fontFamily: 'var(--font-cinzel)' }}>
            FIRST NAME
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

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: 'var(--dark-brown)', marginBottom: '8px', fontFamily: 'var(--font-cinzel)' }}>
            EMAIL
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
          {loading ? 'Joining...' : 'Start Experience →'}
        </button>
      </form>
    </div>
  );
}
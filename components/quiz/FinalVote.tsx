'use client';

import { useState } from 'react';

interface FinalVoteProps {
  sessionId: string;
  playerId: string;
  playerName: string;
  isVisible: boolean;
  onVoteSubmitted: () => void;
}

const suspects = [
  { name: 'Lady Posh Pork', icon: '🥓', color: '#d4af37' },
  { name: 'Mr Carbohydrates', icon: '🌾', color: '#8B4513' },
  { name: 'Mr Vegetable Oils', icon: '🛢️', color: '#FFD700' },
  { name: 'The Bliss Brothers', icon: '🍬', color: '#FF69B4' },
];

export default function FinalVote({ 
  sessionId, 
  playerId, 
  playerName,
  isVisible,
  onVoteSubmitted 
}: FinalVoteProps) {
  const [selectedSuspect, setSelectedSuspect] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isVisible) return null;

  const handleSubmit = async () => {
    if (!selectedSuspect) {
      alert('Please select a suspect');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/quiz/submit-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          playerId,
          votedSuspect: selectedSuspect
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      setSubmitted(true);
      setTimeout(() => {
        onVoteSubmitted();
      }, 2000);

    } catch (error: any) {
      console.error('Vote submission error:', error);
      alert(error.message || 'Error submitting vote. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
    >
      <div
        className="parchment"
        style={{
          maxWidth: '600px',
          width: '100%',
          padding: '40px',
          borderRadius: '12px',
          border: '3px solid var(--gold)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {!submitted ? (
          <>
            <h2
              style={{
                fontSize: '32px',
                color: 'var(--gold)',
                fontFamily: 'var(--font-cinzel)',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              The Final Verdict
            </h2>

            <p
              style={{
                fontSize: '18px',
                color: 'var(--dark-brown)',
                marginBottom: '30px',
                textAlign: 'center',
                lineHeight: '1.6',
              }}
            >
              {playerName}, you've examined all the evidence. Now it's time to decide...
            </p>

            <h3
              style={{
                fontSize: '20px',
                color: 'var(--dark-brown)',
                fontFamily: 'var(--font-cinzel)',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              Who is GUILTY?
            </h3>

            {suspects.map((suspect) => (
              <button
                key={suspect.name}
                onClick={() => setSelectedSuspect(suspect.name)}
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '20px',
                  marginBottom: '12px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  background: selectedSuspect === suspect.name 
                    ? `linear-gradient(135deg, ${suspect.color}99 0%, ${suspect.color}cc 100%)`
                    : 'white',
                  color: 'var(--dark-brown)',
                  border: `3px solid ${selectedSuspect === suspect.name ? suspect.color : 'var(--dark-gold)'}`,
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: 'var(--font-cinzel)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '32px' }}>{suspect.icon}</span>
                  <span>{suspect.name}</span>
                </div>
                {selectedSuspect === suspect.name && (
                  <span style={{ fontSize: '24px' }}>✓</span>
                )}
              </button>
            ))}

            <button
              onClick={handleSubmit}
              disabled={!selectedSuspect || loading}
              style={{
                width: '100%',
                padding: '18px',
                marginTop: '30px',
                fontSize: '20px',
                fontWeight: 'bold',
                background: selectedSuspect && !loading
                  ? 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)'
                  : '#ccc',
                color: selectedSuspect && !loading ? 'var(--charcoal)' : '#666',
                border: 'none',
                borderRadius: '8px',
                cursor: selectedSuspect && !loading ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--font-cinzel)',
              }}
            >
              {loading ? 'Submitting Verdict...' : 'Cast Your Vote'}
            </button>

            <p
              style={{
                fontSize: '12px',
                color: '#666',
                marginTop: '20px',
                textAlign: 'center',
                fontStyle: 'italic',
              }}
            >
              Your vote is anonymous. Results will be revealed after everyone votes.
            </p>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
            <h2
              style={{
                fontSize: '28px',
                color: 'var(--gold)',
                fontFamily: 'var(--font-cinzel)',
                marginBottom: '15px',
              }}
            >
              Vote Recorded
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--dark-brown)' }}>
              Thank you for your verdict, {playerName}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
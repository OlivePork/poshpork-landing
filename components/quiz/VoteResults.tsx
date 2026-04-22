'use client';

import { useEffect, useState } from 'react';

interface VoteResultsProps {
  sessionId: string;
  isVisible: boolean;
}

interface VoteCounts {
  'Lady Posh Pork': number;
  'Mr Carbohydrates': number;
  'Mr Vegetable Oils': number;
  'The Bliss Brothers': number;
}

const suspects = [
  { name: 'Lady Posh Pork', icon: '🥓', color: '#d4af37' },
  { name: 'Mr Carbohydrates', icon: '🌾', color: '#8B4513' },
  { name: 'Mr Vegetable Oils', icon: '🛢️', color: '#FFD700' },
  { name: 'The Bliss Brothers', icon: '🍬', color: '#FF69B4' },
];

export default function VoteResults({ sessionId, isVisible }: VoteResultsProps) {
  const [voteCounts, setVoteCounts] = useState<VoteCounts | null>(null);
  const [winner, setWinner] = useState<string>('');
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisible) {
      fetchResults();
    }
  }, [isVisible, sessionId]);

  const fetchResults = async () => {
    try {
      const response = await fetch(`/api/quiz/get-vote-results?sessionId=${sessionId}`);
      const data = await response.json();

      if (response.ok) {
        setVoteCounts(data.voteCounts);
        setWinner(data.winner);
        setTotalVotes(data.totalVotes);
      }
    } catch (error) {
      console.error('Vote results fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  const getSuspectData = (name: string) => suspects.find(s => s.name === name);

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
        <h2
          style={{
            fontSize: '32px',
            color: 'var(--gold)',
            fontFamily: 'var(--font-cinzel)',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          The Verdict Is In...
        </h2>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--dark-brown)' }}>Counting votes...</p>
        ) : (
          <>
            {/* Winner */}
            {winner && voteCounts && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  padding: '30px',
                  borderRadius: '12px',
                  marginBottom: '30px',
                  textAlign: 'center',
                  border: '3px solid #b91c1c',
                }}
              >
                <p style={{ fontSize: '18px', color: 'white', marginBottom: '10px', fontWeight: 'bold' }}>
                  GUILTY
                </p>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>
                  {getSuspectData(winner)?.icon}
                </div>
                <h3
                  style={{
                    fontSize: '28px',
                    color: 'white',
                    fontFamily: 'var(--font-cinzel)',
                    marginBottom: '10px',
                  }}
                >
                  {winner}
                </h3>
                <p style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>
                  {voteCounts[winner as keyof VoteCounts]} vote{voteCounts[winner as keyof VoteCounts] !== 1 ? 's' : ''}
                </p>
              </div>
            )}

            {/* All Votes */}
            <h3
              style={{
                fontSize: '20px',
                color: 'var(--dark-brown)',
                fontFamily: 'var(--font-cinzel)',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              Vote Breakdown
            </h3>

            {voteCounts && suspects
              .sort((a, b) => (voteCounts[b.name as keyof VoteCounts] || 0) - (voteCounts[a.name as keyof VoteCounts] || 0))
              .map((suspect) => {
                const count = voteCounts[suspect.name as keyof VoteCounts] || 0;
                const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

                return (
                  <div
                    key={suspect.name}
                    style={{
                      marginBottom: '15px',
                      padding: '15px',
                      background: 'white',
                      border: `2px solid ${suspect.color}`,
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '24px' }}>{suspect.icon}</span>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--dark-brown)' }}>
                          {suspect.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--dark-brown)' }}>
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        background: '#e5e7eb',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: '100%',
                          background: suspect.color,
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </div>
                  </div>
                );
              })}

            <p
              style={{
                fontSize: '14px',
                color: '#666',
                marginTop: '30px',
                textAlign: 'center',
                fontStyle: 'italic',
              }}
            >
              Total votes cast: {totalVotes}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
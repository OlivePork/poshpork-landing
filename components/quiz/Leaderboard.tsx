'use client';

import { useEffect, useState } from 'react';

interface LeaderboardProps {
  sessionId: string;
  isVisible: boolean;
  onClose: () => void;
}

interface TableScore {
  id: string;
  table_name: string;
  theme_color: string;
  total_score: number;
}

interface PlayerScore {
  first_name: string;
  individual_score: number;
  table_id: string;
}

export default function Leaderboard({ sessionId, isVisible, onClose }: LeaderboardProps) {
  const [tables, setTables] = useState<TableScore[]>([]);
  const [players, setPlayers] = useState<PlayerScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisible) {
      fetchLeaderboard();
    }
  }, [isVisible, sessionId]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`/api/quiz/get-leaderboard?sessionId=${sessionId}`);
      const data = await response.json();

      if (response.ok) {
        setTables(data.tables || []);
        setPlayers(data.players || []);
      }
    } catch (error) {
      console.error('Leaderboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  const getTableIcon = (tableName: string) => {
    const icons: { [key: string]: string } = {
      'Lady Posh Pork': '🥓',
      'Mr Carbohydrates': '🌾',
      'Mr Vegetable Oils': '🛢️',
      'The Bliss Brothers': '🍬'
    };
    return icons[tableName] || '📊';
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
        <h2
          style={{
            fontSize: '32px',
            color: 'var(--gold)',
            fontFamily: 'var(--font-cinzel)',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          🏆 Leaderboard
        </h2>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--dark-brown)' }}>Loading scores...</p>
        ) : (
          <>
            {/* Table Scores */}
            <div style={{ marginBottom: '40px' }}>
              <h3
                style={{
                  fontSize: '20px',
                  color: 'var(--dark-brown)',
                  fontFamily: 'var(--font-cinzel)',
                  marginBottom: '15px',
                  textAlign: 'center',
                }}
              >
                Team Scores
              </h3>

              {tables.map((table, index) => (
                <div
                  key={table.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    marginBottom: '10px',
                    background: index === 0 ? 'linear-gradient(135deg, #d4af37 0%, #f5e6a3 100%)' : 'white',
                    border: `2px solid ${table.theme_color}`,
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--dark-brown)' }}>
                      #{index + 1}
                    </span>
                    <span style={{ fontSize: '20px' }}>{getTableIcon(table.table_name)}</span>
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: 'var(--dark-brown)',
                      }}
                    >
                      {table.table_name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: 'var(--dark-brown)',
                      fontFamily: 'var(--font-cinzel)',
                    }}
                  >
                    {table.total_score}
                  </span>
                </div>
              ))}
            </div>

            {/* Top Players */}
            <div>
              <h3
                style={{
                  fontSize: '20px',
                  color: 'var(--dark-brown)',
                  fontFamily: 'var(--font-cinzel)',
                  marginBottom: '15px',
                  textAlign: 'center',
                }}
              >
                Top Players
              </h3>

              {players.slice(0, 5).map((player, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    marginBottom: '8px',
                    background: index === 0 ? '#fff3cd' : 'white',
                    border: '2px solid var(--dark-gold)',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--dark-brown)' }}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </span>
                    <span style={{ fontSize: '16px', color: 'var(--dark-brown)' }}>
                      {player.first_name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: 'var(--dark-brown)',
                    }}
                  >
                    {player.individual_score} pts
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '15px',
            marginTop: '30px',
            fontSize: '18px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)',
            color: 'var(--charcoal)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'var(--font-cinzel)',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
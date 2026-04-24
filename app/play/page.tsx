'use client';

import { useState, useEffect } from 'react';
import VideoPlayer from '@/components/quiz/VideoPlayer';
import QuestionOverlay from '@/components/quiz/QuestionOverlay';
import SimpleRegistration from '@/components/quiz/SimpleRegistration';
import Leaderboard from '@/components/quiz/Leaderboard';
import FinalVote from '@/components/quiz/FinalVote';
import VoteResults from '@/components/quiz/VoteResults';

export default function PlayPage() {
  // Session & Table Selection
  const [session, setSession] = useState<any>(null);
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [tables, setTables] = useState<any[]>([]);
  
  // Player Data (single player for simple registration)
  const [player, setPlayer] = useState<any>(null);
  
  // Quiz State
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showFinalVote, setShowFinalVote] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Loading & Error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load session and questions on mount
  useEffect(() => {
    loadSessionData();
  }, []);

  const loadSessionData = async () => {
    try {
      // Get today's session
      const sessionResponse = await fetch('/api/quiz/get-session');
      const sessionData = await sessionResponse.json();

      if (!sessionResponse.ok) {
        throw new Error(sessionData.error || 'No active session found');
      }

      setSession(sessionData.session);
      setTables(sessionData.session.quiz_tables || []);

      // Load questions
      const questionsResponse = await fetch(`/api/quiz/get-questions?sessionId=${sessionData.session.id}`);
      const questionsData = await questionsResponse.json();

      if (questionsResponse.ok) {
        setQuestions(questionsData.questions || []);
      }

    } catch (err: any) {
      console.error('Session load error:', err);
      setError(err.message || 'Failed to load session');
    } finally {
      setLoading(false);
    }
  };

  const handleTableSelect = (table: any) => {
    setSelectedTable(table);
  };

  const handleRegistrationComplete = (playerData: any) => {
    setPlayer(playerData);
    // Refresh table data to update seat counts
    loadSessionData();
  };

  const handleQuestionTriggered = (question: any) => {
    setCurrentQuestion(question);
    setShowQuestion(true);
  };

  const handleQuestionComplete = () => {
    setShowQuestion(false);
    setCurrentQuestion(null);
  };

  const handleAnswerSubmitted = async (isCorrect: boolean, pointsEarned: number, selectedAnswer: string) => {
    const isCollaborative = currentQuestion?.answer_mode !== 'individual';
    
    if (isCollaborative) {
      // COLLABORATIVE MODE: Just this player answered for the table
      console.log(`Player answered: ${isCorrect ? 'Correct' : 'Incorrect'}, Points: ${pointsEarned}`);
      
      // Continue video immediately
      setShowQuestion(false);
      setCurrentQuestion(null);
      
    } else {
      // INDIVIDUAL MODE: This player answers, then waits for others
      console.log(`${player?.first_name}: ${isCorrect ? 'Correct' : 'Incorrect'}, Points: ${pointsEarned}`);
      
      // For now, just continue (multi-player individual questions handled later)
      setShowQuestion(false);
      setCurrentQuestion(null);
    }
  };

  const handleShowLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const handleVoteSubmitted = () => {
    setShowFinalVote(false);
    setShowResults(true);
  };

  // Render loading state
  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--charcoal)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div className="parchment" style={{ padding: '40px', borderRadius: '12px', border: '2px solid var(--gold)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--gold)', fontFamily: 'var(--font-cinzel)', marginBottom: '20px' }}>
            Loading Experience...
          </h2>
          <p style={{ color: 'var(--dark-brown)' }}>Please wait...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--charcoal)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div className="parchment" style={{ padding: '40px', borderRadius: '12px', border: '2px solid #ef4444', textAlign: 'center', maxWidth: '500px' }}>
          <h2 style={{ fontSize: '24px', color: '#ef4444', fontFamily: 'var(--font-cinzel)', marginBottom: '20px' }}>
            ⚠️ Error
          </h2>
          <p style={{ color: 'var(--dark-brown)', marginBottom: '20px' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)',
              color: 'var(--charcoal)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'var(--font-cinzel)'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Render table selection screen
  if (!selectedTable) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--charcoal)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div className="parchment" style={{ padding: '40px', borderRadius: '12px', border: '2px solid var(--gold)', maxWidth: '600px', width: '100%' }}>
          <h2 style={{ fontSize: '32px', color: 'var(--gold)', fontFamily: 'var(--font-cinzel)', marginBottom: '20px', textAlign: 'center' }}>
            Select Your Table
          </h2>
          
          <p style={{ fontSize: '16px', color: 'var(--dark-brown)', marginBottom: '30px', textAlign: 'center' }}>
            Choose which table you're sitting at:
          </p>

          <div style={{ display: 'grid', gap: '15px' }}>
            {tables.map((table) => {
              const isFull = (table.seats_taken || 0) >= (table.max_seats || 4);
              
              return (
                <button
                  key={table.id}
                  onClick={() => !isFull && handleTableSelect(table)}
                  disabled={isFull}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    background: isFull ? '#f5f5f5' : 'white',
                    color: isFull ? '#999' : 'var(--dark-brown)',
                    border: `3px solid ${isFull ? '#ccc' : table.theme_color}`,
                    borderRadius: '8px',
                    cursor: isFull ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    fontFamily: 'var(--font-cinzel)',
                    opacity: isFull ? 0.6 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {table.table_name === 'Lady Posh Pork' && '🥓 '}
                    {table.table_name === 'Mr Carbohydrates' && '🌾 '}
                    {table.table_name === 'Mr Vegetable Oils' && '🛢️ '}
                    {table.table_name === 'The Bliss Brothers' && '🍬 '}
                    {table.table_name}
                  </div>
                  <div style={{ fontSize: '14px', color: isFull ? '#999' : '#666' }}>
                    {isFull ? 'FULL' : `${table.seats_taken || 0}/${table.max_seats || 4}`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Render simple registration screen
  if (!player) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--charcoal)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <SimpleRegistration
          sessionId={session.id}
          tableId={selectedTable.id}
          tableName={selectedTable.table_name}
          seatsTaken={selectedTable.seats_taken || 0}
          maxSeats={selectedTable.max_seats || 4}
          onComplete={handleRegistrationComplete}
        />
      </div>
    );
  }

  // Render main experience
  return (
    <div style={{ minHeight: '100vh', background: 'var(--charcoal)' }}>
      
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #2c1810 0%, #0a0a0a 100%)',
        padding: '20px',
        borderBottom: '2px solid var(--gold)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '24px', color: 'var(--gold)', fontFamily: 'var(--font-cinzel)', margin: 0 }}>
              The Posh Pork Murder Mystery
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--cream)', margin: '5px 0 0 0', opacity: 0.8 }}>
              Table: {selectedTable.table_name} | Player: {player.first_name}
            </p>
          </div>
          
          <button
            onClick={handleShowLeaderboard}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)',
              color: 'var(--charcoal)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'var(--font-cinzel)'
            }}
          >
            🏆 Leaderboard
          </button>
        </div>
      </div>

      {/* Video Player */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {session.video_url ? (
          <VideoPlayer
            videoId={session.video_url.includes('v=') 
              ? session.video_url.split('v=')[1].split('&')[0]
              : session.video_url}
            questions={questions}
            onQuestionTriggered={handleQuestionTriggered}
            onQuestionComplete={handleQuestionComplete}
          />
        ) : (
          <div className="parchment" style={{ padding: '40px', textAlign: 'center', border: '2px solid var(--gold)', borderRadius: '12px' }}>
            <p style={{ fontSize: '18px', color: 'var(--dark-brown)' }}>
              No video configured for this session. Please contact the host.
            </p>
          </div>
        )}
      </div>

      {/* Question Overlay */}
      <QuestionOverlay
        question={currentQuestion}
        playerName={player?.first_name || ''}
        playerId={player?.id || ''}
        sessionId={session.id}
        tableId={selectedTable.id}
        onAnswerSubmitted={handleAnswerSubmitted}
        isVisible={showQuestion}
      />

      {/* Leaderboard */}
      <Leaderboard
        sessionId={session.id}
        isVisible={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />

      {/* Final Vote */}
      <FinalVote
        sessionId={session.id}
        playerId={player?.id || ''}
        playerName={player?.first_name || ''}
        isVisible={showFinalVote}
        onVoteSubmitted={handleVoteSubmitted}
      />

      {/* Vote Results */}
      <VoteResults
        sessionId={session.id}
        isVisible={showResults}
      />

      {/* Dev Controls (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.8)',
          padding: '15px',
          borderRadius: '8px',
          border: '2px solid var(--gold)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 1000
        }}>
          <div style={{ color: 'white', fontSize: '12px', marginBottom: '5px' }}>
            Dev Controls
          </div>
          <button onClick={() => setShowQuestion(true)} style={{ padding: '8px', fontSize: '12px', cursor: 'pointer' }}>
            Test Question
          </button>
          <button onClick={() => setShowLeaderboard(true)} style={{ padding: '8px', fontSize: '12px', cursor: 'pointer' }}>
            Show Leaderboard
          </button>
          <button onClick={() => setShowFinalVote(true)} style={{ padding: '8px', fontSize: '12px', cursor: 'pointer' }}>
            Show Final Vote
          </button>
          <button onClick={() => setShowResults(true)} style={{ padding: '8px', fontSize: '12px', cursor: 'pointer' }}>
            Show Results
          </button>
        </div>
      )}
    </div>
  );
}

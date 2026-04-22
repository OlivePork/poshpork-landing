'use client';

import { useState, useEffect } from 'react';
import VideoPlayer from '@/components/quiz/VideoPlayer';
import QuestionOverlay from '@/components/quiz/QuestionOverlay';
import GroupCheckIn from '@/components/quiz/GroupCheckIn';
import Leaderboard from '@/components/quiz/Leaderboard';
import FinalVote from '@/components/quiz/FinalVote';
import VoteResults from '@/components/quiz/VoteResults';

export default function PlayPage() {
  // Session & Table Selection
  const [session, setSession] = useState<any>(null);
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [tables, setTables] = useState<any[]>([]);
  
  // Player Data (now supports multiple players)
  const [players, setPlayers] = useState<any[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  
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

  const handleGroupCheckInComplete = (registeredPlayers: any[]) => {
    setPlayers(registeredPlayers);
    setCurrentPlayerIndex(0);
  };

  const handleQuestionTriggered = (question: any) => {
    setCurrentQuestion(question);
    setShowQuestion(true);
    setCurrentPlayerIndex(0); // Start with first player
  };

  const handleQuestionComplete = () => {
    setShowQuestion(false);
    setCurrentQuestion(null);
    setCurrentPlayerIndex(0);
  };

  const handleAnswerSubmitted = async (isCorrect: boolean, pointsEarned: number, selectedAnswer: string) => {
    const isCollaborative = currentQuestion?.answer_mode !== 'individual';
    
    if (isCollaborative) {
      // COLLABORATIVE MODE: Award same answer to all players at table
      console.log(`Table answered: ${isCorrect ? 'Correct' : 'Incorrect'}, Points: ${pointsEarned}`);
      
      // Submit answer for remaining players at table (first player already submitted)
      for (let i = 1; i < players.length; i++) {
        try {
          await fetch('/api/quiz/submit-answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId: session.id,
              questionId: currentQuestion.id,
              playerId: players[i].id,
              tableId: selectedTable.id,
              selectedAnswer: selectedAnswer,
            }),
          });
        } catch (error) {
          console.error('Error recording answer for player:', players[i].first_name);
        }
      }
      
      // Continue video immediately
      setShowQuestion(false);
      setCurrentQuestion(null);
      setCurrentPlayerIndex(0);
      
    } else {
      // INDIVIDUAL MODE: Each player answers separately
      console.log(`${players[currentPlayerIndex]?.first_name}: ${isCorrect ? 'Correct' : 'Incorrect'}, Points: ${pointsEarned}`);
      
      // Move to next player
      if (currentPlayerIndex + 1 < players.length) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
        setShowQuestion(false);
        
        // Brief delay before showing question to next player
        setTimeout(() => {
          setShowQuestion(true);
        }, 500);
      } else {
        // All players answered, continue video
        setShowQuestion(false);
        setCurrentQuestion(null);
        setCurrentPlayerIndex(0);
      }
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
            {tables.map((table) => (
              <button
                key={table.id}
                onClick={() => handleTableSelect(table)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  background: 'white',
                  color: 'var(--dark-brown)',
                  border: `3px solid ${table.theme_color}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontFamily: 'var(--font-cinzel)',
                }}
              >
                {table.table_name === 'Lady Posh Pork' && '🥓 '}
                {table.table_name === 'Mr Carbohydrates' && '🌾 '}
                {table.table_name === 'Mr Vegetable Oils' && '🛢️ '}
                {table.table_name === 'The Bliss Brothers' && '🍬 '}
                {table.table_name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render group check-in screen
  if (players.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--charcoal)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <GroupCheckIn
          sessionId={session.id}
          tableId={selectedTable.id}
          tableName={selectedTable.table_name}
          onComplete={handleGroupCheckInComplete}
        />
      </div>
    );
  }

  const currentPlayer = players[currentPlayerIndex];

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
              Table: {selectedTable.table_name} | {players.length} Player{players.length > 1 ? 's' : ''}
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

      {/* Question Overlay - shows for current player */}
      <QuestionOverlay
        question={currentQuestion}
        playerName={currentPlayer?.first_name || ''}
        playerId={currentPlayer?.id || ''}
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

      {/* Final Vote - each player votes individually */}
      <FinalVote
        sessionId={session.id}
        playerId={currentPlayer?.id || ''}
        playerName={currentPlayer?.first_name || ''}
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
          <div style={{ color: 'white', fontSize: '10px', marginTop: '5px' }}>
            Current: {currentPlayer?.first_name} ({currentPlayerIndex + 1}/{players.length})
          </div>
        </div>
      )}
    </div>
  );
}
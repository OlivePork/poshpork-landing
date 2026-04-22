'use client';

import { useState } from 'react';

interface QuestionOverlayProps {
  question: {
    id: string;
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: string;
    explanation?: string;
  } | null;
  playerName: string;
  playerId: string;
  sessionId: string;
  tableId: string;
  onAnswerSubmitted: (isCorrect: boolean, pointsEarned: number) => void;
  isVisible: boolean;
}

export default function QuestionOverlay({ 
  question,
  playerName, 
  playerId,
  sessionId,
  tableId,
  onAnswerSubmitted,
  isVisible 
}: QuestionOverlayProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!isVisible || !question) return null;

  const options = {
    A: question.option_a,
    B: question.option_b,
    C: question.option_c,
    D: question.option_d,
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) return;
    
    setLoading(true);

    try {
      const response = await fetch('/api/quiz/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          questionId: question.id,
          playerId,
          tableId,
          selectedAnswer
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setIsCorrect(data.isCorrect);
      setPointsEarned(data.pointsEarned);
      setSubmitted(true);
      onAnswerSubmitted(data.isCorrect, data.pointsEarned);

    } catch (error) {
      console.error('Answer submission error:', error);
      alert('Error submitting answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    // Resume video
    if ((window as any).resumePoshPorkVideo) {
      (window as any).resumePoshPorkVideo();
    }
    
    // Reset for next question
    setSelectedAnswer('');
    setSubmitted(false);
    setIsCorrect(false);
    setPointsEarned(0);
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
                fontSize: '24px',
                color: 'var(--dark-brown)',
                fontFamily: 'var(--font-cinzel)',
                marginBottom: '30px',
                textAlign: 'center',
                lineHeight: '1.4',
              }}
            >
              {question.question_text}
            </h2>

            <p
              style={{
                fontSize: '16px',
                color: 'var(--dark-brown)',
                marginBottom: '20px',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              {playerName}, select your answer:
            </p>

            {Object.entries(options).map(([letter, text]) => (
              <button
                key={letter}
                onClick={() => setSelectedAnswer(letter)}
                disabled={loading}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '15px',
                  marginBottom: '10px',
                  fontSize: '16px',
                  textAlign: 'left',
                  background: selectedAnswer === letter ? 'var(--gold)' : 'white',
                  color: selectedAnswer === letter ? 'var(--charcoal)' : 'var(--dark-brown)',
                  border: `2px solid ${selectedAnswer === letter ? 'var(--gold)' : 'var(--dark-gold)'}`,
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: selectedAnswer === letter ? 'bold' : 'normal',
                  transition: 'all 0.2s',
                }}
              >
                <strong>{letter})</strong> {text}
              </button>
            ))}

            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer || loading}
              style={{
                width: '100%',
                padding: '15px',
                marginTop: '20px',
                fontSize: '18px',
                fontWeight: 'bold',
                background: selectedAnswer && !loading
                  ? 'linear-gradient(135deg, #a67c00 0%, #d4af37 50%, #a67c00 100%)'
                  : '#ccc',
                color: selectedAnswer && !loading ? 'var(--charcoal)' : '#666',
                border: 'none',
                borderRadius: '8px',
                cursor: selectedAnswer && !loading ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--font-cinzel)',
              }}
            >
              {loading ? 'Submitting...' : 'Submit Answer'}
            </button>
          </>
        ) : (
          <>
            <div
              style={{
                fontSize: '64px',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              {isCorrect ? '✅' : '❌'}
            </div>

            <h2
              style={{
                fontSize: '28px',
                color: isCorrect ? '#22c55e' : '#ef4444',
                textAlign: 'center',
                marginBottom: '20px',
                fontFamily: 'var(--font-cinzel)',
              }}
            >
              {isCorrect ? `Correct! +${pointsEarned} points` : 'Incorrect'}
            </h2>

            {!isCorrect && (
              <p
                style={{
                  fontSize: '16px',
                  color: 'var(--dark-brown)',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                Correct answer: <strong>{question.correct_answer}) {options[question.correct_answer as keyof typeof options]}</strong>
              </p>
            )}

            {question.explanation && (
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--dark-brown)',
                  textAlign: 'center',
                  marginBottom: '30px',
                  fontStyle: 'italic',
                  padding: '15px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  borderRadius: '8px',
                }}
              >
                {question.explanation}
              </p>
            )}

            <button
              onClick={handleContinue}
              style={{
                width: '100%',
                padding: '15px',
                marginTop: '20px',
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
              Continue Video →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
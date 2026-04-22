import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId, questionId, playerId, tableId, selectedAnswer } = req.body;

  try {
    // Get the question to check correct answer
    const { data: question, error: questionError } = await supabase
      .from('quiz_questions')
      .select('correct_answer, points_value')
      .eq('id', questionId)
      .single();

    if (questionError) throw questionError;

    const isCorrect = selectedAnswer === question.correct_answer;
    const pointsEarned = isCorrect ? question.points_value : 0;

    // Insert answer
    const { data: answer, error: answerError } = await supabase
      .from('quiz_answers')
      .insert([{
        session_id: sessionId,
        question_id: questionId,
        player_id: playerId,
        table_id: tableId,
        selected_answer: selectedAnswer,
        is_correct: isCorrect,
        points_earned: pointsEarned
      }])
      .select()
      .single();

    if (answerError) throw answerError;

    // Update player score
    const { data: currentPlayer } = await supabase
      .from('quiz_players')
      .select('individual_score')
      .eq('id', playerId)
      .single();

    await supabase
      .from('quiz_players')
      .update({ individual_score: (currentPlayer.individual_score || 0) + pointsEarned })
      .eq('id', playerId);

    // Update table score
    const { data: currentTable } = await supabase
      .from('quiz_tables')
      .select('total_score')
      .eq('id', tableId)
      .single();

    await supabase
      .from('quiz_tables')
      .update({ total_score: (currentTable.total_score || 0) + pointsEarned })
      .eq('id', tableId);

    return res.status(200).json({ 
      answer, 
      isCorrect, 
      pointsEarned,
      correctAnswer: question.correct_answer 
    });
  } catch (error) {
    console.error('Answer submission error:', error);
    return res.status(500).json({ error: error.message });
  }
}
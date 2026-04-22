'use client';

import { useEffect, useRef, useState } from 'react';

interface Question {
  id: string;
  video_timestamp_seconds: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
}

interface VideoPlayerProps {
  videoId: string; // YouTube video ID (the part after v= in URL)
  questions: Question[];
  onQuestionTriggered: (question: Question) => void;
  onQuestionComplete: () => void;
}

export default function VideoPlayer({ 
  videoId, 
  questions, 
  onQuestionTriggered,
  onQuestionComplete 
}: VideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const intervalRef = useRef<any>(null);
  const hasTriggeredQuestion = useRef<boolean[]>(new Array(questions.length).fill(false));

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if API already loaded
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // YouTube API calls this function when ready
    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const initPlayer = () => {
    if (!document.getElementById('youtube-player')) {
      console.error('YouTube player container not found');
      return;
    }

    playerRef.current = new window.YT.Player('youtube-player', {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        fs: 1, // Allow fullscreen
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  };

  const onPlayerReady = () => {
    console.log('YouTube player ready');
    
    // Start monitoring playback time
    intervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const time = Math.floor(playerRef.current.getCurrentTime());
        setCurrentTime(time);
        checkForQuestion(time);
      }
    }, 500); // Check every 500ms for question triggers
  };

  const checkForQuestion = (time: number) => {
    // Check each question to see if we've hit its timestamp
    questions.forEach((question, index) => {
      // Trigger if:
      // 1. We haven't triggered this question yet
      // 2. Current time is at or past the trigger time
      // 3. Current time is within 2 seconds of trigger (in case of buffering)
      if (
        !hasTriggeredQuestion.current[index] &&
        time >= question.video_timestamp_seconds &&
        time < question.video_timestamp_seconds + 2
      ) {
        console.log(`Triggering question ${index + 1} at ${time}s`);
        hasTriggeredQuestion.current[index] = true;
        pauseForQuestion(question, index);
      }
    });
  };

  const pauseForQuestion = (question: Question, index: number) => {
    console.log('Pausing video for question:', question.id);
    
    // Pause video
    if (playerRef.current && playerRef.current.pauseVideo) {
      playerRef.current.pauseVideo();
    }
    
    setCurrentQuestionIndex(index);
    
    // Trigger question overlay
    onQuestionTriggered(question);
  };

  const resumeVideo = () => {
    console.log('Resuming video');
    
    // Resume playback
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
    }
    
    onQuestionComplete();
  };

  // Expose resume function globally so QuestionOverlay can call it
  useEffect(() => {
    (window as any).resumePoshPorkVideo = resumeVideo;
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      paddingBottom: '56.25%', // 16:9 aspect ratio
      background: '#000'
    }}>
      <div
        id="youtube-player"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      
      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 100
        }}>
          Time: {currentTime}s | Question {currentQuestionIndex + 1}/{questions.length}
        </div>
      )}
    </div>
  );
}

// TypeScript declaration for YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
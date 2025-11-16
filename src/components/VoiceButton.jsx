import React from 'react';
import { Mic, Square } from 'lucide-react';

const VoiceButton = ({ isRecording, onStart, onStop, disabled }) => {
  const handleClick = () => {
    if (isRecording) {
      onStop();
    } else {
      onStart();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`p-4 rounded-full transition-all duration-300 ${
        isRecording
          ? 'bg-red-500 hover:bg-red-600 animate-pulse-slow'
          : 'bg-primary-600 hover:bg-primary-700'
      } text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl`}
      aria-label={isRecording ? 'Stop recording' : 'Start recording'}
    >
      {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
    </button>
  );
};

export default VoiceButton;

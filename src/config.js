// API Configuration
// Change this to your deployed backend URL when ready
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/api/health`,
  chat: `${API_BASE_URL}/api/chat`,
  voiceChat: `${API_BASE_URL}/api/voice-chat`,
  tts: `${API_BASE_URL}/api/tts`,
  audio: (audioId) => `${API_BASE_URL}/api/audio/${audioId}`,
};

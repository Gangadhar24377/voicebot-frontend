import axios from 'axios';
import { API_ENDPOINTS } from '../config';

const api = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Health check
  checkHealth: async () => {
    const response = await api.get(API_ENDPOINTS.health);
    return response.data;
  },

  // Text chat
  sendMessage: async (message, sessionId = null) => {
    const response = await api.post(API_ENDPOINTS.chat, {
      message,
      session_id: sessionId,
    });
    return response.data;
  },

  // Voice chat with audio file
  sendVoiceMessage: async (audioBlob, sessionId = null) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    if (sessionId) {
      formData.append('session_id', sessionId);
    }

    const response = await api.post(API_ENDPOINTS.voiceChat, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Text to speech
  textToSpeech: async (text, voice = 'alloy') => {
    const response = await api.post(
      API_ENDPOINTS.tts,
      { text, voice },
      { responseType: 'blob' }
    );
    return response.data;
  },

  // Get audio by ID
  getAudio: async (audioId) => {
    const response = await api.get(API_ENDPOINTS.audio(audioId), {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default apiService;

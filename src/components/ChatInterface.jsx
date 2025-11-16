import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import VoiceButton from './VoiceButton';
import LoadingSpinner from './LoadingSpinner';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import apiService from '../services/api';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);

  const { isRecording, audioBlob, startRecording, stopRecording, resetRecording } =
    useVoiceRecorder();

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle text message send
  const handleSendText = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');
    setError(null);

    // Add user message to UI
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await apiService.sendMessage(userMessage, sessionId);
      
      // Update session ID
      if (response.session_id) {
        setSessionId(response.session_id);
      }

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        { text: response.response, isUser: false },
      ]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, I encountered an error. Please try again.',
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle voice recording
  const handleStartRecording = async () => {
    setError(null);
    try {
      await startRecording();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  // Process voice message
  useEffect(() => {
    const processVoiceMessage = async () => {
      if (!audioBlob || isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await apiService.sendVoiceMessage(audioBlob, sessionId);

        // Update session ID
        if (response.session_id) {
          setSessionId(response.session_id);
        }

        // Add transcription as user message
        setMessages((prev) => [
          ...prev,
          { text: response.transcription, isUser: true },
        ]);

        // Add assistant response
        setMessages((prev) => [
          ...prev,
          { text: response.response, isUser: false },
        ]);

        // Play audio response if available
        if (response.audio_url) {
          try {
            const audioData = await apiService.getAudio(
              response.audio_url.split('/').pop()
            );
            const audioUrl = URL.createObjectURL(audioData);
            
            if (audioRef.current) {
              audioRef.current.src = audioUrl;
              audioRef.current.play();
            }
          } catch (audioErr) {
            console.error('Error playing audio:', audioErr);
          }
        }
      } catch (err) {
        console.error('Error processing voice message:', err);
        setError('Failed to process voice message. Please try again.');
        setMessages((prev) => [
          ...prev,
          {
            text: 'Sorry, I could not process your voice message. Please try again.',
            isUser: false,
          },
        ]);
      } finally {
        setIsLoading(false);
        resetRecording();
      }
    };

    processVoiceMessage();
  }, [audioBlob]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
                <Volume2 className="w-12 h-12 text-primary-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Start a Conversation
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Ask me anything about my experience, projects, or skills. You can
                type or use voice input.
              </p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isUser={message.isUser}
            />
          ))}
          
          {isLoading && <LoadingSpinner message="Thinking..." />}
          
          {error && (
            <div className="text-center py-2">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSendText} className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading || isRecording}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading || isRecording}
              className="p-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
            
            <VoiceButton
              isRecording={isRecording}
              onStart={handleStartRecording}
              onStop={handleStopRecording}
              disabled={isLoading}
            />
          </form>
          
          {isRecording && (
            <div className="mt-2 text-center">
              <p className="text-sm text-red-600 animate-pulse">Recording...</p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default ChatInterface;

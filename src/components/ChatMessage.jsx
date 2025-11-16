import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-slide-up`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[80%]`}>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? 'bg-primary-100 text-primary-700 ml-2'
              : 'bg-gray-100 text-gray-700 mr-2'
          }`}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-primary-600 text-white'
              : 'bg-white border border-gray-200 text-gray-900'
          } shadow-sm`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

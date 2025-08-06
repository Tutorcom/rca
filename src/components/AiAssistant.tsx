import React, { useState, useRef, useEffect } from 'react';
import type { Project, AiMessage } from '../types';
import { SparklesIcon, CloseIcon, PaperAirplaneIcon, UserCircleIcon, BotIcon } from './icons';
import { generateAiContent } from '../services/geminiService';
import { useAuth } from '../contexts/AuthContext';

interface AiAssistantProps {
  projects: Project[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ projects }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading || !user) return;

    const userMessage: AiMessage = { id: Date.now(), sender: 'user', text: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAiContent(user, projects, input);
      const aiMessage: AiMessage = { id: Date.now() + 1, sender: 'ai', text: aiResponse, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      const errorMessage: AiMessage = { id: Date.now() + 1, sender: 'ai', text: "Sorry, I'm having trouble connecting. Please try again later.", timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  }
  
  if (!user) {
      return null; // Don't show the assistant if not logged in
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-secondary text-white p-4 rounded-full shadow-lg hover:bg-accent transition-transform hover:scale-110 z-50"
        aria-label="Open AI Assistant"
      >
        <SparklesIcon className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-md h-[70vh] bg-white rounded-lg shadow-2xl flex flex-col z-50 animate-fade-in-up">
      <header className="flex items-center justify-between p-4 bg-slate-800 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <SparklesIcon className="w-6 h-6" />
          <h2 className="font-bold text-lg">AI Assistant</h2>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-slate-700" aria-label="Close AI Assistant">
          <CloseIcon className="w-6 h-6" />
        </button>
      </header>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 p-4">
            <BotIcon className="w-12 h-12 mx-auto text-slate-400 mb-2"/>
            <p className="font-semibold">Welcome, {user.name.split(' ')[0]}!</p>
            <p className="text-sm">Ask me anything about your projects.</p>
             <div className="mt-4 space-y-2 text-sm">
                <button onClick={() => handleSuggestionClick("Which project has the highest value?")} className="w-full text-left p-2 bg-slate-100 rounded-lg hover:bg-slate-200">"Which project has the highest value?"</button>
                <button onClick={() => handleSuggestionClick("Summarize the 'in_progress' projects.")} className="w-full text-left p-2 bg-slate-100 rounded-lg hover:bg-slate-200">"Summarize the 'in_progress' projects."</button>
             </div>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0"><BotIcon className="w-5 h-5"/></div>}
            <div className={`max-w-xs md:max-w-sm p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-800'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0"><UserCircleIcon className="w-6 h-6"/></div>}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0"><BotIcon className="w-5 h-5"/></div>
            <div className="max-w-xs md:max-w-sm p-3 rounded-lg bg-slate-100 text-slate-800">
              <div className="flex items-center space-x-1">
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-0"></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-200">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about projects..."
            className="w-full pr-12 py-2 px-4 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white hover:bg-primary-hover disabled:bg-slate-300 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
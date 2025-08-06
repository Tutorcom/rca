import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { ChatMessage, User } from '../types';
import { PaperAirplaneIcon, MailIcon, SparklesIcon } from '../components/icons';
import { generateAiContent } from '../services/geminiService';

interface MessagesPageProps {
  messages: ChatMessage[];
  onSendMessage: (recipientId: number, text: string) => void;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ messages, onSendMessage }) => {
  const { user, users } = useAuth();
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [isAiDrafting, setIsAiDrafting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeConversationId]);
  
  if (!user) return null;

  // For contractors, there's only one conversation partner: the first admin
  const adminId = users.find((u: User) => u.role === 'admin')?.id || 0;
  
  const conversationPartners = user.role === 'admin' 
    ? users.filter((u: User) => u.role === 'contractor')
    : users.filter((u: User) => u.id === adminId);

  // Set default active conversation
  useEffect(() => {
    if (conversationPartners.length > 0 && !activeConversationId) {
      setActiveConversationId(conversationPartners[0].id);
    }
  }, [conversationPartners, activeConversationId]);
  
  const activePartner = users.find((u: User) => u.id === activeConversationId);

  const getConversationId = (userId1: number, userId2: number) => {
    const ids = [userId1, userId2].sort();
    return `${ids[0]}_${ids[1]}`;
  }

  const activeConvIdStr = activeConversationId ? getConversationId(user.id, activeConversationId) : '';
  const activeMessages = messages.filter(m => m.conversationId === activeConvIdStr).sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const handleSendMessage = () => {
    if (messageText.trim() && activeConversationId) {
      onSendMessage(activeConversationId, messageText);
      setMessageText('');
    }
  };

  const handleAiDraft = async () => {
    if (!activePartner) return;
    setIsAiDrafting(true);
    const prompt = `Draft a professional follow-up email to ${activePartner.name} regarding our ongoing work. Keep it brief and friendly.`;
    // We pass an empty projects array as the context is the conversation itself
    const aiDraft = await generateAiContent(user, [], prompt);
    setMessageText(aiDraft);
    setIsAiDrafting(false);
  }

  const ConversationListItem: React.FC<{ partner: User }> = ({ partner }) => {
    const convId = getConversationId(user.id, partner.id);
    const lastMessage = messages.filter(m => m.conversationId === convId).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
    const isActive = activeConversationId === partner.id;
    return (
        <button onClick={() => setActiveConversationId(partner.id)} className={`w-full text-left p-3 flex items-center gap-3 rounded-lg transition-colors ${isActive ? 'bg-primary-light' : 'hover:bg-slate-100'}`}>
            <div className={`w-12 h-12 rounded-full flex-shrink-0 items-center justify-center text-white font-bold text-lg flex ${isActive ? 'bg-primary' : 'bg-slate-300'}`}>
                {partner.avatar}
            </div>
            <div className="flex-1 overflow-hidden">
                <p className={`font-semibold text-sm ${isActive ? 'text-primary' : 'text-slate-800'}`}>{partner.name}</p>
                <p className="text-xs text-slate-500 truncate">{lastMessage?.text || 'No messages yet'}</p>
            </div>
        </button>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800 font-heading">Messages</h1>
            <p className="text-slate-500 mt-1">Communicate directly with clients and team members.</p>
        </div>
        <div className="flex-1 bg-white rounded-lg shadow-sm flex overflow-hidden">
            {/* Conversation List */}
            <div className="w-1/3 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200">
                    <h2 className="font-bold text-slate-700">Conversations</h2>
                </div>
                <div className="flex-1 p-2 space-y-1 overflow-y-auto">
                    {conversationPartners.map((p: User) => <ConversationListItem key={p.id} partner={p} />)}
                </div>
            </div>

            {/* Chat Window */}
            <div className="w-2/3 flex flex-col">
                {activePartner ? (
                    <>
                        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-slate-300 flex-shrink-0 items-center justify-center text-slate-600 font-bold text-lg flex">
                                {activePartner.avatar}
                            </div>
                            <div>
                                <p className="font-bold text-slate-800">{activePartner.name}</p>
                                <p className="text-sm text-slate-500">{activePartner.companyName}</p>
                            </div>
                        </div>
                        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50">
                             {activeMessages.map(msg => (
                                <div key={msg.id} className={`flex gap-3 items-end ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                                    {msg.senderId !== user.id && (
                                        <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold flex-shrink-0">{users.find((u: User)=>u.id===msg.senderId)?.avatar}</div>
                                    )}
                                    <div className={`max-w-md p-3 rounded-lg ${msg.senderId === user.id ? 'bg-primary text-white rounded-br-none' : 'bg-white text-slate-700 shadow-sm rounded-bl-none'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                    {msg.senderId === user.id && (
                                         <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-primary font-bold flex-shrink-0">{user.avatar}</div>
                                    )}
                                </div>
                             ))}
                             <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 border-t border-slate-200 bg-white">
                            <div className="relative">
                                <textarea
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                                    placeholder={`Message ${activePartner.name}...`}
                                    className="w-full pr-24 py-3 px-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    rows={1}
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <button onClick={handleAiDraft} disabled={isAiDrafting} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 disabled:opacity-50">
                                        <SparklesIcon className={`w-5 h-5 ${isAiDrafting ? 'animate-pulse' : ''}`}/>
                                    </button>
                                    <button onClick={handleSendMessage} disabled={!messageText.trim()} className="p-2 rounded-full bg-primary text-white hover:bg-primary-hover disabled:bg-slate-300">
                                        <PaperAirplaneIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-center text-slate-500">
                        <div>
                            <MailIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <p>Select a conversation to start messaging.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default MessagesPage;
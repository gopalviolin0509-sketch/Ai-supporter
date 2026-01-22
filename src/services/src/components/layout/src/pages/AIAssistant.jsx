import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { generateAIResponse } from '../services/openRouterApi';

export default function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  // Mock global state - in a real app, use Context
  const brandContext = { name: "Nexus SaaS", tone: "Professional", audience: "B2B Tech", description: "Cloud infrastructure" };
  const apiKey = import.meta.env.VITE_OPENROUTER_KEY;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await generateAIResponse(input, brandContext, apiKey);
      const aiMsg = { role: 'ai', content: response, id: Date.now() + 1 };
      setMessages(prev => [...prev, aiMsg]);
      
      // Save to local history
      const history = JSON.parse(localStorage.getItem('ai_history') || '[]');
      localStorage.setItem('ai_history', JSON.stringify([{ ...aiMsg, timestamp: new Date() }, ...history]));
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 text-center italic">AI Brand Strategist</h2>
        <p className="text-slate-500 text-center">Connected to ${brandContext.name} profile</p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-border overflow-y-auto p-6 space-y-6 mb-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Bot size={48} className="mb-4 opacity-20" />
            <p>How can I help with your brand today?</p>
          </div>
        )}
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl flex gap-3 ${
              msg.role === 'user' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-800'
            }`}>
              {msg.role === 'ai' && <Bot size={20} className="shrink-0 mt-1" />}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              {msg.role === 'user' && <User size={20} className="shrink-0 mt-1" />}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-4 rounded-2xl flex items-center space-x-2">
              <Loader2 className="animate-spin text-primary" size={20} />
              <span className="text-sm text-slate-500 font-medium">Strategizing...</span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSendMessage} className="relative">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about your brand strategy..."
          className="w-full bg-white border border-border rounded-xl px-6 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
        />
        <button 
          disabled={loading}
          className="absolute right-3 top-3 p-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
          }

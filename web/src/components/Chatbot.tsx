'use client';

import React, { useState, useEffect, useRef } from 'react';

const KB = [
  {
    id: 'services',
    keywords: ['service', 'services', 'what do you do', 'offer', 'design', 'mep', 'fitout'],
    reply: 'We offer three main services. Which one would you like to know more about?',
    options: ['Design Services', 'Authority Approvals', 'Project Management']
  },
  {
    id: 'approvals',
    keywords: ['approval', 'approvals', 'noc', 'dm ', 'dda', 'dcd', 'dewa', 'trakhees'],
    reply: 'We handle submissions to 20+ Dubai authorities. Which authority are you dealing with?',
    options: ['Dubai Municipality', 'DDA', 'DCD (Civil Defence)', 'Trakhees', 'Other']
  },
  {
    id: 'quote',
    keywords: ['quote', 'price', 'pricing', 'cost', 'how much', 'enquiry'],
    reply: 'I can help you get a quote! Please fill out this quick form:',
    isForm: true
  },
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'salam'],
    reply: 'Hello! 👋 I can help with questions about our services, approvals, or how to reach us — what would you like to know?'
  }
];

const FALLBACK = 'I don\'t have an exact answer for that yet — but our team does. Message us on WhatsApp or request a callback.';
const QUICK_REPLIES = ['Our Services', 'Approvals We Handle', 'Get A Quote', 'Contact Info'];

function levenshtein(a: string, b: string) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  let matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  for (let i = 0; i <= b.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

function matchReply(text: string): { reply: string; options?: string[]; isForm?: boolean } {
  const t = text.toLowerCase();
  const words = t.match(/\w+/g) || [];
  for (const entry of KB) {
    for (const k of entry.keywords) {
      if (t.includes(k)) return entry;
      if (!k.includes(' ') && k.length > 3 && words.some(w => levenshtein(w, k) <= 1)) return entry;
    }
  }
  return { reply: FALLBACK, options: ['Contact Info', 'Get A Quote'] };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; who: 'bot' | 'user'; options?: string[]; isForm?: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedState = sessionStorage.getItem('goldland_chat_state');
    if (savedState === 'open') setIsOpen(true);
    
    const savedHistory = JSON.parse(sessionStorage.getItem('goldland_chat_history') || '[]');
    if (savedHistory.length > 0) {
      setMessages(savedHistory);
    } else {
      setTimeout(() => addBotMsg('Hi! I\'m AIRA, your Goldland Assistant. Ask me about our services, approvals, contact info or working hours — I\'ll answer instantly.'), 500);
    }
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    sessionStorage.setItem('goldland_chat_history', JSON.stringify(messages.filter(m => !m.isForm && !m.options)));
  }, [messages]);

  const addBotMsg = (reply: string, options?: string[], isForm?: boolean) => {
    setMessages(prev => [...prev, { text: reply, who: 'bot', options, isForm }]);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { text, who: 'user' }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const entry = matchReply(text);
      addBotMsg(entry.reply, entry.options, entry.isForm);
    }, 600 + Math.random() * 400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBotMsg('✅ Request Sent! We will call you shortly.', ['Our Services', 'Contact Info']);
  };

  return (
    <>
      <button onClick={() => { setIsOpen(!isOpen); sessionStorage.setItem('goldland_chat_state', !isOpen ? 'open' : 'closed'); }} className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-[999] transition-transform hover:scale-110 active:scale-95 animate-bounce shadow-primary/50 border-2 border-white/20">
        <span className="text-3xl filter drop-shadow-md">🤖</span>
        <span className="absolute -top-1 -right-1 text-xl">🎀</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 w-full h-full sm:w-[350px] sm:h-[600px] bg-gray-50 dark:bg-ink sm:shadow-2xl sm:rounded-2xl sm:border border-border-light dark:border-border-dark flex flex-col overflow-hidden z-[100] animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-brass text-ink p-4 pt-6 sm:pt-4 flex justify-between items-center shadow-sm shrink-0">
            <h3 className="font-bold flex items-center gap-2">
              <span className="text-xl">🤖🎀</span> AIRA
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-xl leading-none">&times;</button>
          </div>
          
          <div ref={bodyRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-ink flex flex-col gap-4 text-sm pb-8">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[90%] p-3.5 rounded-2xl ${m.who === 'bot' ? 'bg-white dark:bg-ink-soft border border-border-light dark:border-border-dark self-start text-ink dark:text-gray-200 rounded-tl-sm shadow-sm' : 'bg-brass text-ink self-end rounded-tr-sm shadow-sm font-medium'}`}>
                {m.text}
                
                {m.options && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {m.options.map(opt => (
                      <button key={opt} onClick={() => handleSend(opt)} className="px-4 py-2 bg-white dark:bg-ink border border-border-light dark:border-border-dark rounded-full text-xs font-medium text-ink dark:text-white hover:bg-brass hover:text-ink hover:border-brass transition-all shadow-sm">
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {m.isForm && (
                  <form onSubmit={handleFormSubmit} className="mt-4 flex flex-col gap-3 p-4 bg-gray-50 dark:bg-ink border border-border-light dark:border-border-dark rounded-xl">
                    <input required type="text" placeholder="Your Name" className="p-3 border border-border-light dark:border-border-dark bg-white dark:bg-ink-soft dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-brass outline-none" />
                    <input required type="tel" placeholder="Phone Number" className="p-3 border border-border-light dark:border-border-dark bg-white dark:bg-ink-soft dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-brass outline-none" />
                    <button type="submit" className="bg-brass text-ink py-3 rounded-lg font-bold text-sm shadow-md mt-1">Request Callback</button>
                  </form>
                )}
              </div>
            ))}
            {isTyping && <div className="bg-white dark:bg-ink-soft border border-border-light dark:border-border-dark self-start p-3.5 rounded-2xl rounded-tl-sm text-gray-500 shadow-sm">Typing...</div>}
          </div>

          <div className="p-3 bg-white dark:bg-ink-soft border-t border-border-light dark:border-border-dark flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
             {QUICK_REPLIES.map(q => (
               <button key={q} onClick={() => handleSend(q)} className="px-4 py-1.5 bg-gray-50 dark:bg-ink border border-border-light dark:border-border-dark rounded-full text-xs font-medium text-ink dark:text-gray-300 shrink-0">{q}</button>
             ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="p-3 bg-white dark:bg-ink-soft border-t border-border-light dark:border-border-dark flex gap-3 shrink-0 pb-6 sm:pb-3">
            <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message..." className="flex-1 p-3 border border-border-light dark:border-border-dark bg-gray-50 dark:bg-ink dark:text-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-brass transition-all" />
            <button type="submit" className="bg-brass text-ink px-4 py-2 rounded-xl flex items-center justify-center shadow-md">➤</button>
          </form>
        </div>
      )}
    </>
  );
}

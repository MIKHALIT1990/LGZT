import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Headset } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Здравствуйте! Я помощник LGZT RUSSIA. Чем я могу вам помочь?',
      sender: 'support',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('message', (msg: Message) => {
      if (msg.sender === 'support') {
        setIsTyping(false);
      }
      setMessages((prev) => {
        // Avoid duplicate messages if broadcasted to sender too
        if (prev.find(m => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !socket) return;

    socket.emit('message', { text: message });
    setIsTyping(true);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-stone-900 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400 p-2 rounded-xl text-stone-900">
                  <Headset size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm">Поддержка LGZT</div>
                  <div className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Онлайн
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === 'user' ? 'bg-stone-200 text-stone-600' : 'bg-yellow-400 text-stone-900'
                    }`}>
                      {msg.sender === 'user' ? <User size={16} /> : <Headset size={16} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm shadow-sm whitespace-pre-wrap ${
                      msg.sender === 'user' 
                        ? 'bg-stone-900 text-white rounded-tr-none' 
                        : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
                    }`}>
                      {msg.text}
                      <div className={`text-[9px] mt-1 opacity-40 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 flex-row">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-yellow-400 text-stone-900">
                      <Headset size={16} />
                    </div>
                    <div className="bg-white text-stone-800 border border-stone-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                        className="w-1.5 h-1.5 bg-stone-400 rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        className="w-1.5 h-1.5 bg-stone-400 rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        className="w-1.5 h-1.5 bg-stone-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-stone-100 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="flex-1 bg-stone-100 border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-yellow-400 transition-all"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="bg-yellow-400 text-stone-900 p-2 rounded-xl hover:bg-stone-900 hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-yellow-400 disabled:hover:text-stone-900"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-stone-900 text-white' : 'bg-yellow-400 text-stone-900'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full" />
        )}
      </motion.button>
    </div>
  );
}

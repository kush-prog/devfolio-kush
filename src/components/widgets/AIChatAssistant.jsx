import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const MAX_MESSAGES_PER_SESSION = 15;

const suggestedQuestions = [
  "What are Kush's skills?",
  "Tell me about his projects",
  "What's his experience?",
  "Is he open to opportunities?",
];

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hey! 👋 I'm Kush's AI assistant. Ask me about his skills, projects, experience, or how to reach him!", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('chatMessageCount');
    if (stored) setMessageCount(parseInt(stored, 10));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    if (messageCount >= MAX_MESSAGES_PER_SESSION) {
      const limitMsg = {
        id: Date.now(),
        type: 'bot',
        text: "You've reached the message limit for this session 🙏 For more, please reach out directly via the Contact section!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, limitMsg]);
      return;
    }

    const userMsg = { id: Date.now(), type: 'user', text: text.trim(), timestamp: new Date() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    const newCount = messageCount + 1;
    setMessageCount(newCount);
    sessionStorage.setItem('chatMessageCount', newCount.toString());

    try {
      const history = newMessages
        .filter((m) => m.id !== userMsg.id)
        .map((m) => ({ type: m.type, text: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
      });

      const data = await res.json();

      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: res.ok ? data.reply : "Sorry, something went wrong. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, type: 'bot', text: "Sorry, I couldn't connect. Please try again.", timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 z-[9995] w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all ${
          isOpen ? 'bg-red-500/80 hover:bg-red-500' : 'bg-gradient-to-br from-nebula-purple to-nebula-blue chat-btn-pulse'
        }`}
      >
        {isOpen ? <FaTimes className="text-white" size={18} /> : <FaRobot className="text-white" size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-6 z-[9995] w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-140px)] glass-strong rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-nebula-purple/10"
          >
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-nebula-purple/10 to-nebula-blue/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nebula-purple to-nebula-blue flex items-center justify-center">
                  <FaRobot className="text-white" size={14} />
                </div>
                <div>
                  <h4 className="font-orbitron text-sm font-bold text-star-white">Kush's AI Assistant</h4>
                  <p className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-nebula-purple to-nebula-blue text-white rounded-br-md'
                      : 'bg-white/5 text-star-silver rounded-bl-md'
                  }`}>
                    <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                      __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-star-white">$1</strong>')
                    }} />
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-star-silver/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-star-silver/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-star-silver/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-[11px] px-2.5 py-1 rounded-full glass text-star-silver/70 hover:text-star-white hover:border-nebula-purple/30 transition-all border border-white/5"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Kush's skills, projects..."
                  className="flex-1 bg-white/5 text-star-white text-sm rounded-xl px-4 py-2.5 border border-white/5 focus:border-nebula-purple/30 focus:outline-none placeholder-star-silver/30 transition-colors"
                />
                <motion.button
                  onClick={() => handleSend()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-nebula-purple to-nebula-blue flex items-center justify-center text-white disabled:opacity-30 transition-opacity"
                >
                  <FaPaperPlane size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
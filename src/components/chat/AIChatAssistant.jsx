import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';

const predefinedQA = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    answer: "Hey there! 👋 I'm Kush's AI assistant. I can tell you about his skills, projects, experience, and more. What would you like to know?"
  },
  {
    keywords: ['skill', 'tech', 'stack', 'technologies', 'what can', 'good at'],
    answer: "Kush is a **Full Stack Developer & AI Engineer** with a strong tech stack:\n\n🎨 **Frontend**: React.js, Next.js, TypeScript, Tailwind CSS, SSR\n🚀 **Backend**: Java, Spring Boot, Spring Cloud, Python, FastAPI, RESTful APIs, Microservices\n🤖 **Generative AI**: Google Gemini API, Spring AI, LangChain, Prompt Engineering, RAG\n🧠 **ML/Data**: Scikit-learn, Pandas, NumPy, Feature Engineering\n🗃️ **Databases**: PostgreSQL, MySQL, MongoDB, Redis, AWS S3\n⚙️ **DevOps**: Docker, Kubernetes, Google Cloud, Apache Kafka, RabbitMQ, Git\n\nHe builds intelligent, scalable, production-ready systems!"
  },
  {
    keywords: ['project', 'built', 'work', 'portfolio', 'made'],
    answer: "Here are Kush's standout projects:\n\n1. 🏋️ **AI-Powered Fitness Tracker** — Microservices + Spring Cloud + Gemini API for personalized fitness coaching\n2. 🍳 **Gemini Chat & Recipe Assistant** — Spring AI + LLM-powered chatbot with intelligent recipe generation\n3. 📊 **ML-Based COVID-19 Analysis** — Predictive modeling with 91% accuracy using Scikit-learn & Pandas\n4. 📋 **KYC Automation Pipeline** — FastAPI + AWS S3 pipeline that reduced onboarding time by 60%\n\nCheck out the Projects section to explore each one!"
  },
  {
    keywords: ['experience', 'intern', 'job', 'company', 'work experience', 'career'],
    answer: "Kush has **real industry experience** across two roles:\n\n🔵 **SYMB Consultancy Services** — Software Engineer Trainee (March 2026–Present)\n✅ Building responsive React.js & Next.js frontends for AI-driven services\n✅ Implementing SSR & optimized data-fetching for sub-second latency\n\n🟢 **Naval Innovators (Your Exam Sathi)** — Backend Developer Intern (Dec 2024–Sep 2025)\n✅ Engineered KYC pipeline with FastAPI & AWS S3 — **60% faster onboarding**\n✅ Developed role-based dashboards — **40% faster content processing**\n✅ Optimized SQL queries — **35% reliability improvement**\n\nHe's actively building at the intersection of Full Stack & AI!"
  },
  {
    keywords: ['education', 'college', 'degree', 'study', 'university'],
    answer: "🎓 Kush is completing his **B.Tech in Computer Science & Engineering** from ABES Engineering College, Ghaziabad (Dec 2022–June 2026) with a **7.8 GPA**.\n\n🏆 Highlights:\n• **12+ Google Cloud Skill Badges** — Generative AI, Vertex AI, LLMs, Cloud Functions\n• **Gold League (10K+ pts)** — Google Cloud Arcade Gen AI Labs\n• **HackerRank** — 5★ Java & C, 4★ Python, 150+ problems solved\n\n📜 Certifications: Python for Data Science (IBM), Cloud Computing (Google), Docker (KodeKloud), Data Analytics (Cisco), TCS iON Career Edge"
  },
  {
    keywords: ['contact', 'reach', 'hire', 'email', 'connect', 'phone'],
    answer: "You can reach Kush through:\n\n🔗 **GitHub**: github.com/kush-prog\n💼 **LinkedIn**: linkedin.com/in/kush-chauhan-8bb435239\n📧 **Email**: chauhankush12345@gmail.com\n🌐 **Portfolio**: kush-chauhan.dev\n\nHe's currently open to **Full Stack, Backend, and AI/ML Engineer** roles — feel free to reach out!"
  },
  {
    keywords: ['ai', 'llm', 'gemini', 'machine learning', 'genai', 'artificial intelligence', 'ml'],
    answer: "Kush is deeply invested in the **Generative AI & ML space**:\n\n🤖 **LLM Integration**: Google Gemini API, Spring AI, LangChain\n📐 **Architecture**: RAG Systems, Prompt Engineering, AI Agents\n🧠 **ML/Data Science**: Scikit-learn, Pandas, NumPy, Feature Engineering\n🏗️ **Production AI**: Microservices with RabbitMQ for async AI pipelines\n\nHis AI Fitness Tracker and Gemini Chat Assistant are prime examples of putting **LLMs into production**!"
  },
  {
    keywords: ['backend', 'api', 'microservice', 'server', 'database', 'spring'],
    answer: "Backend & API architecture is one of Kush's strongest suits:\n\n🏗️ Expert in **Microservice Architecture** with Spring Cloud (Eureka, Gateway, Config)\n⚡ **Spring Boot** & **FastAPI** for high-performance REST APIs\n🗃️ Database mastery: **PostgreSQL**, **MySQL**, **MongoDB**, **Redis**\n📨 **Event-Driven**: Apache Kafka, RabbitMQ for async communication\n🔐 Role-based access control & KYC pipeline automation\n📦 **Docker** & **Kubernetes** for containerized deployments\n\nHe builds systems that are scalable, secure, and production-ready!"
  },
  {
    keywords: ['frontend', 'react', 'next', 'ui', 'design', 'website'],
    answer: "Kush has strong **frontend development** skills:\n\n⚛️ **React.js** & **Next.js** for modern, responsive web applications\n📝 **TypeScript** & **JavaScript (ES6+)** for type-safe, clean code\n🎨 **Tailwind CSS** for rapid, utility-first styling\n⚡ **SSR/SSG** for optimized performance and SEO\n🔄 Modern state management & data-fetching patterns\n\nHe's currently building production frontends at SYMB Consultancy!"
  },
  {
    keywords: ['hire', 'opportunity', 'role', 'position', 'looking', 'open'],
    answer: "🚀 Kush is actively looking for **Full Stack Developer**, **Backend Engineer**, and **AI/ML Engineer** opportunities!\n\n💪 What he brings:\n• Production experience in **React, Next.js, Spring Boot, FastAPI**\n• Deep expertise in **Generative AI & LLM integration**\n• Strong **microservices architecture** & cloud-native skills\n• 12+ Google Cloud badges & industry certifications\n\n📧 Reach him at: **chauhankush12345@gmail.com**\n💼 LinkedIn: **linkedin.com/in/kush-chauhan-8bb435239**"
  },
];

function findAnswer(input) {
  const lowerInput = input.toLowerCase();
  
  for (const qa of predefinedQA) {
    if (qa.keywords.some(keyword => lowerInput.includes(keyword))) {
      return qa.answer;
    }
  }
  
  return "Great question! I know a lot about Kush's technical skills, projects, experience, and education. Try asking about his **tech stack**, **projects**, **AI experience**, **frontend skills**, or **how to hire him**! 🚀";
}

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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(text);
      const botMsg = { id: Date.now() + 1, type: 'bot', text: answer, timestamp: new Date() };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 z-[9995] w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all ${
          isOpen 
            ? 'bg-red-500/80 hover:bg-red-500'
            : 'bg-gradient-to-br from-nebula-purple to-nebula-blue chat-btn-pulse'
        }`}
      >
        {isOpen ? <FaTimes className="text-white" size={18} /> : <FaRobot className="text-white" size={20} />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-6 z-[9995] w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-140px)] glass-strong rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-nebula-purple/10"
          >
            {/* Header */}
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

            {/* Messages */}
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

            {/* Suggested Questions */}
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

            {/* Input */}
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
                  disabled={!input.trim()}
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

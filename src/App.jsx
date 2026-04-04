import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Starfield from './components/three/Starfield';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import AIChatAssistant from './components/chat/AIChatAssistant';

/* Cursor particle trail effect */
function CursorTrail() {
  const [particles, setParticles] = useState([]);

  const handleMouseMove = useCallback((e) => {
    const newParticle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    setParticles((prev) => [...prev.slice(-12), newParticle]);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={p.id}
          className="cursor-dot"
          style={{
            left: p.x - 3,
            top: p.y - 3,
            opacity: (i + 1) / particles.length * 0.6,
            transform: `scale(${(i + 1) / particles.length})`,
          }}
        />
      ))}
    </>
  );
}

/* Loading Screen */
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="loading-screen"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-16 h-16 border-2 border-nebula-purple/20 border-t-nebula-purple rounded-full mx-auto mb-6"
        />
        <h2 className="font-orbitron text-xl font-bold text-star-white mb-2">
          Initializing <span className="text-gradient">Universe</span>
        </h2>
        <p className="text-sm text-star-silver/50 font-mono mb-6">Loading stellar systems...</p>
        
        {/* Progress Bar */}
        <div className="w-48 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-nebula-purple to-nebula-blue rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-xs text-star-silver/30 font-mono mt-2">{Math.min(Math.floor(progress), 100)}%</p>
      </div>
    </motion.div>
  );
}

/* Section divider with orbital decoration */
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center gap-3">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-nebula-purple/30" />
        <div className="w-2 h-2 rounded-full bg-nebula-purple/30 animate-pulse" />
        <div className="w-1.5 h-1.5 rounded-full bg-nebula-blue/30 animate-pulse" style={{ animationDelay: '500ms' }} />
        <div className="w-1 h-1 rounded-full bg-nebula-cyan/30 animate-pulse" style={{ animationDelay: '1000ms' }} />
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-nebula-cyan/30" />
      </div>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen bg-space-black">
          {/* Background Effects */}
          <Starfield />
          <div className="nebula-bg" />
          
          {/* Cursor Trail (desktop only) */}
          {!isMobile && <CursorTrail />}
          
          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main className="relative z-10">
            <Hero />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Education />
            <SectionDivider />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* AI Chat */}
          <AIChatAssistant />
        </div>
      )}
    </>
  );
}

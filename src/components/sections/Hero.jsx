import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';
import Astronaut from '../three/Astronaut';
import { FaChevronDown } from 'react-icons/fa';

function TypeWriter({ texts, speed = 80, deleteSpeed = 40, pauseTime = 2000 }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        if (displayText.length === currentText.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timer);
  }, [displayText, textIndex, isDeleting, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className="inline-flex items-center">
      <span>{displayText}</span>
      <span className="ml-1 w-[3px] h-8 md:h-10 bg-nebula-purple animate-blink-caret inline-block" />
    </span>
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="section-container w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-screen pt-20 pb-10">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-nebula-purple/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-star-silver font-mono">Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-orbitron font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 leading-tight"
            >
              <span className="text-star-white">HI, I'M</span>
              <br />
              <span className="text-gradient glow-text">KUSH</span>
            </motion.h1>

            {/* Typewriter Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl sm:text-2xl md:text-3xl font-light text-star-silver mb-8 h-10"
            >
              <TypeWriter texts={resumeData.taglines} speed={80} />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-base md:text-lg text-star-silver/70 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Software Engineer specializing in Java & Spring Boot — building production REST APIs, microservices, and LLM-powered features with RAG pipelines and Google Gemini API. Also experienced in Salesforce development with Apex and SOQL.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={scrollToAbout}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-3.5 bg-gradient-to-r from-nebula-purple to-nebula-blue rounded-xl font-semibold text-white shadow-lg shadow-nebula-purple/25 transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  🚀 Explore My Universe
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              <motion.a
                href={resumeData.links.resume}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-xl font-semibold text-star-white glass border border-nebula-purple/30 hover:border-nebula-purple/60 transition-all text-center"
              >
                📄 Download Resume
              </motion.a>
            </motion.div>

            {/* Stats Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { value: '20+', label: 'Technologies' },
                { value: '7+', label: 'Projects' },
                { value: '12+', label: 'Cloud Badges' },
                { value: '16000+', label: 'Salesforce Trailhead Points' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-orbitron font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-star-silver/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Astronaut */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2 h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative"
          >
            <Astronaut />
            
            {/* Glow effect behind astronaut */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-nebula-purple/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-star-silver/50 hover:text-nebula-purple transition-colors"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <FaChevronDown size={16} />
        </motion.button>
      </motion.div>
    </section>
  );
}

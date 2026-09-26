import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { resumeData } from '../../data/resume';
import { FaMapMarkerAlt, FaCalendarAlt, FaRocket, FaCheckCircle } from 'react-icons/fa';

function TimelineItem({ item, index, isInView }) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-center mb-16 md:mb-24 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className={`w-full md:w-[calc(50%-40px)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}
      >
        <div className="glass glass-hover rounded-2xl p-6 relative group">
          {/* Mission Code */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-nebula-purple/10 text-nebula-purple">
              {item.missionCode}
            </span>
            <div className="flex items-center gap-2 text-xs text-star-silver/50">
              <FaCalendarAlt size={10} />
              {item.period}
            </div>
          </div>

          {/* Role & Company */}
          <h3 className="font-orbitron font-bold text-lg text-star-white mb-1">
            {item.role}
          </h3>
          <div className="flex items-center gap-2 text-sm text-nebula-purple mb-1">
            <FaRocket size={12} />
            {item.company}
          </div>
          <div className="flex items-center gap-1 text-xs text-star-silver/40 mb-4">
            <FaMapMarkerAlt size={10} />
            {item.location}
          </div>

          {/* Description */}
          <p className="text-sm text-star-silver/70 leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Impacts */}
          <div className="space-y-2 mb-4">
            {item.impacts.map((impact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-2 text-sm"
              >
                <FaCheckCircle className="text-green-400 shrink-0 mt-0.5" size={12} />
                <span className="text-star-silver/70">{impact}</span>
              </motion.div>
            ))}
          </div>

          {/* Tech Used */}
          <div className="flex flex-wrap gap-1.5">
            {item.tech.map((tech) => (
              <span key={tech} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-star-silver/60 font-mono">
                {tech}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div className={`hidden md:block absolute top-8 ${isLeft ? '-right-3' : '-left-3'} w-4 h-4 rotate-45 glass border-t-0 border-l-0`}
            style={ isLeft ? { borderRight: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' } : { borderLeft: '1px solid rgba(255,255,255,0.08)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
          />
        </div>
      </motion.div>

      {/* Timeline Center Node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
        className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-nebula-purple to-nebula-blue items-center justify-center z-10 shadow-lg shadow-nebula-purple/30"
      >
        <FaRocket className="text-white" size={14} />
      </motion.div>

      {/* Mobile timeline node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
        className="md:hidden absolute left-[20px] transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-nebula-purple to-nebula-blue flex items-center justify-center z-10 shadow-lg shadow-nebula-purple/30"
      >
        <FaRocket className="text-white" size={10} />
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mt-3 text-star-white">
            Mission <span className="text-gradient-warm">Archives</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-nebula-pink to-nebula-purple rounded-full mx-auto mt-4" />
          <p className="text-star-silver/60 mt-4 max-w-lg mx-auto">
            Every mission builds upon the last. Here's the flight log.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="timeline-line" />

          {/* Timeline Items */}
          <div className="relative pl-12 md:pl-0">
            {resumeData.experience.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} isInView={isInView} />
            ))}
          </div>

          {/* Timeline Start Marker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="hidden md:flex justify-center"
          >
            <div className="px-4 py-2 glass rounded-full text-xs font-mono text-star-silver/50 border border-nebula-purple/20">
              🚀 More missions loading...
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { resumeData } from '../../data/resume';
import { FaGraduationCap, FaTrophy, FaGoogle, FaStar, FaCertificate } from 'react-icons/fa';
import { SiHackerrank } from 'react-icons/si';

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { education, certifications } = resumeData;

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-star-gold font-mono text-sm tracking-widest uppercase">// Education & Achievements</span>
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mt-3 text-star-white">
            Training <span className="text-gradient">Academy</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-star-gold to-nebula-purple rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass glass-hover rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-star-gold/10 flex items-center justify-center">
                <FaGraduationCap className="text-star-gold" size={24} />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-lg text-star-white">Education</h3>
                <p className="text-xs text-star-silver/50">Academic Foundation</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <h4 className="font-semibold text-star-white mb-1">{education.degree}</h4>
                <p className="text-sm text-nebula-purple font-medium">{education.field}</p>
                <p className="text-sm text-star-silver/60 mt-1">{education.university}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-star-silver/40 font-mono">{education.period}</span>
                  <span className="text-sm font-semibold text-star-gold font-orbitron">GPA: {education.gpa}</span>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-star-white flex items-center gap-2">
                  <FaTrophy className="text-star-gold" size={14} />
                  Key Achievements
                </h4>
                {education.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-2 text-sm pl-2"
                  >
                    <FaStar className="text-star-gold/60 shrink-0 mt-1" size={8} />
                    <span className="text-star-silver/70">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass glass-hover rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-nebula-cyan/10 flex items-center justify-center">
                <FaCertificate className="text-nebula-cyan" size={24} />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-lg text-star-white">Certifications</h3>
                <p className="text-xs text-star-silver/50">Verified Credentials</p>
              </div>
            </div>

            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-nebula-cyan/20 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" 
                    style={{ backgroundColor: i < 3 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(6, 182, 212, 0.1)' }}>
                    {cert.includes('Google') ? (
                      <FaGoogle size={14} className="text-nebula-blue" />
                    ) : cert.includes('HackerRank') ? (
                      <SiHackerrank size={14} className="text-green-400" />
                    ) : (
                      <FaCertificate size={14} className="text-nebula-cyan" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-star-silver group-hover:text-star-white transition-colors">{cert}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-400/60" title="Verified" />
                </motion.div>
              ))}
            </div>

            {/* Google Cloud Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-6 p-4 rounded-xl bg-gradient-to-br from-nebula-blue/5 to-nebula-cyan/5 border border-nebula-blue/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <FaGoogle className="text-nebula-blue" size={16} />
                <span className="text-sm font-semibold text-star-white">Google Cloud Badges</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-orbitron font-bold text-gradient">15+</div>
                <span className="text-xs text-star-silver/50">Skill badges earned across Cloud, ML, and Infrastructure tracks</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

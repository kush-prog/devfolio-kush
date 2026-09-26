
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../../data/skills';

function SkillBar({ name, level, color, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-star-silver group-hover:text-star-white transition-colors font-medium">
          {name}
        </span>
        <span className="text-xs font-mono text-star-silver/50">
          {level}%
        </span>
      </div>

      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: delay + 0.2,
            ease: 'easeOut'
          }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 12px ${color}40`
          }}
        >
          <div
            className="absolute right-0 top-0 w-2 h-full rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 8px ${color}`
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function getTier(level) {
  if (level >= 88) return { label: 'Expert', dots: 5 };
  if (level >= 78) return { label: 'Proficient', dots: 4 };
  return { label: 'Familiar', dots: 3 };
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });

  const [activeCategory, setActiveCategory] = useState('backend');

  return (
    <section
      id="skills"
      className="section-padding relative"
      ref={ref}
    >
      <div className="section-container">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mt-3 text-star-white">
            Tech <span className="text-gradient">Arsenal</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-nebula-cyan to-nebula-blue rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'text-white shadow-lg'
                  : 'glass text-star-silver hover:text-star-white'
              }`}
              style={
                activeCategory === cat.id
                  ? {
                      backgroundColor: cat.color,
                      boxShadow: `0 0 20px ${cat.color}40`
                    }
                  : {}
              }
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Display */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories
            .filter((cat) => cat.id === activeCategory)
            .map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full"
              >
                <div className="grid md:grid-cols-2 gap-8">

                  {/* Proficiency Bars */}
                  <div className="glass p-6 rounded-2xl space-y-5">
                    <h3
                      className="font-orbitron text-sm font-semibold mb-4 flex items-center gap-2"
                      style={{ color: cat.color }}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      Proficiency Levels
                    </h3>

                    {cat.skills.map((skill, i) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={cat.color}
                        delay={i * 0.05}
                      />
                    ))}
                  </div>

                  {/* Skill Tier Grid */}
                  <div className="glass p-6 rounded-2xl">
                    <h3
                      className="font-orbitron text-sm font-semibold mb-6 flex items-center gap-2"
                      style={{ color: cat.color }}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      Skill Strength
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {cat.skills.map((skill, i) => {
                        const tier = getTier(skill.level);

                        return (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={
                              isInView
                                ? { opacity: 1, y: 0 }
                                : {}
                            }
                            transition={{ delay: i * 0.05 }}
                            className="glass-hover p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                          >
                            {/* Skill Name */}
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-star-white truncate">
                                {skill.name}
                              </span>
                            </div>

                            {/* Tier and Rating Dots */}
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: `${cat.color}20`,
                                  color: cat.color
                                }}
                              >
                                {tier.label}
                              </span>

                              <div className="flex gap-0.5 shrink-0">
                                {[...Array(5)].map((_, d) => (
                                  <span
                                    key={d}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                      background:
                                        d < tier.dots
                                          ? cat.color
                                          : 'rgba(255,255,255,0.1)'
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
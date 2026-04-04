import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

function ProjectCard({ project, index, onClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onClick(project)}
      className="project-card glass rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Gradient Top Bar */}
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}80, ${project.color})` }} />
      
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-mono px-3 py-1 rounded-full"
            style={{ backgroundColor: `${project.color}15`, color: project.color }}
          >
            {project.category}
          </span>
          {project.featured && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-star-gold/10 text-star-gold font-medium">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-orbitron font-bold text-lg text-star-white mb-1 group-hover:text-gradient transition-all">
          {project.title}
        </h3>
        <p className="text-xs text-star-silver/60 font-mono mb-3">{project.subtitle}</p>

        {/* Description */}
        <p className="text-sm text-star-silver/70 leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {project.metrics.map((metric, i) => (
            <div key={i} className="text-center p-2 rounded-lg bg-white/[0.03]">
              <div className="text-sm font-bold font-orbitron" style={{ color: project.color }}>
                {metric.value}
              </div>
              <div className="text-[10px] text-star-silver/50 mt-0.5">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 5).map((tech) => (
            <span key={tech} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-star-silver/70 font-mono">
              {tech}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-star-silver/50 font-mono">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-star-silver/40 group-hover:text-nebula-purple transition-colors">
            Click to explore →
          </span>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-star-silver/40 hover:text-star-white transition-colors"
          >
            <FaGithub size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto rounded-2xl"
      >
        {/* Header */}
        <div className="h-2 w-full rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${project.color}80, ${project.color})` }} />
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ backgroundColor: `${project.color}15`, color: project.color }}>
                {project.category}
              </span>
              <h3 className="font-orbitron font-bold text-2xl text-star-white mt-3">{project.title}</h3>
              <p className="text-sm text-star-silver/60 font-mono mt-1">{project.subtitle}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-star-silver">
              <FaTimes size={18} />
            </button>
          </div>

          {/* Full Description */}
          <p className="text-star-silver/80 leading-relaxed mb-6">{project.longDescription}</p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-center p-3 rounded-xl glass">
                <div className="text-xl font-bold font-orbitron" style={{ color: project.color }}>{metric.value}</div>
                <div className="text-xs text-star-silver/50 mt-1">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Full Tech Stack */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-star-white mb-3 font-orbitron">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="text-sm px-3 py-1.5 rounded-lg glass text-star-silver font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-nebula-purple to-nebula-blue text-white font-medium text-sm hover:shadow-lg hover:shadow-nebula-purple/25 transition-shadow"
            >
              <FaGithub /> View on GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-nebula-blue font-mono text-sm tracking-widest uppercase">// Projects</span>
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mt-3 text-star-white">
            Mission <span className="text-gradient">Logs</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-nebula-blue to-nebula-purple rounded-full mx-auto mt-4" />
          <p className="text-star-silver/60 mt-4 max-w-lg mx-auto">
            Each project is a mission — engineered with precision, shipped with impact.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onClick={setSelectedProject} />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

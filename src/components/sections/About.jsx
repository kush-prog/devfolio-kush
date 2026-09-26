import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../../data/resume";
import {
  FaCode,
  FaBrain,
  FaServer,
  FaRocket,
  FaSalesforce,
} from "react-icons/fa";

function AnimatedCounter({ value, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numValue = parseInt(value);

  useEffect(() => {
    if (!isInView || isNaN(numValue)) return;
    let start = 0;
    const step = numValue / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= numValue) {
        setCount(numValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, numValue, duration]);

  return (
    <span ref={ref}>
      {isNaN(numValue) ? value : count}
      {suffix}
    </span>
  );
}

const highlights = [
  {
    icon: <FaCode />,
    title: "Full Stack Development",
    desc: "React.js, Next.js, and Spring Boot — building responsive frontends connected to scalable backend systems.",
    color: "#f97316",
  },
  {
    icon: <FaBrain />,
    title: "Generative AI & LLMs",
    desc: "Spring AI, LangChain4j, RAG pipelines and LLM integration — integrating LLMs into production applications.",
    color: "#3b82f6",
  },
  {
    icon: <FaServer />,
    title: "Backend & Microservices",
    desc: "Java, Spring Boot, Spring Cloud, Kafka, RabbitMQ — event-driven microservices and REST APIs built for scale.",
    color: "#7c3aed",
  },
  {
    icon: <FaRocket />,
    title: "Cloud & DevOps",
    desc: "Docker, Kubernetes, AWS (S3, Lambda) — containerized deployments and sclable infrastructure.",
    color: "#ec4899",
  },
  {
    icon: <FaSalesforce />,
    title: "Salesforce Development",
    desc: "Apex, SOQL, SOSL, Lightning Components — built an automated Lead Reporting solution with Scheduled Apex and HTML email delivery.",
    color: "#00A1E0",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* <span className="text-nebula-purple font-mono text-sm tracking-widest uppercase">// About Me</span> */}
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mt-3 text-star-white">
            Mission <span className="text-gradient">Briefing</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-nebula-purple to-nebula-blue rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Profile Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Profile Image */}
            <div className="relative mb-8">
              <div className="w-80 h-120 md:w-120 md:h-[460px] rounded-full overflow-hidden relative">
                <div className="absolute inset-[-3px] rounded-full bg-gradient-to-tr from-nebula-purple via-nebula-blue to-nebula-cyan animate-spin-slow" />
                <div className="absolute inset-[3px] rounded-full overflow-hidden bg-space-black">
                  <img
                    src="/images/profile1.jpg"
                    alt="Kush Chauhan"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-2 -right-2 px-3 py-1.5 glass rounded-lg border border-nebula-purple/30 text-sm font-mono"
              >
                <span className="text-nebula-purple">{"<"}</span>
                <span className="text-star-white">Developer</span>
                <span className="text-nebula-purple">{"/>"}</span>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {resumeData.about.highlights.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass glass-hover p-4 text-center rounded-xl"
                >
                  <div className="text-2xl font-orbitron font-bold text-gradient">
                    <AnimatedCounter
                      value={stat.value.replace(/[^0-9]/g, "")}
                      suffix={stat.value.replace(/[0-9]/g, "")}
                    />
                  </div>
                  <div className="text-xs text-star-silver/60 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Story + Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Story */}
            <div className="mb-8">
              <p className="text-lg text-star-silver/90 leading-relaxed mb-4">
                {resumeData.about.short}
              </p>
              <p className="text-base text-star-silver/60 leading-relaxed">
                {resumeData.about.story}
              </p>
            </div>

            {/* Core Strengths */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => {
                const isOrphan =
                  highlights.length % 2 !== 0 && i === highlights.length - 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`glass glass-hover p-4 rounded-xl aspect-[4/2] 
                      flex flex-col items-center justify-center text-center gap-3 group cursor-default ${
                      isOrphan
                        ? "col-span-2 max-w-[calc(50%-0.5rem)] mx-auto"
                        : ""
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${item.color}20`,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-star-white text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-star-silver/60 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

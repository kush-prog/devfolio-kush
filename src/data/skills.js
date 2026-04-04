import { FaServer, FaBrain, FaDatabase, FaCloud, FaDocker, FaGitAlt, FaPython, FaJava, FaReact, FaNodeJs, FaAws } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiMongodb, SiTensorflow, SiKubernetes, SiGooglecloud, SiFastapi, SiFlask, SiPandas, SiNumpy, SiScikitlearn, SiLangchain, SiRedis, SiGraphql, SiApachekafka, SiJenkins, SiTerraform, SiFirebase } from 'react-icons/si';
import { TbBrandOpenai } from 'react-icons/tb';
import { BiNetworkChart } from 'react-icons/bi';

export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: '🎨',
    color: '#f97316',
    gradient: 'from-orange-500 to-yellow-500',
    skills: [
      { name: 'React.js', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'JavaScript (ES6+)', level: 88 },
      { name: 'TypeScript', level: 75 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'SSR / SSG', level: 78 },
    ]
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: '🚀',
    color: '#7c3aed',
    gradient: 'from-purple-500 to-blue-500',
    skills: [
      { name: 'Java', level: 92 },
      { name: 'Spring Boot', level: 88 },
      { name: 'Spring MVC', level: 82 },
      { name: 'Python', level: 88 },
      { name: 'FastAPI', level: 82 },
      { name: 'RESTful APIs', level: 95 },
      { name: 'Microservices', level: 85 },
      { name: 'Spring Cloud', level: 78 },
    ]
  },
  {
    id: 'ai',
    title: 'Generative AI & LLMs',
    icon: '🤖',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'Google Gemini API', level: 90 },
      { name: 'LangChain', level: 80 },
      { name: 'Spring AI', level: 78 },
      { name: 'Prompt Engineering', level: 88 },
      { name: 'RAG Systems', level: 75 },
      { name: 'LLM Integration', level: 85 },
    ]
  },
  {
    id: 'ml',
    title: 'ML & Data Science',
    icon: '🧠',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-emerald-500',
    skills: [
      { name: 'Scikit-learn', level: 82 },
      { name: 'Pandas', level: 88 },
      { name: 'NumPy', level: 85 },
      { name: 'Feature Engineering', level: 78 },
      { name: 'Matplotlib', level: 80 },
      { name: 'Model Training', level: 75 },
    ]
  },
  {
    id: 'database',
    title: 'Databases & Storage',
    icon: '🗃️',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Hibernate / JPA', level: 78 },
      { name: 'Redis', level: 70 },
      { name: 'AWS S3', level: 75 },
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & Infrastructure',
    icon: '⚙️',
    color: '#ec4899',
    gradient: 'from-pink-500 to-purple-500',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 70 },
      { name: 'Google Cloud', level: 82 },
      { name: 'Apache Kafka', level: 72 },
      { name: 'RabbitMQ', level: 75 },
      { name: 'Maven', level: 85 },
      { name: 'Git', level: 92 },
      { name: 'CI/CD', level: 75 },
    ]
  }
];

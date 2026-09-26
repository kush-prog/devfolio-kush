import { FaServer, FaBrain, FaDatabase, FaCloud, FaDocker, FaGitAlt, FaPython, FaJava, FaReact, FaNodeJs, FaAws } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiMongodb, SiTensorflow, SiKubernetes, SiGooglecloud, SiFastapi, SiFlask, SiPandas, SiNumpy, SiScikitlearn, SiLangchain, SiRedis, SiGraphql, SiApachekafka, SiJenkins, SiTerraform, SiFirebase } from 'react-icons/si';
import { TbBrandOpenai } from 'react-icons/tb';
import { BiNetworkChart } from 'react-icons/bi';

export const skillCategories = [
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
    ]
  },
  {
    id: 'ai',
    title: 'Generative AI & LLMs',
    icon: '🤖',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'LangChain4j', level: 80 },
      { name: 'Spring AI', level: 78 },
      { name: 'Prompt Engineering', level: 88 },
      { name: 'RAG Systems', level: 75 },
      { name: 'LLM Integration', level: 85 },
    ]
  },
  {
    id: 'database',
    title: 'Databases & Messaging',
    icon: '🗃️',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'PostgreSQL / MySQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Vector Databases', level: 72 },
      { name: 'Apache Kafka', level: 72 },
      { name: 'RabbitMQ', level: 75 },
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    icon: '⚙️',
    color: '#ec4899',
    gradient: 'from-pink-500 to-purple-500',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 70 },
      { name: 'AWS (S3, Lambda', level: 75 },
      { name: 'Maven', level: 85 },
      { name: 'Git', level: 92 },
    ]
  },
  {
    id: 'salesforce',
    title: 'Salesforce Development',
    icon: '☁️',
    color: '#00A1E0',
    gradient: 'from-sky-500 to-blue-600',
    skills: [
      { name: 'Salesforce Administration', level: 85 },
      { name: 'Salesforce Development', level: 80 },
      { name: 'Salesforce Automation', level: 78 },
      { name: 'Apex', level: 75 },
      { name: 'SOQL / SOSL', level: 80 },
      { name: 'Lightning Web Components', level: 72 },
    ]
  }
];

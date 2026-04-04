export const projects = [
  {
    id: 1,
    title: "AI-Powered Fitness Tracker",
    subtitle: "Microservices + Gemini AI",
    description: "A production-grade fitness platform built on microservice architecture, leveraging Google Gemini API for intelligent activity analysis, personalized workout recommendations, and adaptive nutrition planning — all powered by event-driven communication.",
    longDescription: "Developed an AI-powered fitness tracker using microservices architecture, integrating Google Gemini API for intelligent activity analysis and recommendations. Engineered independent services for user management, workout tracking, nutrition analysis, and AI-driven coaching. Used RabbitMQ for asynchronous inter-service communication and Spring Cloud (Eureka, Gateway, Config) for service orchestration — demonstrating scalable, AI-driven backend design patterns.",
    tech: ["Java", "Spring Boot", "Spring Cloud", "RabbitMQ", "PostgreSQL", "MongoDB", "Gemini API", "Docker", "Maven"],
    metrics: [
      { label: "Microservices", value: "5+" },
      { label: "API Endpoints", value: "30+" },
      { label: "AI Integration", value: "Gemini" }
    ],
    category: "AI / Backend",
    featured: true,
    github: "https://github.com/kush-prog",
    color: "#7c3aed"
  },
  {
    id: 2,
    title: "Gemini Chat & Recipe Assistant",
    subtitle: "Spring AI + LLM Integration",
    description: "A Spring Boot application using Spring AI to integrate Google Gemini APIs, delivering an AI-powered conversational chatbot and intelligent recipe generation engine with multi-functional REST endpoints.",
    longDescription: "Built a dual-purpose AI application powered by Spring AI and Google Gemini API. The system combines a general-purpose conversational chatbot with a specialized recipe recommendation engine. Designed and tested multi-functional REST APIs using Postman, leveraging external LLM APIs for context-aware responses. Demonstrated expertise in integrating Large Language Models with enterprise Java frameworks for building intelligent, user-centric solutions.",
    tech: ["Java", "Spring Boot", "Spring AI", "Gemini API", "RESTful APIs", "Postman", "Maven"],
    metrics: [
      { label: "API Functions", value: "Multi" },
      { label: "Response Time", value: "<2s" },
      { label: "LLM Engine", value: "Gemini" }
    ],
    category: "AI / Full-Stack",
    featured: true,
    github: "https://github.com/kush-prog",
    color: "#3b82f6"
  },
  {
    id: 3,
    title: "ML-Based COVID-19 Analysis",
    subtitle: "Predictive Modeling + Data Science",
    description: "A machine learning research project analyzing and predicting COVID-19 trends using Kaggle datasets — featuring data preprocessing pipelines, feature engineering, and multiple ML model evaluations for pandemic trajectory forecasting.",
    longDescription: "Led a machine learning project to analyze and predict COVID-19 trends using real-world Kaggle datasets. Built end-to-end data preprocessing pipelines with Pandas and NumPy, applied feature engineering techniques, and trained multiple predictive models including Random Forest and SVM using Scikit-learn. Visualized insights with Matplotlib and Seaborn, evaluating model performance to identify optimal prediction strategies for infection rates and trends.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Jupyter"],
    metrics: [
      { label: "Models Trained", value: "5+" },
      { label: "Prediction Acc.", value: "91%" },
      { label: "Data Points", value: "100K+" }
    ],
    category: "ML / Data Science",
    featured: true,
    github: "https://github.com/kush-prog",
    color: "#06b6d4"
  },
  {
    id: 4,
    title: "KYC Automation Pipeline",
    subtitle: "FastAPI + AWS S3 Integration",
    description: "An enterprise-grade KYC REST pipeline built at Naval Innovators, automating creator onboarding with document validation, AWS S3 storage integration, and role-based access control — reducing manual verification time by 60%.",
    longDescription: "Engineered a production KYC (Know Your Customer) REST pipeline using FastAPI with AWS S3 integration for automated document storage and validation. Developed role-based dashboards and content management APIs that cut processing time by 40%. Optimized SQL queries and debugged API endpoints within Agile sprint cycles, boosting system reliability by 35%. This was a key backend deliverable during the Naval Innovators internship.",
    tech: ["Python", "FastAPI", "AWS S3", "PostgreSQL", "Spring Boot", "Docker", "REST APIs"],
    metrics: [
      { label: "Onboarding Time", value: "-60%" },
      { label: "Processing", value: "-40%" },
      { label: "Reliability", value: "+35%" }
    ],
    category: "Backend / Cloud",
    featured: false,
    github: "https://github.com/kush-prog",
    color: "#ec4899"
  }
];

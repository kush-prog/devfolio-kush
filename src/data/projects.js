export const projects = [
  {
    id: 1,
    title: "AI-Powered Fitness Tracker",
    subtitle: "Microservices + Gemini AI",
    description:
      "A production-grade fitness platform built on microservice architecture, leveraging Google Gemini API for intelligent activity analysis, personalized workout recommendations, and adaptive nutrition planning — all powered by event-driven communication.",
    longDescription:
      "Developed an AI-powered fitness tracker using microservices architecture, integrating Google Gemini API for intelligent activity analysis and recommendations. Engineered independent services for user management, workout tracking, nutrition analysis, and AI-driven coaching. Used RabbitMQ for asynchronous inter-service communication and Spring Cloud (Eureka, Gateway, Config) for service orchestration — demonstrating scalable, AI-driven backend design patterns.",
    tech: [
      "Java",
      "Spring Boot",
      "Spring Cloud",
      "RabbitMQ",
      "PostgreSQL",
      "MongoDB",
      "Gemini API",
      "Docker",
      "Maven",
    ],
    metrics: [
      { label: "Microservices", value: "5+" },
      { label: "Communication", value: "Async" },
      { label: "AI Integration", value: "Gemini" },
    ],
    category: "AI / Backend",
    featured: true,
    github: "https://github.com/kush-prog/AI-Powered-Fitness-Application.git",
    color: "#7c3aed",
  },
  {
    id: 2,
    title: "Gemini Chat & Recipe Assistant",
    subtitle: "Spring AI + LLM Integration",
    description:
      "A Spring Boot application using Spring AI to integrate Google Gemini APIs, delivering an AI-powered conversational chatbot and intelligent recipe generation engine with multi-functional REST endpoints.",
    longDescription:
      "Built a dual-purpose AI application powered by Spring AI and Google Gemini API. The system combines a general-purpose conversational chatbot with a specialized recipe recommendation engine. Designed and tested multi-functional REST APIs using Postman, leveraging external LLM APIs for context-aware responses. Demonstrated expertise in integrating Large Language Models with enterprise Java frameworks for building intelligent, user-centric solutions.",
    tech: [
      "Java",
      "Spring Boot",
      "Spring AI",
      "Gemini API",
      "RESTful APIs",
      "Postman",
      "Maven",
    ],
    metrics: [
      { label: "API Functions", value: "Multi" },
      { label: "Response Time", value: "<2s" },
      { label: "LLM Engine", value: "Gemini" },
    ],
    category: "AI / Full-Stack",
    featured: false,
    github: "https://github.com/kush-prog/Spring-AI-Recipe-Bot.git",
    color: "#3b82f6",
  },
  {
    id: 3,
    title: "ML-Based COVID-19 Analysis",
    subtitle: "Predictive Modeling + Data Science",
    description:
      "A machine learning research project analyzing and predicting COVID-19 trends using Kaggle datasets — featuring data preprocessing pipelines, feature engineering, and multiple ML model evaluations for pandemic trajectory forecasting.",
    longDescription:
      "Led a machine learning project to analyze and predict COVID-19 trends using real-world Kaggle datasets. Built end-to-end data preprocessing pipelines with Pandas and NumPy, applied feature engineering techniques, and trained multiple predictive models including Random Forest and SVM using Scikit-learn. Visualized insights with Matplotlib and Seaborn, evaluating model performance to identify optimal prediction strategies for infection rates and trends.",
    tech: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "Jupyter",
    ],
    metrics: [
      { label: "Models Trained", value: "5+" },
      { label: "Prediction Acc.", value: "91%" },
      { label: "Data Points", value: "100K+" },
    ],
    category: "ML / Data Science",
    featured: true,
    github:
      "https://github.com/kush-prog/COVID-19-Data-Analysis-and-Prediction.git",
    color: "#06b6d4",
  },
  {
    id: 4,
    title: "Load & Booking Management System",
    subtitle: "Spring Boot + PostgreSQL",
    description:
      "A backend system for managing load and booking operations with normalized relational schema, automated status transitions, and comprehensive validation — built for performance, security, and scalability.",
    longDescription:
      "Built a robust backend system using Spring Boot 3.2 and PostgreSQL to manage Load & Booking operations, following a layered architecture with distinct controller, service, repository, entity, and DTO layers. Designed a normalized database schema with foreign key relationships and automated status transitions (POSTED, BOOKED, CANCELLED for loads; PENDING, ACCEPTED, REJECTED for bookings) driven by business rules. Implemented comprehensive input validation, global exception handling, pagination and filtering for efficient data retrieval, and Swagger/OpenAPI documentation. Achieved 60%+ test coverage using JUnit 5 and Mockito across unit, integration, and mock testing layers.",
    tech: [
      "Java 17",
      "Spring Boot 3.2",
      "PostgreSQL",
      "Spring Data JPA",
      "Hibernate",
      "JUnit 5",
      "Mockito",
      "Swagger/OpenAPI",
      "Maven",
    ],
    metrics: [
      { label: "Test Coverage", value: "60%+" },
      { label: "API Endpoints", value: "10" },
      { label: "Entities", value: "2 Core" },
    ],
    category: "Backend / Java",
    featured: false,
    github: "https://github.com/kush-prog/Load-Booking-Management-System.git",
    color: "#f97316",
  },
  {
    id: 5,
    title: "KYC Automation Pipeline",
    subtitle: "Spring Boot + AWS S3 Integration",
    description:
      "An enterprise-grade KYC REST pipeline built at Naval Innovators, automating creator onboarding with document validation, AWS S3 storage integration, and role-based access control — reducing manual verification time by 60%.",
    longDescription:
      "Engineered a production KYC (Know Your Customer) REST pipeline using Spring Boot with AWS S3 integration for automated document storage and validation. Developed role-based dashboards and content management APIs that cut processing time by 40%. Optimized SQL queries and debugged API endpoints within Agile sprint cycles, boosting system reliability by 35%. This was a key backend deliverable during the Naval Innovators internship.",
    tech: ["Java", "Spring Boot", "AWS S3", "PostgreSQL", "REST APIs"],
    metrics: [
      { label: "Onboarding Time", value: "-60%" },
      { label: "Processing", value: "-40%" },
      { label: "Reliability", value: "+35%" },
    ],
    category: "Backend / Cloud",
    featured: false,
    github: "https://github.com/kush-prog",
    color: "#ec4899",
  },
  {
    id: 6,
    title: "Salesforce Lead Reporting & Email Automation",
    subtitle: "Apex + Scheduled Automation",
    description:
      "An end-to-end Salesforce automation solution that streamlines weekly lead tracking and reporting across multiple website sources — combining Apex-driven data analysis with scheduled, branded email delivery.",
    longDescription:
      "Independently designed and developed a Salesforce Lead Reporting and Email Automation solution to streamline weekly lead tracking, performance analysis, and report distribution across multiple website sources, including KORA, EDRO, SYMB, and ABM. Built the reporting logic using Apex and SOQL to retrieve and filter lead records by website source and calculate lead volumes for current and previous seven-day periods, including week-over-week changes and percentage comparisons. Implemented Scheduled Apex to automate weekly report execution and developed customized HTML email templates for each website source, featuring branded layouts, performance summaries, and lead metrics. Also implemented CSV report generation and email attachments to provide detailed lead data alongside summarized insights, creating a centralized, automated reporting workflow that reduces manual effort.",
    tech: [
      "Salesforce",
      "Apex",
      "SOQL",
      "Scheduled Apex",
      "Automation Flow",
      "HTML Email Templates",
      "CSV Generation",
    ],
    metrics: [
      { label: "Website Sources", value: "4" },
      { label: "Reporting", value: "Automated" },
      { label: "Frequency", value: "Weekly" },
    ],
    category: "Salesforce / Automation",
    featured: true,
    github: "https://github.com/kush-prog",
    color: "#00A1E0",
  },
];

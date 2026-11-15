window.PORTFOLIO_DATA = {
  profile: {
    name: "Arya Anand",
    firstName: "Arya",
    title: "Junior Software Engineer",
    location: "Thiruvananthapuram, Kerala, India",
    email: "aryaanand0109@gmail.com",
    phone: "+91 9645363040",
    portrait: "assets/hero-portrait3.png",
    resumeUrl: "assets/resume.pdf", // Make sure to add her PDF to the assets folder!
    badge: "Original Portfolio",
    socials: {
      github: "https://github.com/yourusername", // Update with real link
      linkedin: "https://linkedin.com/in/yourusername", // Update with real link
      twitter: ""
    },
    heroStack: ["Python", "Java", "JavaScript", "Flask", "React.js", "SQL"],
    yearsExperience: "CS Grad '26",
    projectCount: "3+ Major Projects"
  },
  about: {
    eyebrow: "The Pilot",
    headline: "CS grad. Java Full Stack trained. Building real products.",
    paragraphs: [
      "I'm a Computer Science graduate (B.Tech, 2026) with hands-on experience in Python, Flask, REST APIs, and SQL. I'm currently completing a Java Full Stack program to expand my backend and enterprise development skills.",
      "I've built a RAG-based workplace-law chatbot using the Gemini API, an AI recipe finder, and an IoT smart-home automation system. I love building applications that solve practical, real-world problems.",
      "Beyond coding, I have 3 years of part-time experience mentoring higher secondary students in programming fundamentals. I'm seeking a Junior Software Developer role where I can build reliable, user-focused applications."
    ],
    stats: [
      { label: "B.Tech CS (2026)", value: "Graduated" },
      { label: "Major Projects", value: "3+" },
      { label: "Years Mentoring", value: "3" }
    ]
  },
  projects: [
    {
      id: "project-one",
      number: "01",
      title: "Workplace-Law RAG Chatbot",
      category: "AI · Python · Backend",
      blurb: "A Python/Flask chatbot answering workplace-law questions using RAG and the Gemini API.",
      year: "2025",
      badge: "AI / RAG",
      summary: "Built a Python/Flask chatbot to answer workplace-law questions using RAG and the Gemini API. Chunked reference documents and stored embeddings in a vector database for semantic retrieval, then passed retrieved passages to Gemini as context for document-grounded responses.",
      tags: ["Python", "Flask", "Gemini API", "Vector DB", "RAG"],
      stack: ["Python", "Flask", "Gemini API", "Vector DB"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=85", // Code/AI placeholder
      accent: "#20d9b0",
      link: "https://github.com/yourusername" // Add real repo link
    },
    {
      id: "project-two",
      number: "02",
      title: "AI-Powered Recipe Finder",
      category: "Full-stack · AI",
      blurb: "A responsive web app that generates recipe suggestions based on available ingredients.",
      year: "2025",
      badge: "Web App",
      summary: "Built a responsive web interface for users to enter available ingredients and explore recipes. Integrated the Gemini AI to generate recipe suggestions based on the supplied ingredients.",
      tags: ["JavaScript", "HTML5", "CSS3", "Gemini AI"],
      stack: ["JavaScript", "HTML/CSS", "Gemini AI"],
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1600&q=85", // Food/Recipe placeholder
      accent: "#e1b875",
      link: "https://github.com/yourusername"
    },
    {
      id: "project-three",
      number: "03",
      title: "AUTO-CHUTTI",
      category: "IoT · Smart Home",
      blurb: "An IoT-based smart home automation system integrating hardware and software control.",
      year: "2024",
      badge: "IoT System",
      summary: "Built a smart home automation prototype integrating embedded hardware with software-based appliance control. Implemented software logic to monitor inputs and automatically control home appliances.",
      tags: ["IoT", "Embedded", "Automation", "C++"],
      stack: ["Hardware", "C++", "Automation"],
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=85", // Smart home placeholder
      accent: "#8d72ff",
      link: "https://github.com/yourusername"
    },
     {
      id: "project-four",
      number: "04",
      title: "Workplace-Law RAG Chatbot",
      category: "AI · Python · Backend",
      blurb: "A Python/Flask chatbot answering workplace-law questions using RAG and the Gemini API.",
      year: "2025",
      badge: "AI / RAG",
      summary: "Built a Python/Flask chatbot to answer workplace-law questions using RAG and the Gemini API. Chunked reference documents and stored embeddings in a vector database for semantic retrieval, then passed retrieved passages to Gemini as context for document-grounded responses.",
      tags: ["Python", "Flask", "Gemini API", "Vector DB", "RAG"],
      stack: ["Python", "Flask", "Gemini API", "Vector DB"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=85", // Code/AI placeholder
      accent: "#20d9b0",
      link: "https://github.com/yourusername" // Add real repo link
    },
  ],
  stack: [
    { 
      icon: "</>", 
      title: "Frontend", 
      description: "Responsive web design and modern UI libraries.", 
      skills: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "React.js"] 
    },
    { 
      icon: "⌘", 
      title: "Backend & APIs", 
      description: "Server-side logic, REST APIs, and AI integration.", 
      skills: ["Python", "Java", "Flask", "REST APIs", "Gemini API"] 
    },
    { 
      icon: "☁", 
      title: "Databases", 
      description: "Relational data, cloud storage, and vector search.", 
      skills: ["MySQL", "Firebase", "Vector DBs", "SQL"] 
    },
    { 
      icon: "◎", 
      title: "Tools & Core", 
      description: "Version control and computer science fundamentals.", 
      skills: ["Git", "GitHub", "Postman", "OOP", "Data Structures"] 
    }
  ],
  journey: [
    { 
      year: "Jan 2026 — Present", 
      title: "Java Full Stack Web Development", 
      org: "MashupStack", 
      description: "Structured technical training in enterprise Java development." 
    },
    { 
      year: "2022 — 2026", 
      title: "B.Tech in Computer Science", 
      org: "Muslim Association College of Engineering (KTU)", 
      description: "Focused on algorithms, database concepts, and software engineering." 
    },
    { 
      year: "Jan 2023 — Present", 
      title: "Computer Science Mentor", 
      org: "Part-time", 
      description: "Guiding higher secondary students in coding practice and logical problem-solving." 
    }
  ]
};

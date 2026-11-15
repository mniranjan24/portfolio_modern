window.PORTFOLIO_DATA = {
  profile: {
    name: "Your Name",
    firstName: "Your",
    title: "Full-Stack Developer",
    location: "City, Country",
    email: "you@example.com",
    phone: "",
    portrait: "assets/hero-portrait.webp",
    resumeUrl: "assets/resume.pdf",
    badge: "Original Portfolio",
    socials: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: ""
    },
    heroStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    yearsExperience: "New grad",
    projectCount: "12+"
  },
  about: {
    eyebrow: "The origin story",
    headline: "CS grad. Bootcamp sharpened. Shipping real products.",
    paragraphs: [
      "I'm a full-stack developer with a Computer Science degree and an intensive bootcamp behind me. That combination means I understand the fundamentals — algorithms, data structures, systems — and I've built real, deployed apps with modern tooling.",
      "I've shipped 12+ projects in the last 8 months: a SaaS dashboard with auth and billing, a real-time collaboration tool, an open-source CLI, and several PWA experiments. Every one is on GitHub with a live demo.",
      "I'm looking for a team where I can ship production code from week one, learn from senior engineers, and grow into a product-minded developer."
    ],
    stats: [
      { label: "CS Degree + Bootcamp", value: "Trained" },
      { label: "Projects shipped", value: "12+" },
      { label: "Open-source PRs", value: "8+" }
    ],
    highlights: [
      { icon: "🎓", title: "CS Fundamentals", desc: "Strong grasp of algorithms, data structures, and system design." },
      { icon: "⚡", title: "Rapid Shipping", desc: "Bootcamp-trained to build and deploy full-stack apps fast." },
      { icon: "🚀", title: "Real Projects", desc: "12+ live, open-source projects with real users and clean code." }
    ]
  },
  projects: [
    {
      id: "project-one",
      number: "01",
      title: "Project One",
      category: "Full-stack · SaaS",
      blurb: "A subscription workspace that helps small teams keep customer work organized.",
      year: "2025",
      badge: "Shipped 2025",
      summary: "A placeholder case study for a SaaS workspace. The product brings projects, billing, and customer updates into one place. Replace this copy with the real problem, your implementation, and measurable impact.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      stack: ["React", "Node.js", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=85",
      accent: "#ef3340",
      link: "https://github.com/yourusername/project-one"
    },
    {
      id: "project-two",
      number: "02",
      title: "Project Two",
      category: "Frontend · Dashboard",
      blurb: "A clear view of live metrics for teams making time-sensitive decisions.",
      year: "2025",
      badge: "Case study",
      summary: "A placeholder case study for an analytics dashboard. It turns complex events into readable charts and useful alerts. Replace this description with the constraints, technical choices, and outcome of your real project.",
      tags: ["TypeScript", "React", "Charts", "Accessibility"],
      stack: ["TypeScript", "React", "Node.js"],
      image: "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?auto=format&fit=crop&w=1600&q=85",
      accent: "#e1b875",
      link: "https://github.com/yourusername/project-two"
    },
    {
      id: "project-three",
      number: "03",
      title: "Project Three",
      category: "Developer tools · Open source",
      blurb: "A small tool that makes repetitive setup work feel effortless.",
      year: "2024",
      badge: "Open source",
      summary: "A placeholder case study for a developer tool. It automates a common setup task and documents the workflow for contributors. Add your actual design decisions, testing approach, and adoption details here.",
      tags: ["Node.js", "CLI", "Testing", "Documentation"],
      stack: ["Node.js", "TypeScript", "Vitest"],
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=85",
      accent: "#8d72ff",
      link: "https://github.com/yourusername/project-three"
    },
    {
      id: "project-four",
      number: "04",
      title: "Project Four",
      category: "Full-stack · Progressive web app",
      blurb: "An offline-ready app for capturing notes wherever the work happens.",
      year: "2024",
      badge: "Side project",
      summary: "A placeholder case study for a progressive web app. It keeps essential actions available when connectivity drops and syncs changes later. Replace this text with your real architecture and lessons learned.",
      tags: ["PWA", "Offline", "PostgreSQL", "Sync"],
      stack: ["React", "Service Worker", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=85",
      accent: "#20d9b0",
      link: "https://github.com/yourusername/project-four"
    }
  ],
  stack: [
    { icon: "</>", title: "Frontend", description: "React, TypeScript, modern CSS, and performance budgets.", skills: ["React", "TypeScript", "Next.js", "Tailwind", "GSAP"] },
    { icon: "⌘", title: "Backend", description: "APIs, databases, auth, and background jobs.", skills: ["Node.js", "Express", "PostgreSQL", "Prisma", "Redis"] },
    { icon: "☁", title: "DevOps", description: "Deployments, CI/CD, and observability.", skills: ["Docker", "GitHub Actions", "AWS", "Vercel", "Cloudflare"] },
    { icon: "◎", title: "Tooling", description: "Testing, linting, and developer experience.", skills: ["Vitest", "Playwright", "ESLint", "Figma", "Git"] }
  ],
  journey: [
    { year: "2024 — now", title: "Software Engineer", org: "Company Name", description: "What you do, what you shipped, what the team does." },
    { year: "2022 — 2024", title: "Frontend Engineer", org: "Previous Company", description: "Another role, another sentence." },
    { year: "2018 — 2022", title: "B.Tech Computer Science", org: "University", description: "Degree, focus, notable project." }
  ]
};

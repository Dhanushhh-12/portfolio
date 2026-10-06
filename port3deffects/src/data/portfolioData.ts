import { Project, SkillCategory, TimelineItem, DSATopic, AnalyticsMetric } from '../types';

export const PERSONAL_INFO = {
  name: "CHEDEDEEPU DHANUSH",
  shortName: "Dhanush",
  monogram: "CD",
  title: "Full Stack Developer | Aspiring Data Analyst",
  heroTagline: "I build modern web experiences and turn ideas into real-world applications.",
  intro: "I'm Chedeedepu Dhanush, a Computer Science student and Full Stack Developer passionate about building modern, responsive and user-focused web applications. I work with JavaScript, TypeScript, Java, React, HTML, CSS, Node.js, Express.js, databases and modern development tools. Alongside web development, I'm expanding my skills in Data Analytics, Python, SQL, Power BI, Tableau and AI.",
  location: "Hyderabad, Telangana, India",
  education: {
    degree: "B.Tech – Computer Science",
    institution: "CMR Institute of Technology, Hyderabad",
    period: "2025–2028"
  },
  social: {
    linkedin: "https://www.linkedin.com/in/chededeepu-dhanush-b3123a380",
    github: "https://github.com/Dhanushhh-12",
    githubUsername: "Dhanushhh-12",
    email: "chededeepudhanush@gmail.com",
  },
  status: "OPEN TO INTERNSHIP OPPORTUNITIES",
};

export const TERMINAL_DATA = [
  { label: "$ whoami", value: "Dhanush" },
  { label: "$ role", value: "Full Stack Developer" },
  { label: "$ technologies", value: "React • Java • JavaScript • TypeScript" },
  { label: "$ currently_learning", value: "DSA • Data Analytics • AI" },
  { label: "$ status", value: "Building..." },
];

export const ABOUT_PILLARS = [
  {
    tag: "BUILD",
    title: "Full Stack Engineering",
    description: "Creating modern, responsive and scalable web applications.",
    icon: "Code",
    tech: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS"]
  },
  {
    tag: "ANALYZE",
    title: "Data Intelligence",
    description: "Using SQL, Python, Excel, Power BI and Tableau to understand and visualize data.",
    icon: "BarChart3",
    tech: ["SQL", "Python", "Power BI", "Tableau", "Excel"]
  },
  {
    tag: "LEARN",
    title: "Continuous Mastery",
    description: "Continuously improving DSA, software engineering, AI and modern development technologies.",
    icon: "BrainCircuit",
    tech: ["DSA in Java", "AI Systems", "System Architecture", "Git Workflows"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming",
    skills: ["Java", "JavaScript", "TypeScript", "Python", "SQL"]
  },
  {
    title: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs"]
  },
  {
    title: "Databases",
    skills: ["MongoDB", "SQL", "MySQL"]
  },
  {
    title: "Data Analytics",
    skills: ["Python", "SQL", "Excel", "Power BI", "Tableau", "Statistics", "Data Visualization"]
  },
  {
    title: "Development Tools",
    skills: ["Git", "GitHub", "VS Code", "npm", "Postman"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "ayushya",
    title: "AYUSHYA",
    tagline: "AI-Powered IP & Regulatory Intelligence for Ayurveda",
    category: "AI & Full Stack",
    description: "An AI-powered decision-support platform designed to analyze Ayurveda products, identify intellectual property opportunities, understand regulatory requirements and retrieve relevant legal evidence.",
    technologies: ["React", "JavaScript", "AI", "Data Processing", "Regulatory Intelligence"],
    featured: true,
    githubUrl: "https://github.com/Dhanushhh-12",
    features: [
      "Product classification",
      "IP opportunity identification",
      "Regulatory analysis",
      "Legal evidence retrieval",
      "Biodiversity and Traditional Knowledge insights",
      "Actionable guidance"
    ],
    caseStudy: {
      problemStatement: "Navigating complex Ayurvedic regulatory compliance and patent law traditionally requires cross-referencing hundreds of historical treatises and evolving statutory frameworks.",
      architecture: [
        "Interactive React frontend with high-density data tables and decision cards",
        "AI-assisted legal document parsing engine that correlates formulations with IP filings",
        "Structured classification taxonomy supporting biodiversity compliance checking"
      ],
      outcomes: [
        "Enables researchers and product founders to assess patentability in minutes",
        "Streamlines traditional knowledge documentation lookup with evidence citations"
      ]
    }
  },
  {
    id: "aixiqora",
    title: "AIXIQORA",
    tagline: "AI Career & Internship Platform",
    category: "Full Stack & AI",
    description: "An AI-powered career and internship platform designed to help students manage their career journey through resume analysis, internship discovery, project showcasing and intelligent career assistance.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "AI"],
    featured: true,
    githubUrl: "https://github.com/Dhanushhh-12",
    features: [
      "Student authentication",
      "Recruiter dashboard",
      "Resume analysis",
      "ATS scoring",
      "Internship discovery",
      "Project showcase",
      "Career assistance",
      "Analytics"
    ],
    caseStudy: {
      problemStatement: "Early-career students often struggle to gauge how well their resumes match industry requirements, leading to high rejection rates from automated Applicant Tracking Systems.",
      architecture: [
        "Full-stack MERN architecture with JWT-authenticated student and recruiter portals",
        "Integrated AI parser evaluating keyword density, formatting, and ATS compatibility",
        "Direct recruiter dashboard for posting opportunities and filtering qualified applicants"
      ],
      outcomes: [
        "Delivers instant ATS readiness scores and actionable recommendations for improvement",
        "Unifies project showcases with direct internship application pipelines"
      ]
    }
  },
  {
    id: "react-analytics-dashboard",
    title: "React Analytics Dashboard",
    tagline: "Interactive Information & Data Visualization Interface",
    category: "Data Analytics & Frontend",
    description: "A modern responsive analytics dashboard focused on presenting information through interactive charts, clean interfaces and meaningful data visualization.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Chart.js"],
    featured: false,
    githubUrl: "https://github.com/Dhanushhh-12",
    features: [
      "Interactive time-series visualizations with dynamic filtering",
      "Modular dashboard grid with live metric recalculation",
      "Clean UI designed for intuitive executive data exploration",
      "Responsive layout optimized for desktop and mobile displays"
    ]
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Website",
    tagline: "Responsive Digital Storefront & Catalog",
    category: "Frontend Web",
    description: "A responsive e-commerce website focused on modern UI, product browsing, user interactions and a smooth shopping experience.",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    featured: false,
    githubUrl: "https://github.com/Dhanushhh-12",
    features: [
      "Real-time category filtering and dynamic search",
      "Interactive cart with local persistence and quantity controls",
      "Responsive product modal views and checkout simulator",
      "Accessible, lightweight performance with zero layout shift"
    ]
  }
];

export const ANALYTICS_METRICS: AnalyticsMetric[] = [
  {
    title: "Total Tracked Volume",
    value: "$142,850",
    change: "+18.4%",
    positive: true,
    subtitle: "Across simulated quarters"
  },
  {
    title: "Active Platform Users",
    value: "12,480",
    change: "+24.2%",
    positive: true,
    subtitle: "Monthly active engagements"
  },
  {
    title: "Pipeline Conversion",
    value: "4.85%",
    change: "+1.2%",
    positive: true,
    subtitle: "Top of funnel to activation"
  },
  {
    title: "Avg Response Latency",
    value: "142 ms",
    change: "-12.5%",
    positive: true,
    subtitle: "Query & API throughput"
  }
];

export const TIMELINE_JOURNEY: TimelineItem[] = [
  {
    period: "2025–2028",
    title: "B.Tech – Computer Science",
    subtitle: "CMR Institute of Technology, Hyderabad",
    description: "Pursuing rigorous undergraduate coursework in Computer Science, focusing on core computing fundamentals, software engineering, databases, and applied algorithms.",
    tags: ["Core CS", "Data Structures", "DBMS", "Operating Systems", "Networking"]
  },
  {
    period: "2026",
    title: "Full Stack Development",
    subtitle: "Modern Web Engineering",
    description: "Building production-grade web applications using React, JavaScript, TypeScript, Node.js, Express.js, and MongoDB, emphasizing clean code, modular architecture, and responsive UX.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"]
  },
  {
    period: "2026",
    title: "Data Analytics",
    subtitle: "Transforming Raw Data into Actionable Insights",
    description: "Expanding analytical capabilities using SQL for relational queries, Python for data manipulation, Excel for modeling, and Power BI & Tableau for high-impact visual storytelling.",
    tags: ["SQL", "Python", "Excel", "Power BI", "Tableau", "Data Modeling"]
  },
  {
    period: "2026",
    title: "Data Structures & Algorithms",
    subtitle: "Problem Solving in Java",
    description: "Currently strengthening problem-solving proficiency in Java across core algorithmic paradigms, linear and non-linear data structures, and optimal time/space complexity analysis.",
    tags: ["Java", "Problem Solving", "Time Complexity", "Algorithms"]
  },
  {
    period: "2026",
    title: "Hackathons & Technical Projects",
    subtitle: "Real-world Collaborative Engineering",
    description: "Building practical technology solutions, participating in technical hackathons, and developing intelligent software systems like AYUSHYA and AIXIQORA.",
    tags: ["Hackathons", "AYUSHYA", "AIXIQORA", "Applied AI", "Collaboration"]
  }
];

export const DSA_TOPICS: DSATopic[] = [
  { name: "Arrays", focus: "Traversals, sliding window, prefix sums" },
  { name: "Strings", focus: "Pattern matching, palindromes, parsing" },
  { name: "Sorting", focus: "QuickSort, MergeSort, custom comparators" },
  { name: "Searching", focus: "Binary search on values & answer ranges" },
  { name: "Two Pointers", focus: "Opposite ends, fast/slow pointer cycles" },
  { name: "Hashing", focus: "Hash maps, sets, frequency counting" },
  { name: "Linked Lists", focus: "Single/doubly lists, cycle detection" },
  { name: "Stacks", focus: "Monotonic stacks, parentheses validation" },
  { name: "Queues", focus: "BFS queues, deques, sliding windows" },
  { name: "Trees", focus: "Binary search trees, traversals, depth" },
  { name: "Graphs", focus: "BFS, DFS, adjacency lists, shortest path" },
  { name: "Dynamic Programming", focus: "Memoization, tabulation, subproblems" }
];

export const CAREER_AREAS = [
  {
    title: "Full Stack Development",
    desc: "End-to-end web applications with modern frontend frameworks and robust backend servers."
  },
  {
    title: "Software Engineering",
    desc: "Writing clean, maintainable, type-safe code that scales reliably in team environments."
  },
  {
    title: "Frontend Development",
    desc: "Crafting polished, accessible, responsive interfaces with micro-interactions."
  },
  {
    title: "Backend Development",
    desc: "Designing secure RESTful APIs, database schemas, and efficient business logic."
  },
  {
    title: "Data Analytics",
    desc: "Querying relational data, analyzing distributions, and crafting visual reports."
  },
  {
    title: "AI-Powered Applications",
    desc: "Integrating intelligent API workflows and decision-support engines into practical software."
  }
];

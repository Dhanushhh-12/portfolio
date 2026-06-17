import React, { useState, useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import IntroOverlay from './components/IntroOverlay';
import ProjectModal from './components/ProjectModal';
import ContactForm from './components/ContactForm';
import CommunityImpact from './components/CommunityImpact';

const Typewriter = () => {
  const phrases = [
    'MERN Stack Developer',
    'AI Explorer',
    'React.js Engineer',
    'Full-Stack Builder',
  ];
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(phrase.slice(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, 45);
    } else {
      timer = setTimeout(() => {
        setText(phrase.slice(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 95);
    }

    if (!isDeleting && charIdx === phrase.length) {
      clearTimeout(timer);
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
      clearTimeout(timer);
      timer = setTimeout(() => {}, 350);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]);

  return (
    <>
      {text}
      <span className="typewriter-cursor"></span>
    </>
  );
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  
  // Skill panel states
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skillProgressWidth, setSkillProgressWidth] = useState('0%');

  const projectsData = {
    dashboard: {
      title: "Real‑Time Dashboard",
      category: "React.js Application",
      desc: "A high-performance live data rendering dashboard displaying simulated server telemetry, interactive charting tools, and component optimizations. Integrated live websocket simulated telemetry, designed reusable interactive chart controls with custom tooltips, and optimized re-rendering pipelines for heavy data volumes.",
      role: "React Architect & Core Dev",
      duration: "2 Months",
      stack: "React.js, JS ES6+, HTML5, CSS3, Vite",
      perf: "100/100 Dynamic Render Efficiency"
    },
    moviesearch: {
      title: "Movie Search Application",
      category: "React & REST API",
      desc: "An immersive movie search engine connected to TMDB REST APIs, featuring asynchronous search mechanics and responsive catalog grids. Enabled asynchronous searches, responsive catalog layouts, and lazy-loading for posters. Displays full movie details, IMDb scores, and dynamic cinematic cards.",
      role: "Frontend UI Developer",
      duration: "1.5 Months",
      stack: "React.js, REST API, Fetch API, Vite",
      perf: "98/100 API Response Speed"
    },
    todolist: {
      title: "Todo List Application",
      category: "React & ES6 Application",
      desc: "A highly responsive task management application using state persistence, dynamic filter controls, and clean layout patterns. Provides filter categories, responsive UI grids, localStorage data caching, and event propagation optimizations.",
      role: "Core Developer",
      duration: "0.5 Months",
      stack: "React.js, JS ES6+, Vite",
      perf: "99/100 Interaction Score"
    },
    shoestore: {
      title: "Shoe Store E‑Commerce",
      category: "Frontend Web Development",
      desc: "A premium digital shopping platform with catalog filtering, animated shopping cart interactions, and fully responsive CSS grid styling. Tailored layouts optimized for swift cart updates, client-side catalog filtering, and zero-shifting responsive grid templates.",
      role: "Frontend Lead",
      duration: "1.5 Months",
      stack: "HTML5, CSS3, JavaScript",
      perf: "97/100 Mobile Responsiveness"
    },
    converter: {
      title: "Currency Converter",
      category: "API Integration Web App",
      desc: "A lightweight financial converter using secure currency exchange APIs to fetch and cache live exchange rates with automatic failover routines, delivering instant conversion calculations with zero lag.",
      role: "API Integration Engineer",
      duration: "1 Month",
      stack: "HTML5, JS, REST API, Fetch API",
      perf: "99/100 Conversion Speed"
    }
  };

  const skillsData = [
    {
      category: 'Frontend',
      skills: [
        { name: 'JavaScript', level: '90%', desc: 'Core programming logic, asynchronous event loop patterns, DOM manipulations, ES6+ modules, and functional interfaces.', exp: 'Experience' },
        { name: 'React.js', level: '80%', desc: 'Component-driven design, custom hooks, state lifecycle architectures, virtual DOM reconciliation, and performance tuning.', exp: 'Experience' },
        { name: 'HTML5 / CSS3', level: '99%', desc: 'Semantic layout, responsive media structures, custom properties, Flexbox/Grid systems, and hardware-accelerated animations.', exp: 'Experience' }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: '82%', desc: 'Asynchronous server routing, middleware integrations, event-driven API backends, and file system controllers.', exp: 'Experience' },
        { name: 'Java', level: '85%', desc: 'Object-oriented design patterns, multithreaded pipelines, abstract structures, and strict typing validations.', exp: 'Experience' }
      ]
    },
    {
      category: 'Database',
      skills: [
        { name: 'MongoDB', level: '80%', desc: 'Document validation, compound query architectures, collection structures, and efficient index optimizations.', exp: 'Experience' }
      ]
    },
    {
      category: 'Learning & Exploring',
      skills: [
        { name: 'Python', level: '70%', desc: 'Scripting automation, data parsing systems, library integrations, and basic AI model loading protocols.', exp: 'Learning' },
        { name: 'Data Analytics', level: '55%', desc: 'Extracting, cleaning, and formatting datasets to generate statistical summaries and visual graphs.', exp: 'Learning' },
        { name: 'AI', level: '45%', desc: 'Exploring LLM APIs, prompt engineering frameworks, and neural network mechanics for smart app integrations.', exp: 'Exploring' }
      ]
    }
  ];

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setSkillProgressWidth('0%');
    setTimeout(() => {
      setSkillProgressWidth(skill.level);
    }, 50);
  };

  useEffect(() => {
    // 1. Navbar Scrolled State
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // 2. Active section highlights
    const handleNavHighlight = () => {
      const sections = document.querySelectorAll('section');
      let current = 'hero';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 180)) {
          current = section.getAttribute('id') || 'hero';
        }
      });
      setActiveSection(current);
    };

    // 3. Scroll Progress bar
    const scrollBar = document.getElementById('scroll-progress');
    const handleScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (scrollBar) scrollBar.style.width = pct + '%';
    };

    // 4. Parallax Background
    const handleParallax = () => {
      const shift = window.scrollY * 0.18;
      document.body.style.backgroundPositionY = `calc(center + ${shift}px)`;
    };

    // 5. Cursor Spotlight
    const spotlight = document.getElementById('cursor-spotlight');
    let spotX = 0, spotY = 0, currentX = 0, currentY = 0;
    let spotVisible = false;

    const handleMouseMoveSpot = (e) => {
      spotX = e.clientX;
      spotY = e.clientY;
      if (!spotVisible && spotlight) {
        spotlight.style.opacity = '1';
        spotVisible = true;
      }
    };
    const handleMouseLeaveSpot = () => {
      if (spotlight) {
        spotlight.style.opacity = '0';
        spotVisible = false;
      }
    };

    let spotlightAnimId;
    const animateSpotlight = () => {
      currentX += (spotX - currentX) * 0.1;
      currentY += (spotY - currentY) * 0.1;
      if (spotlight) {
        spotlight.style.left = currentX + 'px';
        spotlight.style.top  = currentY + 'px';
      }
      spotlightAnimId = requestAnimationFrame(animateSpotlight);
    };

    // Attach windows/global scroll/mouse listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleNavHighlight);
    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    window.addEventListener('scroll', handleParallax, { passive: true });
    window.addEventListener('mousemove', handleMouseMoveSpot, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeaveSpot);
    animateSpotlight();

    // 6. Interactive DOM animations: Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

    // 7. Staggered Child Reveals
    const containers = document.querySelectorAll(
      '.work-grid, .achievements-grid, .about-highlights-grid, .skills-categories-container'
    );
    containers.forEach(container => {
      Array.from(container.children).forEach((child, i) => {
        child.classList.add('reveal-child');
        child.style.transitionDelay = (i * 80) + 'ms';
      });
    });

    const childObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          childObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-child').forEach(el => childObserver.observe(el));

    // 8. Editorial Number Shimmer
    const nums = document.querySelectorAll('.editorial-num');
    const shimmerObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.remove('shimmer-active');
          void el.offsetWidth;
          el.classList.add('shimmer-active');
          shimmerObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    nums.forEach(n => shimmerObs.observe(n));

    // 9. Premium Magnetic micro-animations
    const magneticElements = document.querySelectorAll('.btn, .logo, .nav-link');
    const handleMagneticMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const pull = 0.2;
      
      let tiltTransform = '';
      if (el.hasAttribute('data-tilt')) {
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - py) / centerY) * 12;
        const rotateY = ((px - centerX) / centerX) * 12;
        tiltTransform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) `;
      }
      el.style.transform = `${tiltTransform}translate(${x * pull}px, ${y * pull}px) scale(1.02)`;
    };
    const handleMagneticLeave = (e) => {
      const el = e.currentTarget;
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate(0, 0) scale(1)';
    };

    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', handleMagneticMove);
      el.addEventListener('mouseleave', handleMagneticLeave);
    });

    // 10. 3D Tilt for premium cards
    const tiltElements = document.querySelectorAll('[data-tilt]:not(.btn)');
    const handleTiltMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((centerY - y) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const handleTiltLeave = (e) => {
      const el = e.currentTarget;
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    tiltElements.forEach((el) => {
      el.addEventListener('mousemove', handleTiltMove);
      el.addEventListener('mouseleave', handleTiltLeave);
    });

    // Cleanup functions
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleNavHighlight);
      window.removeEventListener('scroll', handleScrollProgress);
      window.removeEventListener('scroll', handleParallax);
      window.removeEventListener('mousemove', handleMouseMoveSpot);
      window.removeEventListener('mouseleave', handleMouseLeaveSpot);
      cancelAnimationFrame(spotlightAnimId);
      revealObserver.disconnect();
      childObserver.disconnect();
      shimmerObs.disconnect();
      magneticElements.forEach((el) => {
        el.removeEventListener('mousemove', handleMagneticMove);
        el.removeEventListener('mouseleave', handleMagneticLeave);
      });
      tiltElements.forEach((el) => {
        el.removeEventListener('mousemove', handleTiltMove);
        el.removeEventListener('mouseleave', handleTiltLeave);
      });
    };
  }, []);

  return (
    <>
      <IntroOverlay />
      
      {/* Scroll Progress Bar */}
      <div id="scroll-progress"></div>

      {/* Cursor Spotlight */}
      <div id="cursor-spotlight"></div>

      {/* Particle Background Canvas */}
      <ParticleCanvas />

      {/* NAVBAR */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="container nav-container">
          <a href="#hero" className="logo">
            CH.DHANUSH
          </a>

          <ul className="nav-menu">
            <li><a href="#hero" className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}>Intro</a></li>
            <li><a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a></li>
            <li><a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Work</a></li>
            <li><a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a></li>
            <li><a href="#achievements" className={`nav-link ${activeSection === 'achievements' ? 'active' : ''}`}>Credentials</a></li>
            <li><a href="#impact" className={`nav-link ${activeSection === 'impact' ? 'active' : ''}`}>Impact</a></li>
            <li><a href="#contact" className="nav-link nav-cta">Contact</a></li>
          </ul>

          <button 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown drawer */}
      <ul className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><a href="#hero" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Intro</a></li>
        <li><a href="#about" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>About Me</a></li>
        <li><a href="#projects" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Selected Work</a></li>
        <li><a href="#skills" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Skills &amp; Tools</a></li>
        <li><a href="#achievements" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Credentials</a></li>
        <li><a href="#impact" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Impact</a></li>
        <li><a href="#contact" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</a></li>
      </ul>

      {/* HERO SECTION */}
      <section id="hero">
        <div className="container">
          <div className="editorial-header fade-up-0" style={{ marginTop: '40px', marginBottom: '50px' }}>
            <span className="editorial-num">01</span>
            <h2 className="editorial-title">Intro</h2>
          </div>
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-tagline fade-up-0">AVAILABLE FOR NEW COLLABORATIONS</div>
              <h1 className="hero-title fade-up-1">
                <span className="name">Chedadeepu</span>
                <span className="italic-accent">Dhanush</span>
              </h1>
              <div className="hero-role fade-up-2">
                <Typewriter />
              </div>
              <p className="hero-bio fade-up-2">
                Passionate about building modern, scalable web applications with the MERN stack. Currently learning Data
                Analytics and Artificial Intelligence to integrate AI into smarter, data-driven solutions.
              </p>
              <div className="hero-actions fade-up-3">
                <a href="#projects" className="btn btn-primary" data-tilt>View Projects</a>
                <a href="#contact" className="btn btn-ghost" data-tilt>Get In Touch</a>
              </div>
            </div>
            <div className="hero-visual fade-up-3">
              <div className="profile-frame" data-tilt>
                <div className="profile-inner" onClick={() => setIsLightboxOpen(true)} style={{ cursor: 'pointer' }}>
                  <img className="profile-img" src="/host.jpg" alt="Chedadeepu Dhanush Photo Profile" />
                  <div className="profile-overlay">
                    <span className="view-btn-3d">View Photo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="reveal">
        <div className="container">
          <div className="editorial-header">
            <span className="editorial-num">02</span>
            <h2 className="editorial-title">About Me</h2>
          </div>

          <div className="about-layout">
            <div className="about-philosophy-col">
              <p className="about-philosophy">
                &ldquo;I am a passionate MERN Stack Developer with a strong interest in building modern and scalable web
                applications. Currently learning Data Analytics and exploring Artificial Intelligence to expand my technical
                skills.&rdquo;
              </p>
              <p className="about-text">
                My goal is to integrate AI into future applications to create smarter, more efficient, and data-driven
                solutions. I anchor my development cycle around algorithmic speed, interface responsive models, and secure
                database operations.
              </p>
            </div>
            <div className="about-details-col">
              <div className="about-highlights-grid">
                <div className="about-highlight-card" data-tilt>
                  <span>MERN Stack</span>
                  <p>Constructing scalable MongoDB, Express, React, and Node.js structures with optimized workflows.</p>
                </div>
                <div className="about-highlight-card" data-tilt>
                  <span>AI &amp; Data</span>
                  <p>Exploring analytics pipelines, models integration, and data-driven predictive systems.</p>
                </div>
                <div className="about-highlight-card" data-tilt>
                  <span>Problem Solving</span>
                  <p>Focusing on logic architecture, clean interfaces, and robust algorithm performance.</p>
                </div>
                <div className="about-highlight-card" data-tilt>
                  <span>Continuous Growth</span>
                  <p>Absorbing cutting-edge systems daily, evolving with backend security and deployment standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="reveal">
        <div className="container">
          <div className="editorial-header">
            <span className="editorial-num">03</span>
            <h2 className="editorial-title">Selected Work</h2>
          </div>

          <div className="work-grid">
            {/* Featured Project */}
            <div 
              className="project-card featured" 
              onClick={() => setActiveProject(projectsData.dashboard)} 
              data-tilt
            >
              <div>
                <div className="project-meta-row">
                  <span className="project-label">Featured Work</span>
                  <span className="project-label">React App</span>
                </div>
                <h3 className="project-card-title">Real-Time Dashboard</h3>
                <p className="project-desc">
                  A high-performance live data rendering dashboard displaying simulated server telemetry, interactive
                  charting tools, and component optimizations.
                </p>
              </div>
              <div className="project-card-footer">
                <div className="project-tags-list">
                  <span className="project-tag-item">React.js</span>
                  <span className="project-tag-item">JS ES6+</span>
                  <span className="project-tag-item">HTML5</span>
                  <span className="project-tag-item">CSS3</span>
                  <span className="project-tag-item">Vite</span>
                </div>
                <div className="project-arrow-symbol">&rarr;</div>
              </div>
            </div>

            {/* Project 2 */}
            <div 
              className="project-card" 
              onClick={() => setActiveProject(projectsData.moviesearch)} 
              data-tilt
            >
              <div>
                <div className="project-meta-row">
                  <span className="project-label">02 / Selected Works</span>
                  <span className="project-label">API Integration</span>
                </div>
                <h3 className="project-card-title">Movie Search Application</h3>
                <p className="project-desc">
                  An immersive movie search engine connected to TMDB REST APIs, featuring asynchronous search mechanics and
                  responsive catalog grids.
                </p>
              </div>
              <div className="project-card-footer">
                <div className="project-tags-list">
                  <span className="project-tag-item">React.js</span>
                  <span className="project-tag-item">REST API</span>
                  <span className="project-tag-item">Fetch API</span>
                  <span className="project-tag-item">Vite</span>
                </div>
                <div className="project-arrow-symbol">&rarr;</div>
              </div>
            </div>

            {/* Project 3 */}
            <div 
              className="project-card" 
              onClick={() => setActiveProject(projectsData.todolist)} 
              data-tilt
            >
              <div>
                <div className="project-meta-row">
                  <span className="project-label">03 / Selected Works</span>
                  <span className="project-label">Core Application</span>
                </div>
                <h3 className="project-card-title">Todo List Application</h3>
                <p className="project-desc">
                  A highly responsive task management application using state persistence, dynamic filter controls, and
                  clean layout patterns.
                </p>
              </div>
              <div className="project-card-footer">
                <div className="project-tags-list">
                  <span className="project-tag-item">React.js</span>
                  <span className="project-tag-item">JS ES6+</span>
                  <span className="project-tag-item">Vite</span>
                </div>
                <div className="project-arrow-symbol">&rarr;</div>
              </div>
            </div>

            {/* Project 4 */}
            <div 
              className="project-card" 
              onClick={() => setActiveProject(projectsData.shoestore)} 
              data-tilt
            >
              <div>
                <div className="project-meta-row">
                  <span className="project-label">04 / Selected Works</span>
                  <span className="project-label">Frontend Platform</span>
                </div>
                <h3 className="project-card-title">Shoe Store E-Commerce</h3>
                <p className="project-desc">
                  A premium digital shopping platform with catalog filtering, animated shopping cart interactions, and fully
                  responsive CSS grid styling.
                </p>
              </div>
              <div className="project-card-footer">
                <div className="project-tags-list">
                  <span className="project-tag-item">HTML5</span>
                  <span className="project-tag-item">CSS3</span>
                  <span className="project-tag-item">JavaScript</span>
                </div>
                <div className="project-arrow-symbol">&rarr;</div>
              </div>
            </div>

            {/* Project 5 */}
            <div 
              className="project-card" 
              onClick={() => setActiveProject(projectsData.converter)} 
              data-tilt
            >
              <div>
                <div className="project-meta-row">
                  <span className="project-label">05 / Selected Works</span>
                  <span className="project-label">API Integration</span>
                </div>
                <h3 className="project-card-title">Currency Converter</h3>
                <p className="project-desc">
                  A lightweight financial converter using secure currency exchange APIs to fetch and cache live exchange
                  rates with automatic failover routines.
                </p>
              </div>
              <div className="project-card-footer">
                <div className="project-tags-list">
                  <span className="project-tag-item">HTML5</span>
                  <span className="project-tag-item">JS</span>
                  <span className="project-tag-item">REST API</span>
                  <span className="project-tag-item">Fetch API</span>
                </div>
                <div className="project-arrow-symbol">&rarr;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="reveal">
        <div className="container">
          <div className="editorial-header">
            <span className="editorial-num">04</span>
            <h2 className="editorial-title">Skills &amp; Technologies</h2>
          </div>

          <div className="skills-editorial-wrap">
            <p className="skills-editorial-intro">
              Select a tech badge below to view technical level, experience details, and conceptual integration depth.
            </p>

            <div className="skills-categories-container">
              {skillsData.map((categoryGroup, index) => (
                <div className="skills-category-group" key={index}>
                  <h3 className="skills-category-title">{categoryGroup.category}</h3>
                  <div className="skills-grid">
                    {categoryGroup.skills.map((skill, sIndex) => (
                      <button 
                        key={sIndex}
                        className={`skill-badge ${selectedSkill?.name === skill.name ? 'active' : ''}`}
                        onClick={() => handleSkillClick(skill)}
                      >
                        ▸ {skill.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Skill Detail Panel */}
            {selectedSkill && (
              <div id="skill-detail-panel" style={{ display: 'block' }}>
                <div className="skill-detail-header">
                  <span className="skill-detail-title">{selectedSkill.name}</span>
                  <span className="skill-detail-exp">{selectedSkill.exp}</span>
                </div>
                <div 
                  className="skills-editorial-intro"
                  style={{ marginTop: '10px', textAlign: 'left', marginBottom: '10px', fontSize: '10px' }}
                >
                  INDICATOR
                </div>
                <div className="skill-detail-bar-wrap">
                  <div 
                    className="skill-detail-progress-line" 
                    style={{ width: skillProgressWidth }}
                  ></div>
                </div>
                <p className="skill-detail-desc-text">{selectedSkill.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CREDENTIALS SECTION */}
      <section id="achievements" className="reveal">
        <div className="container">
          <div className="editorial-header">
            <span className="editorial-num">05</span>
            <h2 className="editorial-title">Credentials &amp; Achievements</h2>
          </div>

          <div className="achievements-grid">
            {/* Certificate 1 */}
            <a 
              href="https://www.linkedin.com/posts/chedadeepu-dhanush-b3123a380_i-am-pleased-to-share-that-on-may-21-2026-share-7463118607720361986-u20k/"
              target="_blank" 
              rel="noreferrer"
              className="achievement-card" 
              data-tilt
            >
              <div>
                <div className="achievement-icon">★</div>
                <h3 className="achievement-title">Certificate on Financial Services Learning Plan: Data Analytics</h3>
                <span className="achievement-issuer">Verified LinkedIn Post</span>
                <p className="achievement-desc">
                  I am pleased to share that on May 21, 2026, I officially completed the Financial Services Learning Plan:
                  Data Analytics through AWS Training & Certification.
                  Issued under the authority of Michelle Vaz, Director of AWS Training & Certification, this specialized
                  completion certificate marks the culmination of targeted coursework designed around cloud-based data
                  analytics.
                </p>
              </div>
              <span className="achievement-date">May <span>&nearr;</span></span>
            </a>

            {/* Certificate 2 */}
            <a 
              href="https://www.linkedin.com/posts/chedadeepu-dhanush-b3123a380_im-excited-to-share-that-i-have-successfully-share-7439327455972278272-kwol/"
              target="_blank" 
              rel="noreferrer"
              className="achievement-card" 
              data-tilt
            >
              <div>
                <div className="achievement-icon">★</div>
                <h3 className="achievement-title">Technology Job Simulation</h3>
                <span className="achievement-issuer">Verified LinkedIn Post</span>
                <p className="achievement-desc">
                  Completed professional full stack curriculum details, mastering core MERN schema rules, async code
                  patterns, and client state structures.
                </p>
              </div>
              <span className="achievement-date">2025 <span>&nearr;</span></span>
            </a>

            {/* Certificate 3 */}
            <a 
              href="https://www.linkedin.com/posts/chedadeepu-dhanush-b3123a380_hackathon-winner-team-ignite-ugcPost-7431279649491595265-bRpw/"
              target="_blank" 
              rel="noreferrer"
              className="achievement-card" 
              data-tilt
            >
              <div>
                <div className="achievement-icon">★</div>
                <h3 className="achievement-title">Hackathon Winner — Team Ignite</h3>
                <span className="achievement-issuer">Verified LinkedIn Post</span>
                <p className="achievement-desc">
                  Awarded 1st place in the hackathon challenge. Built a dynamic data optimization application, leading
                  layout design and API flow mechanics.
                </p>
              </div>
              <span className="achievement-date">Awarded<span>&nearr;</span></span>
            </a>

            {/* Certificate 4 */}
            <a 
              href="https://www.linkedin.com/posts/chededeepu-dhanush-b3123a380_excited-to-share-that-i-have-successfully-share-7470756476710596608-37v-/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF4B1NUBeM885y2F1Qb_N5Msg08yLE940Xg"
              target="_blank" 
              rel="noreferrer"
              className="achievement-card" 
              data-tilt
            >
              <div>
                <div className="achievement-icon">★</div>
                <h3 className="achievement-title">SQL and Relational Databases 101</h3>
                <span className="achievement-issuer">Verified LinkedIn Post</span>
                <p className="achievement-desc">
                  Excited to share that I have successfully completed the SQL and Relational Databases 101 course offered by
                  IBM Skills Network through Cognitive Class.
                  Throughout this course, I gained valuable knowledge in SQL Fundamentals, Relational Database Concepts, 
                  Data Querying and Management, and Database Design best practices.
                </p>
              </div>
              <span className="achievement-date">June 2026 <span>&nearr;</span></span>
            </a>
          </div>
        </div>
      </section>

      {/* COMMUNITY & IMPACT SECTION */}
      <CommunityImpact />

      {/* CONTACT SECTION */}
      <section id="contact" className="reveal">
        <div className="container">
          <div className="editorial-header">
            <span className="editorial-num">07</span>
            <h2 className="editorial-title">Initiate Contact</h2>
          </div>

          <div className="contact-architectural-layout">
            <div className="contact-quote-col">
              <p className="contact-editorial-quote">
                &ldquo;Simplicity is not the absence of clutter, but the presence of absolute structural clarity and
                editorial luxury.&rdquo;
              </p>
              <div className="contact-cta-col">
                <span className="contact-label-mono">DIRECT CHANNEL</span>
                <a href="mailto:chedadeepudhanush15@gmail.com" className="contact-gold-email">chedadeepudhanush15@gmail.com</a>
                <div className="contact-meta-details">
                  <p>NAME: <span>Dhanush Chedadeepu</span></p>
                  <p>LOCATION: <span>Hyderabad, Telangana, India</span></p>
                  <p>PHONE: <span>+91 89196 47087</span></p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>

          {/* FOOTER */}
          <footer className="editorial-footer">
            <div className="footer-col">
              &copy; 2026 DHANUSH CHEDADEEPU. ALL RIGHTS RESERVED.
            </div>
            <div className="footer-col align-center">
              STYLE: DARK LUXURY EDITORIAL
            </div>
            <div className="footer-col align-right">
              HYDERABAD, TELANGANA, IN
            </div>
          </footer>
        </div>
      </section>

      {/* IMAGE LIGHTBOX OVERLAY */}
      <div 
        className={`lightbox-overlay ${isLightboxOpen ? 'active' : ''}`} 
        onClick={() => setIsLightboxOpen(false)}
      >
        <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>[ Close ]</button>
        <img 
          className="lightbox-img" 
          src="/host.jpg" 
          alt="Dhanush Chedadeepu Profile Lightbox"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* CASE STUDY MODAL */}
      <ProjectModal 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
      />
    </>
  );
}

export default App;

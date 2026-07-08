import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';

export const Hero: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse positions for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth movement
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center pt-24 pb-16 md:pt-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:px-12">

        {/* Left Side: Bio / Copy */}
        <div className="order-2 text-center md:order-1 md:col-span-7 md:text-left">
          {/* Subtitle Accent Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-4.5 py-1.5 text-xs font-semibold tracking-wide text-accent-cyan"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan"></span>
            </span>
            Available for Internships
          </motion.div>

          {/* Main Name Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 font-display text-4xl font-extrabold tracking-tight text-theme-text sm:text-5xl lg:text-6xl"
          >
            Hi, I'm <span className="text-gradient-purple">Chededeepu Dhanush</span>
          </motion.h1>

          {/* Professional Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 font-display text-lg font-bold tracking-tight text-accent-cyan sm:text-xl lg:text-2xl"
          >
            MERN Developer | Data Analytics Enthusiast
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 max-w-xl font-sans text-base leading-relaxed text-theme-text-muted sm:text-lg"
          >
            I am a passionate Computer Science student dedicated to building modern web applications and solving real-world problems. I enjoy learning new technologies, developing responsive applications, and continuously improving my technical skills.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:justify-start"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="group flex items-center gap-2 rounded-xl bg-accent-blue px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-blue/20 transition-all duration-300 hover:bg-accent-blue/90 hover:shadow-accent-blue/30 hover:translate-y-[-2px]"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 rounded-xl border border-theme-card-border bg-theme-card px-6 py-3.5 text-sm font-semibold text-theme-text transition-all duration-300 hover:border-accent-cyan/30 hover:bg-theme-card-border hover:translate-y-[-2px]"
            >
              <Download className="h-4 w-4 text-accent-cyan" />
              Download Resume
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 rounded-xl border border-theme-card-border bg-theme-card px-6 py-3.5 text-sm font-semibold text-theme-text transition-all duration-300 hover:border-accent-cyan/30 hover:bg-theme-card-border hover:translate-y-[-2px]"
            >
              <Mail className="h-4 w-4 text-accent-purple" />
              Contact Me
            </button>
          </motion.div>

          {/* Social Icons Quick Access */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-8 flex items-center justify-center gap-5 md:justify-start text-theme-text-muted"
          >
            <a
              href="https://github.com/Dhanushhh-12"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent-cyan"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent-cyan"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Floating Profile Glass Card */}
        <div className="order-1 flex justify-center md:order-2 md:col-span-5 relative">

          {/* Animated HUD Vector Graphic behind card */}
          <div className="absolute -z-10 h-[340px] w-[340px] sm:h-[380px] sm:w-[380px] md:h-[420px] md:w-[420px] opacity-20 dark:opacity-30 pointer-events-none select-none flex items-center justify-center">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full animate-[spin_45s_linear_infinite]">
              {/* Radar Rings */}
              <circle cx="100" cy="100" r="85" stroke="url(#hero-gradient)" strokeWidth="0.4" strokeDasharray="2 6" />
              <circle cx="100" cy="100" r="95" stroke="url(#hero-gradient)" strokeWidth="0.25" />
              <circle cx="100" cy="100" r="65" stroke="url(#hero-gradient)" strokeWidth="0.3" strokeDasharray="1 3" />
              {/* Outer Corners */}
              <path d="M15 35 L15 15 L35 15" stroke="url(#hero-gradient)" strokeWidth="0.6" />
              <path d="M185 35 L185 15 L165 15" stroke="url(#hero-gradient)" strokeWidth="0.6" />
              <path d="M15 165 L15 185 L35 185" stroke="url(#hero-gradient)" strokeWidth="0.6" />
              <path d="M185 165 L185 185 L165 185" stroke="url(#hero-gradient)" strokeWidth="0.6" />

              <defs>
                <linearGradient id="hero-gradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--accent-blue)" />
                  <stop offset="0.5" stopColor="var(--accent-cyan)" />
                  <stop offset="1" stopColor="var(--accent-purple)" />
                </linearGradient>
              </defs>
            </svg>
            {/* Stationary Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-500/20 pointer-events-none">
              <svg viewBox="0 0 200 200" fill="none" className="h-[90%] w-[90%]">
                <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 3" />
                <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 3" />
              </svg>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="perspective-1000 z-10"
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY }}
              className="glass-card relative flex h-72 w-72 items-center justify-center overflow-hidden rounded-3xl p-3 shadow-2xl sm:h-80 sm:w-80 md:h-[350px] md:w-[350px]"
            >
              {/* Inner Gradient border overlay */}
              <div className="absolute inset-0 rounded-3xl border border-white/10" />

              {/* Glowing Mesh Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/15 via-transparent to-accent-cyan/15 opacity-60" />

              {/* Floating Profile Image */}
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-dark-900">
                <img
                  src="/profile.jpeg"
                  alt="Chededeepu Dhanush"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Floating Mini Tech Tags for visual pop */}
              <motion.div
                className="absolute bottom-6 left-6 rounded-lg bg-dark-950/80 px-3 py-1.5 text-xs font-semibold text-accent-cyan border border-white/5 shadow-md backdrop-blur-md"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                Code
              </motion.div>
              <motion.div
                className="absolute top-6 right-6 rounded-lg bg-dark-950/80 px-3 py-1.5 text-xs font-semibold text-accent-purple border border-white/5 shadow-md backdrop-blur-md"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                Data
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.button
          onClick={() => scrollToSection('about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-theme-text-muted hover:text-accent-cyan"
          aria-label="Scroll Down"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold">Explore</span>
          <span className="block h-6 w-3.5 rounded-full border border-theme-text-muted/40 p-1">
            <span className="block h-1.5 w-1 rounded-full bg-accent-cyan animate-pulse" />
          </span>
        </motion.button>
      </div>

    </section>
  );
};

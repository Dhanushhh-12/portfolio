import React, { useRef } from 'react';
import { PERSONAL_INFO, TERMINAL_DATA } from '../../data/portfolioData';
import { Github, Linkedin, ArrowRight, Terminal as TerminalIcon, Sparkles } from '../ui/icons';
import { useHeroEntrance } from '../../hooks/useGSAPAnimations';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Shared GSAP Hero Timeline Hook
  useHeroEntrance(heroRef);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Core Value Proposition & Headings */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Status Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0284C7] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0284C7]" />
            </span>
            <span className="text-[#0284C7] tracking-wide font-medium">
              {PERSONAL_INFO.status}
            </span>
          </div>

          {/* Main Headline (60-72px, weight 700-800) */}
          <div className="hero-headline space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-[#111111] leading-[1.08]">
              Hi, I'm <span className="text-[#0284C7]">Dhanush</span>. <br />
              I build <span className="text-gradient-cyan">modern digital</span> experiences.
            </h1>
          </div>

          {/* Description (16-18px, weight 400, #555555) */}
          <p className="hero-description text-base sm:text-lg text-[#555555] font-normal leading-relaxed max-w-2xl">
            Full Stack Developer passionate about building scalable web applications, intuitive user experiences and intelligent solutions — while growing my expertise in Data Analytics and AI.
          </p>

          {/* Primary Action Buttons (15-16px, weight 600) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToProjects}
              className="hero-cta-item inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[15px] bg-[#0284C7] text-white hover:bg-[#0369A1] hover:shadow-cyan-sm transition-all duration-200 active:scale-95 shadow-sm"
            >
              <span>View My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToContact}
              className="hero-cta-item inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[15px] bg-[#FFFFFF] hover:bg-[#F8FAFC] text-[#111111] border border-[#E5E7EB] hover:border-[#CBD5E1] transition-all duration-200 active:scale-95 shadow-sm"
            >
              <span>Let's Connect</span>
            </button>

            {/* Social Links */}
            <div className="flex items-center gap-2 pl-2">
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-item p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] text-[#555555] hover:text-[#0284C7] hover:border-[#0284C7]/40 shadow-sm transition-all"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-item p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] text-[#555555] hover:text-[#0284C7] hover:border-[#0284C7]/40 shadow-sm transition-all"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Location & University Tag */}
          <div className="hero-meta flex items-center gap-4 pt-3 text-xs sm:text-sm font-mono text-[#777777]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#777777]" />
              {PERSONAL_INFO.location}
            </span>
            <span>•</span>
            <span>CMR Institute of Technology</span>
          </div>

        </div>

        {/* Right Column: Subtle Developer Terminal Card */}
        <div className="lg:col-span-5">
          <div className="hero-terminal-card dev-card dev-card-hover overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm">
            
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-3.5 h-3.5 text-[#0284C7]" />
                <span className="text-xs font-mono text-[#555555]">dhanush@developer: ~</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
              </div>
            </div>

            {/* Terminal Shell Body */}
            <div className="p-6 font-mono text-xs sm:text-[13px] space-y-4 text-[#111111]">
              {TERMINAL_DATA.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[#555555] flex items-center gap-2">
                    <span className="text-[#0284C7] font-semibold">{item.label}</span>
                  </div>
                  <div className="pl-4 text-[#111111] font-medium flex items-center gap-2">
                    {idx === TERMINAL_DATA.length - 1 ? (
                      <span className="inline-flex items-center gap-2 text-[#0284C7]">
                        <span>{item.value}</span>
                        <span className="inline-block w-2 h-4 bg-[#0284C7] animate-pulse" />
                      </span>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] font-mono text-[#777777]">
                <span className="flex items-center gap-1.5 text-[#0284C7] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Systems & AI</span>
                </span>
                <span>Node v20.x • TypeScript 5</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

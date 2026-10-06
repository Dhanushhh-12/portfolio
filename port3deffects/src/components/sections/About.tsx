import React, { useRef } from 'react';
import { ABOUT_PILLARS } from '../../data/portfolioData';
import { Code, BarChart3, BrainCircuit } from '../ui/icons';
import { useScrollReveal, useStaggerReveal } from '../../hooks/useGSAPAnimations';

export const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);

  // Shared GSAP Scroll Hooks
  useScrollReveal(aboutRef, '.about-header');
  useScrollReveal(aboutRef, ['.about-narrative', '.about-academic'], { delay: 0.1 });
  useStaggerReveal(aboutRef, '.about-pillars-grid', '.about-pillar-card', { stagger: 0.15 });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-[#0284C7]" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-[#7C3AED]" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-[#0284C7]" />;
      default:
        return <Code className="w-5 h-5 text-[#0284C7]" />;
    }
  };

  return (
    <section ref={aboutRef} id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header (36-48px, weight 700) */}
      <div className="about-header space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0284C7]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
          <span>About Me</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111111] tracking-tight leading-tight">
          Turning ideas into <span className="text-gradient-cyan">practical digital products</span>.
        </h2>
      </div>

      {/* Main Narrative Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        <div className="about-narrative lg:col-span-8 space-y-5 text-base sm:text-lg text-[#555555] font-normal leading-relaxed">
          <p>
            I'm a Computer Science student and Full Stack Developer who enjoys turning ideas into practical digital products.
          </p>
          <p>
            My development journey includes frontend development, backend development, databases, APIs, data visualization and AI-powered applications.
          </p>
          <p>
            I'm currently strengthening my Data Structures and Algorithms skills while building real-world projects and expanding my knowledge of Data Analytics and AI.
          </p>
        </div>

        <div className="about-academic lg:col-span-4 dev-card p-6 space-y-4 bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm">
          <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block">
            Academic Context
          </span>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-[#111111]">
              B.Tech – Computer Science
            </h3>
            <p className="text-xs text-[#0284C7] font-mono font-medium">
              CMR Institute of Technology, Hyderabad
            </p>
            <p className="text-xs text-[#555555] pt-1">
              Class of 2025–2028 • Active developer & hackathon builder
            </p>
          </div>

          <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-mono text-[#777777]">
            <span>Focus Areas</span>
            <span className="text-[#111111] font-medium">Full Stack • Analytics • AI</span>
          </div>
        </div>

      </div>

      {/* 3 Core Pillar Cards: BUILD, ANALYZE, LEARN */}
      <div className="about-pillars-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {ABOUT_PILLARS.map((pillar) => (
          <div
            key={pillar.tag}
            className="about-pillar-card dev-card dev-card-hover p-8 flex flex-col justify-between bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm"
          >
            <div>
              {/* Pillar Header with Tag & Icon */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-md bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/20">
                  {pillar.tag}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center">
                  {getIcon(pillar.icon)}
                </div>
              </div>

              {/* Title & Description (20-24px, weight 500-600) */}
              <h3 className="text-[22px] font-bold text-[#111111] mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm sm:text-[15px] text-[#555555] leading-relaxed mb-6 font-normal">
                "{pillar.description}"
              </p>
            </div>

            {/* Micro Tech Tags */}
            <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap gap-1.5">
              {pillar.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#F8FAFC] border border-[#E5E7EB] text-[#555555]"
                >
                  {t}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

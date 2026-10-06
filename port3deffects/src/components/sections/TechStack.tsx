import React, { useRef } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Code, Terminal, Layers, Database, BarChart3, Wrench } from '../ui/icons';
import { useScrollReveal, useStaggerReveal } from '../../hooks/useGSAPAnimations';

export const TechStack: React.FC = () => {
  const techStackRef = useRef<HTMLElement>(null);

  // Shared GSAP Scroll Hooks
  useScrollReveal(techStackRef, '.skills-header');
  useStaggerReveal(techStackRef, '.skills-grid', '.skill-category-card', { stagger: 0.1 });

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Programming':
        return <Code className="w-4 h-4 text-[#0284C7]" />;
      case 'Frontend':
        return <Layers className="w-4 h-4 text-[#0284C7]" />;
      case 'Backend':
        return <Terminal className="w-4 h-4 text-[#7C3AED]" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-[#0284C7]" />;
      case 'Data Analytics':
        return <BarChart3 className="w-4 h-4 text-[#7C3AED]" />;
      case 'Development Tools':
        return <Wrench className="w-4 h-4 text-[#555555]" />;
      default:
        return <Code className="w-4 h-4 text-[#0284C7]" />;
    }
  };

  return (
    <section ref={techStackRef} id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header (36-48px, weight 700) */}
      <div className="skills-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0284C7] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
            <span>Technical Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111111] tracking-tight">
            Tools, Technologies & <br />
            <span className="text-gradient-cyan">Core Competencies</span>.
          </h2>
        </div>
        <p className="text-sm font-mono text-[#555555] max-w-md">
          // Production toolsets spanning modern full-stack web architectures, database design, and data analytics pipelines.
        </p>
      </div>

      {/* Categorized Skills Grid */}
      <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div
            key={cat.title}
            className="skill-category-card dev-card dev-card-hover p-6 sm:p-7 flex flex-col justify-between bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center">
                    {getCategoryIcon(cat.title)}
                  </div>
                  <h3 className="font-bold text-base text-[#111111]">
                    {cat.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#777777]">0{idx + 1}</span>
              </div>

              {/* Skills Badges */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#0284C7]/50 hover:bg-[#F0F9FF] text-xs font-mono text-[#111111] transition-all duration-200 cursor-default group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]/60 group-hover:bg-[#0284C7] transition-colors" />
                    <span className="group-hover:text-[#0284C7] transition-colors font-medium">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Category Status */}
            <div className="pt-5 mt-6 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] font-mono text-[#777777]">
              <span>Active Toolset</span>
              <span className="text-[#0284C7] font-semibold">{cat.skills.length} Technologies</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

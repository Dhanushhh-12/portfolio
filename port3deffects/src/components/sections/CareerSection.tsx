import React, { useRef } from 'react';
import { CAREER_AREAS } from '../../data/portfolioData';
import { Briefcase, CheckCircle2, ArrowRight } from '../ui/icons';
import { useScrollReveal, useStaggerReveal } from '../../hooks/useGSAPAnimations';

export const CareerSection: React.FC = () => {
  const careerRef = useRef<HTMLElement>(null);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Shared GSAP Scroll Hooks
  useScrollReveal(careerRef, '.career-container-card');
  useStaggerReveal(careerRef, '.career-areas-grid', '.career-area-card', { stagger: 0.08 });

  return (
    <section ref={careerRef} id="career" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="career-container-card dev-card p-8 sm:p-12 bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm relative overflow-hidden">
        
        {/* Subtle decorative radial */}
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 bg-[#0284C7]/5 rounded-full blur-3xl" />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-8 border-b border-[#E5E7EB] gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0284C7]">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Internship & Career Aspirations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111111] tracking-tight">
              What I'm <span className="text-gradient-cyan">Looking For</span>
            </h2>
            <p className="text-base sm:text-lg text-[#555555] max-w-3xl leading-relaxed pt-1">
              "I'm currently looking for opportunities where I can contribute to real-world software projects, learn from experienced developers and continue growing as a Full Stack Developer."
            </p>
          </div>

          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[15px] bg-[#0284C7] text-white hover:bg-[#0369A1] transition-all self-start lg:self-auto shadow-sm active:scale-95"
          >
            <span>Discuss Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Career Opportunity Focus Areas */}
        <div className="career-areas-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAREER_AREAS.map((area) => (
            <div
              key={area.title}
              className="career-area-card p-5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#0284C7]/40 transition-all group"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284C7] flex-shrink-0" />
                <h3 className="font-bold text-sm text-[#111111] group-hover:text-[#0284C7] transition-colors">
                  {area.title}
                </h3>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed pl-6">
                {area.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

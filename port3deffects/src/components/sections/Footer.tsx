import React, { useRef } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Github, Linkedin, ArrowUp } from '../ui/icons';
import { useScrollReveal } from '../../hooks/useGSAPAnimations';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Shared GSAP Scroll Hook
  useScrollReveal(footerRef, '.footer-container', { start: 'top 95%', y: 20 });

  return (
    <footer ref={footerRef} className="border-t border-[#E5E7EB] bg-[#FFFFFF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="footer-container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center font-bold text-xs text-[#0284C7]">
            {PERSONAL_INFO.monogram}
          </div>
          <div>
            <span className="font-bold text-sm text-[#111111]">
              {PERSONAL_INFO.name}
            </span>
            <p className="text-[11px] font-mono text-[#555555]">
              {PERSONAL_INFO.title}
            </p>
          </div>
        </div>

        {/* Center: Educational Affiliation */}
        <div className="text-center md:text-left text-xs font-mono text-[#777777]">
          <span>CMR Institute of Technology, Hyderabad • Class of 2028</span>
        </div>

        {/* Right: Social & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#555555] hover:text-[#0284C7] transition-colors"
            title="GitHub"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#555555] hover:text-[#0284C7] transition-colors"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#555555] hover:text-[#111111] bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#0284C7]/40 transition-all shadow-sm"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-[#E5E7EB] text-center text-[11px] font-mono text-[#777777]">
        © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, TypeScript & Tailwind CSS.
      </div>
    </footer>
  );
};

import React, { useEffect, useRef } from 'react';
import { Project } from '../../types';
import { X, ExternalLink, Github, Sparkles, CheckCircle2 } from './icons';
import { gsap, useGSAP, prefersReducedMotion } from '../../animations/gsapConfig';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  useGSAP(() => {
    if (!project || prefersReducedMotion() || !dialogRef.current) return;

    gsap.fromTo(
      dialogRef.current,
      { scale: 0.95, opacity: 0, y: 16 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
    );
  }, { scope: dialogRef, dependencies: [project] });

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#000000]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-2xl z-10 text-[#111111]"
      >
        
        {/* Top Header Controls */}
        <div className="flex items-center justify-between pb-5 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-md text-xs font-mono bg-[#0284C7]/10 border border-[#0284C7]/20 text-[#0284C7] font-medium">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#F3E8FF] text-[#7E22CE] border border-[#E9D5FF] font-medium">
                Featured Case Study
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E5E7EB] text-[#555555] hover:text-[#111111] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Title & Tagline */}
        <div className="my-6 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-[#0284C7] font-mono font-medium">
            {project.tagline}
          </p>
          <p className="text-sm sm:text-[15px] text-[#555555] font-sans leading-relaxed pt-1">
            {project.description}
          </p>
        </div>

        {/* Features Checklist */}
        {project.features && (
          <div className="my-6 p-5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-3">
            <h3 className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777777]">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Core Architectural Capabilities</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-sans text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Case Study Details if available */}
        {project.caseStudy && (
          <div className="space-y-5 my-6 text-sm text-[#555555]">
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold block">
                Problem & Context
              </span>
              <p className="leading-relaxed text-xs sm:text-sm">
                {project.caseStudy.problemStatement}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold block">
                Engineering Highlights
              </span>
              <ul className="space-y-1.5 list-disc pl-4 text-xs sm:text-sm">
                {project.caseStudy.architecture.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="my-6 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block">
            Technologies & Tools
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-md text-xs font-mono bg-[#F8FAFC] border border-[#E5E7EB] text-[#0284C7]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="pt-6 border-t border-[#E5E7EB] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#0284C7] text-white hover:bg-[#0369A1] transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Explore on GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#E5E7EB] text-[#111111] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-[#777777] hover:text-[#111111]"
          >
            Close [ESC]
          </button>
        </div>

      </div>
    </div>
  );
};

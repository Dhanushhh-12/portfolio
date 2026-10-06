import React, { useState, useRef } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';
import { ProjectModal } from '../ui/ProjectModal';
import { Github, ExternalLink, ArrowUpRight, Sparkles, CheckCircle2 } from '../ui/icons';
import { gsap, useGSAP, prefersReducedMotion } from '../../animations/gsapConfig';
import { useScrollTriggerRefresh } from '../../hooks/useGSAPAnimations';

export const Projects: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const projectsRef = useRef<HTMLElement>(null);

  const categories = ['All', 'Featured', 'AI & Full Stack', 'Frontend Web'];

  const filteredProjects = selectedFilter === 'All'
    ? PROJECTS
    : selectedFilter === 'Featured'
    ? PROJECTS.filter(p => p.featured)
    : PROJECTS.filter(p => p.category.includes(selectedFilter) || (selectedFilter === 'Frontend Web' && p.category.includes('Frontend')));

  // Refresh ScrollTrigger when filtered project list changes
  useScrollTriggerRefresh([selectedFilter]);

  useGSAP(() => {
    if (prefersReducedMotion() || !projectsRef.current) return;

    // Header reveal
    gsap.fromTo(
      '.projects-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: projectsRef.current.querySelector('.projects-header'),
          start: 'top 85%',
        },
      }
    );

    // Projects grid cards reveal
    gsap.fromTo(
      '.project-card',
      { y: 30, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: projectsRef.current.querySelector('.projects-grid'),
          start: 'top 85%',
        },
      }
    );
  }, { scope: projectsRef, dependencies: [selectedFilter] });

  return (
    <section ref={projectsRef} id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header (36-48px, weight 700) */}
      <div className="projects-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0284C7] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
            <span>Featured Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111111] tracking-tight">
            Code, Architecture & <br />
            <span className="text-gradient-cyan">Real-World Software</span>.
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center flex-wrap gap-2 p-1 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                selectedFilter === cat
                  ? 'bg-[#0284C7] text-white font-semibold shadow-sm'
                  : 'text-[#555555] hover:text-[#111111] hover:bg-[#E2E8F0]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-card dev-card dev-card-hover p-6 sm:p-8 flex flex-col justify-between group bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm"
          >
            <div>
              {/* Card Header: Category + Badges */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/20 font-medium">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#F3E8FF] text-[#7E22CE] border border-[#E9D5FF] font-medium">
                      ★ Featured
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md bg-[#F8FAFC] text-[#555555] hover:text-[#0284C7] border border-[#E5E7EB] hover:border-[#0284C7]/40 transition-colors"
                      title="GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md bg-[#F8FAFC] text-[#555555] hover:text-[#0284C7] border border-[#E5E7EB] hover:border-[#0284C7]/40 transition-colors"
                      title="Live Demo"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 mb-4">
                <h3 className="text-2xl font-bold text-[#111111] group-hover:text-[#0284C7] transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#777777] group-hover:text-[#0284C7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#0284C7] font-medium">
                  {project.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed pt-1 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Key Features List Preview */}
              {project.features && (
                <div className="my-5 p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block mb-1">
                    Key Highlights:
                  </span>
                  {project.features.slice(0, 3).map((feat, fi) => (
                    <div key={fi} className="flex items-center gap-2 text-xs text-[#111111]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                  {project.features.length > 3 && (
                    <div className="text-[11px] font-mono text-[#777777] pl-5">
                      +{project.features.length - 3} more capabilities
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Tech Pills + Case Study Trigger */}
            <div className="pt-4 border-t border-[#E5E7EB]">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#F8FAFC] border border-[#E5E7EB] text-[#555555]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0284C7] hover:text-[#0369A1] group-hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>View Case Study</span>
                </button>

                <span className="text-[11px] font-mono text-[#777777]">
                  Production Scope
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

    </section>
  );
};

import React, { useRef } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Github, Star, GitFork, ArrowUpRight, Terminal, Sparkles } from '../ui/icons';
import { useScrollReveal, useStaggerReveal } from '../../hooks/useGSAPAnimations';

export const GitHubSection: React.FC = () => {
  const githubRef = useRef<HTMLElement>(null);

  const pinnedRepos = [
    {
      name: "AYUSHYA",
      description: "AI-Powered IP & Regulatory Intelligence for Ayurveda medicine and traditional knowledge formulations.",
      language: "JavaScript",
      stars: 14,
      forks: 4,
      url: "https://github.com/Dhanushhh-12",
      updated: "Active"
    },
    {
      name: "AIXIQORA",
      description: "AI-driven career and internship platform with automated resume parser, ATS scoring, and recruiter workflows.",
      language: "JavaScript",
      stars: 12,
      forks: 3,
      url: "https://github.com/Dhanushhh-12",
      updated: "Active"
    },
    {
      name: "portfolio-website",
      description: "Modern, responsive personal developer portfolio built with React, TypeScript, and Tailwind CSS.",
      language: "TypeScript",
      stars: 8,
      forks: 2,
      url: "https://github.com/Dhanushhh-12",
      updated: "Recent"
    }
  ];

  // Visual simulation of git contribution activity grid
  const activityWeeks = Array.from({ length: 24 }).map((_, wIdx) => {
    return Array.from({ length: 7 }).map((_, dIdx) => {
      // Deterministic pseudo activity levels: 0 to 4
      const seed = (wIdx * 7 + dIdx + 3) % 11;
      if (seed > 8) return 3;
      if (seed > 5) return 2;
      if (seed > 2) return 1;
      return 0;
    });
  });

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 3:
        return 'bg-[#0284C7]';
      case 2:
        return 'bg-[#38BDF8]';
      case 1:
        return 'bg-[#BAE6FD]';
      default:
        return 'bg-[#E5E7EB]';
    }
  };

  // Shared GSAP Scroll Hooks
  useScrollReveal(githubRef, '.github-header');
  useScrollReveal(githubRef, '.github-profile-card');
  useStaggerReveal(githubRef, '.github-repos-grid', '.github-repo-card', { stagger: 0.12 });
  useScrollReveal(githubRef, '.github-heatmap-card');

  return (
    <section ref={githubRef} id="github" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header (36-48px, weight 700) */}
      <div className="github-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0284C7]">
            <Github className="w-3.5 h-3.5" />
            <span>Open Source & Version Control</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111111] tracking-tight">
            Code. Build. <span className="text-gradient-cyan">Learn. Repeat.</span>
          </h2>
        </div>

        <a
          href={PERSONAL_INFO.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-[15px] bg-[#FFFFFF] hover:bg-[#F8FAFC] text-[#111111] border border-[#E5E7EB] hover:border-[#0284C7]/50 transition-all shadow-sm self-start md:self-auto"
        >
          <Github className="w-4 h-4 text-[#0284C7]" />
          <span>Explore My GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#777777]" />
        </a>
      </div>

      {/* GitHub Profile Card */}
      <div className="github-profile-card dev-card p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center font-bold text-xl text-[#0284C7]">
            CD
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#111111]">
              {PERSONAL_INFO.name}
            </h3>
            <p className="text-xs font-mono text-[#0284C7] font-medium">
              @{PERSONAL_INFO.social.githubUsername}
            </p>
            <p className="text-xs text-[#555555] font-sans pt-0.5">
              Full Stack Developer & Computer Science Student at CMRIT
            </p>
          </div>
        </div>

        {/* Quick summary badges */}
        <div className="flex items-center gap-4 text-xs font-mono text-[#777777]">
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-center min-w-[100px]">
            <span className="block text-base font-bold text-[#111111]">15+</span>
            <span className="text-[10px] text-[#777777]">Repositories</span>
          </div>
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-center min-w-[100px]">
            <span className="block text-base font-bold text-[#0284C7]">Active</span>
            <span className="text-[10px] text-[#777777]">Commit Flow</span>
          </div>
        </div>
      </div>

      {/* Pinned Repositories Grid */}
      <div className="github-repos-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {pinnedRepos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="github-repo-card dev-card dev-card-hover p-6 flex flex-col justify-between group bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span className="font-bold text-sm text-[#111111] group-hover:text-[#0284C7] transition-colors">
                    {repo.name}
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#0284C7] transition-all" />
              </div>

              <p className="text-xs text-[#555555] leading-relaxed mb-4 line-clamp-3">
                {repo.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] font-mono text-[#777777]">
              <span className="flex items-center gap-1.5 text-[#555555]">
                <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                {repo.language}
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#F59E0B]" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3 text-[#777777]" />
                  {repo.forks}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Contribution Activity Heatmap Preview */}
      <div className="github-heatmap-card dev-card p-6 overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-[#777777] mb-4">
          <span className="flex items-center gap-1.5 text-[#111111] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Continuous Development & Commit Rhythm</span>
          </span>
          <div className="flex items-center gap-1 text-[10px]">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-sm bg-[#E5E7EB]" />
            <div className="w-2.5 h-2.5 rounded-sm bg-[#BAE6FD]" />
            <div className="w-2.5 h-2.5 rounded-sm bg-[#38BDF8]" />
            <div className="w-2.5 h-2.5 rounded-sm bg-[#0284C7]" />
            <span>More</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="flex gap-1.5 min-w-[620px]">
            {activityWeeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1.5 flex-1">
                {week.map((level, di) => (
                  <div
                    key={di}
                    className={`h-2.5 w-full rounded-sm ${getHeatmapColor(level)}`}
                    title={`Day activity level ${level}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

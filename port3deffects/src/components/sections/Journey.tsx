import React, { useRef } from 'react';
import { TIMELINE_JOURNEY } from '../../data/portfolioData';
import { GraduationCap, Code2, Database, Brain, Trophy } from '../ui/icons';
import { useScrollReveal, useStaggerReveal } from '../../hooks/useGSAPAnimations';

export const Journey: React.FC = () => {
  const journeyRef = useRef<HTMLElement>(null);

  // Shared GSAP Scroll Hooks
  useScrollReveal(journeyRef, '.journey-header');
  useStaggerReveal(journeyRef, '.timeline-list', '.timeline-item', { stagger: 0.14 });

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <GraduationCap className="w-4 h-4 text-[#0284C7]" />;
      case 1:
        return <Code2 className="w-4 h-4 text-[#0284C7]" />;
      case 2:
        return <Database className="w-4 h-4 text-[#7C3AED]" />;
      case 3:
        return <Brain className="w-4 h-4 text-[#0284C7]" />;
      case 4:
        return <Trophy className="w-4 h-4 text-[#D97706]" />;
      default:
        return <Code2 className="w-4 h-4 text-[#0284C7]" />;
    }
  };

  return (
    <section ref={journeyRef} id="journey" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header (36-48px, weight 700) */}
      <div className="journey-header space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0284C7]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
          <span>Milestones & Growth</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111111] tracking-tight">
          My Learning <span className="text-gradient-cyan">Journey</span>.
        </h2>
        <p className="text-sm font-mono text-[#555555] max-w-xl">
          // A factual timeline of academic education, full-stack development, data analytics, algorithmic training, and hackathons.
        </p>
      </div>

      {/* Clean Vertical Timeline */}
      <div className="timeline-list relative border-l border-[#E5E7EB] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {TIMELINE_JOURNEY.map((item, idx) => (
          <div key={idx} className="timeline-item relative group">
            
            {/* Timeline Glowing Node Marker */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-4 h-4 rounded-full bg-[#FFFFFF] border-2 border-[#0284C7] group-hover:bg-[#0284C7] transition-all duration-200" />

            {/* Timeline Card */}
            <div className="dev-card dev-card-hover p-6 sm:p-7 bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm">
              
              {/* Header: Period & Icons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#E5E7EB] gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center">
                    {getIcon(idx)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#111111] group-hover:text-[#0284C7] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-[#0284C7] font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#F8FAFC] border border-[#E5E7EB] text-[#555555] self-start sm:self-auto font-medium">
                  {item.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-[15px] text-[#555555] leading-relaxed mb-4 font-normal">
                {item.description}
              </p>

              {/* Tags */}
              {item.tags && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#F8FAFC] border border-[#E5E7EB] text-[#555555]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

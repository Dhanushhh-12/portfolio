import React, { useRef } from 'react';
import { DSA_TOPICS } from '../../data/portfolioData';
import { BrainCircuit } from '../ui/icons';
import { useScrollReveal, useStaggerReveal } from '../../hooks/useGSAPAnimations';

export const DSASection: React.FC = () => {
  const dsaRef = useRef<HTMLElement>(null);

  // Shared GSAP Scroll Hooks
  useScrollReveal(dsaRef, '.dsa-container-card');
  useStaggerReveal(dsaRef, '.dsa-topics-grid', '.dsa-topic-card', { stagger: 0.04 });

  return (
    <section ref={dsaRef} id="dsa" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Container Box */}
      <div className="dsa-container-card dev-card p-8 sm:p-10 bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-[#0284C7]/5 rounded-full blur-3xl" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 mb-8 border-b border-[#E5E7EB] gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0284C7]">
              <BrainCircuit className="w-4 h-4" />
              <span>Algorithmic Problem Solving</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#111111]">
              Currently <span className="text-gradient-cyan">Leveling Up</span>
            </h2>
            <p className="text-sm sm:text-base text-[#555555] max-w-2xl leading-relaxed">
              I'm actively strengthening my problem-solving skills through Data Structures and Algorithms using Java.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-1.5 self-start lg:self-auto min-w-[220px]">
            <span className="text-[11px] font-mono text-[#777777] block">Primary Language</span>
            <div className="flex items-center gap-2 font-bold text-base text-[#111111]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span>Java 17+ / OpenJDK</span>
            </div>
            <span className="text-[11px] font-mono text-[#0284C7] font-medium block">Focus: Optimal Time & Space</span>
          </div>
        </div>

        {/* 12 Algorithmic Topics Grid */}
        <div className="dsa-topics-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {DSA_TOPICS.map((topic) => (
            <div
              key={topic.name}
              className="dsa-topic-card p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#0284C7]/50 hover:bg-[#F0F9FF] transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-sm text-[#111111] group-hover:text-[#0284C7] transition-colors">
                  {topic.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]/70" />
              </div>
              <p className="text-[11px] font-mono text-[#555555] leading-tight">
                {topic.focus}
              </p>
            </div>
          ))}
        </div>

        {/* Note at bottom */}
        <div className="pt-6 mt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#777777] gap-2">
          <span>Focus areas: LeetCode patterns, edge case handling, and complexity optimization</span>
          <span className="text-[#0284C7] font-medium">Active Daily Practice</span>
        </div>

      </div>

    </section>
  );
};

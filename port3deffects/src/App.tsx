import React, { useEffect, useState } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { TechStack } from './components/sections/TechStack';
import { Projects } from './components/sections/Projects';
import { Journey } from './components/sections/Journey';
import { DSASection } from './components/sections/DSASection';
import { GitHubSection } from './components/sections/GitHubSection';
import { CareerSection } from './components/sections/CareerSection';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { GridPulse } from './components/ui/grid-pulse';
import { refreshScrollTriggers } from './animations/gsapConfig';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track active section for clean navbar highlighting
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-25% 0px -40% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Refresh GSAP ScrollTrigger after DOM renders & fonts load
    const timer = setTimeout(() => {
      refreshScrollTriggers();
    }, 150);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#0284C7] selection:text-[#FFFFFF]">
      
      {/* Interactive GridPulse Background (Pointer reactive + ambient pulses across entire page) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <GridPulse className="[mask-image:none]" ambient={2} reach={2.8} cell={24} />
      </div>

      {/* Sticky Dynamic Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Layout */}
      <main className="relative z-10">
        
        {/* 1. Hero Section */}
        <Hero />
        
        <div className="max-w-6xl mx-auto h-px bg-[#E5E7EB]" />
        
        {/* 2. About Me */}
        <About />

        <div className="max-w-6xl mx-auto h-px bg-[#E5E7EB]" />

        {/* 3. Technical Skills */}
        <TechStack />

        <div className="max-w-6xl mx-auto h-px bg-[#E5E7EB]" />

        {/* 4. Projects Showcase & Case Studies */}
        <Projects />

        <div className="max-w-6xl mx-auto h-px bg-[#E5E7EB]" />

        {/* 5. Learning Journey Timeline */}
        <Journey />

        {/* 7. DSA: Currently Leveling Up */}
        <DSASection />

        <div className="max-w-6xl mx-auto h-px bg-[#E5E7EB]" />

        {/* 8. GitHub: Code. Build. Learn. Repeat. */}
        <GitHubSection />

        {/* 9. Career: What I'm Looking For */}
        <CareerSection />

        <div className="max-w-6xl mx-auto h-px bg-[#E5E7EB]" />

        {/* 10. Contact */}
        <Contact />

      </main>

      {/* 11. Footer */}
      <Footer />

    </div>
  );
};

export default App;

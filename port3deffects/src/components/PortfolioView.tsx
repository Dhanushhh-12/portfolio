import React, { useEffect, useState } from 'react';
import { Navbar } from './navigation/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { TechStack } from './sections/TechStack';
import { Projects } from './sections/Projects';
import { Journey } from './sections/Journey';
import { DSASection } from './sections/DSASection';
import { GitHubSection } from './sections/GitHubSection';
import { CareerSection } from './sections/CareerSection';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

export const PortfolioView: React.FC = () => {
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
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#0284C7] selection:text-[#FFFFFF]">
      {/* Subtle Developer Technical Dot Pattern */}
      <div className="fixed inset-0 bg-tech-grid opacity-60 pointer-events-none z-0" />

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

export default PortfolioView;

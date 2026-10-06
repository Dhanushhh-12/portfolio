import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Github, Linkedin, Menu, X, ArrowUpRight } from '../ui/icons';
import { useNavbarReveal } from '../../hooks/useGSAPAnimations';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Shared GSAP Entrance Hook
  useNavbarReveal(headerRef);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E5E7EB] py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand: Monogram + Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] group-hover:border-[#0284C7] flex items-center justify-center font-bold text-sm text-[#0284C7] transition-all duration-200">
            {PERSONAL_INFO.monogram}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[15px] tracking-tight text-[#111111] group-hover:text-[#0284C7] transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[12px] font-mono text-[#555555]">
              Full Stack Developer
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link-item relative px-3.5 py-1.5 rounded-full text-[15px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#0284C7] bg-[#0284C7]/10 font-semibold'
                    : 'text-[#555555] hover:text-[#111111] hover:bg-[#F8FAFC]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Desktop Utilities */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={PERSONAL_INFO.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#555555] hover:text-[#111111] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E5E7EB] transition-all"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#555555] hover:text-[#111111] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E5E7EB] transition-all"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            onClick={() => handleNavClick('#contact')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[15px] font-semibold bg-[#0284C7] text-white hover:bg-[#0369A1] transition-all shadow-sm active:scale-95"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] text-[#555555] hover:text-[#111111]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FFFFFF]/98 border-b border-[#E5E7EB] backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-3 py-2.5 rounded-lg text-[15px] font-medium text-[#555555] hover:text-[#0284C7] hover:bg-[#F8FAFC]"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-[#555555] hover:text-[#0284C7]"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-[#555555] hover:text-[#0284C7]"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => handleNavClick('#contact')}
              className="px-4 py-2 rounded-lg text-[15px] font-semibold bg-[#0284C7] text-white hover:bg-[#0369A1]"
            >
              Let's Connect
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

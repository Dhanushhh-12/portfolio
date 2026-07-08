import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUp } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  colorTheme: 'blue' | 'green' | 'purple' | 'rose' | 'amber';
  setColorTheme: (theme: 'blue' | 'green' | 'purple' | 'rose' | 'amber') => void;
}

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme, colorTheme, setColorTheme }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Update scrolled state
      setIsScrolled(scrollY > 20);
      
      // Update back-to-top visibility
      setShowBackToTop(scrollY > 600);

      // Calculate scroll progress percentage
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Determine active section
      const scrollPosition = scrollY + 120; // offset for navbar height
      
      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 z-[100] h-[3px] bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-panel py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'home')} 
            className="font-display text-xl font-bold tracking-tight text-gradient cursor-pointer"
          >
            Chededeepu Dhanush<span className="text-accent-cyan">.dev</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`relative font-sans text-sm font-medium tracking-wide transition-colors duration-200 hover:text-accent-cyan ${
                      activeSection === item.id 
                        ? 'text-theme-text' 
                        : 'text-theme-text-muted'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-accent-blue to-accent-cyan"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <span className="h-4 w-[1px] bg-theme-card-border" />

            {/* Color Dot Pickers */}
            <div className="flex items-center gap-1.5 bg-theme-card/30 border border-theme-card-border rounded-full p-1 backdrop-blur-sm">
              {[
                { name: 'blue', colorClass: 'bg-blue-500', label: 'Blue' },
                { name: 'green', colorClass: 'bg-emerald-500', label: 'Green' },
                { name: 'purple', colorClass: 'bg-violet-500', label: 'Purple' },
                { name: 'rose', colorClass: 'bg-rose-500', label: 'Rose' },
                { name: 'amber', colorClass: 'bg-amber-500', label: 'Amber' },
              ].map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setColorTheme(theme.name as any)}
                  className={`h-3 w-3 rounded-full border transition-all duration-200 hover:scale-125 hover:shadow-md cursor-pointer ${theme.colorClass} ${
                    colorTheme === theme.name 
                      ? 'border-white ring-1 ring-accent-cyan ring-offset-1 ring-offset-dark-950 scale-110' 
                      : 'border-white/20'
                  }`}
                  title={`Switch to ${theme.label} theme`}
                  aria-label={`Switch to ${theme.label} theme`}
                />
              ))}
            </div>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-theme-card-border bg-theme-card text-theme-text transition-all duration-300 hover:border-accent-cyan/30 hover:bg-theme-card-border"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-4.5 w-4.5 text-yellow-400" /> : <Moon className="h-4.5 w-4.5 text-slate-700" />}
            </button>
          </nav>

          {/* Mobile Actions Menu Icon */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-theme-card-border bg-theme-card text-theme-text"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-4.5 w-4.5 text-yellow-400" /> : <Moon className="h-4.5 w-4.5 text-slate-700" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-theme-card-border bg-theme-card text-theme-text"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 block border-b border-theme-nav-border glass-panel py-6 px-6 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`block font-display text-base font-semibold py-2 transition-colors ${
                      activeSection === item.id 
                        ? 'text-accent-cyan' 
                        : 'text-theme-text-muted'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Color theme switcher */}
            <div className="mt-6 border-t border-theme-nav-border pt-4">
              <span className="text-xs font-semibold text-theme-text-muted uppercase tracking-wider block mb-2.5">Accent Theme</span>
              <div className="flex items-center gap-2">
                {[
                  { name: 'blue', colorClass: 'bg-blue-500', label: 'Blue' },
                  { name: 'green', colorClass: 'bg-emerald-500', label: 'Green' },
                  { name: 'purple', colorClass: 'bg-violet-500', label: 'Purple' },
                  { name: 'rose', colorClass: 'bg-rose-500', label: 'Rose' },
                  { name: 'amber', colorClass: 'bg-amber-500', label: 'Amber' },
                ].map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => {
                      setColorTheme(theme.name as any);
                    }}
                    className={`h-5.5 w-5.5 rounded-full border transition-all duration-200 cursor-pointer ${theme.colorClass} ${
                      colorTheme === theme.name 
                        ? 'border-white ring-2 ring-accent-cyan ring-offset-2 ring-offset-dark-950 scale-110' 
                        : 'border-white/20'
                    }`}
                    title={`Switch to ${theme.label} theme`}
                    aria-label={`Switch to ${theme.label} theme`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-accent-blue/20 bg-theme-card text-accent-blue shadow-lg backdrop-blur-md transition-all duration-300 hover:border-accent-cyan/40 hover:bg-accent-blue/10 hover:text-accent-cyan hover:shadow-cyan-500/10 hover:translate-y-[-2px]"
            aria-label="Back to Top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

import { useEffect, useState } from 'react';
import { BackgroundEffect } from './components/BackgroundEffect';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';

import { CertificationsAchievements } from './sections/CertificationsAchievements';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [colorTheme, setColorTheme] = useState<'blue' | 'green' | 'purple' | 'rose' | 'amber'>('blue');

  useEffect(() => {
    // Apply dark mode theme class
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    // Apply color accent theme class
    const root = window.document.documentElement;
    root.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-rose', 'theme-amber');
    root.classList.add(`theme-${colorTheme}`);
  }, [colorTheme]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="relative min-h-screen bg-theme-bg text-theme-text font-sans transition-colors duration-300">
      {/* Immersive Animated Background */}
      <BackgroundEffect />

      {/* Global Header Navigation */}
      <Navbar 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
      />

      {/* Main Content Layout */}
      <main className="mx-auto max-w-7xl pt-16">
        
        {/* Sections Grid */}
        <div className="flex flex-col gap-12 md:gap-16">
          <Hero />
          <About />
          <Skills />
          <Projects />

          <CertificationsAchievements />
          <Contact />
        </div>
        
      </main>

      {/* Footer Navigation */}
      <Footer />
    </div>
  );
}

export default App;

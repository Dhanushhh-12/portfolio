import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BarChart3, ShoppingBag } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'mern' | 'react' | 'vanilla';
  tags: string[];
  github: string;
  previewType: 'aixi' | 'dashboard' | 'ecommerce';
}

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mern' | 'react' | 'vanilla'>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'AixiQora',
      description: 'AI-powered MERN application featuring authentication, responsive UI, API integration, and modern design.',
      category: 'mern',
      tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind', 'AI API'],
      github: 'https://github.com/Dhanushhh-12/AixiQora',
      previewType: 'aixi',
    },
    {
      id: 2,
      title: 'React Dashboard',
      description: 'Interactive dashboard built using React with reusable components, responsive layout, and modern UI.',
      category: 'react',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
      github: 'https://github.com/Dhanushhh-12/react-dashboard',
      previewType: 'dashboard',
    },
    {
      id: 3,
      title: 'E-Commerce Website',
      description: 'Responsive shopping website built using HTML, CSS, JavaScript, and backend integration with product listing and shopping cart functionality.',
      category: 'vanilla',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Local Storage'],
      github: 'https://github.com/Dhanushhh-12/ecommerce-vanilla',
      previewType: 'ecommerce',
    },
  ];

  const filteredProjects = projects.filter((project) => {
    return activeFilter === 'all' || project.category === activeFilter;
  });

  // Render CSS Interactive Mock Previews
  const renderProjectPreview = (type: 'aixi' | 'dashboard' | 'ecommerce') => {
    switch (type) {
      case 'aixi':
        return (
          <div className="relative flex h-full w-full flex-col bg-dark-950 p-4 font-mono text-[10px] text-accent-cyan select-none overflow-hidden">
            {/* AI Prompt Line */}
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="text-accent-purple font-semibold">&gt;</span>
              <span>analyze_dataset(data.csv)</span>
            </div>
            
            {/* AI Response Line */}
            <div className="mt-3 flex gap-2 rounded bg-dark-900 border border-theme-card-border p-2">
              <Sparkles className="h-3 w-3 text-accent-purple shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1 leading-normal text-white">
                <span className="font-semibold text-accent-cyan">AI: Processed 10k rows.</span>
                <span className="text-[9px] text-theme-text-muted">Detected 3 anomalies. Summary report compiled.</span>
              </div>
            </div>

            {/* Glowing nodes in background */}
            <div className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/10 blur-xl pointer-events-none" />
            
            {/* Mini prompt box */}
            <div className="mt-auto flex items-center justify-between border border-theme-card-border bg-dark-900 rounded px-2 py-1 text-theme-text-muted">
              <span>Ask AI anything...</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="grid h-full w-full grid-cols-12 gap-2 bg-dark-950 p-3 select-none">
            {/* Stats top */}
            <div className="col-span-4 rounded bg-dark-900 border border-theme-card-border p-1.5 flex flex-col justify-between">
              <span className="text-[8px] text-theme-text-muted">Users</span>
              <span className="text-[11px] font-bold text-white">2.4k</span>
              <span className="text-[7px] text-emerald-400 font-semibold">+12%</span>
            </div>
            <div className="col-span-4 rounded bg-dark-900 border border-theme-card-border p-1.5 flex flex-col justify-between">
              <span className="text-[8px] text-theme-text-muted">Sales</span>
              <span className="text-[11px] font-bold text-white">$14.2k</span>
              <span className="text-[7px] text-emerald-400 font-semibold">+8%</span>
            </div>
            <div className="col-span-4 rounded bg-dark-900 border border-theme-card-border p-1.5 flex flex-col justify-between">
              <span className="text-[8px] text-theme-text-muted">Bounce</span>
              <span className="text-[11px] font-bold text-white">32.1%</span>
              <span className="text-[7px] text-rose-400 font-semibold">-4%</span>
            </div>

            {/* Visual Chart */}
            <div className="col-span-12 rounded bg-dark-900 border border-theme-card-border p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-theme-text font-bold">Analytics Graph</span>
                <BarChart3 className="h-2.5 w-2.5 text-accent-blue" />
              </div>
              {/* Fake Bar Graph */}
              <div className="flex items-end justify-between gap-1.5 h-12 pt-2">
                <div className="h-4 w-full rounded-sm bg-accent-blue/30" />
                <div className="h-8 w-full rounded-sm bg-accent-blue/40" />
                <div className="h-6 w-full rounded-sm bg-accent-blue/50" />
                <div className="h-10 w-full rounded-sm bg-accent-cyan" />
                <div className="h-7 w-full rounded-sm bg-accent-purple/50" />
                <div className="h-5 w-full rounded-sm bg-accent-purple/30" />
              </div>
            </div>
          </div>
        );
      case 'ecommerce':
        return (
          <div className="flex h-full w-full items-center justify-between bg-dark-950 p-4 select-none">
            {/* Left side product image mock */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-lg border border-theme-card-border bg-dark-900 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/10 to-accent-blue/10" />
              <ShoppingBag className="h-8 w-8 text-accent-cyan" />
              
              {/* Product Glow */}
              <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/10 blur-md" />
            </div>

            {/* Right side checkout logic mock */}
            <div className="flex flex-col gap-1.5 w-1/2 pl-3">
              <span className="text-[10px] font-bold text-white">Quantum Pulse</span>
              <span className="text-[8px] text-theme-text-muted">Wireless Pro Headphones</span>
              <span className="text-[11px] font-bold text-accent-cyan mt-1">$249.99</span>
              
              {/* Buy button mock */}
              <div className="mt-1 flex items-center justify-center rounded bg-accent-blue py-1 text-[8px] font-semibold text-white">
                Add to Cart
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold tracking-tight text-theme-text sm:text-4xl"
          >
            My Featured <span className="text-gradient-purple">Projects</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 h-1 w-12 rounded bg-accent-blue"
          />
        </div>

        {/* Search & Filtering Controls */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mt-16">
          {/* Tech Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: 'all', label: 'All Projects' },
              { key: 'mern', label: 'MERN Stack' },
              { key: 'react', label: 'React / TS' },
              { key: 'vanilla', label: 'HTML / CSS / JS' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as any)}
                className={`relative rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeFilter === tab.key
                    ? 'text-white'
                    : 'text-theme-text-muted hover:text-theme-text border border-theme-card-border hover:bg-theme-card-border'
                }`}
              >
                {activeFilter === tab.key && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 z-0 rounded-xl bg-accent-blue"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Projects Cards Grid */}
        <motion.div 
          layout
          className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="glass-card flex flex-col justify-between overflow-hidden rounded-2xl group"
              >
                <div>
                  {/* macOS Style Browser Mock Header */}
                  <div className="flex items-center justify-between border-b border-theme-card-border bg-dark-900/60 py-2 px-4.5">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="font-mono text-[9px] text-theme-text-muted font-medium">
                      {project.title.toLowerCase()}.dev
                    </div>
                    <div className="w-10" /> {/* Balance spacer */}
                  </div>

                  {/* Browser Mock Body Area */}
                  <div className="relative h-40 w-full overflow-hidden border-b border-theme-card-border bg-dark-950">
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark-950/20 to-transparent pointer-events-none" />
                    {renderProjectPreview(project.previewType)}
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-theme-text transition-colors group-hover:text-accent-cyan">
                      {project.title}
                    </h3>
                    
                    <p className="mt-3 font-sans text-xs leading-relaxed text-theme-text-muted">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-theme-card-border bg-dark-900 px-2 py-1 font-sans text-[9px] font-semibold text-accent-cyan"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer View Action */}
                <div className="border-t border-theme-card-border p-4.5 bg-dark-900/10">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-theme-card-border bg-theme-card py-2.5 text-xs font-bold text-theme-text transition-all duration-300 hover:border-accent-cyan/30 hover:bg-accent-blue/10 hover:text-accent-cyan"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    View on GitHub
                  </a>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-theme-card-border"
          >
            <span className="text-2xl font-bold text-theme-text">No projects match your search</span>
            <span className="text-xs text-theme-text-muted mt-2">Try checking other keywords or filter categories.</span>
          </motion.div>
        )}

      </div>
    </section>
  );
};

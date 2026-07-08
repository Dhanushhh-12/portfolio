import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Monitor, Cpu, PieChart, Wrench, MoreVertical, Rocket, Sparkles, Star } from 'lucide-react';

interface SkillItem {
  name: string;
  level: number;
  badge: 'Expert' | 'Advanced' | 'Proficient';
}

interface SkillCategory {
  title: string;
  description: string;
  type: 'engineering' | 'data' | 'tools';
  icon: React.ReactNode;
  accentClass: string;
  glowColor: string;
  accentColor: string;
  previewType: 'frontend' | 'backend' | 'database' | 'languages' | 'analytics' | 'tools';
  skills: SkillItem[];
}

// Custom 3D Parallax Skill Card with Interactive Glow & Vector Graphics
const SkillCard: React.FC<{ category: SkillCategory }> = ({ category }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Framer motion values for 3D rotation coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map normalized cursor offsets to rotation angles (limit to subtle 5 degrees max)
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  // Spring animations for seamless rotation recovery
  const springRotateX = useSpring(rotateX, { damping: 22, stiffness: 220 });
  const springRotateY = useSpring(rotateY, { damping: 22, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const normalizedX = (mouseX / width) - 0.5;
    const normalizedY = (mouseY / height) - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
    setCoords({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Render Category Specific Isometric 3D SVG Illustrations
  const renderSVGIllustration = (type: string) => {
    switch (type) {
      case 'frontend':
        return (
          <svg viewBox="0 0 140 140" fill="none" className="h-full w-full">
            {/* Glowing Base Circles */}
            <ellipse cx="70" cy="105" rx="40" ry="12" stroke="url(#fe-glow)" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse cx="70" cy="105" rx="32" ry="9" stroke="url(#fe-glow)" strokeWidth="1.5" />
            
            {/* Floating Glass Screen */}
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Backglow panel */}
              <polygon points="45,45 95,30 95,75 45,90" fill="rgba(6, 182, 212, 0.08)" stroke="url(#fe-border)" strokeWidth="1" />
              {/* Highlight window bar */}
              <polygon points="45,45 95,30 95,40 45,55" fill="rgba(255, 255, 255, 0.06)" />
              {/* Three dots on window mockup */}
              <circle cx="53" cy="48" r="1.5" fill="#f87171" />
              <circle cx="59" cy="46.5" r="1.5" fill="#fbbf24" />
              <circle cx="65" cy="45" r="1.5" fill="#34d399" />
              
              {/* Code Tags `< />` */}
              <path d="M 55,58 L 48,61 L 55,64" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]" />
              <path d="M 73,52 L 80,55 L 73,58" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]" />
              <path d="M 66,52 L 59,65" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </motion.g>

            <defs>
              <linearGradient id="fe-glow" x1="30" y1="105" x2="110" y2="105" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06b6d4" stopOpacity="0" />
                <stop offset="0.5" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="fe-border" x1="45" y1="30" x2="95" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06b6d4" />
                <stop offset="1" stopColor="#3b82f6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'backend':
        return (
          <svg viewBox="0 0 140 140" fill="none" className="h-full w-full">
            <ellipse cx="70" cy="105" rx="40" ry="12" stroke="url(#be-glow)" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse cx="70" cy="105" rx="32" ry="9" stroke="url(#be-glow)" strokeWidth="1.5" />
            
            {/* Stacked Server tower blocks */}
            <motion.g
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Server 1 (Bottom) */}
              <polygon points="70,75 92,64 92,76 70,87" fill="rgba(37, 99, 235, 0.25)" stroke="#2563eb" strokeWidth="0.75" />
              <polygon points="50,65 70,75 70,87 50,77" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="0.75" />
              <polygon points="70,75 92,64 70,54 48,65" fill="rgba(255, 255, 255, 0.05)" stroke="#3b82f6" strokeWidth="0.75" />
              <circle cx="56" cy="71.5" r="1.2" fill="#34d399" className="animate-pulse" />
              <circle cx="62" cy="74.5" r="1.2" fill="#3b82f6" />
              
              {/* Server 2 (Middle) */}
              <polygon points="70,55 92,44 92,56 70,67" fill="rgba(37, 99, 235, 0.25)" stroke="#2563eb" strokeWidth="0.75" />
              <polygon points="50,45 70,55 70,67 50,57" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="0.75" />
              <polygon points="70,55 92,44 70,34 48,45" fill="rgba(255, 255, 255, 0.05)" stroke="#3b82f6" strokeWidth="0.75" />
              <circle cx="56" cy="51.5" r="1.2" fill="#34d399" />
              <circle cx="62" cy="54.5" r="1.2" fill="#3b82f6" className="animate-pulse" />

              {/* Server 3 (Top) */}
              <polygon points="70,35 92,24 92,36 70,47" fill="rgba(37, 99, 235, 0.25)" stroke="#2563eb" strokeWidth="0.75" />
              <polygon points="50,25 70,35 70,47 50,37" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="0.75" />
              <polygon points="70,35 92,24 70,14 48,25" fill="rgba(255, 255, 255, 0.05)" stroke="#3b82f6" strokeWidth="0.75" />
              <circle cx="56" cy="31.5" r="1.2" fill="#f87171" className="animate-ping" style={{ animationDuration: '2s' }} />
              <circle cx="62" cy="34.5" r="1.2" fill="#34d399" />
            </motion.g>

            <defs>
              <linearGradient id="be-glow" x1="30" y1="105" x2="110" y2="105" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563eb" stopOpacity="0" />
                <stop offset="0.5" stopColor="#2563eb" stopOpacity="0.8" />
                <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'database':
        return (
          <svg viewBox="0 0 140 140" fill="none" className="h-full w-full">
            <ellipse cx="70" cy="105" rx="40" ry="12" stroke="url(#db-glow)" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse cx="70" cy="105" rx="32" ry="9" stroke="url(#db-glow)" strokeWidth="1.5" />

            {/* Cylinder disks */}
            <motion.g
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Cylinder 1 (Bottom disk) */}
              <path d="M 45,78 A 25,10 0 0,0 95,78 L 95,90 A 25,10 0 0,1 45,90 Z" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="0.75" />
              <ellipse cx="70" cy="78" rx="25" ry="10" fill="rgba(139, 92, 246, 0.25)" stroke="#8b5cf6" strokeWidth="0.75" />

              {/* Cylinder 2 (Middle disk) */}
              <path d="M 45,55 A 25,10 0 0,0 95,55 L 95,67 A 25,10 0 0,1 45,67 Z" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="0.75" />
              <ellipse cx="70" cy="55" rx="25" ry="10" fill="rgba(139, 92, 246, 0.25)" stroke="#8b5cf6" strokeWidth="0.75" />

              {/* Cylinder 3 (Top disk) */}
              <path d="M 45,32 A 25,10 0 0,0 95,32 L 95,44 A 25,10 0 0,1 45,44 Z" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="0.75" />
              <ellipse cx="70" cy="32" rx="25" ry="10" fill="rgba(255, 255, 255, 0.05)" stroke="#a78bfa" strokeWidth="0.75" />
            </motion.g>

            <defs>
              <linearGradient id="db-glow" x1="30" y1="105" x2="110" y2="105" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="0.5" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'languages':
        return (
          <svg viewBox="0 0 140 140" fill="none" className="h-full w-full">
            <ellipse cx="70" cy="105" rx="40" ry="12" stroke="url(#lang-glow)" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse cx="70" cy="105" rx="32" ry="9" stroke="url(#lang-glow)" strokeWidth="1.5" />

            {/* Floating code window */}
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <polygon points="45,45 95,30 95,75 45,90" fill="rgba(16, 185, 129, 0.06)" stroke="url(#lang-border)" strokeWidth="1" />
              <polygon points="45,45 95,30 95,40 45,55" fill="rgba(255, 255, 255, 0.05)" />
              {/* Text compiler lines mock */}
              <line x1="52" y1="51" x2="72" y2="45" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="52" y1="59" x2="82" y2="50" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" />
              <line x1="52" y1="67" x2="65" y2="63" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" />
              <line x1="52" y1="75" x2="75" y2="68" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
            </motion.g>

            <defs>
              <linearGradient id="lang-glow" x1="30" y1="105" x2="110" y2="105" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10b981" stopOpacity="0" />
                <stop offset="0.5" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="1" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lang-border" x1="45" y1="30" x2="95" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10b981" />
                <stop offset="1" stopColor="#059669" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'analytics':
        return (
          <svg viewBox="0 0 140 140" fill="none" className="h-full w-full">
            <ellipse cx="70" cy="105" rx="40" ry="12" stroke="url(#da-glow)" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse cx="70" cy="105" rx="32" ry="9" stroke="url(#da-glow)" strokeWidth="1.5" />

            {/* 3D isometric chart bars */}
            <motion.g
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            >
              {/* Bar 1: Left column (Purple) */}
              <polygon points="52,70 60,66 60,82 52,86" fill="#8b5cf6" opacity="0.8" />
              <polygon points="60,66 68,62 68,78 60,82" fill="#a78bfa" opacity="0.8" />
              <polygon points="60,66 68,62 60,58 52,62" fill="#c084fc" />
              
              {/* Bar 2: Center column (Amber) */}
              <polygon points="67,52 75,48 75,76 67,80" fill="#d97706" opacity="0.8" />
              <polygon points="75,48 83,44 83,72 75,76" fill="#f59e0b" opacity="0.8" />
              <polygon points="75,48 83,44 75,40 67,44" fill="#fbbf24" />

              {/* Bar 3: Right column (Blue) */}
              <polygon points="82,60 90,56 90,80 82,84" fill="#2563eb" opacity="0.8" />
              <polygon points="90,56 98,52 98,76 90,80" fill="#3b82f6" opacity="0.8" />
              <polygon points="90,56 98,52 90,48 82,52" fill="#60a5fa" />
            </motion.g>

            <defs>
              <linearGradient id="da-glow" x1="30" y1="105" x2="110" y2="105" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'tools':
        return (
          <svg viewBox="0 0 140 140" fill="none" className="h-full w-full">
            <ellipse cx="70" cy="105" rx="40" ry="12" stroke="url(#tl-glow)" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse cx="70" cy="105" rx="32" ry="9" stroke="url(#tl-glow)" strokeWidth="1.5" />

            {/* Terminal prompt glass box */}
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <polygon points="45,45 95,30 95,75 45,90" fill="rgba(244, 63, 94, 0.06)" stroke="url(#tl-border)" strokeWidth="1" />
              <polygon points="45,45 95,30 95,40 45,55" fill="rgba(255, 255, 255, 0.05)" />
              {/* Prompt terminal cursor lines */}
              <path d="M 52,56 L 58,58.5 L 52,61" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="62" y1="60" x2="72" y2="57" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
            </motion.g>

            <defs>
              <linearGradient id="tl-glow" x1="30" y1="105" x2="110" y2="105" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f43f5e" stopOpacity="0" />
                <stop offset="0.5" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="1" stopColor="#f43f5e" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="tl-border" x1="45" y1="30" x2="95" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f43f5e" />
                <stop offset="1" stopColor="#e11d48" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="perspective-1000">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
          boxShadow: `0 8px 30px 0 rgba(0, 0, 0, 0.15)`,
        }}
        whileHover={{ scale: 1.01 }}
        className={`glass-card relative flex flex-col justify-between rounded-2xl p-6 group transition-shadow duration-300 ${category.accentClass}`}
      >
        {/* Vercel-style Interactive Radial Glow Border */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, ${category.glowColor}, transparent 80%)`,
              padding: '1px',
              maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
              WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'destination-out',
            }}
          />
        )}
        
        {/* Glow aura inside the card backing */}
        {isHovered && (
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-500 opacity-15 blur-2xl"
            style={{
              background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${category.accentColor}, transparent 80%)`,
            }}
          />
        )}

        {/* Card Content Wrapper */}
        <div className="relative z-10 w-full" style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
          
          {/* Category Header */}
          <div 
            className="flex items-center justify-between border-b border-theme-card-border pb-4"
            style={{ transform: 'translateZ(20px)' }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-theme-card border border-theme-card-border shadow-sm group-hover:scale-105 transition-transform duration-300">
                {category.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="font-display text-sm font-bold text-theme-text">
                  {category.title}
                </h3>
                <span className="text-[10px] text-theme-text-muted mt-0.5 leading-normal">
                  {category.description}
                </span>
              </div>
            </div>
            
            {/* Top-Right Context Dots Option */}
            <button className="text-theme-text-muted hover:text-theme-text opacity-40 hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>

          {/* Inner Grid layout: Left skills, Right interactive 3D graphics illustration */}
          <div 
            className="mt-6 grid grid-cols-12 gap-6 sm:gap-4 items-center"
            style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
          >
            {/* Left side list of skills */}
            <div className="col-span-12 sm:col-span-7 flex flex-col gap-4.5">
              {category.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-theme-text flex items-center gap-1">
                      {skill.name}
                      {skill.badge === 'Expert' && (
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      )}
                    </span>
                  </div>
                  
                  {/* Progress bar and numeric percentage wrapper */}
                  <div className="flex items-center gap-3">
                    {/* Progress Track */}
                    <div className="relative h-1.5 w-full rounded-full bg-theme-card-border/50 overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                      />
                    </div>
                    {/* Numeric percentage */}
                    <span className="text-theme-text font-mono text-[10px] shrink-0 w-8 text-right">
                      {skill.level}%
                    </span>
                  </div>

                </div>
              ))}
            </div>

            {/* Right side animated 3D isometric graphic */}
            <div 
              className="col-span-12 sm:col-span-5 h-28 w-28 mx-auto pointer-events-none select-none flex items-center justify-center"
              style={{ transform: 'translateZ(25px)' }}
            >
              {renderSVGIllustration(category.previewType)}
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'engineering' | 'data' | 'tools'>('all');

  const categories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces',
      type: 'engineering',
      icon: <Monitor className="h-5 w-5 text-accent-cyan" />,
      accentClass: 'group-hover:border-accent-cyan/20',
      glowColor: 'rgba(6, 182, 212, 0.45)',
      accentColor: 'rgba(6, 182, 212, 0.35)',
      previewType: 'frontend',
      skills: [
        { name: 'React.js', level: 96, badge: 'Expert' },
        { name: 'Tailwind CSS', level: 92, badge: 'Expert' },
        { name: 'JavaScript', level: 85, badge: 'Advanced' },
        { name: 'HTML5', level: 95, badge: 'Expert' },
        { name: 'CSS3', level: 88, badge: 'Expert' },
      ],
    },
    {
      title: 'Backend Development',
      description: 'Building robust and scalable server-side applications',
      type: 'engineering',
      icon: <Cpu className="h-5 w-5 text-accent-blue" />,
      accentClass: 'group-hover:border-accent-blue/20',
      glowColor: 'rgba(37, 99, 235, 0.45)',
      accentColor: 'rgba(37, 99, 235, 0.35)',
      previewType: 'backend',
      skills: [
        { name: 'Node.js', level: 88, badge: 'Advanced' },
        { name: 'Express.js', level: 82, badge: 'Advanced' },
      ],
    },
    {
      title: 'Databases',
      description: 'Managing and organizing data efficiently',
      type: 'engineering',
      icon: <DatabaseIcon />,
      accentClass: 'group-hover:border-accent-purple/20',
      glowColor: 'rgba(139, 92, 246, 0.45)',
      accentColor: 'rgba(139, 92, 246, 0.35)',
      previewType: 'database',
      skills: [
        { name: 'MongoDB', level: 85, badge: 'Advanced' },
        { name: 'SQL', level: 78, badge: 'Proficient' },
      ],
    },
    {
      title: 'Programming Languages',
      description: 'Core programming languages I work with',
      type: 'engineering',
      icon: <CodeIcon />,
      accentClass: 'group-hover:border-emerald-400/20',
      glowColor: 'rgba(52, 211, 153, 0.45)',
      accentColor: 'rgba(52, 211, 153, 0.35)',
      previewType: 'languages',
      skills: [
        { name: 'Java', level: 85, badge: 'Advanced' },
        { name: 'Python', level: 75, badge: 'Proficient' },
      ],
    },
    {
      title: 'Data Analytics',
      description: 'Turning data into meaningful insights',
      type: 'data',
      icon: <PieChart className="h-5 w-5 text-amber-400" />,
      accentClass: 'group-hover:border-amber-400/20',
      glowColor: 'rgba(251, 191, 36, 0.45)',
      accentColor: 'rgba(251, 191, 36, 0.35)',
      previewType: 'analytics',
      skills: [
        { name: 'Power BI', level: 88, badge: 'Advanced' },
        { name: 'Tableau', level: 75, badge: 'Proficient' },
        { name: 'Microsoft Excel', level: 88, badge: 'Expert' },
      ],
    },
    {
      title: 'Tools & Workflow',
      description: 'Tools and workflows that boost my productivity',
      type: 'tools',
      icon: <Wrench className="h-5 w-5 text-rose-400" />,
      accentClass: 'group-hover:border-rose-400/20',
      glowColor: 'rgba(251, 113, 133, 0.45)',
      accentColor: 'rgba(251, 113, 133, 0.35)',
      previewType: 'tools',
      skills: [
        { name: 'Git', level: 85, badge: 'Advanced' },
        { name: 'GitHub', level: 90, badge: 'Expert' },
        { name: 'VS Code', level: 95, badge: 'Expert' },
      ],
    },
  ];

  const filteredCategories = categories.filter(
    (cat) => activeTab === 'all' || cat.type === activeTab
  );

  return (
    <section id="skills" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* WHAT I DO Badge Tag */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-theme-card-border bg-theme-card/30 text-[9px] font-bold uppercase tracking-wider text-accent-cyan mb-4"
          >
            <Sparkles className="h-3 w-3 text-accent-cyan" />
            <span>What I Do</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold tracking-tight text-theme-text sm:text-4xl"
          >
            Skills & <span className="text-gradient-purple">Expertise</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-3 text-sm text-theme-text-muted"
          >
            Technologies and tools I use to build amazing digital experiences
          </motion.p>
        </div>

        {/* Interactive Tabs Menu */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 md:mt-16">
          {[
            { id: 'all', label: 'All Skills', icon: <Monitor className="h-3.5 w-3.5" /> },
            { id: 'engineering', label: 'Web Engineering', icon: <Cpu className="h-3.5 w-3.5" /> },
            { id: 'data', label: 'Data Analytics', icon: <PieChart className="h-3.5 w-3.5" /> },
            { id: 'tools', label: 'Tools & Workflow', icon: <Wrench className="h-3.5 w-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-theme-text-muted hover:text-theme-text border border-theme-card-border hover:bg-theme-card-border/50'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeSkillTabBg"
                  className="absolute inset-0 z-0 rounded-xl bg-accent-blue"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div 
          layout
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => (
              <SkillCard key={category.title} category={category} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Full-Width footer glass banner capsule */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4 rounded-2xl border border-theme-card-border bg-theme-card/10 p-6 text-center md:text-left backdrop-blur-sm"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
            <Rocket className="h-5.5 w-5.5" />
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-theme-text">Always learning, always building, always improving</h4>
            <p className="mt-1 text-xs text-theme-text-muted">Exploring new technologies to create better solutions every day.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// Internal SVG Helper components to keep code clean and modular
const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-accent-purple">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-emerald-400">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

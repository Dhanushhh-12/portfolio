import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const BackgroundEffect: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for follow effect
  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Generate static random configuration for particles to avoid hydration mismatches
    const generatedParticles: Particle[] = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20,
    }));
    setParticles(generatedParticles);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-dark-950">
      {/* Dynamic Mouse Follow Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-[px] opacity-45 mix-blend-screen blur-[120px] transition-opacity duration-300 md:opacity-60"
        style={{
          background: `radial-gradient(400px circle at ${smoothX}px ${smoothY}px, var(--mouse-glow-color-1), var(--mouse-glow-color-2), transparent 80%)`,
          width: '100vw',
          height: '100vh',
        }}
      />

      {/* Floating Blurred Gradient Orbs */}
      {/* Orb 1: Cyan/Blue (Top Left-ish) */}
      <div 
        className="animate-float-slow absolute -top-[10%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-gradient-to-br from-accent-cyan/10 to-accent-blue/5 opacity-50 blur-[130px] md:h-[35vw] md:w-[35vw]"
      />
      
      {/* Orb 2: Purple/Blue (Bottom Right-ish) */}
      <div 
        className="animate-float-reverse-slow absolute -right-[5%] -bottom-[10%] h-[60vw] w-[60vw] rounded-full bg-gradient-to-tr from-accent-purple/10 to-accent-blue/5 opacity-40 blur-[150px] md:h-[40vw] md:w-[40vw]"
      />

      {/* Orb 3: Accent center glow */}
      <div 
        className="animate-pulse-slow absolute top-[30%] left-[25%] h-[45vw] w-[45vw] rounded-full bg-accent-blue/5 opacity-30 blur-[120px]"
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:60px_60px] opacity-70"
        style={{ maskImage: 'radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)' }}
      />

      {/* Ambient Drifting Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};

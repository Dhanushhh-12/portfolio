import React, { useRef, useState, useId } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  Code2,
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import defaultPhoto from '../../assets/profile.jpg';

/**
 * Configuration schema for floating glassmorphism badges
 */
export interface FloatingBadge {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  borderGlow?: string;
  positionClasses: string;
  depthZ: number; // translateZ in pixels (e.g., 65 - 85)
  parallaxMultiplier: number; // Multiplier for cursor parallax translation
  floatDuration: number; // Duration of independent idle floating (seconds)
  floatDelay: number; // Stagger delay for independent floating
  entranceDelay: number; // Stagger delay on initial entrance
}

export interface PhotoCardProps {
  /** Source URL of the portrait photograph */
  imageSrc?: string;
  /** Accessible image description */
  altText?: string;
  /** Name displayed on the lower card badge */
  name?: string;
  /** Professional title / role */
  title?: string;
  /** Location string */
  location?: string;
  /** Custom badge list (defaults to the 4 specified portfolio badges) */
  badges?: FloatingBadge[];
  /** Whether to render the standalone dark navy backdrop with glowing blobs and particles */
  showBackground?: boolean;
  /** Extra container styling */
  className?: string;
}

/**
 * Default floating badge configuration
 */
const DEFAULT_BADGES: FloatingBadge[] = [
  {
    id: 'role',
    title: 'Full Stack Developer',
    subtitle: 'Modern Web & Architecture',
    icon: <Code2 className="w-4 h-4" />,
    iconBg: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
    iconColor: 'text-cyan-400',
    borderGlow: 'hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]',
    positionClasses: '-top-4 -left-4 sm:-top-6 sm:-left-10',
    depthZ: 75,
    parallaxMultiplier: 1.6,
    floatDuration: 4.2,
    floatDelay: 0,
    entranceDelay: 0.2,
  },
  {
    id: 'skills',
    title: 'React • Node • Python',
    subtitle: 'TypeScript & Data Analytics',
    icon: <Layers className="w-4 h-4" />,
    iconBg: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
    iconColor: 'text-purple-400',
    borderGlow: 'hover:border-purple-400/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]',
    positionClasses: 'top-12 -right-4 sm:top-14 sm:-right-10',
    depthZ: 85,
    parallaxMultiplier: -1.4,
    floatDuration: 4.8,
    floatDelay: 0.8,
    entranceDelay: 0.35,
  },
  {
    id: 'experience',
    title: '2+ Years Experience',
    subtitle: 'Hands-on Projects & Systems',
    icon: <Briefcase className="w-4 h-4" />,
    iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    iconColor: 'text-amber-400',
    borderGlow: 'hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]',
    positionClasses: 'bottom-16 -left-4 sm:bottom-20 sm:-left-12',
    depthZ: 70,
    parallaxMultiplier: 1.3,
    floatDuration: 5.2,
    floatDelay: 1.2,
    entranceDelay: 0.5,
  },
  {
    id: 'status',
    title: 'Open to Work',
    subtitle: 'Available for Opportunities',
    icon: <CheckCircle2 className="w-4 h-4" />,
    iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    iconColor: 'text-emerald-400',
    borderGlow: 'hover:border-emerald-400/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]',
    positionClasses: '-bottom-5 -right-3 sm:-bottom-6 sm:-right-8',
    depthZ: 80,
    parallaxMultiplier: -1.7,
    floatDuration: 4.6,
    floatDelay: 0.4,
    entranceDelay: 0.65,
  },
];

/**
 * Background particle definition
 */
interface AmbientParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

const PARTICLES: AmbientParticle[] = [
  { id: 1, x: 15, y: 20, size: 3, opacity: 0.6, duration: 6, delay: 0 },
  { id: 2, x: 80, y: 15, size: 4, opacity: 0.5, duration: 7, delay: 1 },
  { id: 3, x: 25, y: 75, size: 3, opacity: 0.4, duration: 5.5, delay: 0.5 },
  { id: 4, x: 85, y: 70, size: 5, opacity: 0.65, duration: 8, delay: 1.5 },
  { id: 5, x: 50, y: 10, size: 2, opacity: 0.7, duration: 6.5, delay: 2 },
  { id: 6, x: 10, y: 50, size: 3, opacity: 0.45, duration: 7.2, delay: 0.8 },
  { id: 7, x: 92, y: 42, size: 3, opacity: 0.55, duration: 6.8, delay: 1.2 },
  { id: 8, x: 45, y: 88, size: 4, opacity: 0.5, duration: 7.5, delay: 2.2 },
];

/**
 * <PhotoCard />
 *
 * High-performance 3D interactive hero photo card built with React, Tailwind CSS and Framer Motion.
 * Features 3D tilt tracking, dynamic specular glare, layered translateZ depth, floating badges,
 * idle oscillation, touch-drag support, and accessibility (prefers-reduced-motion).
 */
export const PhotoCard: React.FC<PhotoCardProps> = ({
  imageSrc = defaultPhoto,
  altText = 'Chedeedepu Dhanush - Full Stack Developer Portrait',
  name = 'CHEDEDEEPU DHANUSH',
  title = 'Full Stack Developer',
  location = 'Hyderabad, India',
  badges = DEFAULT_BADGES,
  showBackground = true,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  // Normalized cursor coordinate motion values (-0.5 to +0.5)
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);

  // Smooth physics spring interpolations
  const springConfig = { stiffness: 280, damping: 24, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Tilt rotations (up to 15 degrees)
  // X-axis rotation is driven by vertical mouse offset (inverted so moving down tilts down)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  // Y-axis rotation is driven by horizontal mouse offset (moving right tilts right)
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  // Dynamic moving glare coordinate percentage (10% to 90%)
  const glareX = useTransform(smoothX, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [10, 90]);

  // Dynamic layered drop-shadow offsets shifting with tilt
  const shadowX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(smoothY, [-0.5, 0.5], [-10, 30]);

  // Handle Mouse Movement across the card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly spring back to center
    mouseX.set(0);
    mouseY.set(0);
  };

  // Touch Support for Mobile Drag Tilt
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.max(-0.5, Math.min(0.5, (touch.clientX - rect.left) / rect.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (touch.clientY - rect.top) / rect.height - 0.5));
    mouseX.set(x);
    mouseY.set(y);
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className={`relative w-full flex items-center justify-center select-none ${
        showBackground
          ? 'bg-[#070B14] py-16 sm:py-24 px-4 sm:px-8 rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80'
          : 'py-8 px-4'
      } ${className}`}
    >
      {/* ======================================================== */}
      {/* BACKGROUND: Dark Navy + Glowing Radial Blobs + Particles */}
      {/* ======================================================== */}
      {showBackground && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Subtle Cyber Grid */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '36px 36px',
            }}
          />

          {/* Glowing Ambient Blobs behind the photo */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full blur-[90px] bg-gradient-to-tr from-blue-600/35 via-indigo-600/30 to-purple-600/35 pointer-events-none"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    scale: [1, 1.15, 1],
                    opacity: [0.75, 0.95, 0.75],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] rounded-full blur-[70px] bg-cyan-500/25 pointer-events-none"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    scale: [1.1, 0.95, 1.1],
                    opacity: [0.6, 0.85, 0.6],
                  }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          {/* Slow-moving Ambient Starlight Particles */}
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-cyan-300 pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                boxShadow: `0 0 10px rgba(56, 189, 248, 0.8)`,
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [-12, 12, -12],
                      x: [-6, 6, -6],
                      opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
                    }
              }
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3D PERSPECTIVE VIEWPORT (1000px perspective)             */}
      {/* ======================================================== */}
      <div
        className="relative z-10 w-full flex items-center justify-center"
        style={{ perspective: 1000 }}
      >
        {/* ======================================================== */}
        {/* GENTLE IDLE FLOATING WRAPPER                             */}
        {/* ======================================================== */}
        <motion.div
          animate={
            prefersReducedMotion || isHovered
              ? { y: 0 }
              : { y: [-9, 9, -9] }
          }
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center"
        >
          {/* ======================================================== */}
          {/* 3D TILT CARD ROOT (Rotates toward cursor)                */}
          {/* ======================================================== */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={() => setIsHovered(true)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              rotateX: prefersReducedMotion ? 0 : rotateX,
              rotateY: prefersReducedMotion ? 0 : rotateY,
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 240,
              damping: 22,
              duration: 0.8,
            }}
            className="relative cursor-pointer touch-none"
          >
            {/* Dynamic Layered Drop Shadow underneath the card */}
            <motion.div
              style={{
                x: prefersReducedMotion ? 0 : shadowX,
                y: prefersReducedMotion ? 20 : shadowY,
              }}
              className="absolute -inset-4 sm:-inset-6 rounded-[2.5rem] bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-purple-600/30 blur-2xl -z-10 pointer-events-none transition-opacity duration-300"
            />

            {/* ======================================================== */}
            {/* LAYER 1 (Depth: 10px): GRADIENT BORDER GLOW FRAME        */}
            {/* ======================================================== */}
            <div
              style={{ transform: 'translateZ(10px)' }}
              className="relative p-[2.5px] rounded-[2rem] sm:rounded-[2.25rem] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_35px_rgba(59,130,246,0.35)] transition-all duration-300"
            >
              {/* Card Container Box */}
              <div
                style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
                className="relative w-[280px] xs:w-[310px] sm:w-[350px] md:w-[370px] h-[390px] xs:h-[430px] sm:h-[480px] md:h-[510px] rounded-[1.85rem] sm:rounded-[2.1rem] bg-slate-950/80 backdrop-blur-xl overflow-hidden border border-white/10"
              >
                {/* ======================================================== */}
                {/* LAYER 2 (Depth: 30px): PHOTO "POP OUT"                   */}
                {/* ======================================================== */}
                <motion.div
                  style={{ transform: 'translateZ(30px)' }}
                  className="absolute inset-0 w-full h-full overflow-hidden"
                >
                  <img
                    src={imageSrc}
                    alt={altText}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out will-change-transform"
                    style={{
                      filter: 'contrast(1.04) brightness(1.02)',
                    }}
                  />

                  {/* Gentle gradient vignette overlay on photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent pointer-events-none" />

                  {/* Ambient inner rim light */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[1.85rem] sm:rounded-[2.1rem] pointer-events-none" />
                </motion.div>

                {/* ======================================================== */}
                {/* LAYER 3 (Depth: 45px): MOVING GLARE / SHINE OVERLAY      */}
                {/* ======================================================== */}
                <motion.div
                  style={{
                    transform: 'translateZ(45px)',
                    opacity: isHovered && !prefersReducedMotion ? 0.75 : 0,
                    background: useTransform(
                      [glareX, glareY],
                      ([gx, gy]) =>
                        `radial-gradient(circle 280px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.12) 35%, transparent 75%)`
                    ),
                  }}
                  className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 will-change-[background]"
                />

                {/* ======================================================== */}
                {/* LAYER 4 (Depth: 55px): LOWER PHOTO CARD NAMEPLATE        */}
                {/* ======================================================== */}
                <div
                  style={{ transform: 'translateZ(55px)' }}
                  className="absolute bottom-4 left-4 right-4 p-3 sm:p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 shadow-lg flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <h4 className="text-xs sm:text-sm font-bold tracking-tight text-white uppercase font-mono">
                        {name}
                      </h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
                      {title}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-300 font-mono">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* FLOATING ANIMATED CARDS AROUND THE PHOTO (3 to 4 Badges) */}
            {/* ======================================================== */}
            {badges.map((badge, idx) => (
              <FloatingBadgeComponent
                key={badge.id}
                badge={badge}
                index={idx}
                smoothX={smoothX}
                smoothY={smoothY}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * Sub-component for individual floating glassmorphism badges
 * Features independent idle float, parallax offset reacting to cursor, and hover scale.
 */
interface FloatingBadgeComponentProps {
  badge: FloatingBadge;
  index: number;
  smoothX: any;
  smoothY: any;
  prefersReducedMotion: boolean | null;
}

const FloatingBadgeComponent: React.FC<FloatingBadgeComponentProps> = ({
  badge,
  index,
  smoothX,
  smoothY,
  prefersReducedMotion,
}) => {
  // Parallax offset for this specific badge based on cursor position
  const parallaxX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-14 * badge.parallaxMultiplier, 14 * badge.parallaxMultiplier]
  );
  const parallaxY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-14 * badge.parallaxMultiplier, 14 * badge.parallaxMultiplier]
  );

  return (
    <motion.div
      style={{
        transform: `translateZ(${badge.depthZ}px)`,
        x: prefersReducedMotion ? 0 : parallaxX,
        y: prefersReducedMotion ? 0 : parallaxY,
      }}
      initial={{ opacity: 0, scale: 0.7, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: badge.entranceDelay,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className={`absolute ${badge.positionClasses} z-20 pointer-events-auto`}
    >
      {/* Independent Floating Animation Container */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: index % 2 === 0 ? [-6, 6, -6] : [6, -6, 6],
                x: index % 2 === 0 ? [-3, 3, -3] : [3, -3, 3],
              }
        }
        transition={{
          duration: badge.floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: badge.floatDelay,
        }}
        whileHover={{
          scale: 1.08,
          zIndex: 40,
          transition: { type: 'spring', stiffness: 400, damping: 15 },
        }}
        className={`group flex items-center gap-2.5 sm:gap-3 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-white/20 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 ${badge.borderGlow}`}
      >
        {/* Badge Icon with Glow Ring */}
        <div
          className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${badge.iconBg} transition-transform duration-300 group-hover:scale-110`}
        >
          {badge.icon}
        </div>

        {/* Badge Content */}
        <div className="flex flex-col text-left pr-1">
          <span className="text-[12px] sm:text-[13px] font-semibold text-white tracking-tight leading-tight whitespace-nowrap">
            {badge.title}
          </span>
          {badge.subtitle && (
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight whitespace-nowrap mt-0.5">
              {badge.subtitle}
            </span>
          )}
        </div>

        {/* Subtle Shine Reflection */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </motion.div>
  );
};

export default PhotoCard;

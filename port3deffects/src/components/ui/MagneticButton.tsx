import React, { useRef } from 'react';
import { audio } from '../../utils/audio';
import { gsap, useGSAP, prefersReducedMotion } from '../../animations/gsapConfig';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  href,
  target,
  rel,
  strength = 0.3,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const xToRef = useRef<((value: number) => void) | null>(null);
  const yToRef = useRef<((value: number) => void) | null>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !buttonRef.current) return;

    xToRef.current = gsap.quickTo(buttonRef.current, 'x', { duration: 0.35, ease: 'power3.out' });
    yToRef.current = gsap.quickTo(buttonRef.current, 'y', { duration: 0.35, ease: 'power3.out' });
  }, { scope: buttonRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || !xToRef.current || !yToRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    xToRef.current(deltaX);
    yToRef.current(deltaY);
  };

  const handleMouseLeave = () => {
    if (xToRef.current && yToRef.current) {
      xToRef.current(0);
      yToRef.current(0);
    }
  };

  const handleMouseEnter = () => {
    audio.playHover();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    audio.playClick();
    if (onClick) onClick(e as React.MouseEvent<HTMLButtonElement>);
  };

  const baseStyles = "relative inline-flex items-center justify-center font-sans text-[15px] font-semibold tracking-wide transition-colors duration-200 rounded-xl px-6 py-3.5 select-none overflow-hidden group";

  const variantStyles = {
    primary: "bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold shadow-sm active:scale-95",
    secondary: "bg-white hover:bg-slate-50 text-slate-800 border border-[#E5E7EB] hover:border-[#0284C7] shadow-sm active:scale-95",
    ghost: "text-slate-600 hover:text-[#0284C7] hover:bg-slate-100 active:scale-95"
  };

  const content = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="inline-block will-change-transform"
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={handleClick}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
          {children}
        </a>
      ) : (
        <button
          onClick={handleClick}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
          {...props}
        >
          {children}
        </button>
      )}
    </div>
  );

  return content;
};

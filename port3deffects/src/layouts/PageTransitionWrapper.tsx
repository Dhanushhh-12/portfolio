import React, { useRef } from 'react';
import { useRouteTransition } from '../hooks/useRouteTransition';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  routeKey?: string;
  className?: string;
}

/**
 * Layout wrapper providing smooth GSAP route entrance and cleanup
 */
export const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({
  children,
  routeKey,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useRouteTransition(containerRef, routeKey);

  return (
    <div ref={containerRef} className={`w-full will-change-[opacity,transform] ${className}`}>
      {children}
    </div>
  );
};

export default PageTransitionWrapper;

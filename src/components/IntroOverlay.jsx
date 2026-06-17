import React, { useEffect, useState } from 'react';

const IntroOverlay = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const dismissIntro = () => {
    if (isExiting || isDismissed) return;
    setIsExiting(true);
    document.body.classList.remove('intro-active');
    setTimeout(() => {
      setIsDismissed(true);
    }, 750);
  };

  useEffect(() => {
    document.body.classList.add('intro-active');
    const autoDismissTimer = setTimeout(dismissIntro, 5300);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        dismissIntro();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(autoDismissTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('intro-active');
    };
  }, [isExiting, isDismissed]);

  if (isDismissed) return null;

  const word = 'DHANUSH';

  return (
    <div 
      id="intro-overlay" 
      className={isExiting ? 'exit' : ''} 
      aria-hidden={isDismissed}
    >
      <div className="intro-bg"></div>
      <div className="intro-rule"></div>
      <div className="intro-stripes"></div>
      <div className="intro-dots">
        <div className="intro-dot"></div>
        <div className="intro-dot"></div>
        <div className="intro-dot"></div>
        <div className="intro-dot"></div>
        <div className="intro-dot"></div>
      </div>

      <div className="intro-grid">
        <div className="intro-text-block">
          <span className="intro-headline" id="intro-headline" aria-label="Dhanush">
            {word.split('').map((ch, i) => (
              <span 
                key={i} 
                className="letter" 
                style={{ animationDelay: `${0.35 + i * 0.08}s` }}
              >
                {ch}
              </span>
            ))}
          </span>
          <span className="intro-scan-line"></span>
          <span className="intro-subname">CHEDADEEPU</span>
          <div className="intro-role-block">
            <span className="intro-cyan-bar"></span>
            <span className="intro-role-line">MERN STACK DEVELOPER</span>
            <span className="intro-role-line dim">AI EXPLORER &nbsp;•&nbsp; REACT ENGINEER &nbsp;•&nbsp; FULL-STACK BUILDER</span>
          </div>
        </div>

        <div className="intro-robot-col">
          <div className="intro-robot-glow"></div>
          <img 
            className="intro-robot" 
            src="/falcon-robot.webp.webp" 
            alt="" 
            draggable="false" 
          />
        </div>
      </div>

      <button className="intro-skip" id="intro-skip-btn" onClick={dismissIntro}>
        SKIP &#9654;
      </button>
      <div className="intro-progress"></div>
    </div>
  );
};

export default IntroOverlay;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const impactData = [
  {
    id: 'donor-1',
    type: 'donor',
    name: 'Nexus Labs',
    title: 'Platinum Sponsor',
    shortDesc: 'Funded Core React Engine Optimizer',
    longDesc: 'Nexus Labs is a leading AI consultancy supporting open-source software developers. Their grant enabled the acceleration of our 3D render logic.',
    metric: '$15,000+ Spons.',
    badgeIcon: '✦',
    shape: 'circle'
  },
  {
    id: 'volunteer-1',
    type: 'volunteer',
    name: 'Evelyn Chen',
    title: 'Lead Open Source Mentor',
    shortDesc: 'Conducted 12 MERN workshops in Hyderabad',
    longDesc: 'Coordinated local bootcamps, mentored 40+ aspiring web developers, and reviewed core portfolio modules.',
    metric: '180+ Hours',
    badgeIcon: '⚙',
    shape: 'gear'
  },
  {
    id: 'donor-2',
    type: 'donor',
    name: 'Aether Foundation',
    title: 'Gold Sponsor',
    shortDesc: 'Sponsored Decentralized Hosting Tiers',
    longDesc: 'An open research foundation funding next-generation web platforms. Sponsored serverless edge environments globally.',
    metric: '$8,500+ Spons.',
    badgeIcon: '▲',
    shape: 'triangle'
  },
  {
    id: 'volunteer-2',
    type: 'volunteer',
    name: 'Marcus Vance',
    title: 'UI/UX Advisory Contributor',
    shortDesc: 'Refined 3D parallax responsive framework',
    longDesc: 'Optimized mobile layout viewports and designed tactile hardware-tilt controls.',
    metric: '12 Contributions',
    badgeIcon: '☵',
    shape: 'radar'
  },
  {
    id: 'donor-3',
    type: 'donor',
    name: 'Vortex Capital',
    title: 'Silver Sponsor',
    shortDesc: 'Backed Database Scaling Initiatives',
    longDesc: 'Providing operational funding for high-performance MongoDB indexing studies and cache systems.',
    metric: '$5,000+ Spons.',
    badgeIcon: '◈',
    shape: 'diamond'
  },
  {
    id: 'volunteer-3',
    type: 'volunteer',
    name: 'Srinivas Naidu',
    title: 'Core Documentation Lead',
    shortDesc: 'Authored MERN deployment guidelines',
    longDesc: 'Translated complex server deployment steps into clean developer-ready wikis and tutorials.',
    metric: '45 Modules Done',
    badgeIcon: '📝',
    shape: 'helix'
  }
];

// Helper component for the rotating SVG element
const RotatingShape = ({ type }) => {
  const rotationTransition = {
    repeat: Infinity,
    duration: 12,
    ease: "linear"
  };

  switch (type) {
    case 'circle':
      return (
        <motion.svg 
          className="rotating-shape-svg"
          animate={{ rotate: 360 }}
          transition={rotationTransition}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" stroke="rgba(0, 212, 255, 0.15)" strokeWidth="1.5" fill="none" strokeDasharray="5 5" />
          <circle cx="50" cy="50" r="30" stroke="rgba(0, 212, 255, 0.3)" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="2" fill="#00d4ff" />
        </motion.svg>
      );
    case 'gear':
      return (
        <motion.svg 
          className="rotating-shape-svg"
          animate={{ rotate: -360 }}
          transition={{ ...rotationTransition, duration: 15 }}
          viewBox="0 0 100 100"
        >
          <path 
            d="M50 35c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm0 25c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z" 
            fill="rgba(0, 212, 255, 0.25)" 
          />
          <path 
            d="M50 10L46 18c2.6 1.1 5.4 1.1 8 0l-4-8zm28.3 11.7l-8 4c1.8 2 3.1 4.3 4 6.9l8.3-4-4.3-6.9zM90 50l-8.3-4c0 2.8-.5 5.6-1.5 8.2l8.3 3.8L90 50zM78.3 78.3l-4-8c-2 1.8-4.3 3.1-6.9 4l4 8.3 6.9-4.3zM50 90l4-8.3c-2.8 0-5.6-.5-8.2-1.5l-3.8 8.3L50 90zm-28.3-11.7l8-4c-1.8-2-3.1-4.3-4-6.9l-8.3 4 4.3 6.9zM10 50l8.3 4c0-2.8.5-5.6 1.5-8.2l-8.3-3.8L10 50zm11.7-28.3l4 8c2-1.8 4.3-3.1 6.9-4l-4-8.3-6.9 4.3z" 
            fill="rgba(0, 212, 255, 0.15)" 
          />
        </motion.svg>
      );
    case 'triangle':
      return (
        <motion.svg 
          className="rotating-shape-svg"
          animate={{ rotate: 360 }}
          transition={rotationTransition}
          viewBox="0 0 100 100"
        >
          <polygon points="50,15 85,75 15,75" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="1" fill="none" />
          <polygon points="50,25 75,70 25,70" stroke="rgba(0, 212, 255, 0.08)" strokeWidth="2" fill="none" />
          <circle cx="50" cy="15" r="3" fill="#00d4ff" />
        </motion.svg>
      );
    case 'radar':
      return (
        <motion.svg 
          className="rotating-shape-svg"
          animate={{ rotate: 360 }}
          transition={{ ...rotationTransition, duration: 8 }}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" stroke="rgba(0, 212, 255, 0.1)" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="25" stroke="rgba(0, 212, 255, 0.1)" strokeWidth="1" fill="none" />
          <line x1="50" y1="50" x2="50" y2="10" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M50 10A40 40 0 0 1 90 50" stroke="rgba(0, 212, 255, 0.05)" strokeWidth="8" fill="none" />
        </motion.svg>
      );
    case 'diamond':
      return (
        <motion.svg 
          className="rotating-shape-svg"
          animate={{ rotate: -360 }}
          transition={rotationTransition}
          viewBox="0 0 100 100"
        >
          <polygon points="50,15 80,50 50,85 20,50" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="1.5" fill="none" />
          <polygon points="50,28 70,50 50,72 30,50" stroke="rgba(0, 212, 255, 0.1)" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="3.5" fill="#00d4ff" />
        </motion.svg>
      );
    case 'helix':
      return (
        <motion.svg 
          className="rotating-shape-svg"
          animate={{ rotate: 360 }}
          transition={{ ...rotationTransition, duration: 18 }}
          viewBox="0 0 100 100"
        >
          <path d="M30,50 C30,30 70,30 70,50 C70,70 30,70 30,50" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="1" fill="none" />
          <path d="M20,50 C20,20 80,20 80,50 C80,80 20,80 20,50" stroke="rgba(0, 212, 255, 0.07)" strokeWidth="1.5" fill="none" />
          <circle cx="30" cy="50" r="2.5" fill="#00d4ff" />
          <circle cx="70" cy="50" r="2.5" fill="#00d4ff" />
        </motion.svg>
      );
    default:
      return null;
  }
};

const Card3D = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="impact-card-wrapper"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="impact-card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT SIDE */}
        <div className="impact-card-face impact-card-front">
          <div className="rotating-shape-container">
            <RotatingShape type={item.shape} />
          </div>

          <div className="card-top-row">
            <span className="card-mono-badge">{item.type.toUpperCase()}</span>
            <span className="card-icon-accent">{item.badgeIcon}</span>
          </div>

          <div className="card-body-content">
            <h3 className="card-entity-name">{item.name}</h3>
            <p className="card-entity-title">{item.title}</p>
            <div className="card-divider-cyan"></div>
            <p className="card-entity-short">{item.shortDesc}</p>
          </div>

          <div className="card-footer-row">
            <span className="card-metric-label">METRIC</span>
            <span className="card-metric-val">{item.metric}</span>
          </div>
          
          <div className="card-flip-prompt">
            <span>[ Hover to Flip ]</span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="impact-card-face impact-card-back">
          <div className="card-top-row">
            <span className="card-mono-badge">{item.type.toUpperCase()}</span>
            <span className="card-metric-val">{item.metric}</span>
          </div>

          <div className="card-back-body">
            <h4 className="card-back-title">DETAILS</h4>
            <p className="card-entity-long">{item.longDesc}</p>
          </div>

          <div className="card-back-footer">
            <span className="card-back-status">ACTIVE CO-BUILDER</span>
            <span className="card-flip-back-prompt">⟲</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CommunityImpact = () => {
  const [filter, setFilter] = useState('all');

  const filteredData = impactData.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <section id="impact" className="reveal">
      <div className="container">
        <div className="editorial-header">
          <span className="editorial-num">06</span>
          <h2 className="editorial-title">Impact &amp; Community</h2>
        </div>

        <div className="impact-editorial-wrap">
          <p className="impact-editorial-intro">
            An exploration of open-source stewardship, featuring sponsors and voluntary leaders driving the MERN and AI research ecosystem forward.
          </p>

          {/* Filter Bar */}
          <div className="impact-filter-bar">
            <button 
              className={`impact-filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              [ ALL PARTNERS ]
            </button>
            <button 
              className={`impact-filter-btn ${filter === 'donor' ? 'active' : ''}`}
              onClick={() => setFilter('donor')}
            >
              [ SPONSORS ]
            </button>
            <button 
              className={`impact-filter-btn ${filter === 'volunteer' ? 'active' : ''}`}
              onClick={() => setFilter('volunteer')}
            >
              [ VOLUNTEERS ]
            </button>
          </div>

          {/* Grid Layout with smooth layout transitions */}
          <motion.div 
            layout 
            className="impact-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="grid-item-container"
                >
                  <Card3D item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;

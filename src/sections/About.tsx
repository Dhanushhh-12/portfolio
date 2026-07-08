import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, Code2, Database, Brain, ArrowUpRight } from 'lucide-react';

export const About: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt properties
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { damping: 25, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { damping: 25, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const keyQualities = [
    {
      icon: <GraduationCap className="h-5 w-5 text-accent-blue" />,
      title: "Computer Science Student",
      desc: "Currently pursuing B.Tech in Computer Science Engineering, building solid foundations in software design and algorithms."
    },
    {
      icon: <Code2 className="h-5 w-5 text-accent-cyan" />,
      title: "MERN Stack Developer",
      desc: "Passionate about full-stack engineering. Experienced in MongoDB, Express, React, and Node.js to create seamless web platforms."
    },
    {
      icon: <Database className="h-5 w-5 text-accent-purple" />,
      title: "Data Analytics Enthusiast",
      desc: "Skillful in tools like Tableau, Power BI, and Excel. Loves extracting patterns and telling stories through datasets."
    },
    {
      icon: <Brain className="h-5 w-5 text-emerald-400" />,
      title: "Active Problem Solver",
      desc: "Dedicated to solving real-world complex problems, optimizing codebases, and writing maintainable, clean code."
    }
  ];

  return (
    <section id="about" className="relative py-20 md:py-24">
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
            About <span className="text-gradient-purple">Me</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 h-1 w-12 rounded bg-accent-blue"
          />
        </div>

        {/* 3D Glassmorphism Main Card */}
        <div className="perspective-1000 mt-12 md:mt-16">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card overflow-hidden rounded-3xl p-6 md:p-10 shadow-xl"
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              
              {/* Card Left Side: Written Bio */}
              <div className="flex flex-col justify-center lg:col-span-6">
                <h3 className="font-display text-xl font-bold text-theme-text sm:text-2xl">
                  Crafting code that bridges technology and human experience.
                </h3>
                
                <p className="mt-6 font-sans text-sm leading-relaxed text-theme-text-muted sm:text-base">
                  I am a Computer Science Engineering student who thrives on learning and applying technology to solve challenges. My focus centers on creating modern, highly interactive user experiences through React/MERN stack engineering, alongside extracting key insights from data to guide architectural decisions.
                </p>
                
                <p className="mt-4 font-sans text-sm leading-relaxed text-theme-text-muted sm:text-base">
                  What makes me stand out is my developer-analyst hybrid mindset. I don't just build components—I think about design layout usability, API responsiveness, code cleanliness, and analytical metrics to construct projects that have actual impact.
                </p>

                <div className="mt-8">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent-cyan transition-colors hover:text-accent-blue"
                  >
                    Let's collaborate on a project 
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Card Right Side: Key Traits Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-6">
                {keyQualities.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="rounded-2xl border border-theme-card-border bg-dark-900/40 p-5 transition-all duration-300 hover:border-white/10 hover:bg-dark-900/60"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-theme-card border border-theme-card-border">
                      {item.icon}
                    </div>
                    <h4 className="mt-4 font-display text-sm font-bold text-theme-text">
                      {item.title}
                    </h4>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-theme-text-muted">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

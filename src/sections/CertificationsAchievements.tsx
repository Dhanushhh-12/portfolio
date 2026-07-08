import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  logoText: string;
  skills: string[];
  link: string;
}

export const CertificationsAchievements: React.FC = () => {
  const certifications: Certification[] = [
    {
      id: 1,
      title: 'Financial Services Learning Plan: Data Analytics',
      issuer: 'AWS Training & Certification',
      date: 'Completed May 21, 2026',
      logoText: 'AWS',
      skills: ['Cloud Data Analytics', 'Financial Services Data', 'AWS Cloud Technologies', 'Data Management'],
      link: 'https://www.linkedin.com/posts/chededeepu-dhanush-b3123a380_i-am-pleased-to-share-that-on-may-21-2026-share-7463118607720361986-FShG/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGpI3loBlEyR8kEh6z9sNxxXRSt2brIQYGY',
    },
    {
      id: 2,
      title: 'Data Analytics Job Simulation',
      issuer: 'Deloitte (via Forage)',
      date: 'Completed 2025',
      logoText: 'Deloitte.',
      skills: ['Data Visualization', 'Spreadsheets', 'Dashboard Design', 'Data Cleaning', 'Data Quality Assessment'],
      link: 'https://theforage.com',
    },
  ];

  return (
    <section id="certifications" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Header centered */}
        <div className="flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold tracking-tight text-theme-text sm:text-4xl"
          >
            My <span className="text-gradient-purple">Certifications</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 h-1 w-12 rounded bg-accent-blue"
          />
        </div>

        {/* Certification Cards Grid - Balanced 2-column layout */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="glass-card flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300"
              style={{
                boxShadow: `0 8px 30px 0 rgba(0, 0, 0, 0.1)`,
              }}
            >
              <div>
                <div className="flex gap-4">
                  {/* Corporate Logo Graphic Mock */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-dark-900 border border-theme-card-border font-display text-[9px] font-extrabold tracking-tighter text-white">
                    {cert.logoText}
                  </div>

                  <div className="flex flex-col">
                    <h3 className="font-display text-base font-bold text-theme-text">
                      {cert.title}
                    </h3>
                    <span className="text-xs font-semibold text-accent-cyan mt-1">
                      {cert.issuer}
                    </span>
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-theme-text-muted">
                      <Calendar className="h-3 w-3" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="mt-6">
                  <span className="text-[10px] font-semibold text-theme-text-muted uppercase tracking-wider">Skills Validated:</span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-md bg-accent-blue/5 border border-accent-blue/10 px-2 py-0.5 font-sans text-[9px] font-semibold text-accent-blue dark:text-cyan-300 dark:border-cyan-500/10 dark:bg-cyan-500/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Credential Link */}
              <div className="mt-6 border-t border-theme-card-border pt-4">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-theme-text-muted hover:text-accent-cyan transition-colors"
                >
                  Verify on Credential Page
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

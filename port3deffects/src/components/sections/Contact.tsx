import React, { useState, useRef } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Mail, Github, Linkedin, Send, MapPin, Copy, Check, ArrowUpRight } from '../ui/icons';
import { useScrollReveal } from '../../hooks/useGSAPAnimations';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const contactRef = useRef<HTMLElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Shared GSAP Scroll Hooks
  useScrollReveal(contactRef, '.contact-header');
  useScrollReveal(contactRef, ['.contact-info-card', '.contact-form-card'], { delay: 0.1 });

  return (
    <section ref={contactRef} id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header (36-48px, weight 700) */}
      <div className="contact-header space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0284C7]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111111] tracking-tight">
          Let’s Build Something <span className="text-gradient-cyan">Together</span>.
        </h2>
        <p className="text-base sm:text-lg text-[#555555] font-normal leading-relaxed max-w-2xl">
          Have a project, internship opportunity or collaboration idea? Let's connect.
        </p>
      </div>

      <div className="contact-grid grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Contact & Social Links */}
        <div className="contact-info-card lg:col-span-5 space-y-6">
          
          <div className="dev-card p-6 sm:p-8 space-y-6 bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm">
            
            {/* Primary Email Card */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#777777] block mb-2">
                Direct Email
              </span>
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E5E7EB] hover:border-[#0284C7]/50 text-[#111111] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#0284C7]" />
                  <span className="font-mono text-xs sm:text-sm truncate text-[#111111]">
                    {PERSONAL_INFO.social.email}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#0284C7]">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#16A34A]" />
                      <span className="text-[#16A34A]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#777777] group-hover:text-[#0284C7] transition-colors" />
                      <span className="text-[#777777] group-hover:text-[#111111] transition-colors">Copy</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Social Links Cards */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#777777] block">
                Professional Networks
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E5E7EB] hover:border-[#0284C7]/40 transition-all text-xs font-mono group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-[#0284C7]" />
                    <span className="text-[#111111] font-medium">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#0284C7] transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E5E7EB] hover:border-[#0284C7]/40 transition-all text-xs font-mono group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-[#0284C7]" />
                    <span className="text-[#111111] font-medium">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#0284C7] transition-colors" />
                </a>
              </div>
            </div>

            {/* Location & Status Indicator */}
            <div className="pt-4 border-t border-[#E5E7EB] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#555555]">
                <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#555555]">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <span>Open for Summer & Immediate Internships</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-form-card lg:col-span-7">
          <div className="dev-card p-6 sm:p-8 bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-[#111111]">
                  Thank you for reaching out!
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
                  Your message has been staged. You can also send a direct email to{' '}
                  <a
                    href={`mailto:${PERSONAL_INFO.social.email}?subject=Project%20Inquiry%20from%20Portfolio`}
                    className="text-[#0284C7] underline font-mono"
                  >
                    {PERSONAL_INFO.social.email}
                  </a>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-[#0284C7] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#555555] block">
                      Name <span className="text-[#0284C7]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#0284C7] focus:bg-[#FFFFFF] focus:outline-none text-[#111111] placeholder-[#9CA3AF] text-sm font-sans transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#555555] block">
                      Email <span className="text-[#0284C7]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#0284C7] focus:bg-[#FFFFFF] focus:outline-none text-[#111111] placeholder-[#9CA3AF] text-sm font-sans transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#555555] block">
                    Message <span className="text-[#0284C7]">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project, team, or internship role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#0284C7] focus:bg-[#FFFFFF] focus:outline-none text-[#111111] placeholder-[#9CA3AF] text-sm font-sans transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[15px] bg-[#0284C7] text-white hover:bg-[#0369A1] hover:shadow-cyan-sm transition-all duration-200 active:scale-95 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>

                  <a
                    href={`mailto:${PERSONAL_INFO.social.email}?subject=Collaboration%20Inquiry`}
                    className="text-xs font-mono text-[#555555] hover:text-[#0284C7] transition-colors"
                  >
                    Or open default email client &rarr;
                  </a>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>

    </section>
  );
};

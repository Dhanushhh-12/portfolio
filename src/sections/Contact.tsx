import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error when typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Mock API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-20 md:py-24">
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
            Get In <span className="text-gradient-purple">Touch</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 h-1 w-12 rounded bg-accent-blue"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 md:mt-16">
          
          {/* Left Column: CTA and Info Links */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-display text-2xl font-bold text-theme-text leading-tight sm:text-3xl"
              >
                Let's Build Something <br />
                <span className="text-gradient-purple">Amazing Together</span>
              </motion.h3>
              
              <p className="mt-4 font-sans text-sm leading-relaxed text-theme-text-muted">
                Whether you have an internship opportunity, a project proposal, or just want to chat about web technologies and data pipelines, feel free to drop a message! I'll do my best to get back to you as soon as possible.
              </p>
            </div>

            {/* Direct Contact info cards */}
            <div className="mt-8 flex flex-col gap-4.5">
              
              {/* Mail */}
              <div className="flex items-center gap-4 rounded-xl border border-theme-card-border bg-theme-card/30 p-4 transition-colors hover:border-white/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-theme-card border border-theme-card-border text-accent-cyan shadow-sm">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-theme-text-muted uppercase tracking-wider">Email</span>
                  <a href="mailto:cheda.dhanush@gmail.com" className="font-sans text-xs font-semibold text-theme-text hover:text-accent-cyan transition-colors">
                    cheda.dhanush@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 rounded-xl border border-theme-card-border bg-theme-card/30 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-theme-card border border-theme-card-border text-accent-blue shadow-sm">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-theme-text-muted uppercase tracking-wider">Location</span>
                  <span className="font-sans text-xs font-semibold text-theme-text">
                    Hyderabad, India
                  </span>
                </div>
              </div>

              {/* GitHub Link */}
              <a 
                href="https://github.com/Dhanushhh-12"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-theme-card-border bg-theme-card/30 p-4 transition-all duration-300 hover:border-accent-cyan/20 hover:bg-theme-card/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-theme-card border border-theme-card-border text-accent-purple shadow-sm">
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-theme-text-muted uppercase tracking-wider">GitHub Profile</span>
                  <span className="font-sans text-xs font-semibold text-theme-text hover:text-accent-cyan transition-colors">
                    github.com/Dhanushhh-12
                  </span>
                </div>
              </a>

              {/* LinkedIn Link */}
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-theme-card-border bg-theme-card/30 p-4 transition-all duration-300 hover:border-accent-cyan/20 hover:bg-theme-card/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-theme-card border border-theme-card-border text-accent-cyan shadow-sm">
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-theme-text-muted uppercase tracking-wider">LinkedIn Profile</span>
                  <span className="font-sans text-xs font-semibold text-theme-text hover:text-accent-cyan transition-colors">
                    linkedin.com/in/dhanush
                  </span>
                </div>
              </a>

            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-6 md:p-8"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Form Row: Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-theme-text">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`w-full rounded-xl border bg-dark-900/50 py-3 px-4 text-xs font-medium text-theme-text placeholder-theme-text-muted outline-hidden focus:ring-1 ${
                      errors.name 
                        ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/50' 
                        : 'border-theme-card-border focus:border-accent-cyan/40 focus:ring-accent-cyan/40'
                    }`}
                  />
                  {errors.name && (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-rose-400 mt-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Form Row: Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-theme-text">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`w-full rounded-xl border bg-dark-900/50 py-3 px-4 text-xs font-medium text-theme-text placeholder-theme-text-muted outline-hidden focus:ring-1 ${
                      errors.email 
                        ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/50' 
                        : 'border-theme-card-border focus:border-accent-cyan/40 focus:ring-accent-cyan/40'
                    }`}
                  />
                  {errors.email && (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-rose-400 mt-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Form Row: Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-theme-text">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write details of your proposal or query..."
                    className={`w-full rounded-xl border bg-dark-900/50 py-3 px-4 text-xs font-medium text-theme-text placeholder-theme-text-muted outline-hidden focus:ring-1 resize-none ${
                      errors.message 
                        ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/50' 
                        : 'border-theme-card-border focus:border-accent-cyan/40 focus:ring-accent-cyan/40'
                    }`}
                  />
                  {errors.message && (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-rose-400 mt-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit State Alerts */}
                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs font-semibold text-emerald-400"
                  >
                    <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent-blue py-3.5 text-xs font-bold text-white shadow-md shadow-accent-blue/15 transition-all duration-300 hover:bg-accent-blue/90 hover:shadow-accent-blue/25 hover:translate-y-[-2px] disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>

              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

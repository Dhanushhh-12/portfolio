/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#FFFFFF',
          card: '#FFFFFF',
          cardHover: '#F8FAFC',
          border: '#E5E7EB',
          borderLight: 'rgba(0, 0, 0, 0.06)',
        },
        cyan: {
          accent: '#0284C7',
          glow: '#0EA5E9',
          dark: '#0369A1',
          light: '#38BDF8',
        },
        violet: {
          accent: '#7C3AED',
          dark: '#6D28D9',
          light: '#8B5CF6',
        },
        slate: {
          primary: '#111111',
          secondary: '#555555',
          muted: '#777777',
        },
        // Backwards-compatible utility aliases
        border: 'hsl(var(--border) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'cyan-sm': '0 2px 10px -2px rgba(2, 132, 199, 0.25)',
        'cyan-glow': '0 4px 20px -2px rgba(2, 132, 199, 0.25)',
        'violet-glow': '0 4px 20px -2px rgba(124, 58, 237, 0.2)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.07), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

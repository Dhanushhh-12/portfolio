/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        dark: {
          950: '#030712',
          900: '#0b0f19',
          800: '#111827',
          700: '#1f2937',
          600: '#374151',
        },
        accent: {
          blue: 'var(--accent-blue)',
          cyan: 'var(--accent-cyan)',
          purple: 'var(--accent-purple)',
        },
        theme: {
          bg: 'var(--theme-bg)',
          text: 'var(--theme-text)',
          'text-muted': 'var(--theme-text-muted)',
          card: 'var(--theme-card)',
          'card-border': 'var(--theme-card-border)',
          'card-hover-border': 'var(--theme-card-hover-border)',
          nav: 'var(--theme-nav)',
          'nav-border': 'var(--theme-nav-border)',
        }
      }
    },
  },
  plugins: [],
}

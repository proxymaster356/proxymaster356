/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        backgroundDark: '#060B18',
        cardDark: '#0F172A',
        surfaceDark: '#1E293B',
        backgroundLight: '#F0F4FA',
        cardLight: '#FFFFFF',
        surfaceLight: '#E8EDF5',
        accentTeal: '#00BFA6',
        accentAmber: '#FFB703',
        accentPurple: '#8B5CF6',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 20px rgba(0,191,166,0.15), 0 0 60px rgba(0,191,166,0.05)',
        'glow-amber': '0 0 20px rgba(255,183,3,0.15), 0 0 60px rgba(255,183,3,0.05)',
        'card-light': '0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)',
        'card-dark': '0 2px 8px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.2)',
        'card-hover-light': '0 4px 12px rgba(0,191,166,0.1), 0 12px 40px rgba(0,0,0,0.08)',
        'card-hover-dark': '0 4px 16px rgba(0,191,166,0.15), 0 12px 48px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-dark': 'radial-gradient(at 20% 80%, rgba(0,191,166,0.08) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(255,183,3,0.04) 0%, transparent 50%)',
        'mesh-light': 'radial-gradient(at 20% 80%, rgba(0,191,166,0.06) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(255,183,3,0.03) 0%, transparent 50%)',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulse_glow: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        gradientShift: 'gradientShift 12s ease infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-glow': 'pulse_glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}


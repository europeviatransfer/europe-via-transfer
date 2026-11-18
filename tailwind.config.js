/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          600: '#2a2a2a',
          700: '#1c1c1c',
          800: '#141414',
          900: '#0b0b0b',
        },
        gold: {
          400: '#d4b06a',
          500: '#c8a34d',
          600: '#a8853c',
        },
        mist: {
          100: '#f7f6f4',
          300: '#e0e0e0',
          400: '#b8b8b8',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

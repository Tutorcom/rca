/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#5D5FEF',
          hover: '#4b4ded',
          light: '#F0F0FF',
        },
        danger: {
          DEFAULT: '#F7685B',
          light: '#FDEEEE',
          dark: '#D94B4B',
        },
        success: {
          DEFAULT: '#2ED47A',
          light: '#EAFBF1',
          dark: '#25A962',
        },
        warning: { // On Hold
          DEFAULT: '#FFB648',
          light: '#FFF6E9',
          dark: '#D8942A',
        },
        info: { // Processing
          DEFAULT: '#8B5CF6',
          light: '#F5F3FF',
          dark: '#7C3AED',
        },
        transit: { // In Transit
          DEFAULT: '#38BDF8',
          light: '#E0F2FE',
          dark: '#0EA5E9'
        },
        slate: {
          50: '#FDFDFD',
          100: '#F7F7F9', // Page background
          200: '#E9E9EC', // Borders, dividers
          300: '#D5D5D9',
          400: '#A0A0A0', // Light text
          500: '#757575', // Body text
          600: '#525252', // Subheadings
          700: '#454545', // Headings
          800: '#272727', // Darker elements
          900: '#151515'
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in-up': 'fade-in-up 0.3s ease-out forwards',
      },
      keyframes: {
        'fade-in-up': {
            'from': { opacity: '0', transform: 'translateY(10px)' },
            'to': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [],
}
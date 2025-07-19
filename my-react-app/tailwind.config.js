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
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#B91C1C', // A strong, professional red
          hover: '#991B1B',
          light: '#FEE2E2',
        },
        secondary: '#475569', // A dark slate for accents
        accent: {
          DEFAULT: '#64748B',
          hover: '#475569',
        },
        danger: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
          dark: '#991B1B',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
          dark: '#14532D',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF9C3',
          dark: '#78350F',
        },
        info: {
          DEFAULT: '#2563EB',
          light: '#DBEAFE',
          dark: '#1E40AF',
        },
        slate: { // Used for the "smoke white" theme
          50: '#F8FAFC',   // Lightest background
          100: '#F1F5F9',  // Main background color
          200: '#E2E8F0',  // Borders
          300: '#CBD5E1',  // Lighter borders, UI elements
          400: '#94A3B8',  // Light text, icons
          500: '#64748B',  // Medium text
          600: '#475569',  // Body text
          700: '#334155',  // Subheadings
          800: '#1E293B',  // Headings
          900: '#0F172A'   // Darkest elements
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
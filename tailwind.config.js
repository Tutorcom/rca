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
        heading: ['Inter', 'sans-serif'], // Changed to Inter for consistency
      },
      colors: {
        primary: {
          DEFAULT: '#CC0000', // Rosado Red
          hover: '#A30000',   // Darker red for hover
          light: '#FEE2E2',   // Light red for backgrounds
        },
        secondary: '#374151', // Dark grey for secondary actions
        danger: {
          DEFAULT: '#EF4444', // Red-500
          light: '#FEE2E2',   // Red-100
          dark: '#B91C1C',    // Red-800
        },
        success: {
          DEFAULT: '#22C55E', // Green-500
          light: '#DCFCE7',   // Green-100
          dark: '#166534',    // Green-800
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber-500
          light: '#FEF3C7',   // Amber-100
          dark: '#92400E',    // Amber-800
        },
        info: { // This will be the "Processing" purple
          DEFAULT: '#8B5CF6', // Violet-500
          light: '#F5F3FF',   // Violet-100
          dark: '#6D28D9',    // Violet-700
        },
        sky: { // For "In Transit" or "Opportunity"
          DEFAULT: '#38BDF8', // Sky-400
          light: '#E0F2FE',   // Sky-100
          dark: '#075985',    // Sky-800
        },
        slate: {
          50: '#F8FAFC',   // Lightest background (page bg)
          100: '#F1F5F9',  // Light UI elements, input bg
          200: '#E2E8F0',  // Borders, dividers
          300: '#CBD5E1',  // Input borders
          400: '#9CA3AF',  // Medium-light text
          500: '#6B7280',  // Body text, icons
          600: '#4B5563',  // Subheadings
          700: '#374151',  // Headings
          800: '#1F2937',  // Darker headings
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
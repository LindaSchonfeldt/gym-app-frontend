/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Custom color palette for your gym app
      colors: {
        // Light theme colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Main primary color
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e'
        },
        // Dark theme variants
        'primary-dark': {
          50: '#0c4a6e',
          100: '#075985',
          200: '#0369a1',
          300: '#0284c7',
          400: '#0ea5e9',
          500: '#38bdf8',
          600: '#7dd3fc',
          700: '#bae6fd',
          800: '#e0f2fe',
          900: '#f0f9ff'
        },
        // Theme-specific colors
        background: {
          light: '#ffffff',
          dark: '#0f172a'
        },
        surface: {
          light: '#f8fafc',
          dark: '#1e293b'
        },
        text: {
          light: '#0f172a',
          dark: '#f8fafc'
        },
        // Gym-specific colors
        gym: {
          muscle: '#e11d48', // Red for muscle groups
          cardio: '#059669', // Green for cardio
          strength: '#dc2626', // Red for strength
          flexibility: '#7c3aed', // Purple for flexibility
          equipment: '#374151' // Gray for equipment
        },
        // Success, warning, error states
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6'
      },
      // Custom fonts
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      // Custom spacing
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem'
      },
      // Custom border radius
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      // Custom shadows
      boxShadow: {
        gym: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'gym-lg':
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
      },
      // Animation
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
    // Add your themes here
    themes: {
      powerlifting: {
        primary: '#dc2626', // Red
        secondary: '#000000', // Black
        accent: '#fbbf24' // Gold
      },
      cardio: {
        primary: '#059669', // Green
        secondary: '#0ea5e9', // Blue
        accent: '#f59e0b' // Orange
      },
      yoga: {
        primary: '#7c3aed', // Purple
        secondary: '#ec4899', // Pink
        accent: '#10b981' // Green
      }
    }
  },
  plugins: [
    // You can add plugins here for additional functionality
  ]
}

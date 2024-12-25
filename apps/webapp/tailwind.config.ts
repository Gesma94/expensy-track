import type { Config } from 'tailwindcss';
import tailwindCssMotion from 'tailwindcss-motion';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      cultured: '#F4F4F8',
      'metallic-silver': '#A8A9B2',
      'american-silver': '#CACBD4',
      'eerie-black': '#17171D',
      independence: '#565668',
      'blue-violet': '#8A28F4',
      'celtic-blue': '#145DDA',
      'alice-blue': '#E9F1FF',
      'ghost-white': '#F7FBFF',
      'lavender-blue': '#B8D2FF',
      rhythm: '#77778F',
      primary: {
        DEFAULT: '#4CAF50', // Main primary color
        hover: '#43A047', // Slightly darker shade for hover state
        active: '#388E3C', // Even darker shade for active state
        focus: '#81C784', // Lighter shade for focus outline
        disabled: '#A5D6A7', // Muted shade for disabled state
        text: '#FFFFFF' // Text color on primary background
      },
      background: {
        white: {
          DEFAULT: '#FFFFFF',
          hover: '#F1FFF3', // Light green hint on hover
          selected: '#E8F5E9', // Subtle green background for selected state
          'selected-hover': '#DFF0E2', // Slightly darker green for selected and hovered state
          active: '#D0E8D5', // Vibrant greenish shade for active state
          disabled: '#F9FBF7' // Muted and very light for disabled state
        },
        ghost: {
          hover: 'rgba(0, 0, 0, 0.05)',
          active: 'rgba(0, 0, 0, 0.15)',
          disabled: 'rgba(0, 0, 0, 0.02)',
          focus: 'rgba(0, 0, 0, 0.10)'
        },
        light: '#ECEFEC',
        lighter: '#F9FBF7', // Almost white, with a hint of green for ultra-light shadow
        shadow: '#E8F5E9', // A soft shadow color, complementary to primary
        subtle: '#E3F2FD' // Subtle blueish background for secondary accents
      },
      foreground: {
        dark: '#212121'
      },
      'primary-light': '#81C784', // Lighter shade of primary
      'primary-dark': '#388E3C', // Darker shade of primary
      secondary: '#2196F3', // Blue, for links or secondary accents
      'secondary-light': '#64B5F6',
      'secondary-dark': '#1976D2',
      success: '#4CAF50', // Used for success alerts or positive trends
      warning: '#FF9800', // Used for warnings or alerts
      error: '#F44336', // Used for errors or negative trends
      'text-primary': '#212121', // Main text color
      'text-secondary': '#757575', // Secondary text
      'background-dark': '#263238', // Darker background,
      transparent: '#FFFFFF00'
    },
    extend: {
      padding: {
        drawer: '2rem'
      },
      height: {
        input: '3.125rem'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif']
      },
      animation: {
        'backdrop-blur': 'backdrop-blur 0.5s forwards',
        'backdrop-blur-reverse': 'backdrop-blur-reverse 0.5s forwards'
      },
      keyframes: {
        'backdrop-blur': {
          '0%': { backdropFilter: 'blur(0px)' },
          '100%': { backdropFilter: 'blur(8px)' }
        },
        'backdrop-blur-reverse': {
          '0%': { backdropFilter: 'blur(8px)' },
          '100%': { backdropFilter: 'blur(0px)' }
        }
      }
    }
  },
  safelist: [
    {
      pattern: /border-.+/ // used in SpinLoader
    }
  ],
  plugins: [tailwindCssMotion]
} satisfies Config;

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
      'background-light': '#FAFAFA', // Light background for cards and UI
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
  plugins: [tailwindCssMotion]
} satisfies Config;

import type { Config } from 'tailwindcss';
import tailwindCssMotion from 'tailwindcss-motion';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      edge: {
        default: '#607D66', // Neutral green-gray for general use
        hover: '#4A6A51', // Slightly darker for hover state
        active: '#3A5A41', // Rich green-gray for active state
        disabled: '#DCE4DC' // Muted green-gray for disabled state
      },
      primary: {
        DEFAULT: '#4CAF50', // Main primary color
        hover: '#43A047', // Slightly darker shade for hover state
        active: '#388E3C', // Even darker shade for active state
        focus: '#81C784', // Lighter shade for focus outline
        disabled: '#A5D6A7', // Muted shade for disabled state
        text: '#FFFFFF' // Text color on primary background
      },
      secondary: {
        DEFAULT: '#2196F3', // Main secondary color
        hover: '#1E88E5', // Slightly darker shade for hover state
        active: '#1976D2', // Even darker shade for active state
        focus: '#64B5F6', // Lighter shade for focus outline
        disabled: '#BBDEFB', // Muted shade for disabled state
        text: '#FFFFFF' // Text color on secondary background
      },
      background: {
        white: {
          DEFAULT: '#FFFFFF',
          hover: '#F5F5F5', // Light green hint on hover
          selected: '#E8F5E9', // Subtle green background for selected state
          'selected-hover': '#DFF0E2', // Slightly darker green for selected and hovered state
          active: '#ebebeb', // Vibrant greenish shade for active state
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
        dark: '#212121',
        mediumPriority: '#757575', // Medium gray for balanced emphasis
        lowPriority: '#BDBDBD', // Light gray for muted or less important text
        subtle: '#E0E0E0' // Very light gray for hints or placeholder text
      },
      success: '#4CAF50', // Used for success alerts or positive trends
      warning: '#FF9800', // Used for warnings or alerts
      error: '#F44336', // Used for errors or negative trends
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
        'backdrop-blur-reverse': 'backdrop-blur-reverse 0.5s forwards',
        'dialog-enter': 'dialog-enter 0.5s linear forwards',
        'dialog-exit': 'dialog-exit 0.5s linear forwards'
      },
      keyframes: {
        'backdrop-blur': {
          '0%': { backdropFilter: 'blur(0px)' },
          '100%': { backdropFilter: 'blur(8px)' }
        },
        'backdrop-blur-reverse': {
          '0%': { backdropFilter: 'blur(8px)' },
          '100%': { backdropFilter: 'blur(0px)' }
        },
        'dialog-enter': {
          '0%': { position: 'relative', top: '-2rem', opacity: '0' },
          '100%': { position: 'relative', top: '0', opacity: '1' }
        },
        'dialog-exit': {
          '0%': { position: 'relative', top: '0', opacity: '1' },
          '100%': { position: 'relative', top: '-2rem', opacity: '0' }
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

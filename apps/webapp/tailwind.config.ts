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
      rhythm: '#77778F'
    },
    extend: {
      height: {
        input: '2.5rem'
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

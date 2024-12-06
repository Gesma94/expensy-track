import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        input: '2.5rem'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif']
      },
      colors: {
        white: '#FFFFFF',
        cultured: '#F4F4F8',
        'metallic-silver': '#A8A9B2',
        'american-silver': '#CACBD4',
        'eerie-black': '#17171D',
        independence: '#565668',
        'blue-violet': '#8A28F4',
        'celtic-blue': '#145DDA',
        'alice-blue': '#E9F1FF'
      }
    }
  },
  plugins: []
} satisfies Config;

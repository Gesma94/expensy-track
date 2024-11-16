import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        input: '2.5rem'
      },
      fontFamily: {
        bitter: ['Bitter', 'serif'],
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config;

import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bitter: ['Bitter', 'serif'],
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config;

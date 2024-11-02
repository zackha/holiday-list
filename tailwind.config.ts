import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xxs: '360px',
    },
    extend: {
      fontFamily: {
        sans: ['SuisseIntl', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/calendar-kit/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
};

export default config;

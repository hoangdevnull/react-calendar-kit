import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin.js';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/calendar-kit/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0C111D',
        foreground: '#F5F5F6',
        primary: '#7F56D9',
        secondary: '#A9ACE7',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};

export default config;

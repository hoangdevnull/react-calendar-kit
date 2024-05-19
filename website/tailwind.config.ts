import { withTV } from 'tailwind-variants/transformer';
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/docs/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        serif: ['var(--font-serif)', ...fontFamily.serif],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary-btn': 'linear-gradient(180deg, #A9ACE7 0%, rgba(138, 142, 220, 0.40) 100%)',
        'gradient-secondary-btn': 'linear-gradient(180deg, rgba(127, 86, 217, 0.00) 0%, rgba(127, 86, 217, 0.60) 100%)',
        'gradient-nav': 'linear-gradient(180deg, #A9ACE7 0%, rgba(138, 142, 220, 0.40) 100%)',
        'gradient-text': 'linear-gradient(272deg, #0B0E66 -14.22%, #EDEDF2 50.45%, #0B0E66 116.9%)',
        'gradient-featured':
          'radial-gradient(50% 50% at 50% 50%, rgba(245, 245, 246, 0.00) 0%, rgba(245, 245, 246, 0.20) 100%), radial-gradient(70.71% 70.71% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%)',
      },
      colors: {
        background: '#0C111D',
        foreground: '#F5F5F6',
        primary: '#7F56D9',
        secondary: '#A9ACE7',
      },
      boxShadow: {
        'primary-button': '0px -8px 20px 0px rgba(60, 66, 208, 0.60) inset, 0px 6px 44px 0px #060848',
        'secondary-button': '0px 6px 44px 0px #060848',
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
        'featured-card':
          '1.074px 2.149px 2.149px -0.537px rgba(0, 0, 0, 0.15) inset, 0px -0.537px 0.537px 0px rgba(255, 255, 255, 0.35) inset',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addBase, theme }) => {
      let allColors = flattenColorPalette(theme('colors'));
      let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

      addBase({
        ':root': newVars,
      } as any);

      addUtilities({
        '.inset-center': {
          top: '50%',
          left: '50%',
          '@apply absolute -translate-x-1/2 -translate-y-1/2': {},
        },
        '.inset-y-center': {
          top: '50%',
          '@apply absolute -translate-y-1/2': {},
        },
        '.inset-x-center': {
          left: '50%',
          '@apply absolute -translate-x-1/2': {},
        },

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

        '.btn-primary': {
          background:
            'radial-gradient(70.71% 70.71% at 50% 50%, rgba(255, 255, 255, 0.12) 0%, rgba(0, 0, 0, 0) 100%), #0047ff',
        },
        '.btn-secondary': {
          background:
            'radial-gradient(70.71% 70.71% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.04)',
        },
      });
    }),
    require('tailwindcss-gradient-border'),
  ],
};

export default withTV(config);

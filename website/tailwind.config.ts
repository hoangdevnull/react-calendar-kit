import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
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
        'gradient-btn': 'linear-gradient(180deg, rgba(60, 66, 208, 0.00) 0%, rgba(60, 66, 208, 0.60) 100%)',
        'gradient-nav': 'linear-gradient(180deg, #A9ACE7 0%, rgba(138, 142, 220, 0.40) 100%)',
        'gradient-secondary-btn': 'linear-gradient(180deg, #A9ACE7 0%, rgba(138, 142, 220, 0.40) 100%)',
        'gradient-text': 'linear-gradient(272deg, #0B0E66 -14.22%, #EDEDF2 50.45%, #0B0E66 116.9%)',
      },
      colors: {
        background: '#0C111D',
        foreground: '#F5F5F6',
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

export default config;

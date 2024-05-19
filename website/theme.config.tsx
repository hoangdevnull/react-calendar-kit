import React from 'react';
import { type DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span>React Calendar Kit</span>,
  project: {
    link: 'https://github.com/HoangDevNull/react-calendar-kit',
  },
  docsRepositoryBase: 'https://github.com/HoangDevNull/react-calendar-kit/tree/main/website',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – React Calendar Kit',
    };
  },
  feedback: {
    content: null,
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://github.com/HoangDevNull" target="_blank">
          HoangDevNull
        </a>
        .
      </span>
    ),
  },
};

export default config;

import { defineConfig, type Options } from 'tsup';

const DIST_PATH = './dist';

export default defineConfig((options: Options) => ({
  sourcemap: false,
  minify: true,
  dts: true,
  format: ['esm', 'cjs'],
  loader: {
    '.js': 'jsx',
  },
  target: 'esnext',
  outDir: DIST_PATH,
  clean: !options.watch,
  external: ['react'],
  banner: {
    js: "'use client';",
  },
  ...options,
}));

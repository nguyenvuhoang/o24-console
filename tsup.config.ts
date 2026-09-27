import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    minify: true,
    treeshake: true,
    platform: 'browser',
  },
  {
    entry: { react: 'src/react.tsx' },
    format: ['esm'],
    dts: true,
    sourcemap: true,
    minify: true,
    treeshake: true,
    platform: 'browser',
    external: ['react', 'react/jsx-runtime'],
  },
  {
    entry: { cli: 'src/cli.ts' },
    format: ['esm'],
    dts: false,
    sourcemap: false,
    minify: false,
    treeshake: true,
    platform: 'node',
    banner: { js: '#!/usr/bin/env node\n' },
  },
])

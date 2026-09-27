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
  },
  {
    entry: { react: 'src/react.tsx' },
    format: ['esm'],
    dts: true,
    sourcemap: true,
    minify: true,
    treeshake: true,
    external: ['react', 'react/jsx-runtime'],
  },
])

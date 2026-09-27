import { defineConfig } from 'tsup'
import { readFile, writeFile } from 'node:fs/promises'

const CLIENT_DIRECTIVE = "'use client';"

async function preserveReactClientDirective() {
  const path = 'dist/react.js'
  const output = await readFile(path, 'utf8')

  if (!output.startsWith(CLIENT_DIRECTIVE)) {
    await writeFile(path, `${CLIENT_DIRECTIVE}\n${output}`, 'utf8')
  }
}

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
    onSuccess: preserveReactClientDirective,
  },
])

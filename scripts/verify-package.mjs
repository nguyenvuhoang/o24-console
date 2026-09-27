import { access, readFile } from 'node:fs/promises'

const requiredFiles = [
  'dist/index.js',
  'dist/index.d.ts',
  'dist/react.js',
  'dist/react.d.ts',
]

for (const path of requiredFiles) {
  await access(new URL(`../${path}`, import.meta.url))
}

const reactEntry = await readFile(
  new URL('../dist/react.js', import.meta.url),
  'utf8'
)

if (!reactEntry.startsWith("'use client';")) {
  throw new Error(
    'Invalid React entry: dist/react.js must start with \'use client\';'
  )
}

const pkg = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8')
)

for (const exportName of ['.', './react']) {
  if (!pkg.exports?.[exportName]?.types) {
    throw new Error(`Missing types export for ${exportName}`)
  }

  if (!pkg.exports?.[exportName]?.import) {
    throw new Error(`Missing import export for ${exportName}`)
  }
}

console.log('Package verification passed.')

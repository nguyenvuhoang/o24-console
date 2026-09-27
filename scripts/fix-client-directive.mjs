import { readFile, writeFile } from 'node:fs/promises'

const file = new URL('../dist/react.js', import.meta.url)
const directive = "'use client';"
const output = await readFile(file, 'utf8')

if (!output.startsWith(directive)) {
  await writeFile(file, `${directive}\n${output}`, 'utf8')
}

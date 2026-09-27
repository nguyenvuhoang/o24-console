import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { spawnSync } from 'node:child_process'

const PACKAGE_NAME = '@vknighthub/o24-console'
const args = process.argv.slice(2)
const command = args[0]
const positionalProduct = args[1]?.startsWith('--') ? undefined : args[1]

function option(name: string): string | undefined {
  const index = args.indexOf(`--${name}`)
  return index >= 0 ? args[index + 1] : undefined
}

function usage() {
  console.log(`
O24 Console CLI

Usage:
  npx @vknighthub/o24-console init [PRODUCT] [options]

Examples:
  npx @vknighthub/o24-console init EMI
  npx @vknighthub/o24-console init --product EMI --description "EMI Portal"

Options:
  --product <code>         Product code, e.g. EMI
  --description <name>    Product description, e.g. EMI Portal
`)
}

function hasDependency(pkg: any, name: string): boolean {
  return Boolean(
    pkg.dependencies?.[name] ||
    pkg.devDependencies?.[name] ||
    pkg.optionalDependencies?.[name]
  )
}

function detectPackageManager(root: string): { name: string; command: string; args: string[] } {
  if (existsSync(join(root, 'pnpm-lock.yaml'))) {
    return { name: 'pnpm', command: 'pnpm', args: ['add', PACKAGE_NAME] }
  }
  if (existsSync(join(root, 'yarn.lock'))) {
    return { name: 'yarn', command: 'yarn', args: ['add', PACKAGE_NAME] }
  }
  if (existsSync(join(root, 'bun.lockb')) || existsSync(join(root, 'bun.lock'))) {
    return { name: 'bun', command: 'bun', args: ['add', PACKAGE_NAME] }
  }
  return { name: 'npm', command: 'npm', args: ['install', PACKAGE_NAME] }
}

function installPackage(root: string, projectPackage: any): void {
  if (hasDependency(projectPackage, PACKAGE_NAME)) {
    console.log(`✓ ${PACKAGE_NAME} already installed`)
    return
  }

  const manager = detectPackageManager(root)
  console.log(`✓ Detected ${manager.name}`)
  console.log(`→ Installing ${PACKAGE_NAME}...`)

  const executable = process.platform === 'win32' ? `${manager.command}.cmd` : manager.command
  const result = spawnSync(executable, manager.args, {
    cwd: root,
    stdio: 'inherit',
    shell: false,
  })

  if (result.error || result.status !== 0) {
    console.error(`O24 Console: failed to install ${PACKAGE_NAME} with ${manager.name}.`)
    if (result.error) console.error(result.error.message)
    process.exit(result.status || 1)
  }

  console.log(`✓ Installed ${PACKAGE_NAME}`)
}

if (command !== 'init') {
  usage()
  process.exit(command ? 1 : 0)
}

const root = process.cwd()
const packagePath = join(root, 'package.json')

if (!existsSync(packagePath)) {
  console.error('O24 Console: package.json was not found in the current directory.')
  process.exit(1)
}

const projectPackage = JSON.parse(readFileSync(packagePath, 'utf8'))
const hasNext = hasDependency(projectPackage, 'next')
const hasReact = hasDependency(projectPackage, 'react')

if (!hasReact) {
  console.error('O24 Console: this installer currently supports React/Next.js projects.')
  process.exit(1)
}

installPackage(root, projectPackage)

const product = (option('product') || positionalProduct || projectPackage.name || 'O24').toUpperCase()
const description = option('description') || (product === 'EMI' ? 'EMI Portal' : product)

const componentPath = join(root, 'src', 'components', 'ConsoleSecurityWarning.tsx')
mkdirSync(dirname(componentPath), { recursive: true })

const component = `'use client'

import { O24Console } from '@vknighthub/o24-console/react'

export default function ConsoleSecurityWarning() {
  return (
    <O24Console
      product='${product}'
      description='${description.replaceAll("'", "\\'")}'
      environment={process.env.NEXT_PUBLIC_APP_ENV}
      version={process.env.NEXT_PUBLIC_APP_VERSION}
      build={process.env.NEXT_PUBLIC_APP_BUILD}
    />
  )
}
`

if (!existsSync(componentPath)) {
  writeFileSync(componentPath, component, 'utf8')
  console.log(`✓ Created ${relative(root, componentPath)}`)
} else {
  console.log(`✓ ${relative(root, componentPath)} already exists`)
}

if (!hasNext) {
  console.log('✓ Component created. Mount <ConsoleSecurityWarning /> once near your React application root.')
  process.exit(0)
}

const layoutCandidates = [
  join(root, 'src', 'app', 'layout.tsx'),
  join(root, 'src', 'app', '[locale]', 'layout.tsx'),
  join(root, 'app', 'layout.tsx'),
  join(root, 'app', '[locale]', 'layout.tsx'),
].filter(existsSync)

if (layoutCandidates.length === 0) {
  console.log('! Component created, but no standard Next.js App Router root layout was found.')
  console.log('  Mount <ConsoleSecurityWarning /> once in your root layout.')
  process.exit(0)
}

const layoutPath = layoutCandidates[0]
let layout = readFileSync(layoutPath, 'utf8')

if (layout.includes('<ConsoleSecurityWarning')) {
  console.log(`✓ O24 Console already configured in ${relative(root, layoutPath)}`)
  console.log(`✓ Product: ${product} — ${description}`)
  process.exit(0)
}

const importLine = "import ConsoleSecurityWarning from '@/components/ConsoleSecurityWarning'"

if (!layout.includes(importLine)) {
  const lines = layout.split('\n')
  let insertAt = 0
  while (
    insertAt < lines.length &&
    (lines[insertAt].startsWith("'use ") ||
      lines[insertAt].startsWith('"use ') ||
      lines[insertAt].trim() === '' ||
      lines[insertAt].startsWith('import '))
  ) {
    insertAt++
  }
  lines.splice(insertAt, 0, importLine)
  layout = lines.join('\n')
}

const bodyMatch = layout.match(/<body([^>]*)>/)
if (!bodyMatch) {
  console.log(`! Could not safely edit ${relative(root, layoutPath)} because no <body> tag was found.`)
  console.log('  Import and mount <ConsoleSecurityWarning /> once in that layout.')
  process.exit(0)
}

layout = layout.replace(bodyMatch[0], `${bodyMatch[0]}\n        <ConsoleSecurityWarning />`)
writeFileSync(layoutPath, layout, 'utf8')

console.log(`✓ Added O24 Console to ${relative(root, layoutPath)}`)
console.log(`✓ Product: ${product} — ${description}`)
console.log('✓ O24 Console ready.')

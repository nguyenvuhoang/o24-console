import { DEFAULT_WEBSITE, O24_LOGO } from './branding'
import type { O24ConsoleOptions } from './types'

const FLAG = '__o24ConsoleShown__'

type O24Window = Window & { [FLAG]?: boolean }

const style = (...rules: string[]) => rules.join(';')

export function showO24Console(options: O24ConsoleOptions = {}): void {
  if (typeof window === 'undefined') return

  const target = window as O24Window
  if (target[FLAG] && !options.force) return
  target[FLAG] = true

  const product = options.product || 'O24'
  const description = options.description || 'API Management & Product Service'
  const environment = (options.environment || 'DEVELOPMENT').toUpperCase()
  const version = options.version || 'Development'
  const build = options.build || 'Local'
  const website = options.website || DEFAULT_WEBSITE
  const runtimeInfo = options.runtimeInfo !== false
  const securityWarning = options.securityWarning !== false

  window.console.log(
    `%c${O24_LOGO}`,
    style('color:#2563eb', 'font-weight:900', 'font-family:monospace', 'font-size:14px', 'line-height:1.15')
  )

  window.console.log(
    '%c O24 %c OPEN API MANAGEMENT PLATFORM ',
    style('background:#2563eb', 'color:#fff', 'font-size:18px', 'font-weight:900', 'padding:6px 12px', 'border-radius:4px 0 0 4px'),
    style('background:#0f172a', 'color:#fff', 'font-size:18px', 'font-weight:700', 'padding:6px 12px', 'border-radius:0 4px 4px 0')
  )

  window.console.log('%cAPI Management & Product Service', style('color:#0f172a', 'font-size:16px', 'font-weight:800', 'line-height:2'))
  window.console.log('%cPlugin-first architecture  •  Open Source  •  On-Prem  •  Cloud', style('color:#64748b', 'font-size:13px'))
  window.console.log('%cBuilt by developers, for developers.', style('color:#64748b', 'font-size:13px', 'font-style:italic'))

  window.console.log('\n')
  window.console.log(
    '%c PRODUCT %c ' + product,
    style('background:#7c3aed', 'color:#fff', 'font-size:12px', 'font-weight:800', 'padding:4px 8px', 'border-radius:3px 0 0 3px'),
    style('background:#ede9fe', 'color:#5b21b6', 'font-size:12px', 'font-weight:800', 'padding:4px 10px', 'border-radius:0 3px 3px 0')
  )
  window.console.log(`%c${description}`, style('color:#475569', 'font-size:13px', 'font-weight:600', 'line-height:2'))

  if (runtimeInfo) {
    window.console.log(
      '%c RUNTIME ',
      style('background:#0f172a', 'color:#38bdf8', 'font-size:12px', 'font-weight:800', 'padding:4px 8px', 'border-radius:3px')
    )
    window.console.log(
      '%cEnvironment  %c%s\n%cVersion      %c%s\n%cBuild        %c%s',
      'color:#64748b;font-weight:600',
      'color:#16a34a;font-weight:800',
      environment,
      'color:#64748b;font-weight:600',
      'color:#0f172a;font-weight:700',
      version,
      'color:#64748b;font-weight:600',
      'color:#0f172a;font-weight:700',
      build
    )
  }

  window.console.log('\n')
  window.console.log(
    '%c vKnight %c ' + website,
    style('background:#2563eb', 'color:#fff', 'font-weight:800', 'padding:4px 8px', 'border-radius:3px 0 0 3px'),
    style('color:#2563eb', 'font-weight:700', 'padding:4px 8px')
  )

  if (securityWarning) {
    window.console.log('\n')
    window.console.log(
      '%c ⚠ DEVELOPER CONSOLE ',
      style('background:#f59e0b', 'color:#111827', 'font-size:12px', 'font-weight:900', 'padding:5px 8px', 'border-radius:3px')
    )
    window.console.log(
      '%cThis console is intended for developers and system administrators.\nNever paste or execute code here that you do not understand.',
      style('color:#92400e', 'font-size:12px', 'font-weight:600', 'line-height:1.6')
    )
  }

  window.console.log('\n%c────────────────────────────────────────────────────', 'color:#cbd5e1')
  window.console.log(
    '%cO24%c  •  %cPowered by vKnight%c  •  %c' + product,
    'color:#2563eb;font-weight:900',
    'color:#94a3b8',
    'color:#7c3aed;font-weight:800',
    'color:#94a3b8',
    'color:#0f172a;font-weight:800'
  )
  window.console.log('%c────────────────────────────────────────────────────\n', 'color:#cbd5e1')
}

export function resetO24Console(): void {
  if (typeof window !== 'undefined') {
    ;(window as O24Window)[FLAG] = false
  }
}

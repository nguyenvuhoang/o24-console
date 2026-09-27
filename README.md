# @vknight/o24-console

O24 Developer Console branding for modern web applications.

**O24** is an open-source **API Management & Product Service** platform from **vKnight**. Plugin-first architecture, designed for on-prem and cloud deployments — built by developers, for developers.

## Install

```bash
pnpm add @vknight/o24-console
```

Also works with npm or yarn:

```bash
npm install @vknight/o24-console
```

## Framework-agnostic usage

```ts
import { showO24Console } from '@vknight/o24-console'

showO24Console({
  product: 'IPS',
  description: 'Integrated Property System',
  environment: 'UAT',
  version: '1.0.0',
  build: '923a36d',
})
```

## React / Next.js

```tsx
'use client'

import { O24Console } from '@vknight/o24-console/react'

export default function ConsoleSecurityWarning() {
  return (
    <O24Console
      product="IPS"
      description="Integrated Property System"
      environment={process.env.NEXT_PUBLIC_APP_ENV}
      version={process.env.NEXT_PUBLIC_APP_VERSION}
      build={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7)}
    />
  )
}
```

Mount the component once near the application root. The package guards against duplicate output automatically.

## Options

| Option | Type | Default |
| --- | --- | --- |
| `product` | `string` | `O24` |
| `description` | `string` | `API Management & Product Service` |
| `environment` | `string` | `DEVELOPMENT` |
| `version` | `string` | `Development` |
| `build` | `string` | `Local` |
| `website` | `string` | `https://vknight.io.vn/` |
| `runtimeInfo` | `boolean` | `true` |
| `securityWarning` | `boolean` | `true` |
| `force` | `boolean` | `false` |

## Local package test

```bash
pnpm install
pnpm typecheck
pnpm build
pnpm pack
```

Install the generated tarball in a consuming project before publishing to npm.

## Publish

The package is configured as a public scoped package.

```bash
npm login
npm whoami
pnpm publish --access public
```

## License

MIT

---

O24 • Powered by vKnight • https://vknight.io.vn/

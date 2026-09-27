'use client'

import { useEffect } from 'react'
import { showO24Console } from './showO24Console'
import type { O24ConsoleOptions } from './types'

export type O24ConsoleProps = O24ConsoleOptions

export function O24Console(props: O24ConsoleProps) {
  useEffect(() => {
    showO24Console(props)
  }, [
    props.product,
    props.description,
    props.environment,
    props.version,
    props.build,
    props.website,
    props.securityWarning,
    props.runtimeInfo,
    props.force,
  ])

  return null
}

export default O24Console

import {DependencyList, useEffect, useState} from 'react'

/**
 * Type of disposable object.
 */
export type IDisposable = {
  dispose: () => void
}

/**
 * Creates a disposable object with the useMemo hook and dispose the object when the React component is unmounted.
 * @param factory the factory function to create a disposable object.
 * @param deps the dependencies for the useMemo hook.
 * @returns the disposable object.
 */
export function useDisposable<T extends IDisposable>(factory: () => T, deps: DependencyList | undefined): T | undefined {
  const [state, setState] = useState<T>()

  useEffect(() => {
    const disposable = factory()
    setState(disposable)
    return () => disposable.dispose()
  }, deps)

  return state
}

import {Context, createContext, Provider, useContext} from 'react'

/**
 * Creates non-nullable React context.
 * @param name the context name.
 * @returns the tuple [hook, provider, and common context] for interactions with a non-nullable context.
 */
export function createNonNullableContext<T>(name: string): [() => T, Provider<T>, Context<T | null>] {
  const context = createContext<T | null>(null)
  context.displayName = name

  const hook = createContextHook(context)
  const provider = createProvider(context)

  return [hook, provider, context]
}

function createContextHook<T, >(context: Context<T>) {
  return () => {
    const value = useContext(context)

    if (!value) throw new Error(`The context ${context.displayName} didn't found!`)

    return value
  }
}

function createProvider<T, >(context: Context<T | null>) {
  const value = context as Context<T>
  return value.Provider
}

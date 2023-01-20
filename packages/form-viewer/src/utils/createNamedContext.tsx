import {Context, createContext, Provider, useContext} from 'react'

const createContextHook = <T, >(context: Context<T>) => {
  return () => {
    const value = useContext(context)

    if (value) return value as NonNullable<T>

    throw new Error(`The context ${context.displayName} didn't found!`)
  }
}

const createProvider = <T, >(context: Context<T>) => {
  let value = context as unknown as Context<NonNullable<T>>
  return value.Provider
}

/**
 * Return tuple with hook and provider for context using
 */
export const createNamedContext = <T, >(name: string): [() => T, Provider<NonNullable<T>>, Context<T | undefined>] => {
  const context = createContext<T | undefined>(undefined)
  context.displayName = name

  const hook = createContextHook(context)
  const provider = createProvider(context)

  return [hook, provider, context]
}

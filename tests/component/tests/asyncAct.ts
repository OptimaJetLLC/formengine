import {act} from '@testing-library/react'

/**
 * The async function type.
 */
export type AsyncFn<T> = () => Promise<T>

/**
 * Executes the async function in the React testing library's act function.
 * @param fn the async function to execute.
 * @returns the result of the async function.
 */
export const asyncAct = async <T>(fn: AsyncFn<T>) => {
  let result: T | undefined
  await act(async () => {
    result = await fn()
  })
  return result
}

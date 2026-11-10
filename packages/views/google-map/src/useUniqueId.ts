import {useState} from 'react'

let counter = 0

/**
 * Generates a unique ID.
 * @param prefix the value to prefix the ID with.
 * @returns the unique ID.
 */
export function uniqueId(prefix?: string) {
  const id = ++counter
  return prefix ? `${prefix}${id}` : `${id}`
}

/**
 * Used for generating unique ID for DOM elements
 * @param prefix the value to prefix the ID with.
 * @returns the unique ID.
 */
export function useUniqueId(prefix?: string) {
  const [id] = useState(() => uniqueId(prefix))
  return id
}

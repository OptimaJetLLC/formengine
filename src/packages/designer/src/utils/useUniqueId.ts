import {useState} from 'react'

let counter = 0

function uniqueId(prefix?: string) {
  const id = ++counter
  return prefix ? `${prefix}${id}` : `${id}`
}

/**
 * Used for generating unique ID for DOM elements
 * @param prefix the value to prefix the ID with.
 * @returns the unique ID.
 */
export function useUniqueId(prefix?: string) {
  return useState(() => uniqueId(prefix))[0]
}

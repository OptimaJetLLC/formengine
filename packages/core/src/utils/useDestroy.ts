import {useEffect} from 'react'

/**
 * Executes the function when the component is destroyed.
 * @param destroyFn the function that executes when a component is destroyed.
 */
export const useDestroy = (destroyFn: () => void) => {
  useEffect(() => destroyFn, [])
}

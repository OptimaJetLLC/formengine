import type {Dispatch, SetStateAction} from 'react'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

/**
 * Sets a state only if its parent component is still mounted.
 * @param initialState the initial state
 * @returns a stateful value, and a function to update it.
 */
export default function useSafeState<S = undefined>(initialState?: S): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const mountedRef = useRef(false)
  const [state, setState] = useState<S | undefined>(initialState)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const safeSetState: Dispatch<SetStateAction<S | undefined>> = useCallback(value => {
    mountedRef.current && setState(value)
  }, [])

  return useMemo(() => [state, safeSetState], [state, safeSetState])
}

import {useCallback, useState} from 'react'

/**
 * The hook to manage the hovered state.
 * @returns the hovered state and the mouse enter and leave handlers.
 */
export const useHovered = () => {
  const [hovered, setHovered] = useState(false)
  const onMouseEnter = useCallback(() => setHovered(true), [])
  const onMouseLeave = useCallback(() => setHovered(false), [])
  return {hovered, onMouseEnter, onMouseLeave}
}

import {useEffect, useRef, useState} from 'react'

const DEFAULT_ROOT_MARGIN = '200px'

/**
 * Tracks whether an element is near or inside the viewport.
 * @param rootMargin intersection observer root margin
 * @returns ref to attach to the observed element and visibility state
 */
export function useNearViewport(rootMargin = DEFAULT_ROOT_MARGIN) {
  const ref = useRef<HTMLDivElement>(null)
  const [isNearViewport, setIsNearViewport] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsNearViewport(true)
          observer.disconnect()
        }
      },
      {rootMargin},
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin])

  return {ref, isNearViewport}
}

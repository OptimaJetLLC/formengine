import {useCallback, useEffect, useRef, useState} from 'react'

type ActivateListener = () => void

let nextAssignIndex = 0
let nextAllowedIndex = 0
let activeInstances = 0
const nearViewport = new Set<number>()
const activateListeners = new Map<number, ActivateListener>()

const resetQueue = () => {
  nextAssignIndex = 0
  nextAllowedIndex = 0
  nearViewport.clear()
  activateListeners.clear()
}

const tryActivateNext = () => {
  if (!nearViewport.has(nextAllowedIndex)) {
    return
  }

  activateListeners.get(nextAllowedIndex)?.()
}

/**
 * Assigns the next render order index for a lazy component instance.
 * @returns order index based on mount sequence
 */
export const assignRenderOrder = (): number => {
  return nextAssignIndex++
}

/**
 * Registers an active lazy component instance and resets the queue when the last one unmounts.
 * @returns cleanup function
 */
export const registerActiveInstance = (): (() => void) => {
  activeInstances++

  return () => {
    activeInstances--
    if (activeInstances === 0) {
      resetQueue()
    }
  }
}

/**
 * Marks a component as near the viewport and attempts to activate the next queued instance.
 * @param order component order index
 * @param isNear whether the component is near the viewport
 */
export const setNearViewport = (order: number, isNear: boolean) => {
  if (isNear) {
    nearViewport.add(order)
  } else {
    nearViewport.delete(order)
  }

  tryActivateNext()
}

/**
 * Subscribes to sequential render activation for the given order index.
 * @param order component order index
 * @param onActivate callback invoked when this instance may render
 * @returns cleanup function
 */
export const subscribeRenderActivation = (order: number, onActivate: ActivateListener): (() => void) => {
  activateListeners.set(order, onActivate)
  tryActivateNext()

  return () => {
    activateListeners.delete(order)
  }
}

/**
 * Notifies the queue that rendering for the given order index has completed.
 * @param order component order index
 */
export const completeRender = (order: number) => {
  if (order !== nextAllowedIndex) {
    return
  }

  nextAllowedIndex++
  tryActivateNext()
}

/**
 * Controls sequential rendering so only one lazy component renders at a time, in mount order.
 * @param isNearViewport whether the component is near the viewport
 * @returns whether the component may render and a callback to signal render completion
 */
export function useSequentialRender(isNearViewport: boolean) {
  const orderRef = useRef<number | undefined>(undefined)
  if (orderRef.current === undefined) {
    orderRef.current = assignRenderOrder()
  }

  const order = orderRef.current
  const [canRender, setCanRender] = useState(false)

  useEffect(() => registerActiveInstance(), [])

  useEffect(() => {
    setNearViewport(order, isNearViewport)

    return () => {
      setNearViewport(order, false)
    }
  }, [order, isNearViewport])

  useEffect(() => {
    if (canRender) {
      return
    }

    return subscribeRenderActivation(order, () => {
      setCanRender(true)
    })
  }, [canRender, order])

  const markRendered = useCallback(() => {
    completeRender(order)
  }, [order])

  return {canRender, markRendered}
}

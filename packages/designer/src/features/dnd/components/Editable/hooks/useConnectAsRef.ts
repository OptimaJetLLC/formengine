import type {RefCallback} from 'react'
import {useCallback} from 'react'

/**
 * Wraps a react-dnd connector so it can be used as a React 19 ref callback.
 * @param connect the drag or drop connector.
 * @returns a ref callback that attaches the connector to a DOM node.
 */
export const useConnectAsRef = <T extends Element>(connect: (node: T | null) => void): RefCallback<T> => {
  return useCallback(
    node => {
      connect(node)
    },
    [connect]
  )
}

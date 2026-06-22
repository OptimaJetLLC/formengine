import * as RTL from '@testing-library/react'
import {createElement} from 'react'

type RenderHookResult<T> = {
  result: { current: T }
  rerender: () => void
  unmount: () => void
}

const createRenderHook = (): (<T>(callback: () => T) => RenderHookResult<T>) => {
  return <T, >(callback: () => T): RenderHookResult<T> => {
    const result = {current: undefined as T}
    const Wrapper = () => {
      result.current = callback()
      return null
    }
    const view = RTL.render(createElement(Wrapper))
    return {
      result,
      rerender: () => {
        view.rerender(createElement(Wrapper))
      },
      unmount: view.unmount,
    }
  }
}

/** Works with @testing-library/react v12 (React 17) and v13+ where renderHook is built in. */
export const renderHook: <T>(callback: () => T) => RenderHookResult<T> =
  typeof RTL.renderHook === 'function' ? (RTL.renderHook as ReturnType<typeof createRenderHook>) : createRenderHook()

import {type IDisposable, useDisposable} from '@react-form-builder/core'
import {renderHook, waitFor} from '@testing-library/react'
import {StrictMode} from 'react'
import {describe, expect, it, vi} from 'vitest'

const createDisposable = () => {
  const dispose = vi.fn()
  return {dispose} satisfies IDisposable
}

describe('useDisposable', () => {
  it('creates the disposable after mount and disposes it on unmount', async () => {
    const instances: IDisposable[] = []
    const factory = vi.fn(() => {
      const instance = createDisposable()
      instances.push(instance)
      return instance
    })

    const {result, unmount} = renderHook(() => useDisposable(factory))

    await waitFor(() => expect(result.current).toBeDefined())
    expect(factory).toHaveBeenCalledTimes(1)
    expect(result.current).toBe(instances[0])
    expect(instances[0].dispose).not.toHaveBeenCalled()

    unmount()

    expect(instances[0].dispose).toHaveBeenCalledTimes(1)
  })

  it('does not recreate the disposable when the factory identity changes', async () => {
    const first = createDisposable()
    const second = createDisposable()
    const {result, rerender} = renderHook(({factory}) => useDisposable(factory), {
      initialProps: {factory: () => first},
    })

    await waitFor(() => expect(result.current).toBe(first))

    rerender({factory: () => second})

    expect(result.current).toBe(first)
    expect(first.dispose).not.toHaveBeenCalled()
    expect(second.dispose).not.toHaveBeenCalled()
  })

  it('disposes the Strict Mode double-invoke instance and keeps the live one', async () => {
    const instances: IDisposable[] = []
    const factory = vi.fn(() => {
      const instance = createDisposable()
      instances.push(instance)
      return instance
    })

    const {result, unmount} = renderHook(() => useDisposable(factory), {
      wrapper: StrictMode,
    })

    await waitFor(() => expect(result.current).toBeDefined())
    expect(factory).toHaveBeenCalledTimes(2)
    expect(instances[0].dispose).toHaveBeenCalledTimes(1)
    expect(instances[1].dispose).not.toHaveBeenCalled()
    expect(result.current).toBe(instances[1])

    unmount()

    expect(instances[1].dispose).toHaveBeenCalledTimes(1)
  })
})

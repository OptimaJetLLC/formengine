import {type IDisposable, useDisposable} from '@react-form-builder/core'
import {render, renderHook, screen, waitFor} from '@testing-library/react'
import {Fragment, StrictMode, Suspense} from 'react'
import {describe, expect, it, vi} from 'vitest'

const createDisposable = () => {
  const dispose = vi.fn()
  return {dispose} satisfies IDisposable
}

type TrackedResource = IDisposable & {id: number; read: () => number}

const trackResources = () => {
  const events: string[] = []
  const resources: TrackedResource[] = []
  const factory = vi.fn(() => {
    const id = resources.length + 1
    let disposed = false
    const resource = {
      id,
      read: () => {
        if (disposed) throw new Error(`Resource ${id} has already been disposed`)
        return id
      },
      dispose: vi.fn(() => {
        disposed = true
        events.push(`dispose:${id}`)
      }),
    }
    resources.push(resource)
    events.push(`create:${id}`)
    return resource
  })
  return {events, resources, factory}
}

const ResourceOutput = ({name, factory}: {name: string; factory: () => TrackedResource}) => {
  const resource = useDisposable(factory)
  return <output data-testid={name}>{resource?.read() ?? 'pending'}</output>
}

const modes = [
  {name: 'normal mode', Wrapper: Fragment, creations: 1},
  {name: 'Strict Mode', Wrapper: StrictMode, creations: 2},
]

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

describe.each(modes)('useDisposable in $name', ({Wrapper, creations}) => {
  it('creates after render, publishes a live resource and preserves it across updates', async () => {
    const {events, resources, factory} = trackResources()
    const {result, rerender, unmount} = renderHook(
      ({factory}) => {
        const resource = useDisposable(factory)
        events.push(resource ? `render:${resource.read()}` : 'render:undefined')
        return resource
      },
      {wrapper: Wrapper, initialProps: {factory}}
    )

    await waitFor(() => expect(result.current).toBeDefined())
    const live = result.current!
    expect(events[0]).toBe('render:undefined')
    expect(factory).toHaveBeenCalledTimes(creations)
    expect(live).toBe(resources.at(-1))
    expect(live.read()).toBe(creations)
    expect(events.filter(event => !event.startsWith('render:'))).toEqual(
      creations === 1 ? ['create:1'] : ['create:1', 'dispose:1', 'create:2']
    )

    const replacementFactory = vi.fn(() => factory())
    rerender({factory: replacementFactory})
    rerender({factory: replacementFactory})

    expect(result.current).toBe(live)
    expect(live.read()).toBe(creations)
    expect(replacementFactory).not.toHaveBeenCalled()
    expect(factory).toHaveBeenCalledTimes(creations)
    expect(live.dispose).not.toHaveBeenCalled()

    unmount()

    expect(events.filter(event => !event.startsWith('render:'))).toEqual(
      creations === 1 ? ['create:1', 'dispose:1'] : ['create:1', 'dispose:1', 'create:2', 'dispose:2']
    )
    resources.forEach(resource => expect(resource.dispose).toHaveBeenCalledTimes(1))
  })

  it('creates a fresh resource after a real unmount and remount', async () => {
    const {resources, factory} = trackResources()
    const firstMount = renderHook(() => useDisposable(factory), {wrapper: Wrapper})
    await waitFor(() => expect(firstMount.result.current).toBeDefined())
    const first = firstMount.result.current!

    firstMount.unmount()
    expect(first.dispose).toHaveBeenCalledTimes(1)

    const secondMount = renderHook(() => useDisposable(factory), {wrapper: Wrapper})
    await waitFor(() => expect(secondMount.result.current).toBeDefined())
    const second = secondMount.result.current!

    expect(second).not.toBe(first)
    expect(second.read()).toBe(creations * 2)
    expect(second.dispose).not.toHaveBeenCalled()
    expect(factory).toHaveBeenCalledTimes(creations * 2)

    secondMount.unmount()
    resources.forEach(resource => expect(resource.dispose).toHaveBeenCalledTimes(1))
  })

  it('disposes one consumer without replacing or disposing another consumer resource', async () => {
    const first = trackResources()
    const second = trackResources()
    const {rerender, unmount} = render(
      <>
        <ResourceOutput key="first" name="first" factory={first.factory} />
        <ResourceOutput key="second" name="second" factory={second.factory} />
      </>,
      {wrapper: Wrapper}
    )
    await waitFor(() => expect(screen.getByTestId('second')).toHaveTextContent(String(creations)))

    rerender(
      <>
        <ResourceOutput key="second" name="second" factory={second.factory} />
      </>
    )

    expect(screen.queryByTestId('first')).not.toBeInTheDocument()
    first.resources.forEach(resource => expect(resource.dispose).toHaveBeenCalledTimes(1))
    expect(second.factory).toHaveBeenCalledTimes(creations)
    expect(second.resources.at(-1)!.dispose).not.toHaveBeenCalled()
    expect(screen.getByTestId('second')).toHaveTextContent(String(creations))

    unmount()
    second.resources.forEach(resource => expect(resource.dispose).toHaveBeenCalledTimes(1))
  })

  it('does not create resources for a suspended render that never commits', () => {
    const {factory} = trackResources()
    const pending = new Promise<never>(() => undefined)
    const SuspendedConsumer = () => {
      useDisposable(factory)
      throw pending
    }
    const fallback = <span>Waiting for data</span>
    const {unmount} = render(
      <Suspense fallback={fallback}>
        <SuspendedConsumer />
      </Suspense>,
      {wrapper: Wrapper}
    )

    expect(screen.getByText('Waiting for data')).toBeInTheDocument()
    expect(factory).not.toHaveBeenCalled()
    unmount()
    expect(factory).not.toHaveBeenCalled()
  })
})

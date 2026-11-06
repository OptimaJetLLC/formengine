import {act, renderHook} from '@testing-library/react'
import type {SyntheticEvent} from 'react'
import {describe, expect, it, vi} from 'vitest'
import type {LoadCallback, LoadDataHandler} from '../../../packages/views/rsuite/src/hooks'
import {useLoadData} from '../../../packages/views/rsuite/src/hooks'

type HookProps = Parameters<typeof useLoadData>[0]

const ada = {value: 'ada', label: 'Ada Lovelace'}
const grace = {value: 'grace', label: 'Grace Hopper'}
const alan = {value: 'alan', label: 'Alan Turing'}

const emptyData: HookProps['data'] = []
const creationEvent = {type: 'click'} as SyntheticEvent

const renderLoadData = (props: Partial<HookProps> = {}) =>
  renderHook(({data = emptyData, ...rest}: Partial<HookProps>) => useLoadData({data, ...rest}), {initialProps: props})

const createLoader = () => {
  const requests: {keyword: string; callback: LoadCallback; offset: number}[] = []
  const onLoadData = vi.fn<LoadDataHandler>((keyword, callback, offset) => {
    requests.push({keyword, callback, offset})
  })
  return {onLoadData, requests}
}

const renderLastItem = (callback: ReturnType<typeof useLoadData>['listProps']['onItemsRendered'], index: number) => {
  act(() => {
    callback?.({overscanStartIndex: 0, overscanStopIndex: index, visibleStartIndex: 0, visibleStopIndex: index})
  })
}

describe('RSuite useLoadData', () => {
  it('starts with an empty list when data is empty and no value is provided', () => {
    const {result} = renderLoadData()

    expect(result.current.data).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.virtualized).toBe(false)
  })

  it('adds a missing selected value without changing the input array', () => {
    const data = [ada]
    const {result} = renderLoadData({data, value: 'selected'})

    expect(result.current.data).toEqual([{value: 'selected', label: 'selected'}, ada])
    expect(result.current.value).toBe('selected')
    expect(data).toEqual([ada])
  })

  it('uses the supplied label without duplicating a selected item already in the list', () => {
    const {result} = renderLoadData({data: [ada, grace], value: ada.value})

    expect(result.current.data).toEqual([ada, grace])
  })

  it('replaces the local list when the input data changes and keeps the new selected value', () => {
    const {result, rerender} = renderLoadData({data: [ada], value: ada.value})
    act(() => result.current.onCreate?.(grace.value, grace, creationEvent))
    expect(result.current.data).toEqual([grace, ada])

    rerender({data: [alan], value: 'selected'})

    expect(result.current.data).toEqual([{value: 'selected', label: 'selected'}, alan])
  })

  it('keeps locally created items across an unrelated rerender with the same data', () => {
    const props = {data: [ada]}
    const {result, rerender} = renderLoadData(props)
    act(() => result.current.onCreate?.(grace.value, grace, creationEvent))

    rerender(props)

    expect(result.current.data).toEqual([grace, ada])
  })

  it('preloads the first page and accepts a deferred response', () => {
    const {onLoadData, requests} = createLoader()
    const props = {data: [ada], preload: true, onLoadData}
    const {result, rerender} = renderLoadData(props)

    expect(onLoadData).toHaveBeenCalledTimes(1)
    expect(requests[0]).toMatchObject({keyword: '', offset: 0})
    act(() => requests[0].callback([grace]))
    expect(result.current.data).toEqual([ada, grace])
    expect(result.current.loading).toBe(false)

    rerender(props)
    expect(onLoadData).toHaveBeenCalledTimes(1)
  })

  it('can enable preload after mounting and handle a synchronous response', () => {
    const onLoadData = vi.fn<LoadDataHandler>((_keyword, callback) => callback([ada]))
    const {result, rerender} = renderLoadData({preload: false, onLoadData})
    expect(onLoadData).not.toHaveBeenCalled()

    rerender({preload: true, onLoadData})

    expect(onLoadData).toHaveBeenCalledTimes(1)
    expect(result.current.data).toEqual([ada])
    expect(result.current.loading).toBe(false)
  })

  it('preloads again when the loading handler changes', () => {
    const first = createLoader()
    const second = createLoader()
    const {result, rerender} = renderLoadData({preload: true, onLoadData: first.onLoadData})
    act(() => first.requests[0].callback([ada]))

    rerender({preload: true, onLoadData: second.onLoadData})

    expect(first.onLoadData).toHaveBeenCalledTimes(1)
    expect(second.onLoadData).toHaveBeenCalledTimes(1)
    act(() => second.requests[0].callback([grace]))
    expect(result.current.data).toEqual([ada, grace])
  })

  it.each([
    {preload: false, value: undefined, loads: true},
    {preload: false, value: 'selected', loads: false},
    {preload: true, value: undefined, loads: false},
    {preload: true, value: 'selected', loads: false},
  ])('forwards opening and loads only when needed: %j', ({preload, value, loads}) => {
    const {onLoadData, requests} = createLoader()
    const onOpen = vi.fn()
    const {result} = renderLoadData({preload, value, onLoadData, onOpen})
    onLoadData.mockClear()
    requests.length = 0

    act(() => result.current.onOpen())

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onLoadData).toHaveBeenCalledTimes(loads ? 1 : 0)
    if (loads) expect(requests[0]).toMatchObject({keyword: '', offset: 0})
  })

  it('clears the old options, forwards a search, and shows loading until its response arrives', () => {
    const {onLoadData, requests} = createLoader()
    const onSearch = vi.fn()
    const {result} = renderLoadData({data: [ada], onLoadData, onSearch})

    act(() => result.current.onSearch('Grace'))

    expect(onSearch).toHaveBeenCalledWith('Grace')
    expect(requests[0]).toMatchObject({keyword: 'Grace', offset: 0})
    expect(result.current.data).toEqual([])
    expect(result.current.loading).toBe(true)

    act(() => requests[0].callback([grace]))

    expect(result.current.data).toEqual([grace])
    expect(result.current.loading).toBe(false)
  })

  it('clears loading when a search completes synchronously', () => {
    const onLoadData = vi.fn<LoadDataHandler>((_keyword, callback) => callback([grace]))
    const {result} = renderLoadData({data: [ada], onLoadData})

    act(() => result.current.onSearch('Grace'))

    expect(onLoadData).toHaveBeenCalledTimes(1)
    expect(result.current.data).toEqual([grace])
    expect(result.current.loading).toBe(false)
  })

  it('clears loading when a search returns an empty page', () => {
    const {onLoadData, requests} = createLoader()
    const {result} = renderLoadData({onLoadData})
    act(() => result.current.onSearch('missing'))
    expect(result.current.loading).toBe(true)

    act(() => requests[0].callback([]))

    expect(result.current.data).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('preserves static options and forwards searching when no remote loader is provided', () => {
    const onSearch = vi.fn()
    const {result} = renderLoadData({data: [ada, grace], onSearch})

    act(() => result.current.onSearch('Ada'))

    expect(onSearch).toHaveBeenCalledWith('Ada')
    expect(result.current.data).toEqual([ada, grace])
    expect(result.current.loading).toBe(false)
  })

  it('replaces a selected-value placeholder with the loaded item and its label', () => {
    const {onLoadData, requests} = createLoader()
    const {result} = renderLoadData({data: [ada], value: grace.value, preload: true, onLoadData})
    expect(result.current.data).toEqual([{value: grace.value, label: grace.value}, ada])

    act(() => requests[0].callback([grace, alan]))

    expect(result.current.data).toEqual([ada, grace, alan])
  })

  it('requests another page only when the visible range reaches the last item', () => {
    const {onLoadData, requests} = createLoader()
    const {result} = renderLoadData({data: [ada, grace], onLoadData})
    renderLastItem(result.current.listProps.onItemsRendered, 0)
    expect(onLoadData).not.toHaveBeenCalled()

    renderLastItem(result.current.listProps.onItemsRendered, 1)

    expect(requests[0]).toMatchObject({keyword: '', offset: 2})
    expect(result.current.loading).toBe(true)
    act(() => requests[0].callback([alan]))
    expect(result.current.data).toEqual([ada, grace, alan])
    expect(result.current.loading).toBe(false)

    renderLastItem(result.current.listProps.onItemsRendered, 2)
    expect(requests[1]).toMatchObject({keyword: '', offset: 3})
  })

  it('paginates using the current search keyword and the loaded result count', () => {
    const {onLoadData, requests} = createLoader()
    const {result} = renderLoadData({data: [alan], onLoadData})
    act(() => result.current.onSearch('Ada'))
    act(() => requests[0].callback([ada]))

    renderLastItem(result.current.listProps.onItemsRendered, 0)

    expect(requests[1]).toMatchObject({keyword: 'Ada', offset: 1})
  })

  it('prepends a created option and resets the keyword for subsequent pagination', () => {
    const {onLoadData, requests} = createLoader()
    const {result} = renderLoadData({onLoadData})
    act(() => result.current.onSearch('Ada'))
    act(() => requests[0].callback([ada]))

    act(() => result.current.onCreate?.(grace.value, grace, creationEvent))

    expect(result.current.data).toEqual([grace, ada])
    expect(onLoadData).toHaveBeenCalledTimes(1)
    renderLastItem(result.current.listProps.onItemsRendered, 1)
    expect(requests[1]).toMatchObject({keyword: '', offset: 2})
  })

  it.each([
    {remote: false, disableVirtualized: undefined, expected: false},
    {remote: false, disableVirtualized: false, expected: false},
    {remote: false, disableVirtualized: true, expected: false},
    {remote: true, disableVirtualized: undefined, expected: true},
    {remote: true, disableVirtualized: false, expected: true},
    {remote: true, disableVirtualized: true, expected: false},
  ])('sets virtualization according to loader availability and the override: %j', ({remote, disableVirtualized, expected}) => {
    const {result} = renderLoadData({onLoadData: remote ? vi.fn<LoadDataHandler>() : undefined, disableVirtualized})

    expect(result.current.virtualized).toBe(expected)
  })
})

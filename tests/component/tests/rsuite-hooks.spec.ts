import {renderHook} from '@testing-library/react'
import {useImperativeHandle} from 'react'
import type {PickerHandle} from 'rsuite'
import {describe, expect, it, vi} from 'vitest'
import {setAriaHiddenIfNotExists, useArrayMapMemo, useFixAriaAttributesForInputPicker} from '../../../packages/views/rsuite/src/hooks'

describe('RSuite setAriaHiddenIfNotExists', () => {
  it('marks an element as hidden from accessibility APIs when the attribute is missing', () => {
    const element = document.createElement('input')

    setAriaHiddenIfNotExists(element)

    expect(element).toHaveAttribute('aria-hidden', 'true')
  })

  it.each(['true', 'false'])('preserves an explicit aria-hidden="%s"', value => {
    const element = document.createElement('input')
    element.setAttribute('aria-hidden', value)

    setAriaHiddenIfNotExists(element)

    expect(element).toHaveAttribute('aria-hidden', value)
  })

  it.each([null, undefined])('accepts an absent element: %s', element => {
    expect(() => setAriaHiddenIfNotExists(element)).not.toThrow()
  })
})

const renderPickerHook = (root: HTMLDivElement) =>
  renderHook(() => {
    const ref = useFixAriaAttributesForInputPicker()
    useImperativeHandle(ref, () => ({root}) as PickerHandle, [root])
    return ref
  })

describe('RSuite useFixAriaAttributesForInputPicker', () => {
  it('marks the mounted picker search input without changing other inputs', () => {
    const root = document.createElement('div')
    const search = document.createElement('input')
    search.className = 'rs-picker-search-input'
    const other = document.createElement('input')
    root.append(search, other)

    const {result} = renderPickerHook(root)

    expect(result.current.current?.root).toBe(root)
    expect(search).toHaveAttribute('aria-hidden', 'true')
    expect(other).not.toHaveAttribute('aria-hidden')
  })

  it('preserves an explicit aria-hidden attribute on the picker search input', () => {
    const root = document.createElement('div')
    const search = document.createElement('input')
    search.className = 'rs-picker-search-input'
    search.setAttribute('aria-hidden', 'false')
    root.append(search)

    renderPickerHook(root)

    expect(search).toHaveAttribute('aria-hidden', 'false')
  })

  it('accepts a picker root without a search input', () => {
    const root = document.createElement('div')

    expect(() => renderPickerHook(root)).not.toThrow()
  })

  it('accepts a picker ref that has not been attached', () => {
    const {result} = renderHook(useFixAriaAttributesForInputPicker)

    expect(result.current.current).toBeNull()
  })
})

describe('RSuite useArrayMapMemo', () => {
  const double = (value: number) => value * 2

  it.each([undefined, []])('returns an empty result for an absent or empty array: %j', array => {
    const map = vi.fn(double)
    const {result} = renderHook(() => useArrayMapMemo(array, map))

    expect(result.current).toEqual([])
    expect(map).not.toHaveBeenCalled()
  })

  it('maps every item with its index', () => {
    const {result} = renderHook(() => useArrayMapMemo(['Ada', 'Grace'], (value, index) => `${index}: ${value}`))

    expect(result.current).toEqual(['0: Ada', '1: Grace'])
  })

  it('reuses a mapped result when the array and mapper are unchanged', () => {
    const array = [1, 2]
    const map = vi.fn(double)
    const {result, rerender} = renderHook(() => useArrayMapMemo(array, map))
    const firstResult = result.current
    map.mockClear()

    rerender()

    expect(result.current).toBe(firstResult)
    expect(map).not.toHaveBeenCalled()
  })

  it('recomputes when the array is replaced with another array of the same length', () => {
    const {result, rerender} = renderHook(({array}) => useArrayMapMemo(array, double), {initialProps: {array: [1, 2]}})

    rerender({array: [3, 4]})

    expect(result.current).toEqual([6, 8])
  })

  it('recomputes when items are appended to or removed from the same array', () => {
    const array = [1, 2]
    const {result, rerender} = renderHook(() => useArrayMapMemo(array, double))

    array.push(3)
    rerender()
    expect(result.current).toEqual([2, 4, 6])

    array.splice(0, array.length)
    rerender()
    expect(result.current).toEqual([])
  })

  it('recomputes when the mapping function changes', () => {
    const array = [1, 2]
    const {result, rerender} = renderHook(({map}) => useArrayMapMemo(array, map), {initialProps: {map: double}})

    rerender({map: value => value * 3})

    expect(result.current).toEqual([3, 6])
  })
})

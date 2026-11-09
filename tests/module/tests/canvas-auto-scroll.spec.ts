import {computeCanvasAutoScrollDelta, retainDragClientOffset} from '@react-form-builder/designer/src/features/dnd/canvasAutoScroll'
import {describe, expect, it} from 'vitest'

const rect = {left: 100, top: 50, right: 500, bottom: 450}
const threshold = 40
const maxSpeed = 24

describe('retainDragClientOffset', () => {
  it('prefers the current offset when present', () => {
    expect(retainDragClientOffset({x: 2, y: 3}, {x: 1, y: 1})).toEqual({x: 2, y: 3})
  })

  it('keeps the previous offset when the monitor reports null', () => {
    expect(retainDragClientOffset(null, {x: 10, y: 20})).toEqual({x: 10, y: 20})
  })

  it('returns null when neither offset is available', () => {
    expect(retainDragClientOffset(null, null)).toBeNull()
  })
})

describe('computeCanvasAutoScrollDelta', () => {
  it('returns zero deltas when the pointer is centered', () => {
    expect(computeCanvasAutoScrollDelta(300, 250, rect)).toEqual({x: 0, y: 0})
  })

  it('scrolls up when the pointer is near the top edge', () => {
    const {x, y} = computeCanvasAutoScrollDelta(300, rect.top + 10, rect)
    expect(x).toBe(0)
    expect(y).toBeLessThan(0)
    expect(y).toBeCloseTo(-maxSpeed * (1 - 10 / threshold))
  })

  it('scrolls down when the pointer is near the bottom edge', () => {
    const {x, y} = computeCanvasAutoScrollDelta(300, rect.bottom - 10, rect)
    expect(x).toBe(0)
    expect(y).toBeGreaterThan(0)
    expect(y).toBeCloseTo(maxSpeed * (1 - 10 / threshold))
  })

  it('scrolls left when the pointer is near the left edge', () => {
    const {x, y} = computeCanvasAutoScrollDelta(rect.left + 10, 250, rect)
    expect(y).toBe(0)
    expect(x).toBeLessThan(0)
    expect(x).toBeCloseTo(-maxSpeed * (1 - 10 / threshold))
  })

  it('scrolls right when the pointer is near the right edge', () => {
    const {x, y} = computeCanvasAutoScrollDelta(rect.right - 10, 250, rect)
    expect(y).toBe(0)
    expect(x).toBeGreaterThan(0)
    expect(x).toBeCloseTo(maxSpeed * (1 - 10 / threshold))
  })

  it('uses max speed at the edge and zero at the threshold boundary', () => {
    expect(computeCanvasAutoScrollDelta(300, rect.top, rect).y).toBe(-maxSpeed)
    expect(computeCanvasAutoScrollDelta(300, rect.top + threshold, rect).y).toBe(0)
  })

  it('combines horizontal and vertical deltas in a corner', () => {
    const {x, y} = computeCanvasAutoScrollDelta(rect.left + 5, rect.bottom - 5, rect)
    expect(x).toBeLessThan(0)
    expect(y).toBeGreaterThan(0)
  })

  it('respects custom threshold and max speed', () => {
    const {y} = computeCanvasAutoScrollDelta(300, rect.top + 5, rect, 20, 10)
    expect(y).toBeCloseTo(-10 * (1 - 5 / 20))
  })

  it('keeps scrolling at max speed when the pointer is outside the canvas', () => {
    expect(computeCanvasAutoScrollDelta(300, rect.top - 1, rect)).toEqual({x: 0, y: -maxSpeed})
    expect(computeCanvasAutoScrollDelta(rect.left - 1, 250, rect)).toEqual({x: -maxSpeed, y: 0})
    expect(computeCanvasAutoScrollDelta(rect.right + 1, 250, rect)).toEqual({x: maxSpeed, y: 0})
    expect(computeCanvasAutoScrollDelta(300, rect.bottom + 1, rect)).toEqual({x: 0, y: maxSpeed})
    expect(computeCanvasAutoScrollDelta(rect.left - 1, rect.top - 1, rect)).toEqual({x: -maxSpeed, y: -maxSpeed})
  })
})

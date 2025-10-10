import {
  camelCase,
  cloneDeep,
  debounce,
  isEmpty,
  isEqual,
  isEqualWith,
  isNumber,
  isObject,
  isUndefined,
  merge,
  startCase,
  toUpper,
  uniqueId,
  upperFirst
} from '@react-form-builder/core'
import {describe, expect, it} from 'vitest'

class Person {
  name: string

  constructor(name: string) {
    this.name = name
  }

  get greeting() {
    return `Hello, ${this.name}!`
  }
}

describe('Core utility helpers', () => {
  it('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined('')).toBe(false)
    expect(isUndefined(0)).toBe(false)
    expect(isUndefined([])).toBe(false)
  })

  it('isNumber', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(NaN)).toBe(true)
    expect(isNumber(Infinity)).toBe(true)
    expect(isNumber('1' as any)).toBe(false)
  })

  it('isObject', () => {
    expect(isObject({})).toBe(true)
    expect(isObject(null)).toBe(false)
    expect(isObject([])).toBe(true)
  })

  it('isEmpty', () => {
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty('a')).toBe(false)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty({a: 1})).toBe(false)
    expect(isEmpty(new Map())).toBe(true)
    const m = new Map()
    m.set('a', 1)
    expect(isEmpty(m)).toBe(false)
  })

  it('camelCase / upperFirst / startCase / toUpper', () => {
    expect(camelCase('Hello world-text')).toBe('helloWorldText')
    expect(upperFirst('hello')).toBe('Hello')
    expect(startCase('helloWorldText')).toBe('Hello World Text')
    expect(toUpper('aB')).toBe('AB')
  })

  it('uniqueId increments', () => {
    const id1 = uniqueId('x_')
    const id2 = uniqueId('x_')
    expect(id1).not.toBe(id2)
    expect(id1.startsWith('x_')).toBe(true)
  })

  it('should merge deep', () => {
    const t = {a: {b: 1}, k: 1} as any
    const r = merge(t, {a: {c: 2}}, {d: 3})
    expect(r).toEqual({a: {b: 1, c: 2}, k: 1, d: 3})
  })

  it('debounce calls last invocation', async () => {
    const calls: number[] = []
    const fn = debounce((n: number) => calls.push(n), 10)
    fn(1)
    fn(2)
    fn(3)
    await new Promise(r => setTimeout(r, 30))
    expect(calls).toEqual([3])
  })

  it('isEqual', () => {
    expect(isEqual({a: 1}, {a: 1})).toBe(true)
    expect(isEqual({a: 2}, {a: 1})).toBe(false)
  })

  it('isEqualWith', () => {
    const left = [{n: 1}, {n: 2}]
    const right = [{n: 1}, {n: 2}]
    const eq = isEqualWith(left, right, (l, r, _k) => {
      if (isObject(l) && isObject(r)) return isEqual(l, r)
      return undefined
    })
    expect(eq).toBe(true)
  })

  describe('cloneDeep', () => {
    it('should clone primitives as-is', () => {
      expect(cloneDeep(null)).toBeNull()
      expect(cloneDeep(undefined)).toBeUndefined()
      expect(cloneDeep(42)).toBe(42)
      expect(cloneDeep('str')).toBe('str')
      expect(cloneDeep(true)).toBe(true)
    })

    it('should clone Date', () => {
      const d = new Date('2020-01-01T00:00:00.000Z')
      const c = cloneDeep(d)
      expect(c).not.toBe(d)
      expect(c instanceof Date).toBe(true)
      expect(c.getTime()).toBe(d.getTime())
    })

    it('should clone RegExp including flags and lastIndex', () => {
      const r = /ab+c/gi
      r.lastIndex = 2
      const c = cloneDeep(r)
      expect(c).not.toBe(r)
      expect(c instanceof RegExp).toBe(true)
      expect(c.source).toBe(r.source)
      expect(c.flags).toBe(r.flags)
      expect(c.lastIndex).toBe(2)
    })

    it('should clone Map with nested structures', () => {
      const m = new Map<any, any>()
      const inner = {x: 1}
      m.set('a', inner)
      m.set({k: 1}, ['v'])
      const c = cloneDeep(m)
      expect(c).not.toBe(m)
      expect(c instanceof Map).toBe(true)
      expect(c.size).toBe(2)
      const got = c.get('a')
      expect(got).not.toBe(inner)
      expect(got).toEqual({x: 1})
    })

    it('should clone Set with nested structures', () => {
      const s = new Set<any>()
      const obj = {x: 1}
      s.add(obj)
      s.add([1, 2])
      const c = cloneDeep(s)
      expect(c).not.toBe(s)
      expect(c instanceof Set).toBe(true)
      expect(c.size).toBe(2)
      for (const item of c.values()) {
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
          expect(item).toEqual({x: 1})
          expect(item).not.toBe(obj)
        }
      }
    })

    it('should clone ArrayBuffer and TypedArray', () => {
      const ta = new Uint8Array([1, 2, 3])
      const cta = cloneDeep(ta)
      expect(cta).not.toBe(ta)
      expect(cta).toBeInstanceOf(Uint8Array)
      expect(Array.from(cta)).toEqual([1, 2, 3])

      const ab = ta.buffer
      const cab = cloneDeep(ab)
      expect(cab).not.toBe(ab)
      const view = new Uint8Array(cab)
      expect(Array.from(view)).toEqual(Array.from(new Uint8Array(ab)))
    })

    it('should clone arrays deeply', () => {
      const a: any[] = [1, {x: [2, 3]}, [4]]
      const c = cloneDeep(a)
      expect(c).not.toBe(a)
      expect(c).toEqual([1, {x: [2, 3]}, [4]])
      ;(c[1] as any).x.push(9)
      expect(a[1].x).toEqual([2, 3])
    })

    it('should clone plain objects deeply preserving descriptors', () => {
      const o: any = {}
      Object.defineProperty(o, 'hidden', {value: 1, enumerable: false, writable: false})
      o.visible = {a: 1}
      const c = cloneDeep(o)
      expect(c).not.toBe(o)
      expect(Object.getOwnPropertyDescriptor(c, 'hidden')?.enumerable).toBe(false)
      expect(Object.getOwnPropertyDescriptor(c, 'hidden')?.writable).toBe(false)
      expect(c.visible).toEqual({a: 1})
      expect(c.visible).not.toBe(o.visible)
    })

    it('should clone class instances and preserves prototype', () => {
      const p = new Person('Ada')
      const c = cloneDeep(p)
      expect(c).not.toBe(p)
      expect(c instanceof Person).toBe(true)
      expect(c.greeting).toBe('Hello, Ada!')
      ;(c as Person).name = 'Grace'
      expect(p.name).toBe('Ada')
    })

    it('should handle circular references', () => {
      const a: any = {name: 'root'}
      a.self = a
      const b: any = {ref: a}
      a.other = b
      const c = cloneDeep(a)
      expect(c).not.toBe(a)
      expect(c.self).toBe(c)
      expect(c.other.ref).toBe(c)
    })
  })
})



import {ComponentStore} from '@react-form-builder/core'
import {writeStylePartString} from '../../../packages/designer/src/features/annotation-editors/utils/writeStylePartString'

describe('writeStylePartString', () => {
  it('resets only the current tab string for the current device', () => {
    const store = new ComponentStore('box', 'StyledBox')
    store.css = {
      any: {string: 'color: red;', object: {width: '100%'}},
      desktop: {string: 'color: green;'}
    }
    store.wrapperCss = {any: {string: 'background: blue;'}}

    writeStylePartString(store, 'css', 'any')

    expect(store.css?.any?.string).toBeUndefined()
    expect(store.css?.any?.object).toEqual({width: '100%'})
    expect(store.css?.desktop?.string).toBe('color: green;')
    expect(store.wrapperCss?.any?.string).toBe('background: blue;')
  })

  it('removes an empty style part after reset and keeps the other tab', () => {
    const store = new ComponentStore('box', 'StyledBox')
    store.style = {any: {string: 'font-size: 20px;'}}
    store.wrapperStyle = {any: {string: 'padding: 8px;'}}

    writeStylePartString(store, 'style', 'any')

    expect(store.style).toBeUndefined()
    expect(store.wrapperStyle?.any?.string).toBe('padding: 8px;')
  })

  it('writes the string for the current tab and device without changing the other tab', () => {
    const store = new ComponentStore('box', 'StyledBox')
    store.wrapperCss = {any: {string: 'background: blue;'}}

    writeStylePartString(store, 'css', 'any', 'color: red;')

    expect(store.css?.any?.string).toBe('color: red;')
    expect(store.wrapperCss?.any?.string).toBe('background: blue;')
  })
})

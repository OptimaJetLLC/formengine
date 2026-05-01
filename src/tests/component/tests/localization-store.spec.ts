import type {ILocalizationEngine} from '@react-form-builder/core'
import {LocalizationStore} from '@react-form-builder/core'
import {describe, expect, it} from 'vitest'

function createIdentityEngine(): ILocalizationEngine {
  return {
    language: 'en-US',
    addMessages: () => [],
    getCompatibleId: (rawId) => rawId,
    localizeProperties: () => ({}),
    localizeErrorMessage: () => undefined,
  }
}

describe('localization store behavior', () => {
  it('removes the property when setLocalization is called with an empty string', () => {
    const store = new LocalizationStore(
      {
        'en-US': {
          c1: {
            component: {p1: 'x'},
          },
        },
      },
      createIdentityEngine(),
    )
    store.setLocalization('en-US', 'c1', 'p1', 'component', '')
    expect(store.value).toStrictEqual({})
  })

  it('persists whitespace-only values as-is', () => {
    const store = new LocalizationStore(
      {
        'en-US': {
          c1: {
            component: {p1: 'x'},
          },
        },
      },
      createIdentityEngine(),
    )
    store.setLocalization('en-US', 'c1', 'p1', 'component', ' \t\n ')
    expect(store.getLocalization('en-US', 'c1', 'p1', 'component')).toBe(' \t\n ')
  })

  it('persists values that are not whitespace-only, including leading and trailing spaces', () => {
    const store = new LocalizationStore({}, createIdentityEngine())
    store.setLocalization('en-US', 'c1', 'p1', 'component', '  hello  ')
    expect(store.getLocalization('en-US', 'c1', 'p1', 'component')).toBe('  hello  ')
  })

  it('reports hasLocalization false when no language holds the property', () => {
    const store = new LocalizationStore({}, createIdentityEngine())
    expect(store.hasLocalization('c1', 'p1', 'component')).toBe(false)
    store.setLocalization('en-US', 'c1', 'p1', 'component', 'a')
    expect(store.hasLocalization('c1', 'p1', 'component')).toBe(true)
    store.setLocalization('en-US', 'c1', 'p1', 'component', '')
    expect(store.hasLocalization('c1', 'p1', 'component')).toBe(false)
  })

  it('reports hasLocalization true for explicit empty-string values', () => {
    const store = new LocalizationStore({}, createIdentityEngine())
    store.setLocalization('en-US', 'c1', 'p1', 'component', 'x')
    store.setLocalization('de-DE', 'c1', 'p1', 'component', '')
    expect(store.hasLocalization('c1', 'p1', 'component')).toBe(true)
  })

  it('prunes empty type and component buckets after removal', () => {
    const store = new LocalizationStore(
      {
        'en-US': {
          c1: {
            component: {p1: 'only', p2: 'keep'},
          },
        },
      },
      createIdentityEngine(),
    )
    store.setLocalization('en-US', 'c1', 'p1', 'component', '')
    expect(store.value).toStrictEqual({
      'en-US': {
        c1: {
          component: {p2: 'keep'},
        },
      },
    })
  })

  it('drops the language bucket when the last localization type is removed', () => {
    const store = new LocalizationStore(
      {
        'en-US': {
          c1: {
            component: {p1: 'value'},
          },
        },
      },
      createIdentityEngine(),
    )

    store.removeLocalizationForType('c1', 'component')

    expect(store.value).toStrictEqual({})
  })

  it('drops the language bucket when removing a component with the last localization', () => {
    const store = new LocalizationStore(
      {
        'en-US': {
          c1: {
            component: {p1: 'value'},
          },
        },
      },
      createIdentityEngine(),
    )

    store.removeLocalization('c1')

    expect(store.value).toStrictEqual({})
  })
})

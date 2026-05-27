import type {ILocalizationEngine, LocalizationError} from '@react-form-builder/core'
import {LocalizationStore} from '@react-form-builder/core'
import {afterEach, describe, expect, it, vi} from 'vitest'

function createIdentityEngine(overrides: Partial<ILocalizationEngine> = {}): ILocalizationEngine {
  return {
    language: 'en-US',
    addMessages: () => [],
    getCompatibleId: (rawId) => rawId,
    localizeProperties: () => ({}),
    localizeErrorMessage: () => undefined,
    ...overrides,
  }
}

describe('localization store behavior', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('setLocalization and getLocalization', () => {
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

    it('persists non-string localization values', () => {
      const store = new LocalizationStore({}, createIdentityEngine())
      store.setLocalization('en-US', 'c1', 'p1', 'component', 42)
      expect(store.getLocalization('en-US', 'c1', 'p1', 'component')).toBe(42)
    })

    it('is a no-op when clearing a property that does not exist', () => {
      const store = new LocalizationStore(
        {
          'en-US': {
            c1: {
              component: {p2: 'keep'},
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

    it('normalizes ids consistently for read and write operations', () => {
      const store = new LocalizationStore({}, {
        ...createIdentityEngine(),
        getCompatibleId: (rawId: string) => rawId.toLowerCase().replaceAll(' ', '_'),
      })

      store.setLocalization('en-US', 'Comp Key', 'Prop Name', 'component', 'value')

      expect(store.getLocalization('en-US', 'comp key', 'prop name', 'component')).toBe('value')
      expect(store.hasLocalization('comp key', 'prop name', 'component')).toBe(true)
    })

    it('returns undefined when no resolver match and the requested language bucket is absent', () => {
      const store = new LocalizationStore({}, createIdentityEngine())
      expect(store.findLocalizationKey('fr-FR')).toBeNull()
      expect(store.getLocalization('fr-FR', 'c1', 'p1', 'component')).toBeUndefined()
    })
  })

  describe('getLocalizationItemId', () => {
    it('returns the engine-normalized id for the component property pair', () => {
      const engine = createIdentityEngine({
        getCompatibleId: (rawId: string) => rawId.toLowerCase(),
      })
      const store = new LocalizationStore({}, engine)
      expect(store.getLocalizationItemId('Comp', 'Prop')).toBe('comp_prop')
    })
  })

  describe('language resolver', () => {
    it('resolves localization by language code fallback when exact language key is absent', () => {
      const store = new LocalizationStore(
        {
          'en-GB': {
            c1: {
              component: {p1: 'colour'},
            },
          },
        },
        createIdentityEngine(),
      )
      expect(store.getLocalization('en-US', 'c1', 'p1', 'component')).toBe('colour')
    })

    it('prefers exact language localization over same-code fallback', () => {
      const store = new LocalizationStore(
        {
          'en-US': {
            c1: {
              component: {p1: 'color'},
            },
          },
          'en-GB': {
            c1: {
              component: {p1: 'colour'},
            },
          },
        },
        createIdentityEngine(),
      )

      expect(store.getLocalization('en-US', 'c1', 'p1', 'component')).toBe('color')
    })

    it('findLocalizationKey prefers same-code language with translations over configured empty exact match', () => {
      const store = new LocalizationStore(
        {
          'en-US': {},
          'en-GB': {
            c1: {
              component: {p1: 'from-gb'},
            },
          },
        },
        createIdentityEngine(),
      )

      expect(store.findLocalizationKey('en-US')).toBe('en-GB')
      expect(store.getLocalization('en-US', 'c1', 'p1', 'component')).toBe('from-gb')
    })

    it('findLocalizationKey returns exact language when it has translations', () => {
      const store = new LocalizationStore(
        {
          'en-US': {
            c1: {component: {p1: 'us'}},
          },
          'en-GB': {
            c1: {component: {p1: 'gb'}},
          },
        },
        createIdentityEngine(),
      )

      expect(store.findLocalizationKey('en-US')).toBe('en-US')
    })

    it('findLocalizationKey returns null when no language matches', () => {
      const store = new LocalizationStore({}, createIdentityEngine())
      expect(store.findLocalizationKey('fr-FR')).toBeNull()
    })

    it('findLocalizationKey falls back to configured language by code when value has no translations', () => {
      const store = new LocalizationStore(
        {
          'de-DE': {},
        },
        createIdentityEngine(),
      )

      expect(store.findLocalizationKey('de-AT')).toBe('de-DE')
    })

    it('keeps configured languages in resolver even when empty buckets are pruned', () => {
      const store = new LocalizationStore(
        {
          'en-US': {},
        },
        createIdentityEngine(),
      )

      expect(store.value).toStrictEqual({})
      expect(store.hasLanguage('en-US')).toBe(true)
    })

    it('hasLanguage returns false for unknown languages', () => {
      const store = new LocalizationStore({}, createIdentityEngine())
      expect(store.hasLanguage('fr-FR')).toBe(false)
    })

    it('hasLanguage matches by language code when only a sibling dialect exists in value', () => {
      const store = new LocalizationStore(
        {
          'en-GB': {
            c1: {component: {p1: 'x'}},
          },
        },
        createIdentityEngine(),
      )

      expect(store.hasLanguage('en-US')).toBe(true)
    })

    it('hasLanguage matches configured language by code without translations in value', () => {
      const store = new LocalizationStore(
        {
          'de-DE': {},
        },
        createIdentityEngine(),
      )

      expect(store.hasLanguage('de-AT')).toBe(true)
    })

    it('langCodes merges value keys with configured languages from initialization', () => {
      const store = new LocalizationStore(
        {
          'en-US': {},
          'de-DE': {
            c1: {component: {p1: 'x'}},
          },
        },
        createIdentityEngine(),
      )

      store.setLocalization('fr-FR', 'c2', 'p1', 'component', 'y')

      expect(store.langCodes.sort()).toStrictEqual(['de-DE', 'en-US', 'fr-FR'].sort())
    })
  })

  describe('hasLocalization', () => {
    it('reports false when no language holds the property', () => {
      const store = new LocalizationStore({}, createIdentityEngine())
      expect(store.hasLocalization('c1', 'p1', 'component')).toBe(false)
      store.setLocalization('en-US', 'c1', 'p1', 'component', 'a')
      expect(store.hasLocalization('c1', 'p1', 'component')).toBe(true)
      store.setLocalization('en-US', 'c1', 'p1', 'component', '')
      expect(store.hasLocalization('c1', 'p1', 'component')).toBe(false)
    })

    it('reports true when at least one language still holds the property', () => {
      const store = new LocalizationStore({}, createIdentityEngine())
      store.setLocalization('en-US', 'c1', 'p1', 'component', 'x')
      store.setLocalization('de-DE', 'c1', 'p1', 'component', '')
      expect(store.hasLocalization('c1', 'p1', 'component')).toBe(true)
    })

    it('tracks localization types independently', () => {
      const store = new LocalizationStore({}, createIdentityEngine())
      store.setLocalization('en-US', 'c1', 'p1', 'tooltip', 'tip')
      expect(store.hasLocalization('c1', 'p1', 'component')).toBe(false)
      expect(store.hasLocalization('c1', 'p1', 'tooltip')).toBe(true)
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
  })

  describe('removeLocalization', () => {
    it('drops the language bucket when removing the last component localization', () => {
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

    it('keeps other components in the same language', () => {
      const store = new LocalizationStore(
        {
          'en-US': {
            c1: {component: {p1: 'a'}},
            c2: {component: {p1: 'b'}},
          },
        },
        createIdentityEngine(),
      )

      store.removeLocalization('c1')

      expect(store.value).toStrictEqual({
        'en-US': {
          c2: {component: {p1: 'b'}},
        },
      })
    })

    it('removes the component across all langCodes', () => {
      const store = new LocalizationStore(
        {
          'en-US': {c1: {component: {p1: 'us'}}},
          'de-DE': {c1: {component: {p1: 'de'}}},
        },
        createIdentityEngine(),
      )

      store.removeLocalization('c1')

      expect(store.value).toStrictEqual({})
    })

    it('skips languages that have no bucket for the component', () => {
      const store = new LocalizationStore(
        {
          'en-US': {c1: {component: {p1: 'us'}}},
          'de-DE': {c2: {component: {p1: 'de'}}},
        },
        createIdentityEngine(),
      )

      store.removeLocalization('c1')

      expect(store.value).toStrictEqual({
        'de-DE': {c2: {component: {p1: 'de'}}},
      })
    })

    it('skips configured languages that have no value bucket', () => {
      const store = new LocalizationStore(
        {
          'en-US': {},
          'de-DE': {c1: {component: {p1: 'de'}}},
        },
        createIdentityEngine(),
      )

      store.removeLocalization('c1')

      expect(store.value).toStrictEqual({})
    })
  })

  describe('removeLocalizationForType', () => {
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
      expect(store.hasLocalization('c1', 'p1', 'component')).toBe(false)
    })

    it('keeps other localization types on the same component', () => {
      const store = new LocalizationStore(
        {
          'en-US': {
            c1: {
              component: {p1: 'label'},
              tooltip: {p1: 'tip'},
            },
          },
        },
        createIdentityEngine(),
      )

      store.removeLocalizationForType('c1', 'component')

      expect(store.value).toStrictEqual({
        'en-US': {
          c1: {
            tooltip: {p1: 'tip'},
          },
        },
      })
    })

    it('skips when the component is missing in a language', () => {
      const store = new LocalizationStore(
        {
          'en-US': {c1: {component: {p1: 'us'}}},
          'de-DE': {c2: {component: {p1: 'de'}}},
        },
        createIdentityEngine(),
      )

      store.removeLocalizationForType('c1', 'component')

      expect(store.value).toStrictEqual({
        'de-DE': {c2: {component: {p1: 'de'}}},
      })
    })
  })

  describe('changeComponentKey', () => {
    it('renames the component bucket across all languages', () => {
      const store = new LocalizationStore(
        {
          'en-US': {oldKey: {component: {p1: 'us'}}},
          'de-DE': {oldKey: {component: {p1: 'de'}}},
        },
        createIdentityEngine(),
      )

      store.changeComponentKey('oldKey', 'newKey')

      expect(store.value).toStrictEqual({
        'en-US': {newKey: {component: {p1: 'us'}}},
        'de-DE': {newKey: {component: {p1: 'de'}}},
      })
      expect(store.getLocalization('en-US', 'newKey', 'p1', 'component')).toBe('us')
    })

    it('uses compatible ids when renaming', () => {
      const normalize = (rawId: string) => rawId.toLowerCase().replaceAll(' ', '_')
      const store = new LocalizationStore(
        {
          'en-US': {old_key: {component: {p1: 'v'}}},
        },
        createIdentityEngine({getCompatibleId: normalize}),
      )

      store.changeComponentKey('Old Key', 'New Key')

      expect(store.value['en-US']).toStrictEqual({new_key: {component: {p1: 'v'}}})
    })

    it('does nothing when the old key is absent', () => {
      const store = new LocalizationStore(
        {
          'en-US': {c1: {component: {p1: 'v'}}},
        },
        createIdentityEngine(),
      )
      const before = JSON.parse(JSON.stringify(store.value)) as typeof store.value

      store.changeComponentKey('missing', 'newKey')

      expect(store.value).toStrictEqual(before)
    })

    it('skips languages without localization data', () => {
      const store = new LocalizationStore(
        {
          'en-US': {oldKey: {component: {p1: 'us'}}},
        },
        createIdentityEngine(),
      )
      store.setLocalization('de-DE', 'other', 'p1', 'component', 'de')

      store.changeComponentKey('oldKey', 'newKey')

      expect(store.value['en-US']).toStrictEqual({newKey: {component: {p1: 'us'}}})
      expect(store.value['de-DE']).toStrictEqual({other: {component: {p1: 'de'}}})
    })
  })

  describe('getLocalizationForComponent', () => {
    it('returns localization keyed by the display component key', () => {
      const store = new LocalizationStore(
        {
          'en-US': {storedKey: {component: {p1: 'us'}}},
          'de-DE': {storedKey: {component: {p1: 'de'}}},
        },
        createIdentityEngine(),
      )

      expect(store.getLocalizationForComponent('storedKey')).toStrictEqual({
        'en-US': {storedKey: {component: {p1: 'us'}}},
        'de-DE': {storedKey: {component: {p1: 'de'}}},
      })
    })

    it('returns an empty object when the component has no localization', () => {
      const store = new LocalizationStore(
        {
          'en-US': {c1: {component: {p1: 'x'}}},
        },
        createIdentityEngine(),
      )

      expect(store.getLocalizationForComponent('missing')).toStrictEqual({})
    })

    it('omits languages where the component is absent', () => {
      const store = new LocalizationStore(
        {
          'en-US': {c1: {component: {p1: 'us'}}},
          'de-DE': {c2: {component: {p1: 'de'}}},
        },
        createIdentityEngine(),
      )

      expect(store.getLocalizationForComponent('c1')).toStrictEqual({
        'en-US': {c1: {component: {p1: 'us'}}},
      })
    })
  })

  describe('addLocalizationWithNewKey', () => {
    it('copies localization from the old display key to the compatible new key', () => {
      const store = new LocalizationStore({}, createIdentityEngine())
      const source = {
        'en-US': {oldKey: {component: {p1: 'us'}}},
        'de-DE': {oldKey: {component: {p1: 'de'}}},
      }

      store.addLocalizationWithNewKey(source, 'oldKey', 'newKey')

      expect(store.value).toStrictEqual({
        'en-US': {newKey: {component: {p1: 'us'}}},
        'de-DE': {newKey: {component: {p1: 'de'}}},
      })
    })

    it('stores under the compatible new key when ids are normalized', () => {
      const engine = createIdentityEngine({
        getCompatibleId: (rawId: string) => rawId.toLowerCase().replaceAll(' ', '_'),
      })
      const store = new LocalizationStore({}, engine)
      const source = {
        'en-US': {'Old Key': {component: {p1: 'v'}}},
      }

      store.addLocalizationWithNewKey(source, 'Old Key', 'New Key')

      expect(store.value['en-US']).toStrictEqual({new_key: {component: {p1: 'v'}}})
    })

    it('skips languages where the old key is missing in the source snapshot', () => {
      const store = new LocalizationStore(
        {
          'de-DE': {existing: {component: {p1: 'de'}}},
        },
        createIdentityEngine(),
      )
      const source = {
        'en-US': {oldKey: {component: {p1: 'us'}}},
        'de-DE': {},
      }

      store.addLocalizationWithNewKey(source, 'oldKey', 'newKey')

      expect(store.value).toStrictEqual({
        'en-US': {newKey: {component: {p1: 'us'}}},
        'de-DE': {existing: {component: {p1: 'de'}}},
      })
    })
  })

  describe('getItems', () => {
    it('returns flattened localization items with normalized ids', () => {
      const addMessages = vi.fn((): LocalizationError[] => [])
      const store = new LocalizationStore(
        {
          'en-US': {
            c1: {
              component: {p1: 'hello', p2: null, p3: undefined},
              tooltip: {p1: 'tip'},
            },
          },
        },
        createIdentityEngine({
          getCompatibleId: (rawId: string) => rawId.toLowerCase(),
          addMessages,
        }),
      )

      expect(store.getItems('en-US')).toStrictEqual({
        c1_component_p1: 'hello',
        c1_tooltip_p1: 'tip',
      })
      expect(addMessages).toHaveBeenCalledOnce()
      expect(addMessages).toHaveBeenCalledWith('en-US', {
        c1_component_p1: 'hello',
        c1_tooltip_p1: 'tip',
      })
    })

    it('returns null when no localization bucket matches the language', () => {
      const store = new LocalizationStore({}, createIdentityEngine())
      expect(store.getItems('en-US')).toBeNull()
    })

    it('returns null when the resolved language is configured but has no component data', () => {
      const store = new LocalizationStore({'en-US': {}}, createIdentityEngine())
      expect(store.findLocalizationKey('en-US')).toBe('en-US')
      expect(store.getItems('en-US')).toBeNull()
    })

    it('returns null and logs when addMessages reports errors', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
      const store = new LocalizationStore(
        {
          'en-US': {c1: {component: {p1: 'x'}}},
        },
        createIdentityEngine({
          addMessages: () => {
            const error = new Error('invalid message') as LocalizationError
            error.name = 'ParserError'
            return [error]
          },
        }),
      )

      expect(store.getItems('en-US')).toBeNull()
      expect(consoleError).toHaveBeenCalled()
    })

    it('resolves items through findLocalizationKey fallback language', () => {
      const addMessages = vi.fn((): LocalizationError[] => [])
      const store = new LocalizationStore(
        {
          'en-GB': {c1: {component: {p1: 'colour'}}},
        },
        createIdentityEngine({addMessages}),
      )

      expect(store.getItems('en-US')).toStrictEqual({c1_component_p1: 'colour'})
      expect(addMessages).toHaveBeenCalledWith('en-US', {c1_component_p1: 'colour'})
    })

    it('returns consistent items on repeated calls for the same language', () => {
      const addMessages = vi.fn((): LocalizationError[] => [])
      const store = new LocalizationStore(
        {
          'en-US': {c1: {component: {p1: 'a'}}},
        },
        createIdentityEngine({addMessages}),
      )

      const first = store.getItems('en-US')
      const second = store.getItems('en-US')

      expect(first).toStrictEqual({c1_component_p1: 'a'})
      expect(second).toStrictEqual(first)
      expect(addMessages).toHaveBeenCalledTimes(2)
    })
  })
})

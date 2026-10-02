import type {LocalizationValue} from '@react-form-builder/core'
import {FluentLocalizationEngine} from '@react-form-builder/core'
import {describe, expect, it, vi} from 'vitest'
import {
  createFluentEngineTestContext,
  enUS,
  fluentMessageId,
  frFR,
  localizeDefaultProperty,
  minimalFormData,
} from './fluent-localization-engine.test-helpers'

describe('FluentLocalizationEngine', () => {
  describe('getCompatibleId', () => {
    it('replaces spaces with underscores', () => {
      const engine = new FluentLocalizationEngine('en-US')
      expect(engine.getCompatibleId('my prop')).toBe('my_prop')
      expect(engine.getCompatibleId('a b c')).toBe('a_b_c')
    })

    it('leaves ids without spaces unchanged', () => {
      const engine = new FluentLocalizationEngine('en-US')
      expect(engine.getCompatibleId('target')).toBe('target')
      expect(engine.getCompatibleId('validator-min')).toBe('validator-min')
    })
  })

  describe('language', () => {
    it('defaults to global default language full code', () => {
      const engine = new FluentLocalizationEngine()
      expect(engine.language).toBe('en-US')
    })

    it('uses constructor locale when provided', () => {
      const engine = new FluentLocalizationEngine('de-DE')
      expect(engine.language).toBe('de-DE')
    })

    it('updates via setter', () => {
      const engine = new FluentLocalizationEngine('en-US')
      engine.language = 'fr-FR'
      expect(engine.language).toBe('fr-FR')
    })
  })

  describe('addMessages', () => {
    it('returns no errors for valid messages', () => {
      const engine = new FluentLocalizationEngine('en-US')
      const errors = engine.addMessages('en-US', {
        hello: 'Hello world',
      })
      expect(errors).toEqual([])
    })

    it('allows overriding an existing message id', () => {
      const engine = new FluentLocalizationEngine('en-US')
      engine.addMessages('en-US', {greeting: 'Hello'})
      const errors = engine.addMessages('en-US', {greeting: 'Hi'})
      expect(errors).toEqual([])
    })

    it('returns an array of localization errors (empty when messages are valid)', () => {
      const engine = new FluentLocalizationEngine('en-US')
      const errors = engine.addMessages('en-US', {valid_msg: 'Hello'})
      expect(Array.isArray(errors)).toBe(true)
      expect(errors).toEqual([])
    })

    it('encodes non-string values as JSON with escaped curly braces', () => {
      const engine = new FluentLocalizationEngine('en-US')
      const errors = engine.addMessages('en-US', {
        payload: {note: 'use {braces} carefully'},
      })
      expect(errors).toEqual([])
    })

    it('encodes multiline string values using fluent multiline syntax', () => {
      const engine = new FluentLocalizationEngine('en-US')
      const errors = engine.addMessages('en-US', {
        multiline: 'line one\nline two',
      })
      expect(errors).toEqual([])
    })
  })

  describe('testLocalization', () => {
    const engine = new FluentLocalizationEngine('en-US')

    it('resolves {$user.name} from nested form data', () => {
      const result = engine.testLocalization('Hello {$user.name}!', 'test_msg', enUS, minimalFormData({user: {name: 'Ann'}}))
      expect(result).toBe('Hello Ann!')
    })

    it('resolves {$a.b.c} from deeply nested form data', () => {
      const result = engine.testLocalization('Value: {$a.b.c}', 'test_msg_deep', enUS, minimalFormData({a: {b: {c: 'deep'}}}))
      expect(result).toBe('Value: deep')
    })

    it('preserves literal dots in prose alongside nested placeholders', () => {
      const result = engine.testLocalization('Ver 1.2 for {$user.name}', 'test_msg_literal', enUS, minimalFormData({user: {name: 'Bob'}}))
      expect(result).toBe('Ver 1.2 for Bob')
    })

    it('replaces missing variables with empty string', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const result = engine.testLocalization('Hello {$missing}!', 'test_missing', enUS, minimalFormData({}))
      expect(result).toBe('Hello !')
      warn.mockRestore()
    })

    it('coerces boolean form data to fluent true/false strings', () => {
      const result = engine.testLocalization('Flag: {$enabled}', 'test_bool', enUS, minimalFormData({enabled: true}))
      expect(result).toBe('Flag: true')
    })

    it('interpolates numeric form data', () => {
      const result = engine.testLocalization('Count: {$count}', 'test_number', enUS, minimalFormData({count: 42}))
      expect(result).toBe('Count: 42')
    })

    it('returns a string result for a literal brace-only localization value', () => {
      const result = engine.testLocalization('{', 'brace_only_msg', enUS, minimalFormData({}))
      expect(typeof result).toBe('string')
      expect(result).toBe('')
    })

    it('interpolates Date values from form data', () => {
      const date = new Date('2020-01-15T00:00:00.000Z')
      const result = engine.testLocalization('Due: {$due}', 'test_date', enUS, minimalFormData({due: date}))
      expect(result).toContain('2020')
    })

    it('logs missing properties when logMissing is enabled', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      engine.testLocalization('{$absent}', 'test_log_missing', enUS, minimalFormData({}))
      expect(warn).toHaveBeenCalled()
      warn.mockRestore()
    })
  })

  describe('localizeProperties fallback chain', () => {
    type FallbackCase = {
      name: string
      requestedLanguage: typeof enUS
      defaultLanguage?: typeof enUS
      propValue?: unknown
      defaultProps?: Record<string, unknown>
      componentType?: string
      localization: LocalizationValue
      expected: unknown
    }

    const cases: FallbackCase[] = [
      {
        name: 'uses requested language fluent message',
        requestedLanguage: frFR,
        localization: {
          'en-US': {target: {component: {children: 'en'}}},
          'fr-FR': {target: {component: {children: 'fr'}}},
        },
        expected: 'fr',
      },
      {
        name: 'keeps explicit empty localization value from requested language',
        requestedLanguage: frFR,
        localization: {
          'en-US': {target: {component: {children: 'en'}}},
          'fr-FR': {target: {component: {children: ''}}},
        },
        expected: '',
      },
      {
        name: 'falls back to default language fluent message',
        requestedLanguage: frFR,
        localization: {
          'en-US': {target: {component: {children: 'en'}}},
          'fr-FR': {},
        },
        expected: 'en',
      },
      {
        name: 'keeps explicit empty value from default language when requested is missing',
        requestedLanguage: frFR,
        localization: {
          'en-US': {target: {component: {children: ''}}},
          'fr-FR': {},
        },
        expected: '',
      },
      {
        name: 'falls back to property value',
        requestedLanguage: frFR,
        propValue: 'prop-value',
        localization: {
          'en-US': {},
          'fr-FR': {},
        },
        expected: 'prop-value',
      },
      {
        name: 'keeps explicit empty property value',
        requestedLanguage: frFR,
        propValue: '',
        localization: {
          'en-US': {},
          'fr-FR': {},
        },
        expected: '',
      },
      {
        name: 'falls back to model defaultProps',
        requestedLanguage: frFR,
        defaultProps: {children: 'model-default'},
        localization: {
          'en-US': {},
          'fr-FR': {},
        },
        expected: 'model-default',
      },
      {
        name: 'keeps explicit empty model default without falling back to component type',
        requestedLanguage: frFR,
        defaultProps: {children: ''},
        localization: {
          'en-US': {},
          'fr-FR': {},
        },
        expected: '',
      },
      {
        name: 'falls back to component type when no other value exists',
        requestedLanguage: frFR,
        componentType: 'CustomNoDefault',
        localization: {
          'en-US': {},
          'fr-FR': {},
        },
        expected: 'CustomNoDefault',
      },
      {
        name: 'falls back when requested fluent message is whitespace-only',
        requestedLanguage: frFR,
        propValue: 'prop-value',
        localization: {
          'en-US': {},
          'fr-FR': {target: {component: {children: '   '}}},
        },
        expected: 'prop-value',
      },
      {
        name: 'falls back when default-language fluent message is whitespace-only',
        requestedLanguage: frFR,
        propValue: 'prop-value',
        localization: {
          'en-US': {target: {component: {children: '   '}}},
          'fr-FR': {},
        },
        expected: 'prop-value',
      },
    ]

    it.each(cases)(
      '$name',
      ({requestedLanguage, defaultLanguage = enUS, propValue, defaultProps, componentType, localization, expected}) => {
        const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
          localization,
          defaultLanguage,
          requestedLanguage,
          propValue,
          defaultProps,
          componentType,
        })
        const result = localizeDefaultProperty(ctx)
        expect(result.children).toBe(expected)
      }
    )

    it('skips properties that are not localized', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {'en-US': {target: {component: {children: 'localized'}}}},
        nonLocalizedProps: {title: {value: 'static'}},
      })
      const result = localizeDefaultProperty(ctx)
      expect(result).toEqual({children: 'localized'})
      expect(result.title).toBeUndefined()
    })

    it('localizes multiple localized properties on the same component', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {
            target: {
              component: {
                children: 'label-{$name}',
                title: 'title-{$name}',
              },
            },
          },
        },
        extraLocalizedProps: {
          title: {},
        },
      })
      const result = localizeDefaultProperty(ctx, 'component', minimalFormData({name: 'Ann'}))
      expect(result.children).toBe('label-Ann')
      expect(result.title).toBe('title-Ann')
    })

    it('normalizes component and property keys with spaces in message ids', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        componentKey: 'my target',
        propertyKey: 'my label',
        localization: {
          'en-US': {
            my_target: {
              component: {
                my_label: 'Spaced keys work',
              },
            },
          },
        },
      })
      ctx.componentStore.props['my label'] = {computeType: 'localization'}
      const result = ctx.engine.localizeProperties(ctx.form, ctx.formData, enUS, ctx.componentStore, 'component')
      expect(result['my label']).toBe('Spaced keys work')
    })

    it('does not load default-language bundle when requested language is the default', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {target: {component: {children: 'only-en'}}},
        },
        requestedLanguage: enUS,
        defaultLanguage: enUS,
      })
      const result = localizeDefaultProperty(ctx)
      expect(result.children).toBe('only-en')
    })
  })

  describe('localizeProperties interpolation paths', () => {
    it('interpolates non-string localization constants from getLocalization', () => {
      const items = [{value: 'a', label: 'Hello {$name}'}]
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {target: {component: {children: items}}},
        },
        propertyKey: 'children',
      })
      const result = localizeDefaultProperty(ctx, 'component', minimalFormData({name: 'Ann'}))
      expect(result.children).toEqual([{value: 'a', label: 'Hello Ann'}])
    })

    it('interpolates JSON string constants stored in fluent items map', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {
            target: {
              component: {
                config: '{"title":"Hello {$name}"}',
              },
            },
          },
        },
        propertyKey: 'config',
      })
      const result = localizeDefaultProperty(ctx, 'component', minimalFormData({name: 'Ann'}))
      expect(result.config).toEqual({title: 'Hello Ann'})
    })

    it('falls back to default-language JSON string when requested locale has no entry', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {
            target: {
              component: {
                config: '{"title":"EN {$name}"}',
              },
            },
          },
          'fr-FR': {},
        },
        propertyKey: 'config',
        requestedLanguage: frFR,
      })
      const result = localizeDefaultProperty(ctx, 'component', minimalFormData({name: 'Ann'}))
      expect(result.config).toEqual({title: 'EN Ann'})
    })

    it('falls back when JSON.parse fails for a brace-prefixed string constant', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        propValue: 'prop-value',
        localization: {
          'en-US': {
            target: {
              component: {
                children: '{not-json',
              },
            },
          },
        },
      })
      const result = localizeDefaultProperty(ctx)
      expect(result.children).toBe('prop-value')
    })

    it('does not parse JSON-looking strings that fail JSON.parse as structured data', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {
            target: {
              component: {
                config: '{not-json',
              },
            },
          },
        },
        propertyKey: 'config',
        propValue: 'fallback-config',
      })
      const result = localizeDefaultProperty(ctx)
      expect(result.config).toBe('fallback-config')
    })

    it('falls back when the stored fluent message is whitespace-only on first resolution', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        propValue: 'prop-value',
        localization: {
          'en-US': {target: {component: {children: '   '}}},
        },
      })
      const result = localizeDefaultProperty(ctx)
      expect(result.children).toBe('prop-value')
    })

    it('interpolates placeholders in object keys and nested values', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {
            target: {
              component: {
                config: {
                  'key-{$suffix}': {
                    nested: '{$prefix}-value',
                  },
                },
              },
            },
          },
        },
        propertyKey: 'config',
      })
      const result = localizeDefaultProperty(ctx, 'component', minimalFormData({suffix: 'end', prefix: 'pre'}))
      expect(result.config).toEqual({'key-end': {nested: 'pre-value'}})
    })

    it('leaves strings without placeholders unchanged during object interpolation', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {
            target: {
              component: {
                config: {plain: 'no placeholders'},
              },
            },
          },
        },
        propertyKey: 'config',
      })
      const result = localizeDefaultProperty(ctx)
      expect(result.config).toEqual({plain: 'no placeholders'})
    })

    it('interpolates numeric localization constants from getLocalization', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {target: {component: {children: 42}}},
        },
      })
      const result = localizeDefaultProperty(ctx)
      expect(result.children).toBe(42)
    })

    it('interpolates array items recursively', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {
            target: {
              component: {
                items: [{value: '{$code}', label: 'Item {$code}'}],
              },
            },
          },
        },
        propertyKey: 'items',
      })
      const result = localizeDefaultProperty(ctx, 'component', minimalFormData({code: 'X'}))
      expect(result.items).toEqual([{value: 'X', label: 'Item X'}])
    })
  })

  describe('localizeProperties after localization store updates', () => {
    it('resolves an updated message on the same engine instance', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {target: {component: {children: 'First message'}}},
        },
      })

      expect(localizeDefaultProperty(ctx).children).toBe('First message')

      ctx.form.localization.setLocalization('en-US', 'target', 'children', 'component', 'Second message')

      expect(localizeDefaultProperty(ctx).children).toBe('Second message')
    })

    it('does not reuse a previous fluent bundle message after setLocalization overwrites it', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {target: {component: {children: 'Localized placeholder'}}},
        },
      })

      expect(localizeDefaultProperty(ctx).children).toBe('Localized placeholder')

      ctx.form.localization.setLocalization('en-US', 'target', 'children', 'component', 'Updated placeholder')

      expect(localizeDefaultProperty(ctx).children).toBe('Updated placeholder')
    })

    it('falls back via fluent when setLocalization replaces a message with whitespace-only', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        componentType: 'CustomNoDefault',
        localization: {
          'en-US': {target: {component: {children: 'Localized placeholder'}}},
        },
      })

      expect(localizeDefaultProperty(ctx).children).toBe('Localized placeholder')

      ctx.form.localization.setLocalization('en-US', 'target', 'children', 'component', '   ')

      expect(localizeDefaultProperty(ctx).children).toBe('CustomNoDefault')
    })

    it('falls back to property value when whitespace-only replaces a previous fluent message', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        propValue: 'prop-value',
        localization: {
          'en-US': {target: {component: {children: 'Localized placeholder'}}},
        },
      })

      expect(localizeDefaultProperty(ctx).children).toBe('Localized placeholder')

      ctx.form.localization.setLocalization('en-US', 'target', 'children', 'component', '   ')

      expect(localizeDefaultProperty(ctx).children).toBe('prop-value')
    })
  })

  describe('localizeErrorMessage', () => {
    it('returns localized validator message from requested language', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {
            target: {
              'validator-required': {
                message: 'Required: {$name}',
              },
            },
          },
        },
      })
      const result = ctx.engine.localizeErrorMessage(
        ctx.form,
        minimalFormData({name: 'Email'}) as never,
        enUS,
        ctx.componentStore,
        'required'
      )
      expect(result).toBe('Required: Email')
    })

    it('falls back to default language validator message', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {
            target: {
              'validator-min': {
                message: 'EN min {$value}',
              },
            },
          },
          'fr-FR': {},
        },
        requestedLanguage: frFR,
      })
      const result = ctx.engine.localizeErrorMessage(ctx.form, minimalFormData({value: '5'}) as never, frFR, ctx.componentStore, 'min')
      expect(result).toBe('EN min 5')
    })

    it('returns empty string for explicit empty validator message', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {
          'en-US': {
            target: {
              'validator-required': {
                message: '',
              },
            },
          },
        },
      })
      const result = ctx.engine.localizeErrorMessage(ctx.form, minimalFormData({}) as never, enUS, ctx.componentStore, 'required')
      expect(result).toBe('')
    })

    it('returns undefined when validator message is not defined', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        localization: {'en-US': {}},
      })
      const result = ctx.engine.localizeErrorMessage(ctx.form, minimalFormData({}) as never, enUS, ctx.componentStore, 'missing-rule')
      expect(result).toBeUndefined()
    })

    it('builds message id from compatible component key and rule key', () => {
      const engine = new FluentLocalizationEngine('en-US')
      const localization: LocalizationValue = {
        'en-US': {
          my_field: {
            'validator-custom': {
              message: 'Invalid',
            },
          },
        },
      }
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        componentKey: 'my field',
        localization,
      })
      const messageId = fluentMessageId(engine, 'my field', 'message', 'validator-custom')
      expect(messageId).toBe('my_field_validator-custom_message')
      const result = ctx.engine.localizeErrorMessage(ctx.form, minimalFormData({}) as never, enUS, ctx.componentStore, 'custom')
      expect(result).toBe('Invalid')
    })
  })

  describe('localization types', () => {
    it('localizes modal-type properties', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        propertyKey: 'title',
        localization: {
          'en-US': {target: {modal: {title: 'Modal title'}}},
        },
      })
      const result = localizeDefaultProperty(ctx, 'modal')
      expect(result.title).toBe('Modal title')
    })

    it('localizes tooltip-type properties with the correct message id prefix', () => {
      const ctx = createFluentEngineTestContext(FluentLocalizationEngine, {
        propertyKey: 'title',
        localization: {
          'en-US': {target: {tooltip: {title: 'Tooltip copy'}}},
        },
      })
      const result = localizeDefaultProperty(ctx, 'tooltip')
      expect(result.title).toBe('Tooltip copy')
    })
  })
})

import type {LabeledValue} from '@react-form-builder/core'
import {
  array,
  BiDi,
  ComponentStore,
  createView,
  define,
  FormViewer,
  Language,
  PersistedForm,
  PersistedFormVersion,
  string,
  toLabeledValues
} from '@react-form-builder/core'
import {render} from '@testing-library/react'

interface ItemListProps {
  items?: LabeledValue[]
  label?: string
}

const ItemList = ({items, label}: ItemListProps) => {
  return <div data-testid="item-list">
    {label && <span data-testid="item-label">{label}</span>}
    <ul>
      {items?.map(({value, label}, i) => (
        <li data-testid="item" key={i}>{`${label ?? ''}|${value ?? ''}`}</li>
      ))}
    </ul>
  </div>
}

const itemList = define(ItemList, 'ItemList')
  .props({
    label: string.default('Items').localize,
    items: array.localize.default(toLabeledValues(['a', 'b', 'c'])),
  })
  .build()

interface DeepDataProps {
  config?: unknown
}

const DeepData = ({config}: DeepDataProps) => {
  return <pre data-testid="deep-data">{JSON.stringify(config)}</pre>
}

const deepData = define(DeepData, 'DeepData')
  .props({
    config: array.localize.default([]),
  })
  .build()

const view = createView([itemList.model, deepData.model])

const makeLanguage = (code: string, dialect: string) =>
  new Language(code, dialect, `${code}-${dialect}`, `${code}-${dialect}`, BiDi.LTR)

const buildForm = (opts: {
  componentType?: string
  localization?: PersistedForm['localization']
  propValue?: unknown
  defaultLanguage?: `${string}-${string}`
  languages?: Language[]
  propertyKey?: string
}): PersistedForm => {
  const {
    componentType = 'ItemList',
    localization = {},
    propValue,
    defaultLanguage = 'en-US',
    languages = [makeLanguage('en', 'US')],
    propertyKey = 'items',
  } = opts

  const comp = new ComponentStore('target', componentType)
  comp.props.label = {computeType: 'localization'}

  if (propValue !== undefined) {
    comp.props[propertyKey] = {value: propValue, computeType: 'localization'}
  } else {
    comp.props[propertyKey] = {computeType: 'localization'}
  }

  comp.htmlAttributes = [{name: 'data-testid', value: 'item-list'}]

  const screen = new ComponentStore('Screen', 'Screen')
  screen.children = [comp]

  return {
    version: PersistedFormVersion.version1,
    form: screen,
    localization,
    languages,
    defaultLanguage,
  }
}

const getItemTexts = (container: HTMLElement) => {
  return Array.from(container.querySelectorAll('[data-testid="item"]')).map(el => el.textContent)
}

const renderWithData = async (
  form: PersistedForm,
  initialData: Record<string, unknown>,
  language: `${string}-${string}` = 'en-US'
) => {
  const result = render(
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(form)}
      language={language}
      initialData={initialData}
    />
  )
  await result.findByTestId('item-list')
  return result
}

describe('Array data interpolation', () => {
  describe('basic variable substitution', () => {
    it('interpolates a single variable in array item labels', async () => {
      const items: LabeledValue[] = [
        {value: 'greeting', label: 'Hello {$name}'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {name: 'Alice'})
      expect(getItemTexts(container)).toEqual(['Hello Alice|greeting'])
    })

    it('interpolates multiple variables in a single label', async () => {
      const items: LabeledValue[] = [
        {value: 'full', label: '{$first} {$last}'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {first: 'John', last: 'Doe'})
      expect(getItemTexts(container)).toEqual(['John Doe|full'])
    })

    it('interpolates variables in array item values', async () => {
      const items: LabeledValue[] = [
        {value: 'opt-{$optionId}', label: 'Option'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {optionId: '42'})
      expect(getItemTexts(container)).toEqual(['Option|opt-42'])
    })

    it('interpolates variables in both labels and values simultaneously', async () => {
      const items: LabeledValue[] = [
        {value: '{$code}-item', label: 'Item for {$userName}'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {code: 'ABC', userName: 'Bob'})
      expect(getItemTexts(container)).toEqual(['Item for Bob|ABC-item'])
    })
  })

  describe('strings without placeholders', () => {
    it('returns plain strings unchanged', async () => {
      const items: LabeledValue[] = [
        {value: 'plain', label: 'No placeholders here'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {})
      expect(getItemTexts(container)).toEqual(['No placeholders here|plain'])
    })

    it('handles empty string values', async () => {
      const items: LabeledValue[] = [
        {value: '', label: ''},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {})
      expect(getItemTexts(container)).toEqual(['|'])
    })
  })

  describe('missing variables', () => {
    it('replaces missing variables with empty string', async () => {
      const items: LabeledValue[] = [
        {value: 'v', label: 'Hello {$missing}'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {})
      expect(getItemTexts(container)).toEqual(['Hello |v'])
    })

    it('interpolates present variables while leaving missing ones empty', async () => {
      const items: LabeledValue[] = [
        {value: 'v', label: '{$present} and {$absent}'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {present: 'here'})
      expect(getItemTexts(container)).toEqual(['here and |v'])
    })
  })

  describe('non-string primitives are preserved', () => {
    it('preserves numeric values in array items', async () => {
      const items = [
        {value: 1, label: 'Number {$x}'},
        {value: 2, label: 'Fixed'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {x: '10'})
      const texts = getItemTexts(container)
      expect(texts).toEqual(['Number 10|1', 'Fixed|2'])
    })
  })

  describe('nested object structures', () => {
    it('interpolates strings in deeply nested objects', async () => {
      const localization = {
        'en-US': {
          target: {
            component: {
              label: 'Test',
              config: JSON.stringify({
                title: 'Hello {$name}',
                nested: {
                  subtitle: 'Bye {$name}',
                  deep: {
                    text: 'Deep {$level}',
                  },
                },
              }),
            },
          },
        },
      }

      const comp = new ComponentStore('target', 'DeepData')
      comp.props.config = {computeType: 'localization'}
      comp.htmlAttributes = [{name: 'data-testid', value: 'deep-data'}]

      const screen = new ComponentStore('Screen', 'Screen')
      screen.children = [comp]

      const form: PersistedForm = {
        version: PersistedFormVersion.version1,
        form: screen,
        localization,
        languages: [makeLanguage('en', 'US')],
        defaultLanguage: 'en-US',
      }

      const {findByTestId} = render(
        <FormViewer
          view={view}
          getForm={() => JSON.stringify(form)}
          language="en-US"
          initialData={{name: 'World', level: '3'}}
        />
      )

      const el = await findByTestId('deep-data')
      const parsed = JSON.parse(el.textContent ?? '{}')
      expect(parsed.title).toBe('Hello World')
      expect(parsed.nested.subtitle).toBe('Bye World')
      expect(parsed.nested.deep.text).toBe('Deep 3')
    })

    it('interpolates strings inside arrays nested within objects', async () => {
      const localization = {
        'en-US': {
          target: {
            component: {
              label: 'Test',
              config: JSON.stringify({
                items: ['Hello {$name}', 'Static', '{$count} remaining'],
              }),
            },
          },
        },
      }

      const comp = new ComponentStore('target', 'DeepData')
      comp.props.config = {computeType: 'localization'}
      comp.htmlAttributes = [{name: 'data-testid', value: 'deep-data'}]

      const screen = new ComponentStore('Screen', 'Screen')
      screen.children = [comp]

      const form: PersistedForm = {
        version: PersistedFormVersion.version1,
        form: screen,
        localization,
        languages: [makeLanguage('en', 'US')],
        defaultLanguage: 'en-US',
      }

      const {findByTestId} = render(
        <FormViewer
          view={view}
          getForm={() => JSON.stringify(form)}
          language="en-US"
          initialData={{name: 'Alice', count: '5'}}
        />
      )

      const el = await findByTestId('deep-data')
      const parsed = JSON.parse(el.textContent ?? '{}')
      expect(parsed.items).toEqual(['Hello Alice', 'Static', '5 remaining'])
    })

    it('preserves non-string values during recursive traversal', async () => {
      const localization = {
        'en-US': {
          target: {
            component: {
              label: 'Test',
              config: JSON.stringify({
                text: 'Hello {$name}',
                count: 42,
                active: true,
                empty: null,
                nested: {num: 99, str: '{$val}'},
              }),
            },
          },
        },
      }

      const comp = new ComponentStore('target', 'DeepData')
      comp.props.config = {computeType: 'localization'}
      comp.htmlAttributes = [{name: 'data-testid', value: 'deep-data'}]

      const screen = new ComponentStore('Screen', 'Screen')
      screen.children = [comp]

      const form: PersistedForm = {
        version: PersistedFormVersion.version1,
        form: screen,
        localization,
        languages: [makeLanguage('en', 'US')],
        defaultLanguage: 'en-US',
      }

      const {findByTestId} = render(
        <FormViewer
          view={view}
          getForm={() => JSON.stringify(form)}
          language="en-US"
          initialData={{name: 'Test', val: 'ok'}}
        />
      )

      const el = await findByTestId('deep-data')
      const parsed = JSON.parse(el.textContent ?? '{}')
      expect(parsed.text).toBe('Hello Test')
      expect(parsed.count).toBe(42)
      expect(parsed.active).toBe(true)
      expect(parsed.empty).toBeNull()
      expect(parsed.nested.num).toBe(99)
      expect(parsed.nested.str).toBe('ok')
    })
  })

  describe('empty and edge-case structures', () => {
    it('handles empty array localization', async () => {
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items: []}}},
        },
      })

      const {container} = await renderWithData(form, {name: 'Alice'})
      expect(getItemTexts(container)).toEqual([])
    })

    it('handles empty object localization', async () => {
      const localization = {
        'en-US': {
          target: {
            component: {
              label: 'Test',
              config: JSON.stringify({}),
            },
          },
        },
      }

      const comp = new ComponentStore('target', 'DeepData')
      comp.props.config = {computeType: 'localization'}
      comp.htmlAttributes = [{name: 'data-testid', value: 'deep-data'}]

      const screen = new ComponentStore('Screen', 'Screen')
      screen.children = [comp]

      const form: PersistedForm = {
        version: PersistedFormVersion.version1,
        form: screen,
        localization,
        languages: [makeLanguage('en', 'US')],
        defaultLanguage: 'en-US',
      }

      const {findByTestId} = render(
        <FormViewer
          view={view}
          getForm={() => JSON.stringify(form)}
          language="en-US"
          initialData={{name: 'Alice'}}
        />
      )

      const el = await findByTestId('deep-data')
      expect(JSON.parse(el.textContent ?? '{}')).toEqual({})
    })
  })

  describe('special characters', () => {
    it('preserves dots in interpolated text', async () => {
      const items: LabeledValue[] = [
        {value: 'v', label: 'Hello {$name}. Goodbye.'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {name: 'Alice'})
      expect(getItemTexts(container)).toEqual(['Hello Alice. Goodbye.|v'])
    })

    it('handles ampersands and angle brackets in static text', async () => {
      const items: LabeledValue[] = [
        {value: 'v', label: 'A & B < C for {$name}'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {name: 'Test'})
      expect(getItemTexts(container)).toEqual(['A & B < C for Test|v'])
    })

    it('handles unicode characters alongside placeholders', async () => {
      const items: LabeledValue[] = [
        {value: 'v', label: '价格: {$price}€'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {price: '100'})
      expect(getItemTexts(container)).toEqual(['价格: 100€|v'])
    })
  })

  describe('numeric form data', () => {
    it('interpolates numeric form data values', async () => {
      const items: LabeledValue[] = [
        {value: 'v', label: 'Count: {$count}'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {count: 42})
      expect(getItemTexts(container)).toEqual(['Count: 42|v'])
    })
  })

  describe('nested form data (dot notation)', () => {
    it('interpolates nested form data using dot notation', async () => {
      const items: LabeledValue[] = [
        {value: 'v', label: 'Hello {$user.name}'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {user: {name: 'Charlie'}})
      expect(getItemTexts(container)).toEqual(['Hello Charlie|v'])
    })

    it('interpolates deeply nested form data', async () => {
      const items: LabeledValue[] = [
        {value: 'v', label: '{$a.b.c}'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {a: {b: {c: 'deep'}}})
      expect(getItemTexts(container)).toEqual(['deep|v'])
    })
  })

  describe('multiple array items', () => {
    it('interpolates the same variable across multiple array items', async () => {
      const items: LabeledValue[] = [
        {value: 'a', label: 'First: {$name}'},
        {value: 'b', label: 'Second: {$name}'},
        {value: 'c', label: 'Third: {$name}'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {name: 'Shared'})
      expect(getItemTexts(container)).toEqual([
        'First: Shared|a',
        'Second: Shared|b',
        'Third: Shared|c',
      ])
    })

    it('interpolates different variables in different array items', async () => {
      const items: LabeledValue[] = [
        {value: 'a', label: 'Name: {$name}'},
        {value: 'b', label: 'Age: {$age}'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {name: 'Eve', age: '30'})
      expect(getItemTexts(container)).toEqual([
        'Name: Eve|a',
        'Age: 30|b',
      ])
    })
  })

  describe('language switching with interpolation', () => {
    it('interpolates in the correct language after switching', async () => {
      const enItems: LabeledValue[] = [{value: 'g', label: 'Hello {$name}'}]
      const deItems: LabeledValue[] = [{value: 'g', label: 'Hallo {$name}'}]

      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'English', items: enItems}}},
          'de-DE': {target: {component: {label: 'German', items: deItems}}},
        },
        languages: [makeLanguage('en', 'US'), makeLanguage('de', 'DE')],
      })

      const data = {name: 'World'}
      const getForm = () => JSON.stringify(form)

      const {findByTestId, container, rerender} = render(
        <FormViewer view={view} getForm={getForm} language="en-US" initialData={data}/>
      )
      await findByTestId('item-list')
      expect(getItemTexts(container)).toEqual(['Hello World|g'])

      rerender(<FormViewer view={view} getForm={getForm} language="de-DE" initialData={data}/>)
      await findByTestId('item-list')
      expect(getItemTexts(container)).toEqual(['Hallo World|g'])
    })
  })

  describe('fallback with interpolation', () => {
    it('interpolates in default language items when requested language lacks array', async () => {
      const enItems: LabeledValue[] = [{value: 'g', label: 'Hi {$name}'}]

      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Size', items: enItems}}},
          'de-DE': {target: {component: {label: 'Größe'}}},
        },
        languages: [makeLanguage('en', 'US'), makeLanguage('de', 'DE')],
      })

      const {findByTestId, container} = render(
        <FormViewer view={view} getForm={() => JSON.stringify(form)} language="de-DE" initialData={{name: 'Welt'}}/>
      )
      await findByTestId('item-list')
      expect(getItemTexts(container)).toEqual(['Hi Welt|g'])
    })
  })

  describe('mixed interpolated and static items', () => {
    it('only interpolates items that contain placeholders', async () => {
      const items: LabeledValue[] = [
        {value: 'a', label: 'Static label'},
        {value: 'b', label: 'Dynamic {$x}'},
        {value: 'c', label: 'Another static'},
      ]
      const form = buildForm({
        localization: {
          'en-US': {target: {component: {label: 'Test', items}}},
        },
      })

      const {container} = await renderWithData(form, {x: 'value'})
      expect(getItemTexts(container)).toEqual([
        'Static label|a',
        'Dynamic value|b',
        'Another static|c',
      ])
    })
  })

  describe('array of primitives', () => {
    it('interpolates strings in a flat string array', async () => {
      const localization = {
        'en-US': {
          target: {
            component: {
              label: 'Test',
              config: JSON.stringify(['Hello {$name}', 'Plain', '{$count} items']),
            },
          },
        },
      }

      const comp = new ComponentStore('target', 'DeepData')
      comp.props.config = {computeType: 'localization'}
      comp.htmlAttributes = [{name: 'data-testid', value: 'deep-data'}]

      const screen = new ComponentStore('Screen', 'Screen')
      screen.children = [comp]

      const form: PersistedForm = {
        version: PersistedFormVersion.version1,
        form: screen,
        localization,
        languages: [makeLanguage('en', 'US')],
        defaultLanguage: 'en-US',
      }

      const {findByTestId} = render(
        <FormViewer
          view={view}
          getForm={() => JSON.stringify(form)}
          language="en-US"
          initialData={{name: 'World', count: '3'}}
        />
      )

      const el = await findByTestId('deep-data')
      const parsed = JSON.parse(el.textContent ?? '[]')
      expect(parsed).toEqual(['Hello World', 'Plain', '3 items'])
    })

    it('preserves numbers and booleans in mixed arrays', async () => {
      const localization = {
        'en-US': {
          target: {
            component: {
              label: 'Test',
              config: JSON.stringify(['text {$x}', 42, true, null, 'end']),
            },
          },
        },
      }

      const comp = new ComponentStore('target', 'DeepData')
      comp.props.config = {computeType: 'localization'}
      comp.htmlAttributes = [{name: 'data-testid', value: 'deep-data'}]

      const screen = new ComponentStore('Screen', 'Screen')
      screen.children = [comp]

      const form: PersistedForm = {
        version: PersistedFormVersion.version1,
        form: screen,
        localization,
        languages: [makeLanguage('en', 'US')],
        defaultLanguage: 'en-US',
      }

      const {findByTestId} = render(
        <FormViewer
          view={view}
          getForm={() => JSON.stringify(form)}
          language="en-US"
          initialData={{x: 'val'}}
        />
      )

      const el = await findByTestId('deep-data')
      const parsed = JSON.parse(el.textContent ?? '[]')
      expect(parsed).toEqual(['text val', 42, true, null, 'end'])
    })
  })
})

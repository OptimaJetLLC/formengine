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
  toLabeledValues,
} from '@react-form-builder/core'
import {render} from '@testing-library/react'

interface ItemListProps {
  items?: LabeledValue[]
  label?: string
}

const ItemList = ({items, label}: ItemListProps) => {
  return (
    <div data-testid="item-list">
      {label && <span data-testid="item-label">{label}</span>}
      <ul>
        {items?.map(({value, label}, i) => (
          <li data-testid="item" key={i}>
            {label ?? value}
          </li>
        ))}
      </ul>
    </div>
  )
}

const itemList = define(ItemList, 'ItemList')
  .props({
    label: string.default('Items'),
    items: array.localize.default(toLabeledValues(['a', 'b', 'c'])),
  })
  .build()

const view = createView([itemList.model])

const enItems: LabeledValue[] = [
  {value: 'small', label: 'Small'},
  {value: 'medium', label: 'Medium'},
  {value: 'large', label: 'Large'},
]

const deItems: LabeledValue[] = [
  {value: 'small', label: 'Klein'},
  {value: 'medium', label: 'Mittel'},
  {value: 'large', label: 'Groß'},
]

const makeLanguage = (code: string, dialect: string) => new Language(code, dialect, `${code}-${dialect}`, `${code}-${dialect}`, BiDi.LTR)

const buildForm = (opts: {
  localization?: PersistedForm['localization']
  propValue?: LabeledValue[]
  defaultLanguage?: `${string}-${string}`
  languages?: Language[]
}): PersistedForm => {
  const {localization = {}, propValue, defaultLanguage = 'en-US', languages = [makeLanguage('en', 'US'), makeLanguage('de', 'DE')]} = opts

  const comp = new ComponentStore('target', 'ItemList')
  comp.props.label = {computeType: 'localization'}

  if (propValue) {
    comp.props.items = {value: propValue, computeType: 'localization'}
  } else {
    comp.props.items = {computeType: 'localization'}
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

describe('Array data localization', () => {
  it('applies localized array for the requested language', async () => {
    const form = buildForm({
      localization: {
        'en-US': {target: {component: {label: 'Size', items: enItems}}},
        'de-DE': {target: {component: {label: 'Größe', items: deItems}}},
      },
    })

    const {findByTestId, container} = render(<FormViewer view={view} getForm={() => JSON.stringify(form)} language="en-US" />)

    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['Small', 'Medium', 'Large'])
  })

  it('switches array localization when language changes', async () => {
    const form = buildForm({
      localization: {
        'en-US': {target: {component: {label: 'Size', items: enItems}}},
        'de-DE': {target: {component: {label: 'Größe', items: deItems}}},
      },
    })

    const getForm = () => JSON.stringify(form)
    const {findByTestId, container, rerender} = render(<FormViewer view={view} getForm={getForm} language="en-US" />)

    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['Small', 'Medium', 'Large'])

    rerender(<FormViewer view={view} getForm={getForm} language="de-DE" />)
    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['Klein', 'Mittel', 'Groß'])
  })

  it('falls back to default language when requested language has no array localization', async () => {
    const form = buildForm({
      localization: {
        'en-US': {target: {component: {label: 'Size', items: enItems}}},
        'de-DE': {target: {component: {label: 'Größe'}}},
      },
    })

    const {findByTestId, container} = render(<FormViewer view={view} getForm={() => JSON.stringify(form)} language="de-DE" />)

    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['Small', 'Medium', 'Large'])
  })

  it('uses prop value as fallback when no localization exists for array', async () => {
    const propItems: LabeledValue[] = [
      {value: 'x', label: 'Prop X'},
      {value: 'y', label: 'Prop Y'},
    ]
    const form = buildForm({
      propValue: propItems,
      localization: {
        'en-US': {target: {component: {label: 'Size'}}},
      },
      languages: [makeLanguage('en', 'US')],
    })

    const {findByTestId, container} = render(<FormViewer view={view} getForm={() => JSON.stringify(form)} language="en-US" />)

    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['Prop X', 'Prop Y'])
  })

  it('uses component default when no localization and no prop value', async () => {
    const form = buildForm({
      localization: {'en-US': {}},
      languages: [makeLanguage('en', 'US')],
    })

    const {findByTestId, container} = render(<FormViewer view={view} getForm={() => JSON.stringify(form)} language="en-US" />)

    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['A', 'B', 'C'])
  })

  it('handles empty array localization value', async () => {
    const form = buildForm({
      localization: {
        'en-US': {target: {component: {label: 'Size', items: []}}},
      },
      languages: [makeLanguage('en', 'US')],
    })

    const {findByTestId, container} = render(<FormViewer view={view} getForm={() => JSON.stringify(form)} language="en-US" />)

    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual([])
  })

  it('handles array items with missing labels (uses value as fallback)', async () => {
    const noLabelItems: LabeledValue[] = [{value: 'one'}, {value: 'two', label: 'Zwei'}]
    const form = buildForm({
      localization: {
        'en-US': {target: {component: {label: 'Mix', items: noLabelItems}}},
      },
      languages: [makeLanguage('en', 'US')],
    })

    const {findByTestId, container} = render(<FormViewer view={view} getForm={() => JSON.stringify(form)} language="en-US" />)

    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['one', 'Zwei'])
  })

  it('localizes string and array properties simultaneously', async () => {
    const form = buildForm({
      localization: {
        'en-US': {target: {component: {label: 'English Label', items: enItems}}},
        'de-DE': {target: {component: {label: 'Deutsches Label', items: deItems}}},
      },
    })

    const getForm = () => JSON.stringify(form)

    const {findByTestId, container, rerender} = render(<FormViewer view={view} getForm={getForm} language="en-US" />)
    await findByTestId('item-list')
    const enLabel = await findByTestId('item-label')
    expect(enLabel).toHaveTextContent('English Label')
    expect(getItemTexts(container)).toEqual(['Small', 'Medium', 'Large'])

    rerender(<FormViewer view={view} getForm={getForm} language="de-DE" />)
    await findByTestId('item-list')
    const deLabel = await findByTestId('item-label')
    expect(deLabel).toHaveTextContent('Deutsches Label')
    expect(getItemTexts(container)).toEqual(['Klein', 'Mittel', 'Groß'])
  })

  it('handles single-item array', async () => {
    const singleItem: LabeledValue[] = [{value: 'only', label: 'Only One'}]
    const form = buildForm({
      localization: {
        'en-US': {target: {component: {label: 'Single', items: singleItem}}},
      },
      languages: [makeLanguage('en', 'US')],
    })

    const {findByTestId, container} = render(<FormViewer view={view} getForm={() => JSON.stringify(form)} language="en-US" />)

    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['Only One'])
  })

  it('handles large array', async () => {
    const largeItems: LabeledValue[] = Array.from({length: 100}, (_, i) => ({
      value: `v${i}`,
      label: `Label ${i}`,
    }))
    const form = buildForm({
      localization: {
        'en-US': {target: {component: {label: 'Big', items: largeItems}}},
      },
      languages: [makeLanguage('en', 'US')],
    })

    const {findByTestId, container} = render(<FormViewer view={view} getForm={() => JSON.stringify(form)} language="en-US" />)

    await findByTestId('item-list')
    const texts = getItemTexts(container)
    expect(texts).toHaveLength(100)
    expect(texts[0]).toBe('Label 0')
    expect(texts[99]).toBe('Label 99')
  })

  it('handles items with special characters in labels', async () => {
    const specialItems: LabeledValue[] = [
      {value: 'a', label: 'Größe & Farbe'},
      {value: 'b', label: 'Preis < 100€'},
      {value: 'c', label: '"Zitat"'},
    ]
    const form = buildForm({
      localization: {
        'en-US': {target: {component: {label: 'Special', items: specialItems}}},
      },
      languages: [makeLanguage('en', 'US')],
    })

    const {findByTestId, container} = render(<FormViewer view={view} getForm={() => JSON.stringify(form)} language="en-US" />)

    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['Größe & Farbe', 'Preis < 100€', '"Zitat"'])
  })

  it('handles items with numeric values', async () => {
    const numericItems = [
      {value: 1, label: 'One'},
      {value: 2, label: 'Two'},
    ]
    const form = buildForm({
      localization: {
        'en-US': {target: {component: {label: 'Numeric', items: numericItems}}},
      },
      languages: [makeLanguage('en', 'US')],
    })

    const {findByTestId, container} = render(<FormViewer view={view} getForm={() => JSON.stringify(form)} language="en-US" />)

    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['One', 'Two'])
  })

  it('preserves item order across languages', async () => {
    const enOrdered: LabeledValue[] = [
      {value: '1', label: 'First'},
      {value: '2', label: 'Second'},
      {value: '3', label: 'Third'},
    ]
    const deReversed: LabeledValue[] = [
      {value: '3', label: 'Dritte'},
      {value: '1', label: 'Erste'},
      {value: '2', label: 'Zweite'},
    ]
    const form = buildForm({
      localization: {
        'en-US': {target: {component: {label: 'Order', items: enOrdered}}},
        'de-DE': {target: {component: {label: 'Reihenfolge', items: deReversed}}},
      },
    })

    const getForm = () => JSON.stringify(form)

    const {findByTestId, container, rerender} = render(<FormViewer view={view} getForm={getForm} language="en-US" />)
    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['First', 'Second', 'Third'])

    rerender(<FormViewer view={view} getForm={getForm} language="de-DE" />)
    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['Dritte', 'Erste', 'Zweite'])
  })

  it('handles three languages with partial array localization', async () => {
    const frItems: LabeledValue[] = [
      {value: 'small', label: 'Petit'},
      {value: 'large', label: 'Grand'},
    ]
    const form = buildForm({
      localization: {
        'en-US': {target: {component: {label: 'Size', items: enItems}}},
        'de-DE': {target: {component: {label: 'Größe'}}},
        'fr-FR': {target: {component: {label: 'Taille', items: frItems}}},
      },
      languages: [makeLanguage('en', 'US'), makeLanguage('de', 'DE'), makeLanguage('fr', 'FR')],
    })

    const getForm = () => JSON.stringify(form)

    const {findByTestId, container, rerender} = render(<FormViewer view={view} getForm={getForm} language="fr-FR" />)
    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['Petit', 'Grand'])

    rerender(<FormViewer view={view} getForm={getForm} language="de-DE" />)
    await findByTestId('item-list')
    expect(getItemTexts(container)).toEqual(['Small', 'Medium', 'Large'])
  })
})

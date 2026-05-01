import {createView, define, FormViewer, string} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import {createLocalizedForm} from './localizationTestUtils'

const CustomWithDefault = ({children}: { children?: string }) => {
  return <span data-testid="localized-target">{children}</span>
}

const customWithDefault = define(CustomWithDefault, 'CustomWithDefault')
  .props({
    children: string.required.default('model-default').dataBound,
  })
  .build()

const CustomNoDefault = ({children}: { children?: string }) => {
  return <span data-testid="localized-target">{children}</span>
}

const customNoDefault = define(CustomNoDefault, 'CustomNoDefault')
  .props({
    children: string.required.dataBound,
  })
  .build()

const CustomEmptyDefault = ({children}: { children?: string }) => {
  return <span data-testid="localized-target">{children}</span>
}

const customEmptyDefault = define(CustomEmptyDefault, 'CustomEmptyDefault')
  .props({
    children: string.required.default('').dataBound,
  })
  .build()

const view = createView([customWithDefault.model, customNoDefault.model, customEmptyDefault.model])

type FallbackCase = {
  name: string
  componentType: 'CustomWithDefault' | 'CustomNoDefault' | 'CustomEmptyDefault'
  requestedLanguage: `${string}-${string}`
  propValue?: string
  localization: Record<string, any>
  expectedText: string
}

describe('Localization fallback matrix', () => {
  // Keep generic fallback-order assertions in this suite only.
  // Integration suites should cover framework-specific rendering behavior (repeater, designer, validators).
  const cases: FallbackCase[] = [
    {
      name: 'uses requested language localization',
      componentType: 'CustomWithDefault',
      requestedLanguage: 'fr-FR',
      localization: {
        'en-US': {target: {component: {children: 'en'}}},
        'fr-FR': {target: {component: {children: 'fr'}}},
      },
      expectedText: 'fr',
    },
    {
      name: 'keeps explicit empty localization value',
      componentType: 'CustomWithDefault',
      requestedLanguage: 'fr-FR',
      localization: {
        'en-US': {target: {component: {children: 'en'}}},
        'fr-FR': {target: {component: {children: ''}}},
      },
      expectedText: '',
    },
    {
      name: 'falls back to default language localization',
      componentType: 'CustomWithDefault',
      requestedLanguage: 'fr-FR',
      localization: {
        'en-US': {target: {component: {children: 'en'}}},
        'fr-FR': {},
      },
      expectedText: 'en',
    },
    {
      name: 'keeps explicit empty value from default language when requested localization is missing',
      componentType: 'CustomWithDefault',
      requestedLanguage: 'fr-FR',
      localization: {
        'en-US': {target: {component: {children: ''}}},
        'fr-FR': {},
      },
      expectedText: '',
    },
    {
      name: 'falls back to property value',
      componentType: 'CustomWithDefault',
      requestedLanguage: 'fr-FR',
      propValue: 'prop-value',
      localization: {
        'en-US': {},
        'fr-FR': {},
      },
      expectedText: 'prop-value',
    },
    {
      name: 'keeps explicit empty property value without falling back further',
      componentType: 'CustomWithDefault',
      requestedLanguage: 'fr-FR',
      propValue: '',
      localization: {
        'en-US': {},
        'fr-FR': {},
      },
      expectedText: '',
    },
    {
      name: 'falls back to model default property value',
      componentType: 'CustomWithDefault',
      requestedLanguage: 'fr-FR',
      localization: {
        'en-US': {},
        'fr-FR': {},
      },
      expectedText: 'model-default',
    },
    {
      name: 'keeps explicit empty model default value without falling back to component type',
      componentType: 'CustomEmptyDefault',
      requestedLanguage: 'fr-FR',
      localization: {
        'en-US': {},
        'fr-FR': {},
      },
      expectedText: '',
    },
    {
      name: 'falls back to component type when no defaults are available',
      componentType: 'CustomNoDefault',
      requestedLanguage: 'fr-FR',
      localization: {
        'en-US': {},
        'fr-FR': {},
      },
      expectedText: 'CustomNoDefault',
    },
    {
      name: 'falls back when fluent message is whitespace-only',
      componentType: 'CustomWithDefault',
      requestedLanguage: 'fr-FR',
      propValue: 'prop-value',
      localization: {
        'en-US': {},
        'fr-FR': {target: {component: {children: '   '}}},
      },
      expectedText: 'prop-value',
    },
    {
      name: 'falls back when default-language fluent message is whitespace-only',
      componentType: 'CustomWithDefault',
      requestedLanguage: 'fr-FR',
      propValue: 'prop-value',
      localization: {
        'en-US': {target: {component: {children: '   '}}},
        'fr-FR': {},
      },
      expectedText: 'prop-value',
    },
  ]

  it.each(cases)('$name', async ({componentType, requestedLanguage, propValue, localization, expectedText}) => {
    const {form, testId} = createLocalizedForm({
      componentType,
      requestedLanguage,
      defaultLanguage: 'en-US',
      propertyKey: 'children',
      propValue,
      localization,
    })

    const {findByTestId} = render(<FormViewer view={view} getForm={() => JSON.stringify(form)} language={requestedLanguage}/>)
    const target = await findByTestId(testId)
    expect(target.textContent ?? '').toBe(expectedText)
  })
})

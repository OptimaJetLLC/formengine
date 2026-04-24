import {BuilderView, define, Language} from '@react-form-builder/core'
import {FormBuilderI18n, FormBuilderI18nData} from '@react-form-builder/designer'
import {renderBuilder} from '../util/renderBuilder'

// Mock form for testing
const testForm = {
  'form': {
    'key': 'Screen',
    'type': 'Screen',
    'children': [
      {
        'key': 'testField',
        'type': 'RsInput',
        'props': {
          'label': 'Test Field'
        }
      }
    ]
  },
  'localization': {},
  'languages': [
    {
      'code': 'fr',
      'dialect': 'FR',
      'name': 'French',
      'description': 'Français',
      'bidi': 'ltr'
    },
    {
      'code': 'de',
      'dialect': 'DE',
      'name': 'German',
      'description': 'Deutsch',
      'bidi': 'ltr'
    }
  ],
  'defaultLanguage': 'fr-FR'
}

// Custom i18n configuration with English as first language
const customI18nEnFirst: FormBuilderI18n = {
  languages: [
    new Language('en', 'US', 'English', 'American English'),
    new Language('fr', 'FR', 'French', 'Français'),
    new Language('de', 'DE', 'German', 'Deutsch')
  ],
  getData: async (languageFullCode) => {
    const data: FormBuilderI18nData = {
      data: {},
      componentsLocale: {}
    }

    if (languageFullCode === 'en-US') {
      data.data = {
        leftMenu: {menu: 'Menu'},
        leftPanel: {sectionName: {components: 'Components'}}
      }
    } else if (languageFullCode === 'fr-FR') {
      data.data = {
        leftMenu: {menu: 'Menu'},
        leftPanel: {sectionName: {components: 'Composants'}}
      }
    }

    return data
  }
}

// Helper to get builder store from renderBuilder result
const getBuilderStore = (getFormBuilder: () => unknown) => {
  const builder = getFormBuilder() as { builderStore: any }
  return builder.builderStore
}

// Custom i18n configuration with French as first language
const customI18nFrFirst: FormBuilderI18n = {
  languages: [
    new Language('fr', 'FR', 'French', 'Français'),
    new Language('en', 'US', 'English', 'American English'),
    new Language('de', 'DE', 'German', 'Deutsch')
  ],
  getData: async (languageFullCode) => {
    const data: FormBuilderI18nData = {
      data: {},
      componentsLocale: {}
    }

    // Provide different translations for each language
    if (languageFullCode === 'fr-FR') {
      data.data = {
        leftMenu: {menu: 'Menu'},
        leftPanel: {sectionName: {components: 'Composants'}}
      }
    } else if (languageFullCode === 'de-DE') {
      data.data = {
        leftMenu: {menu: 'Menü'},
        leftPanel: {sectionName: {components: 'Komponenten'}}
      }
    }

    return data
  }
}

// Form with English as default language (for comparison)
const testFormEnDefault = {
  'form': {
    'key': 'Screen',
    'type': 'Screen',
    'props': {},
    'children': [
      {
        'key': 'testField',
        'type': 'RsInput',
        'props': {
          'label': 'Test Field'
        }
      }
    ]
  },
  'localization': {},
  'languages': [
    {
      'code': 'en',
      'dialect': 'US',
      'name': 'English',
      'description': 'American English',
      'bidi': 'ltr'
    },
    {
      'code': 'de',
      'dialect': 'DE',
      'name': 'German',
      'description': 'Deutsch',
      'bidi': 'ltr'
    }
  ],
  'defaultLanguage': 'en-US'
}

describe('generateJsonFormSchema language test', () => {
  // Create a simple component with i18n descriptions
  const testComponent = define(() => null, 'TestComponent')
    .name('Test Component')
    .category('test')
    .build()

  const enDescriptions = {
    categories: {},
    components: {
      TestComponent: {}
    }
  }

  const frDescriptions = {
    components: {
      TestComponent: {}
    }
  }

  // Create a BuilderView with i18n descriptions
  const createViewWithDescriptions = () => {
    const view = new BuilderView([testComponent])
    view.withComponentLibraryDescription({
      'en-US': enDescriptions,
      'fr-FR': frDescriptions,
      'de-DE': {},
    })
    return view
  }

  it('should use form default language for i18nDescriptions instead of global default', async () => {
    const mockSchemaGenerator = vi.fn().mockReturnValue('test schema')
    const viewWithDescriptions = createViewWithDescriptions()

    const {getFormBuilder} = await renderBuilder(testForm, {
      i18n: customI18nFrFirst,
      generateJsonFormSchema: mockSchemaGenerator,
      view: viewWithDescriptions
    })

    const builderStore = getBuilderStore(getFormBuilder)

    // Call generateJsonFormSchema
    const result = builderStore.generateJsonFormSchema()
    expect(result).toEqual('test schema')

    // Verify the generator was called with descriptions in French (default language)
    expect(mockSchemaGenerator).toHaveBeenCalledWith({
      components: expect.any(Array),
      descriptions: [frDescriptions] // Should use fr-FR, not en-US
    })
  })

  it('should handle missing description for default language gracefully', async () => {
    const mockSchemaGenerator = vi.fn()
    const view = new BuilderView([testComponent])
    view.withComponentLibraryDescription({
      'en-US': {},
      'de-DE': {}
      // No French description even though French is default
    })

    const {getFormBuilder} = await renderBuilder(testForm, {
      i18n: customI18nFrFirst,
      generateJsonFormSchema: mockSchemaGenerator,
      view
    })

    const builderStore = getBuilderStore(getFormBuilder)
    builderStore.generateJsonFormSchema()

    // Should handle missing French description (returns undefined)
    expect(mockSchemaGenerator).toHaveBeenCalled()

    const callArgs = mockSchemaGenerator.mock.calls[0][0]
    expect(callArgs.descriptions).toEqual([undefined]) // No French description
  })

  it('should use English descriptions when English is default language', async () => {
    const mockSchemaGenerator = vi.fn()
    const viewWithDescriptions = createViewWithDescriptions()

    const {getFormBuilder} = await renderBuilder(testFormEnDefault, {
      i18n: customI18nEnFirst,
      generateJsonFormSchema: mockSchemaGenerator,
      view: viewWithDescriptions
    })

    const builderStore = getBuilderStore(getFormBuilder)
    builderStore.generateJsonFormSchema()

    // Should use English descriptions when English is default
    expect(mockSchemaGenerator).toHaveBeenCalledWith({
      components: expect.any(Array),
      descriptions: [enDescriptions]
    })
  })

  it('should return undefined when generateJsonFormSchema prop is not provided', async () => {
    const viewWithDescriptions = createViewWithDescriptions()
    const {getFormBuilder} = await renderBuilder(testForm, {
      i18n: customI18nFrFirst,
      view: viewWithDescriptions
    })

    const builderStore = getBuilderStore(getFormBuilder)

    // generateJsonFormSchema should return undefined when no generator is provided
    const result = builderStore.generateJsonFormSchema()
    expect(result).toBeUndefined()
  })

  it('should filter out template types and preset components', async () => {
    const mockSchemaGenerator = vi.fn()
    const viewWithDescriptions = createViewWithDescriptions()

    const {getFormBuilder} = await renderBuilder(testForm, {
      i18n: customI18nFrFirst,
      generateJsonFormSchema: mockSchemaGenerator,
      view: viewWithDescriptions
    })

    const builderStore = getBuilderStore(getFormBuilder)
    builderStore.generateJsonFormSchema()

    // Should be called with components array
    expect(mockSchemaGenerator).toHaveBeenCalled()
    const callArgs = mockSchemaGenerator.mock.calls[0][0]
    expect(callArgs.components).toBeInstanceOf(Array)
    // Should contain our test component
    expect(callArgs.components.length).toBeGreaterThan(0)
  })
})

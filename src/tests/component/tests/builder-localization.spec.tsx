import {BiDi, Language} from '@react-form-builder/core'
import {type FormBuilderI18n, FormBuilderI18nData} from '@react-form-builder/designer'
import {waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'
import {switchLanguage} from './designerUtils'
import {createLocalizedScreenForm, getBuilderStore} from './localizationTestUtils'

// Mock form for testing
const testForm = createLocalizedScreenForm({
  children: [
    {
      key: 'testField',
      type: 'RsInput',
      props: {
        label: 'Test Field',
      },
    },
  ],
  languages: [
    {
      code: 'fr',
      dialect: 'FR',
      name: 'French',
      description: 'Français',
      bidi: 'ltr',
    },
    {
      code: 'de',
      dialect: 'DE',
      name: 'German',
      description: 'Deutsch',
      bidi: 'ltr',
    },
  ],
  defaultLanguage: 'fr-FR',
})

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

// Custom i18n configuration with German as first language
const customI18nDeFirst: FormBuilderI18n = {
  languages: [
    new Language('de', 'DE', 'German', 'Deutsch'),
    new Language('en', 'US', 'English', 'American English'),
    new Language('fr', 'FR', 'French', 'Français')
  ],
  getData: async (languageFullCode) => {
    const data: FormBuilderI18nData = {
      data: {},
      componentsLocale: {}
    }

    if (languageFullCode === 'de-DE') {
      data.data = {
        leftMenu: {menu: 'Menü'},
        leftPanel: {sectionName: {components: 'Komponenten'}}
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

type BuilderStoreLike = {
  defaultLanguage: { fullCode: string; bidi?: string }
  availableLanguages: Array<{ fullCode: string }>
  formBuilderLanguage: { fullCode: string }
  formAvailableLanguages: Array<{ fullCode: string }>
  isRTL: boolean
}

describe('builder i18n fallback language behavior', () => {
  it('uses form default language as fallback instead of global default language (en-US)', async () => {
    const {getFormBuilder, container} = await renderBuilder(testForm, {i18n: customI18nFrFirst})

    // Wait for the component to load
    await waitFor(() => {
      expect(container.querySelector('button.FE_Components_Tab')).toBeInTheDocument()
    })

    const builderStore = getBuilderStore<BuilderStoreLike>(getFormBuilder)

    // Verify that defaultLanguage is French (not English)
    expect(builderStore.defaultLanguage.fullCode).toBe('fr-FR')

    // Verify available languages include French as first
    expect(builderStore.availableLanguages[0].fullCode).toBe('fr-FR')

    // Check that language selector shows French as active/available
    const frSelector = 'li[data-event-key="fr-FR"]'
    await waitFor(() => expect(container.querySelector(frSelector)).toBeInTheDocument())
  })

  it('uses first language from i18n configuration as fallback', async () => {
    const formNoLanguages = {
      'form': {
        'key': 'Screen',
        'type': 'Screen',
      },
      'localization': {}
    }

    const {getFormBuilder} = await renderBuilder(formNoLanguages, {i18n: customI18nDeFirst})

    const builderStore = getBuilderStore<BuilderStoreLike>(getFormBuilder)

    // Should use first language from i18n configuration (German)
    expect(builderStore.defaultLanguage.fullCode).toBe('de-DE')
    expect(builderStore.availableLanguages[0].fullCode).toBe('de-DE')
  })

  it('maintains correct fallback behavior when switching languages', async () => {
    const {getFormBuilder, container} = await renderBuilder(testForm, {i18n: customI18nFrFirst})

    const builderStore = getBuilderStore<BuilderStoreLike>(getFormBuilder)

    // Initial language should be French (form default)
    expect(builderStore.formBuilderLanguage.fullCode).toBe('fr-FR')

    // Switch to German
    await switchLanguage('de-DE', container)

    // Wait for language change
    await waitFor(() => {
      expect(builderStore.formBuilderLanguage.fullCode).toBe('de-DE')
    })

    // Default language should still be French
    expect(builderStore.defaultLanguage.fullCode).toBe('fr-FR')
  })

  it('falls back to default language when translation is missing for current language', async () => {
    // i18n config with translations only for French (the default language)
    const i18nFrenchOnly: FormBuilderI18n = {
      languages: [
        new Language('fr', 'FR', 'French', 'Français'),
        new Language('it', 'IT', 'Italian', 'Italiano')
      ],
      getData: async (languageFullCode) => {
        const data: FormBuilderI18nData = {
          data: {},
          componentsLocale: {}
        }

        if (languageFullCode === 'fr-FR') {
          data.data = {
            leftPanel: {sectionName: {components: 'Composants'}}
          }
        }
        // No translations for it-IT - should fall back to fr-FR

        return data
      }
    }

    const {container} = await renderBuilder(testForm, {i18n: i18nFrenchOnly})

    // Wait for French translations to load
    const testElementSelector = 'button.FE_Components_Tab'
    await waitFor(() => expect(container.querySelector(testElementSelector)).toBeInTheDocument())

    // Initially should show French translation
    await waitFor(() => {
      expect(container.querySelector(testElementSelector)).toHaveTextContent('Composants')
    })

    // Switch to Italian (no translations - should fall back to French)
    await switchLanguage('it-IT', container)

    // Should still show French translation because fallback is defaultLanguage (fr-FR)
    await waitFor(() => {
      expect(container.querySelector(testElementSelector)).toHaveTextContent('Composants')
    })
  })

  it('handles empty i18n configuration', async () => {
    const emptyI18n: FormBuilderI18n = {
      languages: [],
      getData: async () => ({data: {}, componentsLocale: {}})
    }

    const {getFormBuilder} = await renderBuilder(testForm, {i18n: emptyI18n})

    const builderStore = getBuilderStore<BuilderStoreLike>(getFormBuilder)

    // Should fall back to built-in languages
    expect(builderStore.availableLanguages.length).toBeGreaterThan(0)

    // Default language should be from built-in languages
    expect(builderStore.defaultLanguage).toBeDefined()
  })

  it('handles i18n with a single language different from form languages', async () => {
    // Form with localization entries for French and German
    const formWithLocalization = {
      ...testForm,
      localization: {
        'fr-FR': {
          testField: {
            component: {
              label: 'Champ de test'
            }
          }
        },
        'de-DE': {
          testField: {
            component: {
              label: 'Testfeld'
            }
          }
        }
      }
    }

    const singleLangI18n: FormBuilderI18n = {
      languages: [new Language('it', 'IT', 'Italian', 'Italiano')],
      getData: async () => ({data: {}, componentsLocale: {}})
    }

    const {getFormBuilder} = await renderBuilder(formWithLocalization, {i18n: singleLangI18n})

    const builderStore = getBuilderStore<BuilderStoreLike>(getFormBuilder)

    // i18n available languages should only include Italian (from i18n config)
    const languageCodes = builderStore.availableLanguages.map(lang => lang.fullCode)
    expect(languageCodes).toEqual(['it-IT'])

    // formAvailableLanguages filters availableLanguages by form localization
    // Since fr-FR and de-DE are not in i18n languages, they won't appear
    const formLanguageCodes = builderStore.formAvailableLanguages.map(lang => lang.fullCode)
    expect(formLanguageCodes).toEqual(['it-IT'])

    // Default language should be Italian (first language from i18n configuration)
    expect(builderStore.defaultLanguage.fullCode).toBe('it-IT')

    // Form languages from JSON are stored separately
    expect(builderStore.formAvailableLanguages.length).toBeGreaterThan(0)
  })

  it('preserves RTL language direction settings', async () => {
    const rtlForm = createLocalizedScreenForm({
      languages: [
        {
          code: 'ar',
          dialect: 'SA',
          name: 'Arabic',
          description: 'العربية',
          bidi: 'rtl',
        },
      ],
      defaultLanguage: 'ar-SA',
    })

    const rtlI18n: FormBuilderI18n = {
      languages: [new Language('ar', 'SA', 'Arabic', 'العربية', BiDi.RTL)],
      getData: async () => ({data: {}, componentsLocale: {}})
    }

    const {getFormBuilder} = await renderBuilder(rtlForm, {i18n: rtlI18n})

    const builderStore = getBuilderStore<BuilderStoreLike>(getFormBuilder)

    // Should detect RTL language
    expect(builderStore.defaultLanguage.bidi).toBe('rtl')
    expect(builderStore.isRTL).toBe(true)
  })
})

import {BiDi, Language} from '@react-form-builder/core'
import {type FormBuilderI18n, FormBuilderI18nData} from '@react-form-builder/designer'
import {waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {flushPendingLinkLoads} from '../util/flushStylesheetLoadQueue'
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
    const {getFormBuilder, container, unmount} = await renderBuilder(testForm, {i18n: customI18nFrFirst})

    await flushPendingLinkLoads()

    await waitFor(() => {
      expect(container.querySelector('button.FE_Components_Tab')).toBeInTheDocument()
    })

    const builderStore = getBuilderStore<BuilderStoreLike>(getFormBuilder)

    expect(builderStore.defaultLanguage.fullCode).toBe('fr-FR')
    expect(builderStore.availableLanguages[0].fullCode).toBe('fr-FR')

    const frSelector = 'li[data-event-key="fr-FR"]'
    await waitFor(() => expect(container.querySelector(frSelector)).toBeInTheDocument())

    unmount()
  })

  it('uses first language from i18n configuration as fallback', async () => {
    const formNoLanguages = {
      'form': {
        'key': 'Screen',
        'type': 'Screen',
      },
      'localization': {}
    }

    const {getFormBuilder, unmount} = await renderBuilder(formNoLanguages, {i18n: customI18nDeFirst})

    await flushPendingLinkLoads()

    const builderStore = getBuilderStore<BuilderStoreLike>(getFormBuilder)

    expect(builderStore.defaultLanguage.fullCode).toBe('de-DE')
    expect(builderStore.availableLanguages[0].fullCode).toBe('de-DE')

    unmount()
  })

  it('maintains correct fallback behavior when switching languages', async () => {
    const {getFormBuilder, container, unmount} = await renderBuilder(testForm, {i18n: customI18nFrFirst})

    await flushPendingLinkLoads()

    const builderStore = getBuilderStore<BuilderStoreLike>(getFormBuilder)

    expect(builderStore.formBuilderLanguage.fullCode).toBe('fr-FR')

    await switchLanguage('de-DE', container)

    await waitFor(() => {
      expect(builderStore.formBuilderLanguage.fullCode).toBe('de-DE')
    })

    expect(builderStore.defaultLanguage.fullCode).toBe('fr-FR')

    unmount()
  })

  it('falls back to default language when translation is missing for current language', async () => {
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

        return data
      }
    }

    const {container, unmount} = await renderBuilder(testForm, {i18n: i18nFrenchOnly})

    await flushPendingLinkLoads()

    const testElementSelector = 'button.FE_Components_Tab'
    await waitFor(() => expect(container.querySelector(testElementSelector)).toBeInTheDocument())

    await waitFor(() => {
      expect(container.querySelector(testElementSelector)).toHaveTextContent('Composants')
    })

    await switchLanguage('it-IT', container)

    await waitFor(() => {
      expect(container.querySelector(testElementSelector)).toHaveTextContent('Composants')
    })

    unmount()
  })

  it('handles empty i18n configuration', async () => {
    const emptyI18n: FormBuilderI18n = {
      languages: [],
      getData: async () => ({data: {}, componentsLocale: {}})
    }

    const {getFormBuilder, unmount} = await renderBuilder(testForm, {i18n: emptyI18n})

    await flushPendingLinkLoads()

    const builderStore = getBuilderStore<BuilderStoreLike>(getFormBuilder)

    expect(builderStore.availableLanguages.length).toBeGreaterThan(0)
    expect(builderStore.defaultLanguage).toBeDefined()

    unmount()
  })

  it('handles i18n with a single language different from form languages', async () => {
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

    const {getFormBuilder, unmount} = await renderBuilder(formWithLocalization, {i18n: singleLangI18n})

    await flushPendingLinkLoads()

    const builderStore = getBuilderStore<BuilderStoreLike>(getFormBuilder)

    const languageCodes = builderStore.availableLanguages.map(lang => lang.fullCode)
    expect(languageCodes).toEqual(['it-IT'])

    const formLanguageCodes = builderStore.formAvailableLanguages.map(lang => lang.fullCode)
    expect(formLanguageCodes).toEqual(['it-IT'])

    expect(builderStore.defaultLanguage.fullCode).toBe('it-IT')
    expect(builderStore.formAvailableLanguages.length).toBeGreaterThan(0)

    unmount()
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

    const {getFormBuilder, unmount} = await renderBuilder(rtlForm, {i18n: rtlI18n})

    await flushPendingLinkLoads()

    const builderStore = getBuilderStore<BuilderStoreLike>(getFormBuilder)

    expect(builderStore.defaultLanguage.bidi).toBe('rtl')
    expect(builderStore.isRTL).toBe(true)

    unmount()
  })
})

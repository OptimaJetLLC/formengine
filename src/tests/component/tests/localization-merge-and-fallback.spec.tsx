import {BuilderView, Language} from '@react-form-builder/core'
import {FormBuilder, type FormBuilderI18n, FormBuilderI18nData} from '@react-form-builder/designer'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {frFR, trTR} from 'rsuite/locales'
import {expect} from 'vitest'
import {default as builtinFR} from '../../../packages/designer/public/locales/fr-FR.json'
import {switchLanguage} from './designerUtils'

const testForm = {
  'version': '1',
  'form': {
    'key': 'Screen',
    'type': 'Screen',
    'props': {}
  },
  'localization': {},
  'languages': [
    {
      'code': 'en',
      'dialect': 'US',
      'name': 'English',
      'description': 'American English',
      'bidi': 'ltr'
    }
  ],
  'defaultLanguage': 'en-US'
}

const customLangs = [
  new Language('fr', 'FR', 'French', 'Français'),
  new Language('tr', 'TR', 'Turkish', 'Türkçe'),
]

const i18nFallback: FormBuilderI18n = {
  languages: customLangs.concat([
    new Language('em', 'EM', 'Empty', 'Empty')
  ]),
  getData: async (languageFullCode) => {
    if (languageFullCode === 'tr-TR') {
      return {
        data: {leftMenu: {menu: 'Menü'}},
        componentsLocale: trTR
      }
    }

    if (languageFullCode === 'fr-FR') {
      return {
        data: {leftMenu: {menu: 'Menu'}},
        componentsLocale: frFR
      }
    }

    return {} as FormBuilderI18nData
  }
}

const frTargetValue = 'BBBBBBB'
const trTargetValue = 'AAAAAAA'

const i18nFrTr: FormBuilderI18n = {
  languages: customLangs,
  getData: async languageFullCode => {
    if (languageFullCode === 'tr-TR') {
      return {
        data: {leftMenu: {menu: 'Menü'}, leftPanel: {sectionName: {components: trTargetValue}}},
        componentsLocale: trTR
      }
    }

    if (languageFullCode === 'fr-FR') {
      return {
        data: {leftMenu: {menu: 'Menu'}, leftPanel: {sectionName: {components: frTargetValue}}},
        componentsLocale: frFR
      }
    }

    throw new Error(`Language '${languageFullCode}' not found`)
  }
}

const i18nFrTrNoTrKey: FormBuilderI18n = {
  languages: customLangs,
  getData: async languageFullCode => {
    if (languageFullCode === 'tr-TR') {
      return {
        componentsLocale: trTR
      } as FormBuilderI18nData
    }

    if (languageFullCode === 'fr-FR') {
      return {
        data: {leftMenu: {menu: 'Menu'}, leftPanel: {sectionName: {components: frTargetValue}}},
        componentsLocale: frFR
      }
    }

    throw new Error(`Language '${languageFullCode}' not found`)
  }
}

const i18nFrTrNoValue: FormBuilderI18n = {
  languages: customLangs,
  getData: async languageFullCode => {
    if (languageFullCode === 'tr-TR') {
      return {
        componentsLocale: trTR
      } as FormBuilderI18nData
    }

    if (languageFullCode === 'fr-FR') {
      return {
        componentsLocale: frFR
      } as FormBuilderI18nData
    }

    throw new Error(`Language '${languageFullCode}' not found`)
  }
}

const view = new BuilderView([])

const TestApp = ({i18n}: { i18n: FormBuilderI18n }) => <FormBuilder
  view={view}
  getForm={() => JSON.stringify(testForm)}
  i18n={i18n}
/>

const testElementSelector = 'button.FE_Components_Tab'

const builtinElementFrContent = builtinFR.leftPanel.sectionName.components

describe('user defined i18n should be merged with built-in in to Designer, "en-US" must be a fallback', function () {
  it('partially defined custom localization should be merge with built-in with the same fullCode', async () => {
    const {container} = render(<TestApp i18n={i18nFallback}/>)
    await waitFor(() => expect(container.querySelector(testElementSelector)).toHaveTextContent(builtinElementFrContent))
  })

  it('should apply default locale on first load', async () => {
    const {container} = render(<TestApp i18n={i18nFrTr}/>)
    await waitFor(() => expect(container.querySelector(testElementSelector)).toHaveTextContent(frTargetValue))
  })

  it('should apply change locale', async () => {
    const {container} = render(<TestApp i18n={i18nFrTr}/>)

    const selector = 'li[data-event-key="tr-TR"]'
    await waitFor(() => expect(container.querySelector(selector)).toBeInTheDocument())
    const trItem = container.querySelector(selector)
    if (!trItem) throw new Error('Language "tr-TR" not found')
    fireEvent.click(trItem)

    await waitFor(() => expect(container.querySelector(testElementSelector)).toHaveTextContent(trTargetValue))
  })

  it('should apply en-US fallback if key is missing in custom locale', async () => {
    const {container} = render(<TestApp i18n={i18nFrTrNoTrKey}/>)

    const frSelector = 'li[data-event-key="fr-FR"]'
    await waitFor(() => expect(container.querySelector(frSelector)).toBeInTheDocument())
    const frItem = container.querySelector(frSelector)
    if (!frItem) throw new Error('Language "fr-FR" not found')
    fireEvent.click(frItem)

    await waitFor(() => expect(container.querySelector(testElementSelector)).toHaveTextContent(frTargetValue))

    const trSelector = 'li[data-event-key="tr-TR"]'
    const trItem = container.querySelector(trSelector)
    if (!trItem) throw new Error('Language "tr-TR" not found')
    fireEvent.click(trItem)

    await waitFor(() => expect(container.querySelector(testElementSelector)).toHaveTextContent('Components'))
  })

  it('should apply change default locale if key not exists in custom', async () => {
    const {container} = render(<TestApp i18n={i18nFrTrNoValue}/>)

    // workaround. broken in tests jsdom + react 18-19, works in browser.
    await switchLanguage('fr-FR', container)

    await waitFor(() => expect(container.querySelector(testElementSelector)).toHaveTextContent(builtinElementFrContent))
  })
})

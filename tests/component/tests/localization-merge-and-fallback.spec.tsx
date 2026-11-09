import {view as muiView} from '@react-form-builder/components-material-ui'
import {BuilderView, Language} from '@react-form-builder/core'
import {FormBuilder, type FormBuilderI18n, FormBuilderI18nData} from '@react-form-builder/designer'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {frFR, trTR} from 'rsuite/locales'
import {expect} from 'vitest'
import {default as builtinFR} from '../../../packages/designer/public/locales/fr-FR.json'
import {renderViewerForm} from '../util/renderViewerForm'
import {switchLanguageAndWaitForText} from './designerUtils'
import localizationWithoutLanguageFrom from './forms/localization-without-language.json'

const testForm = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
  },
  localization: {},
  languages: [
    {
      code: 'en',
      dialect: 'US',
      name: 'English',
      description: 'American English',
      bidi: 'ltr',
    },
  ],
  defaultLanguage: 'en-US',
}

const customLangs = [new Language('fr', 'FR', 'French', 'Français'), new Language('tr', 'TR', 'Turkish', 'Türkçe')]

type I18nLanguageData = {
  data?: FormBuilderI18nData['data']
  componentsLocale?: FormBuilderI18nData['componentsLocale']
}

const createDesignerI18n = (params: {
  languages: Language[]
  dataByLanguage: Partial<Record<string, I18nLanguageData>>
  throwOnMissing?: boolean
}): FormBuilderI18n => {
  return {
    languages: params.languages,
    getData: async languageFullCode => {
      const languageData = params.dataByLanguage[languageFullCode]
      if (!languageData) {
        if (params.throwOnMissing) {
          throw new Error(`Language '${languageFullCode}' not found`)
        }
        return {} as FormBuilderI18nData
      }
      return languageData as FormBuilderI18nData
    },
  }
}

const frTargetValue = 'BBBBBBB'
const trTargetValue = 'AAAAAAA'

const i18nFallback = createDesignerI18n({
  languages: customLangs.concat([new Language('em', 'EM', 'Empty', 'Empty')]),
  dataByLanguage: {
    'tr-TR': {
      data: {leftMenu: {menu: 'Menü'}},
      componentsLocale: trTR,
    },
    'fr-FR': {
      data: {leftMenu: {menu: 'Menu'}},
      componentsLocale: frFR,
    },
  },
})

const i18nFrTr = createDesignerI18n({
  languages: customLangs,
  throwOnMissing: true,
  dataByLanguage: {
    'tr-TR': {
      data: {leftMenu: {menu: 'Menü'}, leftPanel: {sectionName: {components: trTargetValue}}},
      componentsLocale: trTR,
    },
    'fr-FR': {
      data: {leftMenu: {menu: 'Menu'}, leftPanel: {sectionName: {components: frTargetValue}}},
      componentsLocale: frFR,
    },
  },
})

const i18nFrTrNoTrKey = createDesignerI18n({
  languages: customLangs,
  throwOnMissing: true,
  dataByLanguage: {
    'tr-TR': {
      componentsLocale: trTR,
    },
    'fr-FR': {
      data: {leftMenu: {menu: 'Menu'}, leftPanel: {sectionName: {components: frTargetValue}}},
      componentsLocale: frFR,
    },
  },
})

const i18nFrTrNoValue = createDesignerI18n({
  languages: customLangs,
  throwOnMissing: true,
  dataByLanguage: {
    'tr-TR': {
      componentsLocale: trTR,
    },
    'fr-FR': {
      componentsLocale: frFR,
    },
  },
})

const view = new BuilderView([])

const TestApp = ({i18n}: {i18n: FormBuilderI18n}) => <FormBuilder view={view} getForm={() => JSON.stringify(testForm)} i18n={i18n} />

const testElementSelector = 'button.FE_Components_Tab'

const builtinElementFrContent = builtinFR.leftPanel.sectionName.components

describe('designer i18n merge and fallback behavior', function () {
  it('merges partial custom localization with built-in data for the same fullCode', async () => {
    const {container} = render(<TestApp i18n={i18nFallback} />)
    await waitFor(() => expect(container.querySelector(testElementSelector)).toHaveTextContent(builtinElementFrContent))
  })

  it('applies default locale on first load', async () => {
    const {container} = render(<TestApp i18n={i18nFrTr} />)
    await waitFor(() => expect(container.querySelector(testElementSelector)).toHaveTextContent(frTargetValue))
  })

  it('applies locale changes', async () => {
    const {container} = render(<TestApp i18n={i18nFrTr} />)

    const selector = 'li[data-event-key="tr-TR"]'
    await waitFor(() => expect(container.querySelector(selector)).toBeInTheDocument())
    const trItem = container.querySelector(selector)
    if (!trItem) throw new Error('Language "tr-TR" not found')
    fireEvent.click(trItem)

    await waitFor(() => expect(container.querySelector(testElementSelector)).toHaveTextContent(trTargetValue))
  })

  it('applies en-US fallback when a key is missing in custom locale', async () => {
    const {container} = render(<TestApp i18n={i18nFrTrNoTrKey} />)

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

  it('uses built-in locale when custom locale has no translation data', async () => {
    const {container} = render(<TestApp i18n={i18nFrTrNoValue} />)

    await switchLanguageAndWaitForText('fr-FR', container, testElementSelector, builtinElementFrContent)
  })

  it('uses fallback localization even when language metadata is missing in JSON', async () => {
    const {findByTestId} = renderViewerForm(muiView, localizationWithoutLanguageFrom, {language: 'fr-CA'})

    const emailElement = await findByTestId('email')
    const targetLocale = localizationWithoutLanguageFrom.localization['fr-FR']
    const fallbackLocale = localizationWithoutLanguageFrom.localization['en-US']
    expect(emailElement.querySelector('legend span')).toHaveTextContent(targetLocale.email.component.label)
    expect(emailElement.querySelector('p')).toHaveTextContent(fallbackLocale.email.component.helperText)
  })
})

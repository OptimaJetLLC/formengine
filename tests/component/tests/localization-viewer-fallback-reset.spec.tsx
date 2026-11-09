import {ltrCssLoader, models, RsLocalizationWrapper, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {BiDi, createView, FormViewer} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import {expect} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'
import {renderForm} from '../util/renderRsuiteForm'
import {switchFormLanguage, switchToViewerMode} from './designerUtils'
import defaultLocalizationForm from './forms/default-localization-form.json'
import {createButtonLocalizationForm} from './localizationTestUtils'

const getDefaultLanguageWithoutValuesForm = () =>
  JSON.stringify(
    createButtonLocalizationForm({
      testId: 'locButtonDefaultLang',
      defaultLanguage: 'fr-FR',
      languages: [
        {code: 'fr', dialect: 'FR', name: 'French', description: 'Français', bidi: 'ltr'},
        {code: 'tr', dialect: 'TR', name: 'Turkish', description: 'Türkçe', bidi: 'ltr'},
      ],
      localization: {
        'tr-TR': {
          rsButton1: {
            component: {
              children: 'TRRRRRR',
            },
          },
        },
      },
    })
  )

const getFormWithFormSwitchLocalization = (name?: string) => {
  const firstForm = createButtonLocalizationForm({
    testId: 'locButtonSwitch',
    defaultLanguage: 'en-US',
    languages: [{code: 'en', dialect: 'US', name: 'English', description: 'American English', bidi: 'ltr'}],
    localization: {
      'en-US': {
        rsButton1: {
          component: {
            children: 'FIRST_FORM_VALUE',
          },
        },
      },
    },
  })

  const secondForm = createButtonLocalizationForm({
    testId: 'locButtonSwitch',
    defaultLanguage: 'en-US',
    languages: [{code: 'en', dialect: 'US', name: 'English', description: 'American English', bidi: 'ltr'}],
    localization: {},
  })

  return name === 'second-form' ? JSON.stringify(secondForm) : JSON.stringify(firstForm)
}

const viewerView = createView(models)
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)

const ViewerForFormSwitch = ({formName}: {formName: string}) => {
  return <FormViewer view={viewerView} getForm={getFormWithFormSwitchLocalization} formName={formName} language={'en-US'} />
}

describe('viewer localization fallback and reset behavior', function () {
  it('applies fallback default value in FormViewer', async () => {
    const {findByTestId} = renderForm(defaultLocalizationForm, {language: 'de-DE'})

    const locButton = await findByTestId('locButton')
    expect(locButton).toHaveTextContent('button')
  })

  it('applies fallback default value in FormBuilder', async () => {
    const {findByTestId, findByText} = await renderBuilder(defaultLocalizationForm)

    await switchToViewerMode(findByText)

    const locButton = await findByTestId('locButton')
    expect(locButton).toHaveTextContent('button')

    await switchFormLanguage('de-DE', findByTestId)
    expect(locButton).toHaveTextContent('button')
  })

  it('falls back to component default when default language localization has no value', async () => {
    const app = render(<FormViewer view={viewerView} getForm={getDefaultLanguageWithoutValuesForm} language={'fr-FR'} />)
    const locButton = await app.findByTestId('locButtonDefaultLang')
    expect(locButton).toHaveTextContent('Button')
  })

  it('falls back to component default for unknown language when localization has no value', async () => {
    const app = render(<FormViewer view={viewerView} getForm={getDefaultLanguageWithoutValuesForm} language={'ba-BA'} />)
    const locButton = await app.findByTestId('locButtonDefaultLang')
    expect(locButton).toHaveTextContent('Button')
  })

  it('clears localization values when switching forms', async () => {
    const app = render(<ViewerForFormSwitch formName={'first-form'} />)

    let locButton = await app.findByTestId('locButtonSwitch')
    expect(locButton).toHaveTextContent('FIRST_FORM_VALUE')

    app.rerender(<ViewerForFormSwitch formName={'second-form'} />)

    locButton = await app.findByTestId('locButtonSwitch')
    expect(locButton).toHaveTextContent('Button')
  })
})

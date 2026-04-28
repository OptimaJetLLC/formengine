import {ltrCssLoader, RsLocalizationWrapper, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {BiDi, createView, FormViewer, LanguageFullCode} from '@react-form-builder/core'
import {allComponentsViewer} from '@react-form-builder/tests-common/lib/all-components'
import {render, RenderResult} from '@testing-library/react'
import {expect} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'
import {renderForm} from '../util/renderForm'
import {switchFormLanguage, switchToViewerMode} from './designerUtils'
import defaultLocalizationForm from './forms/default-localization-form.json'
import {default as formJson} from './forms/localization-viewer.json'

const enUS = 'en-US'
const deDE = 'de-DE'

const initialData = {
  someData: 'foobar'
}

const contentEN = formJson.localization[enUS].rsStaticContent1.component.content
const contentDE = formJson.localization[deDE].rsStaticContent1.component.content

const expectedEN = contentEN.replaceAll('{$someData}', initialData.someData)
const expectedDE = contentDE.replaceAll('{$someData}', initialData.someData)

const getForm = () => JSON.stringify(formJson)
const getDefaultLanguageWithoutValuesForm = () => JSON.stringify({
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'rsButton1',
        type: 'RsButton',
        props: {
          children: {
            computeType: 'localization',
          },
        },
        htmlAttributes: [
          {
            name: 'data-testid',
            value: 'locButtonDefaultLang',
          },
        ],
      },
    ],
  },
  localization: {
    'tr-TR': {
      rsButton1: {
        component: {
          children: 'TRRRRRR',
        },
      },
    },
  },
  languages: [
    {
      code: 'fr',
      dialect: 'FR',
      name: 'French',
      description: 'Français',
      bidi: 'ltr',
    },
    {
      code: 'tr',
      dialect: 'TR',
      name: 'Turkish',
      description: 'Türkçe',
      bidi: 'ltr',
    },
  ],
  defaultLanguage: 'fr-FR',
})

const getFormWithFormSwitchLocalization = (name?: string) => {
  const firstForm = {
    version: '1',
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {},
      children: [
        {
          key: 'rsButton1',
          type: 'RsButton',
          props: {
            children: {
              computeType: 'localization',
            },
          },
          htmlAttributes: [
            {
              name: 'data-testid',
              value: 'locButtonSwitch',
            },
          ],
        },
      ],
    },
    localization: {
      'en-US': {
        rsButton1: {
          component: {
            children: 'FIRST_FORM_VALUE',
          },
        },
      },
    },
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

  const secondForm = {
    version: '1',
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {},
      children: [
        {
          key: 'rsButton1',
          type: 'RsButton',
          props: {
            children: {
              computeType: 'localization',
            },
          },
          htmlAttributes: [
            {
              name: 'data-testid',
              value: 'locButtonSwitch',
            },
          ],
        },
      ],
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

  return name === 'second-form'
    ? JSON.stringify(secondForm)
    : JSON.stringify(firstForm)
}

const viewerReady = async ({findByTestId}: RenderResult) => {
  return expect(await findByTestId('mainScreen')).toBeInTheDocument()
}

const viewerView = createView(allComponentsViewer)
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)

const Viewer = ({language}: { language?: LanguageFullCode }) => {
  return <FormViewer view={viewerView} getForm={getForm} language={language} initialData={initialData}/>
}

const ViewerForFormSwitch = ({formName}: { formName: string }) => {
  return <FormViewer view={viewerView} getForm={getFormWithFormSwitchLocalization} formName={formName} language={'en-US'}/>
}

describe('Viewer localization test', function () {
  it('should apply provided language', async () => {
    const app = render(<Viewer language={enUS}/>)

    await viewerReady(app)

    const content = await app.findByTestId('staticContent')

    expect(content).toHaveTextContent(expectedEN)
  })

  it('should apply change language on the fly', async () => {
    const app = render(<Viewer language={enUS}/>)

    await viewerReady(app)

    let content = await app.findByTestId('staticContent')
    expect(content).toHaveTextContent(expectedEN)

    app.rerender(<Viewer language={deDE}/>)

    content = await app.findByTestId('staticContent')

    expect(content).toHaveTextContent(expectedDE)
  })

  it('should apply the default value in FormViewer', async () => {
    const {findByTestId} = renderForm(defaultLocalizationForm, {language: 'de-DE'})

    const locButton = await findByTestId('locButton')
    expect(locButton).toHaveTextContent('button')
  })

  it('should apply the default value in FormBuilder', async () => {
    const {findByTestId, findByText} = await renderBuilder(defaultLocalizationForm)

    await switchToViewerMode(findByText)

    const locButton = await findByTestId('locButton')
    expect(locButton).toHaveTextContent('button')

    await switchFormLanguage('de-DE', findByTestId)
    expect(locButton).toHaveTextContent('button')
  })

  it('should show [NOT LOCALIZED] when default language localization has no value', async () => {
    const app = render(<FormViewer view={viewerView} getForm={getDefaultLanguageWithoutValuesForm} language={'fr-FR'}/>)
    const locButton = await app.findByTestId('locButtonDefaultLang')
    expect(locButton).toHaveTextContent('[NOT LOCALIZED]')
  })

  it('should show [NOT LOCALIZED] for unknown language when localization has no value', async () => {
    const app = render(<FormViewer view={viewerView} getForm={getDefaultLanguageWithoutValuesForm} language={'ba-BA'}/>)
    const locButton = await app.findByTestId('locButtonDefaultLang')
    expect(locButton).toHaveTextContent('[NOT LOCALIZED]')
  })

  it('should clear localization values when switching forms', async () => {
    const app = render(<ViewerForFormSwitch formName={'first-form'}/>)

    let locButton = await app.findByTestId('locButtonSwitch')
    expect(locButton).toHaveTextContent('FIRST_FORM_VALUE')

    app.rerender(<ViewerForFormSwitch formName={'second-form'}/>)

    locButton = await app.findByTestId('locButtonSwitch')
    expect(locButton).toHaveTextContent('[NOT LOCALIZED]')
  })
})

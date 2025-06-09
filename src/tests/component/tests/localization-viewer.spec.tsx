import {formEngineRsuiteCssLoader, ltrCssLoader, RsLocalizationWrapper, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {BiDi, createView, FormViewer, LanguageFullCode} from '@react-form-builder/core'
import {allComponentsViewer} from '@react-form-builder/tests-common/lib/all-components'
import {render, RenderResult} from '@testing-library/react'
import {expect} from 'vitest'
import {default as formJson} from './forms/localization-viewer.json'

const enUS = 'en-US'
const deDE = 'de-DE'

const contentEN = formJson.localization[enUS].rsStaticContent1.component.content
const contentDE = formJson.localization[deDE].rsStaticContent1.component.content

const getForm = () => JSON.stringify(formJson)

const viewerReady = async ({findByTestId}: RenderResult) => {
  return expect(await findByTestId('mainScreen')).toBeInTheDocument()
}

const viewerView = createView(allComponentsViewer)
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)

const Viewer = ({license, language}: { license: string, language?: LanguageFullCode }) => {
  return <FormViewer view={viewerView} getForm={getForm} licenseKey={license} language={language}/>
}
Viewer.displayName = 'Viewer'

describe('Viewer localization test', function () {
  it('should apply provided language', async () => {
    const app = render(<Viewer license={''} language={enUS}/>)

    await viewerReady(app)

    const content = await app.findByTestId('staticContent')
    expect(content).toHaveTextContent(contentEN)
  })

  it('should apply change language on the fly', async () => {
    const app = render(<Viewer license={''} language={enUS}/>)

    await viewerReady(app)

    let content = await app.findByTestId('staticContent')
    expect(content).toHaveTextContent(contentEN)

    app.rerender(<Viewer license={''} language={deDE}/>)

    content = await app.findByTestId('staticContent')
    expect(content).toHaveTextContent(contentDE)
  })
})

import {ltrCssLoader, RsLocalizationWrapper, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {BiDi, createView, FormViewer, LanguageFullCode} from '@react-form-builder/core'
import {allComponentsViewer} from '@react-form-builder/tests-common/lib/all-components'
import {RenderResult, render} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {default as formJson} from './forms/localization-viewer.json'

const enUS = 'en-US'
const deDE = 'de-DE'

const initialData = {
  someData: 'foobar',
}

const contentEN = formJson.localization[enUS].rsStaticContent1.component.content
const contentDE = formJson.localization[deDE].rsStaticContent1.component.content

const expectedEN = contentEN.replaceAll('{$someData}', initialData.someData)
const expectedDE = contentDE.replaceAll('{$someData}', initialData.someData)

const getForm = () => JSON.stringify(formJson)

const viewerReady = async ({findByTestId}: RenderResult) => {
  return expect(await findByTestId('mainScreen')).toBeInTheDocument()
}

const viewerView = createView(allComponentsViewer)
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)

const Viewer = ({language}: {language?: LanguageFullCode}) => {
  return <FormViewer view={viewerView} getForm={getForm} language={language} initialData={initialData} />
}

describe('viewer localization language behavior', function () {
  it('applies provided language', async () => {
    const app = render(<Viewer language={enUS} />)

    await viewerReady(app)

    const content = await app.findByTestId('staticContent')

    expect(content).toHaveTextContent(expectedEN)
  })

  it('applies language changes on the fly', async () => {
    const app = render(<Viewer language={enUS} />)

    await viewerReady(app)

    let content = await app.findByTestId('staticContent')
    expect(content).toHaveTextContent(expectedEN)

    app.rerender(<Viewer language={deDE} />)

    content = await app.findByTestId('staticContent')

    expect(content).toHaveTextContent(expectedDE)
  })
})

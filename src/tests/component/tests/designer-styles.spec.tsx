import {renderBuilder} from '../util/renderBuilder'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    htmlAttributes: [
      {
        name: 'data-testid',
        value: 'test-screen'
      }
    ]
  }
}

describe('Designer styles tests', () => {
  it('The designer\'s styles should be unloaded when unmounted', async () => {
    const {container, findByTestId, unmount} = await renderBuilder(form, {language: 'en-US'})

    expect(await findByTestId('test-screen')).toBeInTheDocument()

    const rootNode = container.getRootNode()
    if (!(rootNode instanceof Document)) {
      throw new Error('Cannot find root element')
    }

    expect(rootNode.getElementById('designer-ltr-css')).not.toBeNull()

    unmount()

    expect(rootNode.getElementById('designer-ltr-css')).toBeNull()
  })
})

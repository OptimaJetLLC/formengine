import {waitFor} from '@testing-library/react'
import {renderBuilder} from '../util/renderBuilder'
import {asyncAct} from './asyncAct'

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

    await waitFor(() => {
      expect(rootNode.getElementById('designer-ltr-css')).not.toBeNull()
    })

    await asyncAct(async () => {
      unmount()
    })

    await waitFor(() => {
      expect(rootNode.getElementById('designer-ltr-css')).toBeNull()
    })
  })
})

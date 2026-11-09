import {expect} from 'vitest'
import {renderForm} from '../util/renderRsuiteForm'
import form from './forms/style-attribute-form.json'

describe('Style property test', () => {
  it('Should apply style attributes', async () => {
    const {findByTestId} = renderForm(form)

    const label = await findByTestId('test-label')

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('style', 'font-size: 20pt; margin: 15pt;')

    const wrapper = label.parentElement?.parentElement
    if (!wrapper) {
      throw new Error(`Unable to wrapper element`)
    }
    expect(wrapper).toHaveAttribute('style', 'background-color: azure;')
  })
})

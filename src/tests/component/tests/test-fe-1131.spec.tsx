import {renderForm} from '../util/renderForm'
import form from './forms/fe-1131-form.json'

describe('FE-1131 Invalid prop `className` supplied to `React.Fragment`.', () => {
  it('RsCard should renders without errors', async () => {
    const {findByTestId} = renderForm(form)
    expect(await findByTestId('rsCard')).toBeInTheDocument()
  })
})

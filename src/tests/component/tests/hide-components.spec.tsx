import {BuilderView} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent, render} from '@testing-library/react'

const view = new BuilderView([...allComponentsBuilder])
  .withPaletteFilter(({category, model}) => {
    return !(category === 'structure' || model.type === 'RsAutoComplete')
  })

describe('Hide components test', () => {
  it('Should not display hidden components', async () => {
    const {findByTestId, queryByTestId} = render(<FormBuilder view={view}/>)

    const componentsTabButton = await findByTestId('Components_Tab')
    fireEvent.click(componentsTabButton)

    expect(await findByTestId('fields-palette-category')).toBeInTheDocument()

    expect(queryByTestId('structure-palette-category')).not.toBeInTheDocument()
    expect(queryByTestId('RsAutoComplete-palette-component')).not.toBeInTheDocument()
    expect(queryByTestId('RsErrorMessage-palette-component')).not.toBeInTheDocument()
    expect(queryByTestId('InternalError-palette-component')).not.toBeInTheDocument()
    expect(queryByTestId('Screen-palette-component')).not.toBeInTheDocument()
    expect(queryByTestId('DefaultErrorMessage-palette-component')).not.toBeInTheDocument()
  })
})

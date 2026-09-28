import {BuilderComponent} from '@react-form-builder/core'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent, render} from '@testing-library/react'
import {ChangeEvent, useCallback, useMemo, useState} from 'react'

const App = () => {
  const [filter, setFilter] = useState('RsButton')

  const paletteFilter = useCallback(
    ({model}: BuilderComponent) => {
      return model.type === filter
    },
    [filter]
  )

  const view = useMemo(() => {
    return new BuilderView(allComponentsBuilder).withPaletteFilter(paletteFilter)
  }, [paletteFilter])

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }, [])

  return (
    <div>
      <input value={filter} onChange={onInputChange} data-testid="test-filter-input" />
      <FormBuilder view={view} />
    </div>
  )
}

describe('BuilderView.paletteFilter test', () => {
  it('paletteFilter should be applied reactively', async () => {
    const {findByTestId, queryByTestId} = render(<App />)

    const componentsTabButton = await findByTestId('Components_Tab')
    fireEvent.click(componentsTabButton)

    expect(await findByTestId('RsButton-palette-component')).toBeInTheDocument()
    expect(queryByTestId('RsAutoComplete-palette-component')).not.toBeInTheDocument()

    const testFilterInput = await findByTestId('test-filter-input')
    fireEvent.change(testFilterInput, {target: {value: 'RsAutoComplete'}})

    expect(await findByTestId('RsAutoComplete-palette-component')).toBeInTheDocument()
    expect(queryByTestId('RsButton-palette-component')).not.toBeInTheDocument()
  })
})

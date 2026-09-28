import {array, createView, define, FormViewer, fn, string} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import {ComponentProps, useEffect} from 'react'
import fnPropsForm from './forms/fn-props-form.json'

interface TestComponentProps extends ComponentProps<any> {
  data?: string[]
  filter?: (value: string, index: number, array: string[]) => boolean
  value?: string
}

const TestComponent = ({data, filter, value, onChange, ...props}: TestComponentProps) => {
  const items = data ?? []
  const filteredValue = filter ? items.filter(filter).join(',') : items.join(',')

  useEffect(() => {
    if (filteredValue !== value) {
      onChange(filteredValue)
    }
  }, [filteredValue, onChange, props, value])

  return <input {...props} value={value} onChange={onChange} readOnly={true} />
}

const fnDescriptionBegin = `/**
* @param {string} value
* @param {number} index
* @param {string[]} array
* @return {boolean}
*/
return function filter(value, index, array) {`
const fnDescriptionEnd = '\n}'

const testComponent = define(TestComponent, 'TestComponent')
  .category('test')
  .props({
    data: array.default(['One', 'Two', 'Three']),
    filter: fn(fnDescriptionBegin, fnDescriptionEnd),
    value: string.valued.uncontrolledValue(''),
  })

describe('Functional properties test', () => {
  it('Should execute the functional property', async () => {
    const getForm = () => JSON.stringify(fnPropsForm)
    const view = createView([testComponent.build().model])

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} />)

    expect(await findByTestId('testComponent1')).toHaveValue('Two')
    expect(await findByTestId('testComponent2')).toHaveValue('One')
    expect(await findByTestId('testComponent3')).toHaveValue('Two')
  })
})

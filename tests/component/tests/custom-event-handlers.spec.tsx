import {ActionEventArgs, createView, define, string} from '@react-form-builder/core'
import {fireEvent} from '@testing-library/react'
import {useCallback} from 'react'
import {renderViewerForm} from '../util/renderViewerForm'
import form from './forms/custom-event-handlers-form.json'

const createHtmlInputComponent = () => {
  return function Render({onChange, ...props}: any) {
    const handleChange = useCallback(
      (e: any) => {
        onChange?.(e.target.value)
      },
      [onChange]
    )
    return <input {...props} onChange={handleChange} />
  }
}

const inputWithDefaultEventHandlers = define(createHtmlInputComponent(), 'InputWithDefaultEventHandlers')
  .props({
    value: string.valued.uncontrolledValue(''),
  })
  .build()

const inputWithoutDefaultEventHandlers = define(createHtmlInputComponent(), 'InputWithoutDefaultEventHandlers')
  .props({
    value: string.valued.uncontrolledValue(''),
  })
  .overrideEventHandlers({})
  .build()

const InputWithCustomEventHandlers = (props: any) => <input {...props} />

const inputWithCustomEventHandlers = define(InputWithCustomEventHandlers, 'InputWithCustomEventHandlers')
  .props({
    value: string.valued.uncontrolledValue(''),
  })
  .overrideEventHandlers({
    onChange: (e: ActionEventArgs) => {
      const value = '000' + e.args[0].target.value
      e.sender.field?.setValue(value)
    },
    onBlur: (e: ActionEventArgs) => {
      e.sender.field?.setTouched()
    },
  })
  .build()

const view = createView([inputWithDefaultEventHandlers.model, inputWithoutDefaultEventHandlers.model, inputWithCustomEventHandlers.model])

describe('Custom event handlers test', () => {
  it('A component without event handlers should remain unchanged.', async () => {
    const initialData = {
      inputWithDefaultEventHandlers: '1',
      inputWithoutEventHandlers: '2',
      inputWithCustomEventHandlers: '3',
    }
    const {findByTestId, formData} = renderViewerForm(view, form, {initialData})

    const inputWithDefaultEventHandlers = await findByTestId('inputWithDefaultEventHandlers')
    expect(inputWithDefaultEventHandlers).toHaveValue('1')

    const inputWithoutEventHandlers = await findByTestId('inputWithoutEventHandlers')
    expect(inputWithoutEventHandlers).toHaveValue('2')

    const inputWithCustomEventHandlers = await findByTestId('inputWithCustomEventHandlers')
    expect(inputWithCustomEventHandlers).toHaveValue('3')

    expect(formData.data).toStrictEqual(initialData)

    fireEvent.change(inputWithDefaultEventHandlers, {target: {value: '123'}})
    fireEvent.change(inputWithoutEventHandlers, {target: {value: '456'}})
    fireEvent.change(inputWithCustomEventHandlers, {target: {value: '789'}})

    expect(formData.data).toStrictEqual({
      inputWithDefaultEventHandlers: '123',
      inputWithoutEventHandlers: '2',
      inputWithCustomEventHandlers: '000789',
    })
  })
})

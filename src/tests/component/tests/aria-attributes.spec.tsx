import {renderForm} from '../util/renderForm'
import {asyncAct} from './asyncAct'
import form from './forms/aria-attributes.json'

// RsToggle and RsCheckbox is excluded because it has this functionality implemented by RSuite with different structure.
const componentTypes = [
  'RsUploader',
  'RsTimePicker',
  'RsTextArea',
  'RsTagPicker',
  'RsSignature',
  'RsSearch',
  'RichTextEditor',
  'RsRadioGroup',
  'RsPatternFormat',
  'RsNumberFormat',
  'RsInput',
  'GoogleMap',
  'RsDropdown',
  'RsDatePicker',
  'RsCalendar'
]

describe('All valued components', () => {
  it('should have correct aria-labeledby attribute', async () => {
    const {container, findByText} = renderForm(form)
    for (const key of componentTypes) {
      const label = await findByText(key)
      const fieldId = label.getAttribute('for')
      const field = container.querySelector(`*[id=${fieldId}]`)

      try {
        expect(field).toBeInTheDocument()
        expect(field?.getAttribute('aria-labelledby')).toEqual(label.getAttribute('id'))
      } catch (e) {
        console.error(`Failed for: ${key}`)
        throw e
      }
    }
  })

  it('should have correct aria-errormessage attribute', async () => {
    const {container, findByText, formData} = renderForm(form)
    await asyncAct(async () => await formData.validate())
    for (const key of componentTypes) {
      const label = await findByText(key)
      const fieldId = label.getAttribute('for')
      const field = container.querySelector(`*[id=${fieldId}]`)
      const errorId = field?.getAttribute('aria-errormessage')

      try {
        expect(container.querySelector(`*[id=${errorId}]`)).toBeInTheDocument()
      } catch (e) {
        console.error(`Failed for: ${key}`)
        throw e
      }
    }
  })
})

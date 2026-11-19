import {waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderForm} from '../util/renderForm'

function getForm(componentType: string): object {
  const formSource = `
  {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "props": {},
      "children": [
        {
          "key": "mainInput",
          "type": "${componentType}",
          "props": {
             "label": {
                "value": ""
             }
          }          
        }
      ]
    }
  }
  `
  return JSON.parse(formSource)
}

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
  'RsCalendar',
]

describe('ARIA attributes for components without labels', () => {
  it.each(componentTypes)('%s should not have aria-label attribute when label is empty', async (componentType: string) => {
    const {container} = renderForm(getForm(componentType))
    const targetElement = await waitFor(() => container.querySelector(`[id^=${componentType}]`))
    expect(container.querySelector(`label[id^="${componentType}"]`)).toBeNull()
    expect(targetElement).not.toBeNull()
    expect(targetElement!.getAttribute('aria-label')).toBeNull()
    expect(targetElement!.getAttribute('aria-errormessage')).not.toBeNull()
  })
})

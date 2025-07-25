import {waitFor} from '@testing-library/react'
import axe from 'axe-core'
import {renderForm} from '../util/renderForm'

function getForm(componentType: string, disabled: boolean, readOnly: boolean, additionalProps?: string): object {
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
            "disabled" : ${disabled},
            "readOnly" : ${readOnly},
             "label": {
                "value": "${componentType}"
              }
              ${additionalProps ? `, ${additionalProps}` : ''}
          }
        }
      ]
    }
  }
  `
  return JSON.parse(formSource)
}

const componentTypes = [
  'RsUploader',
  'RsTimePicker',
  'RsTextArea',
  'RsTagPicker',
  'RsSignature',
  'RsSearch',
  'RsRadioGroup',
  'RsPatternFormat',
  'RsNumberFormat',
  'RsInput',
  'GoogleMap',
  'RsDropdown',
  'RsDatePicker',
  'RsCalendar'
]

function getTestCases(): [string, object, string][] {
  const testCases: [string, object, string][] = []
  componentTypes.forEach(componentType => {
    testCases.push([`${componentType}`, getForm(componentType, false, false), componentType])
    testCases.push([`${componentType} disabled`, getForm(componentType, true, false), componentType])
    testCases.push([`${componentType} readonly`, getForm(componentType, false, true), componentType])
    testCases.push([`${componentType} disabled readonly`, getForm(componentType, true, true), componentType])
  })

  const passwordMaskProps = '"passwordMask": { "value": true }'
  const passwordMaskName = 'PasswordMask(RsInput)'
  testCases.push([`${passwordMaskName}`, getForm('RsInput', false, false, passwordMaskProps), 'RsInput'])
  testCases.push([`${passwordMaskName} disabled`, getForm('RsInput', true, false, passwordMaskProps), 'RsInput'])
  testCases.push([`${passwordMaskName} readonly`, getForm('RsInput', false, true, passwordMaskProps), 'RsInput'])
  testCases.push([`${passwordMaskName} disabled readonly`, getForm('RsInput', true, true, passwordMaskProps), 'RsInput'])
  return testCases
}

describe('WCAG compliance for valued auto labeled components', () => {
  it.each(getTestCases())(
    '%s should be WCAG compliant when using auto labels',
    async (name: string, form: object, componentType: string) => {
      const {container} = renderForm(form)
      await waitFor(() => container.querySelector(`[id^=${componentType}]`))
      const aceResult = await axe.run()
      const wcagViolations = aceResult.violations.filter(violation =>
        violation.tags.some(tag => tag.toLowerCase().includes('wcag'))
        && violation.id !== 'document-title'
        && violation.id !== 'html-has-lang'
      )
      if (wcagViolations.length > 0) {
        console.error(wcagViolations)
        throw new Error(`${name} is not WCAG compliant. Violations: \n${wcagViolations.map(v => v.description).join('\n')}`)
      }
    }
  )
})

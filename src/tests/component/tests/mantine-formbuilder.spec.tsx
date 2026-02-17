import {builderView} from '@react-form-builder/components-mantine'
import {IFormViewer} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {generateMantineFormJson} from '@react-form-builder/tests-common/lib/mantine-form'
import {render, waitFor} from '@testing-library/react'
import {ForwardedRef} from 'react'
import {togglePreview} from '../util/controls'
import {asyncAct} from './asyncAct'

const parsedForm = generateMantineFormJson()
const allComponentsForm = JSON.stringify(parsedForm)
const getForm = () => allComponentsForm

const findComponentKey = (type: string) => {
  const stack = [...(parsedForm.form?.children ?? [])]
  while (stack.length > 0) {
    const current = stack.pop()
    if (!current) continue
    if (current.type === type) return current.key
    if (current.children) {
      stack.push(...current.children)
    }
  }
  return undefined
}

const buildKeyToTypeMap = () => {
  const map = new Map<string, string>()
  const stack = [...(parsedForm.form?.children ?? [])]
  while (stack.length > 0) {
    const current = stack.pop()
    if (!current) continue
    map.set(current.key, current.type)
    if (current.children) {
      stack.push(...current.children)
    }
  }
  return map
}

const buildNextValue = (type: string, dataKey: string) => {
  const today = new Date('2024-01-15T00:00:00.000Z')
  const tomorrow = new Date('2024-01-16T00:00:00.000Z')
  const later = new Date('2024-01-20T00:00:00.000Z')

  const arrayString = ['Option 1', 'Option 2']
  const arrayDate = [today, tomorrow]
  const arrayNumber = [10, 90]
  const arrayStringDate = ['2024-01-01', '2024-02-01']
  const fileValue = [new File(['content'], `${dataKey}.txt`, {type: 'text/plain'})]

  switch (type) {
    case 'MtCheckbox':
    case 'MtRadio':
    case 'MtSwitch':
    case 'MtChip':
      return true
    case 'MtCheckboxGroup':
    case 'MtChipCheckboxGroup':
    case 'MtMultiSelect':
    case 'MtSwitchGroup':
    case 'MtTagsInput':
      return arrayString
    case 'MtChipRadioGroup':
    case 'MtRadioGroup':
    case 'MtSegmentedControl':
    case 'MtSelect':
    case 'MtNativeSelect':
    case 'MtAutocomplete':
      return 'Option 1'
    case 'MtTextInput':
    case 'MtTextarea':
    case 'MtJsonInput':
      return `updated-${dataKey}`
    case 'MtPasswordInput':
      return 'updated-password'
    case 'MtNumberInput':
      return 42
    case 'MtSlider':
      return 75
    case 'MtRangeSlider':
      return arrayNumber
    case 'MtRating':
      return 4
    case 'MtColorInput':
    case 'MtColorPicker':
      return '#ff0000'
    case 'MtDatePicker':
    case 'MtDatePickerInput':
      return today
    case 'MtDateRangePicker':
    case 'MtDateRangePickerInput':
    case 'MtDateMultiplePicker':
    case 'MtDateMultiplePickerInput':
      return arrayDate
    case 'MtMonthPicker':
    case 'MtMonthPickerInput':
    case 'MtYearPicker':
    case 'MtYearPickerInput':
      return '2024-01-01'
    case 'MtMonthRangePicker':
    case 'MtMonthRangePickerInput':
    case 'MtMonthMultiplePicker':
    case 'MtMonthMultiplePickerInput':
    case 'MtYearRangePicker':
    case 'MtYearRangePickerInput':
    case 'MtYearMultiplePicker':
    case 'MtYearMultiplePickerInput':
      return arrayStringDate
    case 'MtTimeInput':
    case 'MtTimePicker':
    case 'MtTimeGrid':
      return '09:30'
    case 'MtDateTimePicker':
      return '2024-01-15T10:30:00.000Z'
    case 'MtDropzone':
    case 'MtFileInput':
      return fileValue
    default:
      return `updated-${dataKey}-${later.toISOString()}`
  }
}

describe('should display all Mantine components and reflect data changes', () => {
    it('should update data for all component fields in preview mode', async () => {
      const viewerRef:ForwardedRef<IFormViewer> = {current: null}
      const renderResult = render(
        <FormBuilder
          view={builderView}
          getForm={getForm}
          viewerRef={viewerRef}
          licenseKey={generatedLicenseKey}
        />
      )

      await togglePreview(renderResult)

      const formData = viewerRef.current?.formData as any
      if (!formData) {
        throw new Error('FormData is not defined')
      }

      await waitFor(() => expect(formData.allComponentFields.length).toBeGreaterThan(0))

      const keyToTypeMap = buildKeyToTypeMap()
      const previousValues = new Map<string, unknown>()
      await asyncAct(async () => {
        formData.allComponentFields.forEach(({dataKey, field}: {dataKey: string, field: {setValue: (value: unknown) => void}}) => {
          const type = keyToTypeMap.get(dataKey)
          if (!type) return
          previousValues.set(dataKey, formData.data[dataKey])
          const nextValue = buildNextValue(type, dataKey)
          field.setValue(nextValue)
        })
      })

      await waitFor(() => {
        const data = formData.data
        previousValues.forEach((value, key) => {
          expect(data[key]).not.toEqual(value)
        })
      })
    })

    it('should update values after initialData changes in preview mode', async () => {
      const textInputKey = findComponentKey('MtTextInput')
      const numberInputKey = findComponentKey('MtNumberInput')
      const checkboxKey = findComponentKey('MtCheckbox')
      const selectKey = findComponentKey('MtSelect')
      const multiSelectKey = findComponentKey('MtMultiSelect')
      const sliderKey = findComponentKey('MtSlider')
      const rangeSliderKey = findComponentKey('MtRangeSlider')
      const ratingKey = findComponentKey('MtRating')
      const switchKey = findComponentKey('MtSwitch')

      const initialData: Record<string, unknown> = {}
      if (textInputKey) initialData[textInputKey] = 'Initial text'
      if (numberInputKey) initialData[numberInputKey] = 5
      if (checkboxKey) initialData[checkboxKey] = true
      if (selectKey) initialData[selectKey] = 'Option 1'
      if (multiSelectKey) initialData[multiSelectKey] = ['Option 1']
      if (sliderKey) initialData[sliderKey] = 25
      if (rangeSliderKey) initialData[rangeSliderKey] = [10, 90]
      if (ratingKey) initialData[ratingKey] = 4
      if (switchKey) initialData[switchKey] = true

      const viewerRef: ForwardedRef<IFormViewer> = {current: null}
      const renderResult = render(
        <FormBuilder
          view={builderView}
          getForm={getForm}
          viewerRef={viewerRef}
          initialData={initialData}
          licenseKey={generatedLicenseKey}
        />
      )

      await togglePreview(renderResult)

      const formData = viewerRef.current?.formData as any
      if (!formData) {
        throw new Error('FormData is not defined')
      }

      await waitFor(() => {
        Object.entries(initialData).forEach(([key, value]) => {
          expect(formData.data[key]).toEqual(value)
        })
      })

      const updatedInitialData: Record<string, unknown> = {}
      if (textInputKey) updatedInitialData[textInputKey] = 'Updated text'
      if (numberInputKey) updatedInitialData[numberInputKey] = 42
      if (checkboxKey) updatedInitialData[checkboxKey] = false
      if (selectKey) updatedInitialData[selectKey] = 'Option 2'
      if (multiSelectKey) updatedInitialData[multiSelectKey] = ['Option 2', 'Option 3']
      if (sliderKey) updatedInitialData[sliderKey] = 75
      if (rangeSliderKey) updatedInitialData[rangeSliderKey] = [20, 80]
      if (ratingKey) updatedInitialData[ratingKey] = 5
      if (switchKey) updatedInitialData[switchKey] = false

      await asyncAct(async () => {
        renderResult.rerender(
          <FormBuilder
            view={builderView}
            getForm={getForm}
            viewerRef={viewerRef}
            initialData={updatedInitialData}
            licenseKey={generatedLicenseKey}
          />
        )
      })

      await waitFor(() => {
        Object.entries(updatedInitialData).forEach(([key, value]) => {
          expect(formData.data[key]).toEqual(value)
        })
      })
    })
  })

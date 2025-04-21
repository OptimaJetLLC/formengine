import {view} from '@react-form-builder/components-rsuite'
import {FormViewer, FormViewerProps} from '@react-form-builder/core'
import {act, render} from '@testing-library/react'
import computedValueMain from './forms/computed-value-main-form.json'
import computedValueParentTemplate from './forms/computed-value-parent-template.json'
import computedValueTemplate from './forms/computed-value-template.json'
import repeaterLocalizationForm from './forms/repeater-localization-form.json'

const expectedFormData = {
  rootSource: 19,
  rootDestination: 42,
  parentSource: 7,
  parentDestination: 18,
  templateSource: 3,
  templateDestination: 8,
  parentSlotSource: 13,
  parentSlotDestination: 56,
  rootSlotDestination: 127,
  rootRepeater: [
    {
      rootRepeaterInput: 31,
      computedRepeaterInput: 195,
      parentSource: 7,
      parentDestination: 18,
      templateSource: 3,
      templateDestination: 8,
      parentSlotSource: 13,
      parentSlotDestination: 56,
      rootComputedSlot: 66,
      childRepeater: [
        {
          childRepeaterInput: 125,
          parentSource: 7,
          parentDestination: 18,
          templateSource: 3,
          templateDestination: 8,
          parentSlotSource: 13,
          parentSlotDestination: 56,
          childRepeaterInputs: 98
        },
        {
          childRepeaterInput: 126,
          parentSource: 7,
          parentDestination: 18,
          templateSource: 3,
          templateDestination: 8,
          parentSlotSource: 13,
          parentSlotDestination: 56,
          childRepeaterInputs: 99
        },
        {
          childRepeaterInput: 127,
          parentSource: 7,
          parentDestination: 18,
          templateSource: 3,
          templateDestination: 8,
          parentSlotSource: 13,
          parentSlotDestination: 56,
          childRepeaterInputs: 100
        }
      ]
    },
    {
      rootRepeaterInput: 32,
      computedRepeaterInput: 196,
      parentSource: 7,
      parentDestination: 18,
      templateSource: 3,
      templateDestination: 8,
      parentSlotSource: 13,
      parentSlotDestination: 56,
      rootComputedSlot: 67,
      childRepeater: [
        {
          childRepeaterInput: 126,
          parentSource: 7,
          parentDestination: 18,
          templateSource: 3,
          templateDestination: 8,
          parentSlotSource: 13,
          parentSlotDestination: 56,
          childRepeaterInputs: 98
        },
        {
          childRepeaterInput: 127,
          parentSource: 7,
          parentDestination: 18,
          templateSource: 3,
          templateDestination: 8,
          parentSlotSource: 13,
          parentSlotDestination: 56,
          childRepeaterInputs: 99
        },
        {
          childRepeaterInput: 128,
          parentSource: 7,
          parentDestination: 18,
          templateSource: 3,
          templateDestination: 8,
          parentSlotSource: 13,
          parentSlotDestination: 56,
          childRepeaterInputs: 100
        }
      ]
    }
  ]
}

const expectedFormErrors = {
  'parentSource': 'min 100, real: ⁨7⁩',
  'parentDestination': 'min 100, real: ⁨18⁩',
  'templateSource': 'max 1, real: ⁨3⁩',
  'templateDestination': 'max 2, real: ⁨8⁩',
  'parentSlotSource': 'min 100, real: ⁨13⁩',
  'parentSlotDestination': 'min 100, real: ⁨56⁩',
  'rootRepeater': [
    {
      'parentSource': 'min 100, real: ⁨7⁩',
      'parentDestination': 'min 100, real: ⁨18⁩',
      'templateSource': 'max 1, real: ⁨3⁩',
      'templateDestination': 'max 2, real: ⁨8⁩',
      'parentSlotSource': 'min 100, real: ⁨13⁩',
      'parentSlotDestination': 'min 100, real: ⁨56⁩',
      'childRepeater': [
        {
          'parentSource': 'min 100, real: ⁨7⁩',
          'parentDestination': 'min 100, real: ⁨18⁩',
          'templateSource': 'max 1, real: ⁨3⁩',
          'templateDestination': 'max 2, real: ⁨8⁩',
          'parentSlotSource': 'min 100, real: ⁨13⁩',
          'parentSlotDestination': 'min 100, real: ⁨56⁩'
        },
        {
          'parentSource': 'min 100, real: ⁨7⁩',
          'parentDestination': 'min 100, real: ⁨18⁩',
          'templateSource': 'max 1, real: ⁨3⁩',
          'templateDestination': 'max 2, real: ⁨8⁩',
          'parentSlotSource': 'min 100, real: ⁨13⁩',
          'parentSlotDestination': 'min 100, real: ⁨56⁩'
        },
        {
          'parentSource': 'min 100, real: ⁨7⁩',
          'parentDestination': 'min 100, real: ⁨18⁩',
          'templateSource': 'max 1, real: ⁨3⁩',
          'templateDestination': 'max 2, real: ⁨8⁩',
          'parentSlotSource': 'min 100, real: ⁨13⁩',
          'parentSlotDestination': 'min 100, real: ⁨56⁩'
        }
      ]
    },
    {
      'parentSource': 'min 100, real: ⁨7⁩',
      'parentDestination': 'min 100, real: ⁨18⁩',
      'templateSource': 'max 1, real: ⁨3⁩',
      'templateDestination': 'max 2, real: ⁨8⁩',
      'parentSlotSource': 'min 100, real: ⁨13⁩',
      'parentSlotDestination': 'min 100, real: ⁨56⁩',
      'childRepeater': [
        {
          'parentSource': 'min 100, real: ⁨7⁩',
          'parentDestination': 'min 100, real: ⁨18⁩',
          'templateSource': 'max 1, real: ⁨3⁩',
          'templateDestination': 'max 2, real: ⁨8⁩',
          'parentSlotSource': 'min 100, real: ⁨13⁩',
          'parentSlotDestination': 'min 100, real: ⁨56⁩'
        },
        {
          'parentSource': 'min 100, real: ⁨7⁩',
          'parentDestination': 'min 100, real: ⁨18⁩',
          'templateSource': 'max 1, real: ⁨3⁩',
          'templateDestination': 'max 2, real: ⁨8⁩',
          'parentSlotSource': 'min 100, real: ⁨13⁩',
          'parentSlotDestination': 'min 100, real: ⁨56⁩'
        },
        {
          'parentSource': 'min 100, real: ⁨7⁩',
          'parentDestination': 'min 100, real: ⁨18⁩',
          'templateSource': 'max 1, real: ⁨3⁩',
          'templateDestination': 'max 2, real: ⁨8⁩',
          'parentSlotSource': 'min 100, real: ⁨13⁩',
          'parentSlotDestination': 'min 100, real: ⁨56⁩'
        }
      ]
    }
  ]
}

// Repeater does not fully calculate its fields during the test, the data in the real form will be different
const expectedLocalizedFormData = {
  'repeater1': [{
    'c0': 'c0',
    'repeater2': [
      {
        'b0': 'b0',
        'repeater3': [{'a0': 'a0', 'a1': 'a'}, {'a0': 'a0', 'a1': 'a'}]
      }, {
        'b0': 'b0',
        'repeater3': [{'a0': 'a0', 'a1': 'a'}, {'a0': 'a0', 'a1': 'a'}]
      }]
  }, {
    'c0': 'c0',
    'repeater2': [
      {
        'b0': 'b0',
        'repeater3': [{'a0': 'a0', 'a1': 'a'}, {'a0': 'a0', 'a1': 'a'}]
      }, {
        'b0': 'b0',
        'repeater3': [{'a0': 'a0', 'a1': 'a'}, {'a0': 'a0', 'a1': 'a'}]
      }]
  }]
}

// Repeater does not fully calculate its fields during the test, some fields are disabled!
const fixData = (obj: object) => {
  const copy = JSON.parse(JSON.stringify(obj))

  copy?.rootRepeater.forEach((item: any) => {
    delete item.rootRepeaterInput
    delete item.computedRepeaterInput
    delete item.rootComputedSlot

    item.childRepeater?.forEach((child: any) => {
      delete child.childRepeaterInput
    })
  })

  return copy
}

describe('Complex computed properties test', () => {
  it('Computed fields must be calculated at all levels of the form', async () => {
    const getForm = (name?: string) => {
      let form: unknown = computedValueMain
      if (name === 'computed-value-template') form = computedValueTemplate
      if (name === 'computed-value-parent-template') form = computedValueParentTemplate
      return JSON.stringify(form)
    }
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    const {findAllByTestId} = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef}/>)

    expect(await findAllByTestId('childRepeaterInput')).toHaveLength(6)

    if (!viewerRef.current) {
      throw new Error('viewerRef is null')
    }

    const formData = viewerRef.current.formData
    const actualData = JSON.stringify(fixData(formData.data))
    const expectedData = JSON.stringify(fixData(expectedFormData))
    expect(actualData).toEqual(expectedData)

    await act(async () => await formData.validate())
    const actualErrors = JSON.stringify(formData.errors)
    const expectedErrors = JSON.stringify(expectedFormErrors)
    expect(actualErrors).toEqual(expectedErrors)
  })

  it('Fields must be localized at all levels of the form', async () => {
    const getForm = () => {
      return JSON.stringify(repeaterLocalizationForm)
    }
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    const {findAllByTestId} = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef}/>)

    // ensure that the form is rendered
    expect(await findAllByTestId('a1')).toHaveLength(8)

    if (!viewerRef.current) {
      throw new Error('viewerRef is null')
    }

    const formData = viewerRef.current.formData
    const actualData = JSON.stringify(formData.data)
    const expectedData = JSON.stringify(expectedLocalizedFormData)
    expect(actualData).toEqual(expectedData)
  })
})

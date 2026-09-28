import {view} from '@react-form-builder/components-rsuite'
import {FormViewer, FormViewerProps} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import {expect} from 'vitest'
import {asyncAct} from '../../common/lib/asyncAct'
import dataKeyChildForm from './forms/data-key-child-form.json'
import dataKeyParentForm from './forms/data-key-parent-form.json'
import '../config/toAllRadioHaveExactValues'
import '../config/toAllCheckboxesHaveExactValues'
import '../config/toHaveExactValues'
import '../config/toAllSelectsHaveValues'

const getForm = (name?: string) => {
  if (name === 'data-key-child-form') return JSON.stringify(dataKeyChildForm)
  return JSON.stringify(dataKeyParentForm)
}

describe('DataKey test', function () {
  it('Should display correct data by initial data', async () => {
    const initialData = {
      childToggle: false,
      childInput: 'ok',
      childTagPicker: ['a', 'b'],
      subForm: {
        childToggle: true,
        childInput: 'done',
        childTagPicker: ['c'],
      },
      myRepeater: [
        {radio: 'a', input: 'tall'},
        {radio: 'b', input: 'small'},
        {radio: 'c', input: 'thin'},
      ],
      toggle: false,
    }

    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    const {findByTestId, findAllByTestId} = render(
      <FormViewer view={view} getForm={getForm} initialData={initialData} viewerRef={viewerRef} />
    )

    expect(await findByTestId('parent-rsToggle')).toBeInTheDocument()

    const formViewer = viewerRef.current
    if (!formViewer) {
      throw new Error('FormViewer is not defined')
    }

    const actualData = formViewer.formData.data
    expect(JSON.stringify(actualData)).toEqual(JSON.stringify(initialData))

    expect(await findAllByTestId('childToggle')).toAllCheckboxesHaveExactValues([false, true])
    expect(await findAllByTestId('childInput')).toHaveExactValues(['ok', 'ok', 'done', 'done'])
    await expect(await findAllByTestId('childTagPicker')).toAllSelectsHaveValues(['a,b', 'c'])

    expect(await findAllByTestId('radio')).toAllRadioHaveExactValues(['a', 'b', 'c'])
    expect(await findAllByTestId('input')).toHaveExactValues(['tall', 'small', 'thin'])

    expect(await findAllByTestId('parent-rsToggle')).toAllCheckboxesHaveExactValues([false])
  })

  it('Should display correct errors', async () => {
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    const initialData = {
      myRepeater: [{}, {}],
    }
    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} initialData={initialData} viewerRef={viewerRef} />)

    expect(await findByTestId('parent-rsToggle')).toBeInTheDocument()

    const formViewer = viewerRef.current
    if (!formViewer) {
      throw new Error('FormViewer is not defined')
    }

    const messages = await asyncAct(async () => await formViewer.formData.validate())
    const expectedErrors = {
      childInput: 'Required',
      childTagPicker: 'Required',
      subForm: {
        childInput: 'Required',
        childTagPicker: 'Required',
      },
      myRepeater: [{input: 'Required'}, {input: 'Required'}],
    }
    expect(JSON.stringify(messages)).toEqual(JSON.stringify(expectedErrors))
  })
})

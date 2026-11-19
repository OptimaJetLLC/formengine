import {models} from '@react-form-builder/components-rsuite'
import {buildForm, createView, define} from '@react-form-builder/core'
import {ReactNode} from 'react'
import {describe, expect, it} from 'vitest'
import {renderForm} from '../util/renderRsuiteForm'
import {renderViewerForm} from '../util/renderViewerForm'

const TestContainer = ({children}: {children: ReactNode}) => {
  return <div>{children}</div>
}

const testContainer = define(TestContainer, 'TestContainer').skipChildrenDuringFieldCollection().build()

describe('FE-1576 Add a universal way to exclude child fields from the form test', () => {
  it('Child fields should be excluded', () => {
    const testForm = buildForm()
      .component('testContainer', 'TestContainer')
      .children(children => children.component('input1', 'RsInput').component('input2', 'RsInput'))
      .json()

    const form = JSON.parse(testForm)
    const view = createView([...models, testContainer.model])

    const {formData} = renderViewerForm(view, form)
    expect(formData.data).toStrictEqual({})
  })

  it('Child fields should NOT be excluded', () => {
    const testForm = buildForm()
      .component('testContainer', 'RsContainer')
      .children(children => children.component('input1', 'RsInput').component('input2', 'RsInput'))
      .json()
    const form = JSON.parse(testForm)

    const {formData} = renderForm(form)
    expect(formData.data).toStrictEqual({
      input1: undefined,
      input2: undefined,
    })
  })
})

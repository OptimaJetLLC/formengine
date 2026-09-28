import {buildForm, createView, define} from '@react-form-builder/core'
import {allComponentsViewer} from '@react-form-builder/tests-common/lib/all-components'
import {ReactNode} from 'react'
import {renderForm} from '../util/renderForm'

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
    const view = createView([...allComponentsViewer, testContainer.model])

    const {formData} = renderForm(form, {view})
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

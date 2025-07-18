import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, define, stringNode} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {fireEvent, render, within} from '@testing-library/react'
import type {ReactNode} from 'react'
import withChild from './forms/string-node/with-child-form.json'
import withDropzone from './forms/string-node/with-dropzone-form.json'
import withText from './forms/string-node/with-text-form.json'
import withoutDropzone from './forms/string-node/without-dropzone-form.json'

interface MyCustomComponentProps {
  children: ReactNode
}

const MyCustomComponent = (props: MyCustomComponentProps) => {
  const {children, ...otherProps} = props
  return <div {...otherProps}>{children}</div>
}

const myCustomComponent = define(MyCustomComponent, 'MyCustomComponent')
  .name('My custom component')
  .props({
    children: stringNode,
  })

const components = [...rSuiteComponents, myCustomComponent]
  .map(d => d.build())

const view = new BuilderView(components)

describe('string-node annotation test', () => {
  it('should display dropzone', async () => {
    const getForm = () => JSON.stringify(withDropzone)
    const {findByTestId} = render(<FormBuilder view={view} getForm={getForm}/>)

    const testDivider = await findByTestId('test-component')
    expect(testDivider).toBeInTheDocument()
    expect(await within(testDivider).findByTestId('inner-dropzone')).toBeInTheDocument()
  })

  it('should not display dropzone', async () => {
    const getForm = () => JSON.stringify(withoutDropzone)
    const {findByTestId} = render(<FormBuilder view={view} getForm={getForm}/>)

    const testDivider = await findByTestId('test-component')
    expect(testDivider).toBeInTheDocument()
    expect(within(testDivider).queryByTestId('inner-dropzone')).not.toBeInTheDocument()
  })

  it('should display text', async () => {
    const getForm = () => JSON.stringify(withText)
    const {findByTestId} = render(<FormBuilder view={view} getForm={getForm}/>)

    const testDivider = await findByTestId('test-component')
    expect(testDivider).toBeInTheDocument()
    expect(within(testDivider).queryByText('Inner text')).toBeInTheDocument()
  })

  it('should display child', async () => {
    const getForm = () => JSON.stringify(withChild)
    const {findByTestId} = render(<FormBuilder view={view} getForm={getForm}/>)

    const testDivider = await findByTestId('test-component')
    expect(testDivider).toBeInTheDocument()
    expect(within(testDivider).queryByTestId('inner-dropzone')).not.toBeInTheDocument()
    expect(await within(testDivider).findByTestId('test-button')).toBeInTheDocument()
  })

  it('should switch editor type', async () => {
    const getForm = () => JSON.stringify(withoutDropzone)
    const {findByTestId} = render(<FormBuilder view={view} getForm={getForm}/>)

    const testDivider = await findByTestId('test-component')
    expect(testDivider).toBeInTheDocument()

    fireEvent.click(testDivider)

    const textValue = await findByTestId('resizable-string-input-children')
    const textArea = textValue.querySelector('textarea')
    if (!textArea) {
      throw new Error('Cannot find text area')
    }

    // typed text should be displayed in the component
    expect(textArea).toHaveValue('')
    fireEvent.change(textArea, {target: {value: 'test value'}})
    expect(within(testDivider).queryByText('test value')).toBeInTheDocument()

    // dropzone should be displayed in the component
    const checkboxChildren = await findByTestId('checkbox-children')
    const useDropzone = await within(checkboxChildren).findByTestId('checkbox-control-inner')
    fireEvent.click(useDropzone)
    expect(await within(testDivider).findByTestId('inner-dropzone')).toBeInTheDocument()

    // dropzone should not be displayed in the component
    fireEvent.click(useDropzone)
    expect(within(testDivider).queryByTestId('inner-dropzone')).not.toBeInTheDocument()
    const newTextValue = await findByTestId('resizable-string-input-children')
    const newTextArea = newTextValue.querySelector('textarea')
    expect(newTextArea).toHaveValue('')
  })
})

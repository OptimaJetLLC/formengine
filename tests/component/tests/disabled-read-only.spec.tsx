import {view as muiView} from '@react-form-builder/components-material-ui'
import {viewWithCss} from '@react-form-builder/components-rsuite'
import {FormViewer, FormViewerProps, PersistedForm} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import {expect} from 'vitest'
import {renderForm} from '../util/renderForm'
import form from './forms/disabled-read-only-form.json'
import template from './forms/disabled-read-only-template-form.json'
import '../config/toAllHaveExactAttributes'
import disabledScreen from './forms/disabled-screen.form.json'

const getPatchedForm = (path?: (form: PersistedForm, name?: string) => void) => {
  return (name?: string) => {
    const item = name === 'disabled-read-only-template' ? template : form
    const persistedForm: PersistedForm = JSON.parse(JSON.stringify(item))
    path?.(persistedForm, name)
    return JSON.stringify(persistedForm)
  }
}

const getForm = getPatchedForm()

const App = (props: Partial<FormViewerProps>) => {
  return <FormViewer view={viewWithCss} getForm={getForm} {...props} />
}

describe('Tests for read-only and disabled properties', () => {
  it("All inputs should have a read-only state if the FormViewer's readOnly property is enabled", async () => {
    const {findAllByTestId, rerender} = render(<App readOnly={true} />)

    const inputs = await findAllByTestId('test-input')
    expect(inputs).toAllHaveExactAttributes('readonly', ['', '', '', '', ''])

    rerender(<App />)

    expect(inputs).toAllHaveExactAttributes('readonly', [null, null, null, null, null])
  })

  it("All inputs should have a disabled state if the FormViewer's disabled property is enabled", async () => {
    const {findAllByTestId, rerender} = render(<App disabled={true} />)

    const inputs = await findAllByTestId('test-input')

    expect(inputs).toAllHaveExactAttributes('disabled', ['', '', '', '', ''])

    rerender(<App disabled={false} />)

    expect(inputs).toAllHaveExactAttributes('disabled', [null, null, null, null, null])
  })

  it("All inputs should have a read-only state if the Screen's readOnly property is enabled", async () => {
    const getForm = getPatchedForm(({form}, name) => {
      if (!name) form.props.readOnly = {value: true}
    })

    const {findAllByTestId} = render(<App getForm={getForm} />)

    const inputs = await findAllByTestId('test-input')
    expect(inputs).toAllHaveExactAttributes('readonly', ['', '', '', '', ''])
  })

  it("All inputs should have a disabled state if the Screen's disabled property is enabled", async () => {
    const getForm = getPatchedForm(({form}, name) => {
      if (!name) form.props.disabled = {value: true}
    })

    const {findAllByTestId} = render(<App getForm={getForm} />)

    const inputs = await findAllByTestId('test-input')
    expect(inputs).toAllHaveExactAttributes('disabled', ['', '', '', '', ''])
  })

  it("Input should have a read-only state if the container's readOnly property is enabled", async () => {
    const getForm = getPatchedForm(({form}, name) => {
      if (name) return
      form.children?.forEach(child => {
        if (child.key === 'rsContainer1') child.props.readOnly = {value: true}
      })
    })

    const {findAllByTestId} = render(<App getForm={getForm} />)

    const inputs = await findAllByTestId('test-input')
    expect(inputs[3]).toHaveAttribute('data-testkey', 'rsInput1')
    expect(inputs).toAllHaveExactAttributes('readonly', [null, null, null, '', null])
  })

  it("Input should have a disabled state if the container's disabled property is enabled", async () => {
    const getForm = getPatchedForm(({form}, name) => {
      if (name) return
      form.children?.forEach(child => {
        if (child.key === 'rsContainer1') child.props.disabled = {value: true}
      })
    })

    const {findAllByTestId} = render(<App getForm={getForm} />)

    const inputs = await findAllByTestId('test-input')
    expect(inputs[3]).toHaveAttribute('data-testkey', 'rsInput1')
    expect(inputs).toAllHaveExactAttributes('disabled', [null, null, null, '', null])
  })

  it("Template's inputs should have a read-only state if the template's readOnly property is enabled", async () => {
    const getForm = getPatchedForm(({form}, name) => {
      if (name) return
      form.children?.forEach(child => {
        if (child.key === 'templateDisabledReadOnlyTemplate1') child.props.readOnly = {value: true}
      })
    })

    const {findAllByTestId} = render(<App getForm={getForm} />)

    const inputs = await findAllByTestId('test-input')
    expect(inputs[0]).toHaveAttribute('data-testkey', 'inputInSlot')
    expect(inputs[1]).toHaveAttribute('data-testkey', 'templateInputInContainer')
    expect(inputs[2]).toHaveAttribute('data-testkey', 'templateInput')
    expect(inputs).toAllHaveExactAttributes('readonly', ['', '', '', null, null])
  })

  it("Template's inputs should have a disabled state if the template's disabled property is enabled", async () => {
    const getForm = getPatchedForm(({form}, name) => {
      if (name) return
      form.children?.forEach(child => {
        if (child.key === 'templateDisabledReadOnlyTemplate1') child.props.disabled = {value: true}
      })
    })

    const {findAllByTestId} = render(<App getForm={getForm} />)

    const inputs = await findAllByTestId('test-input')
    expect(inputs[0]).toHaveAttribute('data-testkey', 'inputInSlot')
    expect(inputs[1]).toHaveAttribute('data-testkey', 'templateInputInContainer')
    expect(inputs[2]).toHaveAttribute('data-testkey', 'templateInput')
    expect(inputs).toAllHaveExactAttributes('disabled', ['', '', '', null, null])
  })

  it('The readOnly property of the FormViewer is prioritised over the component property', async () => {
    const getForm = getPatchedForm(({form}, name) => {
      if (!name) form.props.readOnly = {value: false}
    })

    const {findAllByTestId} = render(<App getForm={getForm} readOnly={true} />)

    const inputs = await findAllByTestId('test-input')
    expect(inputs).toAllHaveExactAttributes('readonly', ['', '', '', '', ''])
  })

  it('The disabled property of the FormViewer is prioritised over the component property', async () => {
    const getForm = getPatchedForm(({form}, name) => {
      if (!name) form.props.disabled = {value: false}
    })

    const {findAllByTestId} = render(<App getForm={getForm} disabled={true} />)

    const inputs = await findAllByTestId('test-input')
    expect(inputs).toAllHaveExactAttributes('disabled', ['', '', '', '', ''])
  })

  it('The readOnly property of the parent component is prioritised over the component property', async () => {
    const getForm = getPatchedForm(({form}, name) => {
      if (name) return
      form.children?.forEach(child => {
        if (child.key === 'rsContainer1') {
          child.props.readOnly = {value: true}
          child.children?.forEach(item => {
            if (item.key === 'rsInput1') item.props.readOnly = {value: false}
          })
        }
      })
    })

    const {findAllByTestId} = render(<App getForm={getForm} />)

    const inputs = await findAllByTestId('test-input')
    expect(inputs[3]).toHaveAttribute('data-testkey', 'rsInput1')
    expect(inputs).toAllHaveExactAttributes('readonly', [null, null, null, '', null])
  })

  it('The disabled property of the parent component is prioritised over the component property', async () => {
    const getForm = getPatchedForm(({form}, name) => {
      if (name) return
      form.children?.forEach(child => {
        if (child.key === 'rsContainer1') {
          child.props.disabled = {value: true}
          child.children?.forEach(item => {
            if (item.key === 'rsInput1') item.props.disabled = {value: false}
          })
        }
      })
    })

    const {findAllByTestId} = render(<App getForm={getForm} />)

    const inputs = await findAllByTestId('test-input')
    expect(inputs[3]).toHaveAttribute('data-testkey', 'rsInput1')
    expect(inputs).toAllHaveExactAttributes('disabled', [null, null, null, '', null])
  })

  it('Disabled and read-only should work across the entire component hierarchy', async () => {
    const {findByTestId} = renderForm(disabledScreen, {view: muiView})

    const button = await findByTestId('muiButton1')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('disabled')
  })
})

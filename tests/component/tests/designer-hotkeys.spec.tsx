import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder, type IFormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {act, fireEvent, render, waitFor} from '@testing-library/react'
import {createRef} from 'react'
import {afterEach, describe, expect, it, vi} from 'vitest'
import form from './forms/designer-form.json'

const getFormFn = () => JSON.stringify(form)

const firePrintHotkey = () => {
  const isMac = navigator.userAgent.includes('Mac')
  fireEvent.keyDown(document, {
    key: 'p',
    ctrlKey: !isMac,
    metaKey: isMac,
  })
}

describe('Designer hotkeys', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not intercept Ctrl/Cmd+P when hotkeys are disabled', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined)
    const {findByText} = render(
      <FormBuilder licenseKey={generatedLicenseKey} getForm={getFormFn} view={builderViewWithCss} hotkeys={false} />
    )

    expect(await findByText('Preview')).toBeInTheDocument()
    firePrintHotkey()

    await waitFor(() => expect(print).not.toHaveBeenCalled())
  })

  it('uses a remapped print binding and ignores the default chord', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined)
    const {findByText} = render(
      <FormBuilder
        licenseKey={generatedLicenseKey}
        getForm={getFormFn}
        view={builderViewWithCss}
        hotkeys={{bindings: {print: {key: 'p', alt: true}}}}
      />
    )

    expect(await findByText('Preview')).toBeInTheDocument()

    firePrintHotkey()
    await waitFor(() => expect(print).not.toHaveBeenCalled())

    fireEvent.keyDown(document, {key: 'p', altKey: true})
    await waitFor(() => expect(print).toHaveBeenCalledOnce())
  })

  it('disables a single action binding while keeping others', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined)
    const {findByText} = render(
      <FormBuilder licenseKey={generatedLicenseKey} getForm={getFormFn} view={builderViewWithCss} hotkeys={{bindings: {print: false}}} />
    )

    expect(await findByText('Preview')).toBeInTheDocument()
    firePrintHotkey()

    await waitFor(() => expect(print).not.toHaveBeenCalled())
  })

  it('invokes print through IFormBuilder when hotkeys are disabled', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined)
    const builderRef = createRef<IFormBuilder>()
    const {findByText} = render(
      <FormBuilder licenseKey={generatedLicenseKey} getForm={getFormFn} view={builderViewWithCss} hotkeys={false} builderRef={builderRef} />
    )

    expect(await findByText('Preview')).toBeInTheDocument()
    await waitFor(() => expect(builderRef.current).not.toBeNull())

    act(() => {
      builderRef.current?.print()
    })

    await waitFor(() => expect(print).toHaveBeenCalledOnce())
    expect(await findByText('Edit')).toBeInTheDocument()
  })
})

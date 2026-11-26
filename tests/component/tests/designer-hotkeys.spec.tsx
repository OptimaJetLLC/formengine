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

  it('stops intercepting Ctrl/Cmd+P after rerendering with hotkeys={false}', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined)
    const {findByText, rerender} = render(<FormBuilder licenseKey={generatedLicenseKey} getForm={getFormFn} view={builderViewWithCss} />)

    expect(await findByText('Preview')).toBeInTheDocument()

    firePrintHotkey()
    await waitFor(() => expect(print).toHaveBeenCalledOnce())
    print.mockClear()
    fireEvent(window, new Event('afterprint'))
    expect(await findByText('Preview')).toBeInTheDocument()

    rerender(<FormBuilder licenseKey={generatedLicenseKey} getForm={getFormFn} view={builderViewWithCss} hotkeys={false} />)

    firePrintHotkey()
    await waitFor(() => expect(print).not.toHaveBeenCalled())
  })

  it('activates a remapped print chord after enabling hotkeys on a mounted designer', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined)
    const {findByText, rerender} = render(
      <FormBuilder licenseKey={generatedLicenseKey} getForm={getFormFn} view={builderViewWithCss} hotkeys={false} />
    )

    expect(await findByText('Preview')).toBeInTheDocument()

    fireEvent.keyDown(document, {key: 'F8'})
    await waitFor(() => expect(print).not.toHaveBeenCalled())

    rerender(
      <FormBuilder
        licenseKey={generatedLicenseKey}
        getForm={getFormFn}
        view={builderViewWithCss}
        hotkeys={{bindings: {print: {key: 'F8'}}}}
      />
    )

    fireEvent.keyDown(document, {key: 'F8'})
    await waitFor(() => expect(print).toHaveBeenCalledOnce())
  })

  it('prints on Delete when print is remapped onto that chord', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined)
    const {findByText} = render(
      <FormBuilder
        licenseKey={generatedLicenseKey}
        getForm={getFormFn}
        view={builderViewWithCss}
        hotkeys={{bindings: {print: {key: 'Delete'}}}}
      />
    )

    expect(await findByText('Preview')).toBeInTheDocument()
    fireEvent.keyDown(document, {key: 'Delete'})

    await waitFor(() => expect(print).toHaveBeenCalledOnce())
    expect(await findByText('Edit')).toBeInTheDocument()
  })
})

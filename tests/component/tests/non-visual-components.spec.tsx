import {
  type ComponentData,
  createView,
  define,
  FormViewer,
  type FormViewerProps,
  getNonVisualChildren,
  getVisualChildren,
  isNonVisual,
  string,
  warnMisplacedNonVisualComponents,
} from '@react-form-builder/core'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {fireEvent, render, waitFor} from '@testing-library/react'
import type {ReactNode} from 'react'
import {afterEach, describe, expect, it, vi} from 'vitest'

const visualField = define(() => <div data-testid="visual-field" />, 'VisualField')
  .name('Visual field')
  .props({label: string})
  .build()

const testContainer = define(({children}: {children?: ReactNode}) => <div data-testid="test-container">{children}</div>, 'TestContainer')
  .name('Test container')
  .build()

const sideEffect = define(() => <div data-testid="side-effect" />, 'SideEffect')
  .name('Side effect')
  .nonVisual()
  .build()

const viewerView = createView([visualField.model, testContainer.model, sideEffect.model])
const designerView = new BuilderView([visualField, sideEffect])

const emptyForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [],
  },
}

const formWithSideEffect = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {key: 'visualField', type: 'VisualField', props: {label: {value: 'Name'}}},
      {key: 'sideEffect', type: 'SideEffect'},
    ],
  },
}

const formWithNestedSideEffect = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'box',
        type: 'TestContainer',
        children: [{key: 'sideEffect', type: 'SideEffect'}],
      },
    ],
  },
}

const DesignerApp = ({form}: {form: object}) => (
  <FormBuilder licenseKey={generatedLicenseKey} getForm={() => JSON.stringify(form)} view={designerView} />
)

describe('getVisualChildren and getNonVisualChildren', () => {
  it('splits root children by the non-visual feature', async () => {
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    render(<FormViewer view={viewerView} getForm={() => JSON.stringify(formWithSideEffect)} viewerRef={viewerRef} />)

    await waitFor(() => expect(viewerRef.current?.formData).toBeTruthy())
    const root = viewerRef.current!.formData as ComponentData

    expect(getVisualChildren(root).map(child => child.key)).toEqual(['visualField'])
    expect(getNonVisualChildren(root).map(child => child.key)).toEqual(['sideEffect'])
    expect(isNonVisual(root.findByKey('sideEffect')!)).toBe(true)
    expect(isNonVisual(root.findByKey('visualField')!)).toBe(false)
  })

  it('returns empty lists when the root has no children', async () => {
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    render(<FormViewer view={viewerView} getForm={() => JSON.stringify(emptyForm)} viewerRef={viewerRef} />)

    await waitFor(() => expect(viewerRef.current?.formData).toBeTruthy())
    const root = viewerRef.current!.formData as ComponentData

    expect(getVisualChildren(root)).toEqual([])
    expect(getNonVisualChildren(root)).toEqual([])
  })
})

describe('warnMisplacedNonVisualComponents', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not warn when non-visual components are under the form root', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    render(<FormViewer view={viewerView} getForm={() => JSON.stringify(formWithSideEffect)} viewerRef={viewerRef} />)

    await waitFor(() => expect(viewerRef.current?.formData).toBeTruthy())
    expect(warn).not.toHaveBeenCalled()
  })

  it('warns when a non-visual component is nested under a non-root parent', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    render(<FormViewer view={viewerView} getForm={() => JSON.stringify(formWithNestedSideEffect)} viewerRef={viewerRef} />)

    await waitFor(() => expect(viewerRef.current?.formData).toBeTruthy())
    expect(warn).toHaveBeenCalledWith('Non-visual component "sideEffect" (SideEffect) must be a direct child of the root.')

    const root = viewerRef.current!.formData as ComponentData
    warn.mockClear()
    warnMisplacedNonVisualComponents(root)
    expect(warn).toHaveBeenCalledOnce()
  })
})

describe('Non-visual properties and bar', () => {
  it('hides Additional properties for any non-visual component', async () => {
    const {findByTestId, findByText, queryByText} = render(<DesignerApp form={formWithSideEffect} />)

    fireEvent.click(await findByTestId('visualField-editable-wrapper'))
    expect(await findByText('Additional properties')).toBeInTheDocument()

    fireEvent.click(await findByTestId('SideEffect-non-visual-chip'))
    expect(await findByText('Key')).toBeInTheDocument()
    expect(queryByText('Additional properties')).not.toBeInTheDocument()
  })

  it('hides the non-visual bar when the form has no non-visual children', async () => {
    const {findByText, queryByTestId} = render(<DesignerApp form={emptyForm} />)

    expect(await findByText('Preview')).toBeInTheDocument()
    expect(queryByTestId('non-visual-bar')).not.toBeInTheDocument()
  })

  it('shows the non-visual bar only in Edit mode', async () => {
    const {findByTestId, findByText, queryByTestId} = render(<DesignerApp form={formWithSideEffect} />)

    expect(await findByTestId('non-visual-bar')).toBeInTheDocument()

    fireEvent.click(await findByText('Preview'))
    expect(await findByText('Edit')).toBeInTheDocument()
    expect(queryByTestId('non-visual-bar')).not.toBeInTheDocument()

    fireEvent.click(await findByText('Edit'))
    expect(await findByText('Preview')).toBeInTheDocument()
    expect(await findByTestId('non-visual-bar')).toBeInTheDocument()
  })

  it('marks the chip selected when chosen from the bar or the Tree list', async () => {
    const {findByTestId} = render(<DesignerApp form={formWithSideEffect} />)

    const chip = await findByTestId('SideEffect-non-visual-chip')
    expect(chip).not.toHaveAttribute('data-selected')

    fireEvent.click(chip)
    expect(chip).toHaveAttribute('data-selected', 'true')

    fireEvent.click(await findByTestId('visualField-editable-wrapper'))
    expect(chip).not.toHaveAttribute('data-selected')

    fireEvent.click(await findByTestId('Tree_Tab'))
    fireEvent.click(await findByTestId('sideEffect'))
    expect(await findByTestId('SideEffect-non-visual-chip')).toHaveAttribute('data-selected', 'true')
  })
})

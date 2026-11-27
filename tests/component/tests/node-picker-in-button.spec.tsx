import {builderView as mantineBuilderView} from '@react-form-builder/components-mantine'
import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, define, node, string} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {act, fireEvent, render, within} from '@testing-library/react'
import type {ReactNode} from 'react'
import {describe, expect, it} from 'vitest'
import '@mantine/core/styles.css'
import {clickAddButton} from '../util/clickAddButton'
import checkboxInButtonForm from './forms/node-in-button/checkbox-in-button-form.json'
import emptySectionForm from './forms/node-in-button/empty-section-form.json'
import mtButtonSectionForm from './forms/node-in-button/mt-button-section-form.json'

interface ButtonHostProps {
  children?: ReactNode
  leftSection?: ReactNode
}

const ButtonHost = ({children, leftSection, ...otherProps}: ButtonHostProps) => {
  return (
    <button type="button" {...otherProps}>
      {leftSection}
      {children}
    </button>
  )
}

const buttonHost = define(ButtonHost, 'ButtonHost')
  .category('test')
  .name('Button host')
  .props({
    children: string.default('Host'),
    leftSection: node,
  })

const components = [...rSuiteComponents, buttonHost].map(d => d.build())
const view = new BuilderView(components)

const overlayOf = (wrapper: HTMLElement): HTMLElement => {
  const overlay = wrapper.querySelector(':scope > [data-fe-drag-overlay]')
  if (!(overlay instanceof HTMLElement)) throw new Error('Expected a drag overlay')
  return overlay
}

describe('node picker inside button host', () => {
  it('renders a non-button add control so the host stays valid HTML', async () => {
    const getForm = () => JSON.stringify(emptySectionForm)
    const {findByTestId, findByRole} = render(<FormBuilder view={view} getForm={getForm} />)

    const host = await findByTestId('button-host')
    expect(host.tagName).toBe('BUTTON')

    const dropzone = await within(host).findByTestId('inner-dropzone')
    const addControl = await within(dropzone).findByTestId('add-button')

    // Host is still a real <button>; add control must not nest another button inside it.
    expect(addControl.tagName).not.toBe('BUTTON')
    expect(host.querySelector('button')).toBeNull()

    clickAddButton(addControl)
    expect(await findByRole('dialog')).toBeInTheDocument()
  })

  it('MtButton section dropzones open the picker on mousedown', async () => {
    const getForm = () => JSON.stringify(mtButtonSectionForm)
    const {findByTestId, findByRole, findAllByTestId} = render(<FormBuilder view={mantineBuilderView} getForm={getForm} />)

    const host = await findByTestId('mt-button')
    // Builder mode uses a div host so nested drop chrome is not trapped inside <button>.
    expect(host.tagName).toBe('DIV')

    const dropzones = await findAllByTestId('inner-dropzone')
    expect(dropzones.length).toBeGreaterThanOrEqual(2)

    const leftAdd = await within(dropzones[0]).findByTestId('add-button')
    expect(leftAdd.tagName).not.toBe('BUTTON')

    // Nested under HTML5 drag sources: open on mousedown before a drag can cancel click.
    await act(async () => {
      fireEvent.mouseDown(leftAdd, {button: 0})
    })
    expect(await findByRole('dialog')).toBeInTheDocument()
  })

  it('opens the empty-canvas add control via click-only activation', async () => {
    const getForm = () => JSON.stringify({form: {key: 'Screen', type: 'Screen', children: []}})
    const {findByTestId, findByRole} = render(<FormBuilder view={view} getForm={getForm} />)

    const addControl = await findByTestId('add-button')
    // Programmatic .click() / fireEvent.click must open without a prior mousedown.
    fireEvent.click(addControl)
    expect(await findByRole('dialog')).toBeInTheDocument()
  })

  it('selects MtCheckbox nested in MtButton leftSection on mousedown', async () => {
    const getForm = () => JSON.stringify(checkboxInButtonForm)
    const {findByTestId, unmount} = render(<FormBuilder view={mantineBuilderView} getForm={getForm} />)

    const button = await findByTestId('mtButton1-editable-wrapper')
    const checkbox = await findByTestId('mtCheckbox1-editable-wrapper')

    await act(async () => {
      fireEvent.mouseDown(overlayOf(button), {button: 0})
      fireEvent.mouseUp(window)
      fireEvent.click(overlayOf(button))
    })
    expect(button.className).toMatch(/selected/)

    // Nested slot children: selection is deferred until mouseup so dragstart is not raced.
    await act(async () => {
      fireEvent.mouseDown(overlayOf(checkbox), {button: 0})
      fireEvent.mouseUp(window)
      fireEvent.click(overlayOf(button))
    })
    expect(checkbox.className).toMatch(/selected/)
    expect(button.className).not.toMatch(/selected/)
    unmount()
  })

  it('disarms every other drag source when a nested slot child receives mousedown', async () => {
    const getForm = () => JSON.stringify(checkboxInButtonForm)
    const {findByTestId, unmount} = render(<FormBuilder view={mantineBuilderView} getForm={getForm} />)

    const button = await findByTestId('mtButton1-editable-wrapper')
    const checkbox = await findByTestId('mtCheckbox1-editable-wrapper')
    expect(button.getAttribute('draggable')).toBe('true')
    expect(checkbox.getAttribute('draggable')).toBe('true')

    await act(async () => {
      fireEvent.mouseDown(overlayOf(checkbox), {button: 0})
    })

    // Only the pressed wrapper stays draggable; others (incl. parent) cannot steal HTML5 drag.
    expect(button.getAttribute('draggable')).toBe('false')
    expect(checkbox.getAttribute('draggable')).toBe('true')

    await act(async () => {
      button.setAttribute('draggable', 'true')
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
    })
    expect(button.getAttribute('draggable')).toBe('false')
    expect(checkbox.getAttribute('draggable')).toBe('true')

    await act(async () => {
      fireEvent.mouseUp(window)
    })
    expect(checkbox.className).toMatch(/selected/)
    unmount()
  })

  it('keeps toolbar chrome from stealing gestures on a selected nested slot child', async () => {
    const getForm = () => JSON.stringify(checkboxInButtonForm)
    const {findByTestId, unmount} = render(<FormBuilder view={mantineBuilderView} getForm={getForm} />)

    const button = await findByTestId('mtButton1-editable-wrapper')
    const checkbox = await findByTestId('mtCheckbox1-editable-wrapper')

    await act(async () => {
      fireEvent.mouseDown(overlayOf(checkbox), {button: 0})
      fireEvent.mouseUp(window)
    })
    expect(checkbox.className).toMatch(/selected/)

    // Selected nested nodes are tiny; toolbar host must pass events through to the child overlay.
    const toolbarEl = document.querySelector<HTMLElement>('[data-fe-toolbar]')
    expect(toolbarEl).toBeTruthy()
    expect(toolbarEl!.style.pointerEvents).toBe('none')

    await act(async () => {
      fireEvent.mouseDown(overlayOf(checkbox), {button: 0})
    })
    expect(button.getAttribute('draggable')).toBe('false')
    expect(checkbox.getAttribute('draggable')).toBe('true')

    await act(async () => {
      fireEvent.mouseUp(window)
    })
    expect(checkbox.className).toMatch(/selected/)
    unmount()
  })
})

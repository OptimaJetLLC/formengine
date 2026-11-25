import {builderView as mantineBuilderView} from '@react-form-builder/components-mantine'
import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, define, node, string} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {fireEvent, render, within} from '@testing-library/react'
import type {ReactNode} from 'react'
import {describe, expect, it} from 'vitest'
import '@mantine/core/styles.css'
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

    fireEvent.pointerDown(addControl, {button: 0})
    expect(await findByRole('dialog')).toBeInTheDocument()
  })

  it('MtButton section dropzones open the picker on pointerdown', async () => {
    const getForm = () => JSON.stringify(mtButtonSectionForm)
    const {findByTestId, findByRole, findAllByTestId} = render(<FormBuilder view={mantineBuilderView} getForm={getForm} />)

    const host = await findByTestId('mt-button')
    // Builder mode uses a div host so nested drop chrome is not trapped inside <button>.
    expect(host.tagName).toBe('DIV')

    const dropzones = await findAllByTestId('inner-dropzone')
    expect(dropzones.length).toBeGreaterThanOrEqual(2)

    const leftAdd = await within(dropzones[0]).findByTestId('add-button')
    expect(leftAdd.tagName).not.toBe('BUTTON')

    // Parent editable wrappers are HTML5 drag sources; open on pointerdown before a drag can cancel click.
    fireEvent.pointerDown(leftAdd, {button: 0})
    expect(await findByRole('dialog')).toBeInTheDocument()
  })
})

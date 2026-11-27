import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {fireEvent, render, within} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'
import designerForm from './forms/designer-form.json'
import emptyForm from './forms/empty-form.json'
import loginForm from './forms/login-form.json'

type MonacoEditorProps = {
  className?: string
  defaultValue?: string
  options?: Record<string, unknown>
}

let lastMonacoOptions: Record<string, unknown> | undefined

/**
 * Surface Monaco's initial buffer so the Edit JSON modal content is assertable without async workers.
 */
vi.mock('../../../packages/designer/src/features/components/CodeEditor/MonacoCodeEditor', () => ({
  MonacoCodeEditor: ({className, defaultValue, options}: MonacoEditorProps) => {
    lastMonacoOptions = options
    return (
      <pre className={['monaco-editor', className].filter(Boolean).join(' ')} data-testid="edit-json-monaco">
        {defaultValue}
      </pre>
    )
  },
}))

const formExamples = [
  {name: 'login-form', form: loginForm, readyTestId: 'login'},
  {name: 'designer-form', form: designerForm, readyTestId: 'mainScreen'},
  {name: 'empty-form', form: emptyForm, readyTestId: 'mainScreen'},
] as const

describe('Edit JSON formatting', () => {
  it.each(formExamples)('shows pretty-printed $name JSON when Edit JSON is opened', async ({form, readyTestId}) => {
    lastMonacoOptions = undefined
    const {findByRole, findByTestId} = render(
      <FormBuilder licenseKey={generatedLicenseKey} getForm={() => JSON.stringify(form)} view={builderViewWithCss} />
    )

    expect(await findByTestId(readyTestId)).toBeInTheDocument()

    fireEvent.click(await findByRole('button', {name: 'Edit JSON'}))

    const dialog = await findByRole('dialog')
    expect(within(dialog).getByText('Edit JSON')).toBeInTheDocument()

    const editor = await within(dialog).findByTestId('edit-json-monaco')
    const editorText = editor.textContent ?? ''

    expect(editorText).toContain('\n')
    expect(editorText).toBe(JSON.stringify(JSON.parse(editorText), null, 2))
    expect(lastMonacoOptions).toMatchObject({
      formatOnPaste: true,
      formatOnType: true,
    })
    expect(lastMonacoOptions).not.toHaveProperty('autoIndent')
  })
})

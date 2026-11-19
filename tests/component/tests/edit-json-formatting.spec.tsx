import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {fireEvent, render, within} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'

/**
 * Surface Monaco's initial buffer so the Edit JSON modal content is assertable without async workers.
 */
vi.mock('../../../packages/designer/src/features/components/CodeEditor/MonacoCodeEditor', () => ({
  MonacoCodeEditor: ({className, defaultValue}: {className?: string; defaultValue?: string}) => (
    <pre className={['monaco-editor', className].filter(Boolean).join(' ')} data-testid="edit-json-monaco">
      {defaultValue}
    </pre>
  ),
}))

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    htmlAttributes: [{name: 'data-testid', value: 'mainScreen'}],
    children: [
      {
        key: 'title',
        type: 'RsInput',
        props: {value: {value: 'Hello'}},
      },
    ],
  },
}

describe('Edit JSON formatting', () => {
  it('shows pretty-printed form JSON when Edit JSON is opened', async () => {
    const {findByRole, findByTestId} = render(
      <FormBuilder licenseKey={generatedLicenseKey} getForm={() => JSON.stringify(form)} view={builderViewWithCss} />
    )

    expect(await findByTestId('mainScreen')).toBeInTheDocument()

    fireEvent.click(await findByRole('button', {name: 'Edit JSON'}))

    const dialog = await findByRole('dialog')
    expect(within(dialog).getByText('Edit JSON')).toBeInTheDocument()

    const editor = await within(dialog).findByTestId('edit-json-monaco')
    const editorText = editor.textContent ?? ''

    expect(editorText).toContain('\n')
    expect(editorText).toBe(JSON.stringify(JSON.parse(editorText), null, 2))
  })
})

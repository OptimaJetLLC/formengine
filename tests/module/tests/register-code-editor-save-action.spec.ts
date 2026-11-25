import {
  buildConstrainedDocument,
  extractEditableBody,
} from '@react-form-builder/designer/src/features/components/CodeEditor/constrainedDocument'
import {registerCodeEditorSaveAction} from '@react-form-builder/designer/src/features/components/CodeEditor/registerCodeEditorSaveAction'
import {describe, expect, it, vi} from 'vitest'
import {createFakeEditor, createFakeModel, createFakeMonaco} from './helpers/monacoFakes'

describe('registerCodeEditorSaveAction', () => {
  it('invokes onSave with the resolved value on Ctrl/Cmd+S', () => {
    const monaco = createFakeMonaco()
    const model = createFakeModel('body code')
    const editor = createFakeEditor(model)
    const onSave = vi.fn()

    registerCodeEditorSaveAction(editor as any, monaco, onSave, () => 'resolved')

    editor.triggerCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS)

    expect(onSave).toHaveBeenCalledExactlyOnceWith('resolved')
  })

  it('defaults getSaveValue to the full editor value', () => {
    const monaco = createFakeMonaco()
    const model = createFakeModel('full value')
    const editor = createFakeEditor(model)
    const onSave = vi.fn()

    registerCodeEditorSaveAction(editor as any, monaco, onSave)
    editor.triggerCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS)

    expect(onSave).toHaveBeenCalledExactlyOnceWith('full value')
  })

  it('passes only the editable body when getSaveValue uses extractEditableBody', () => {
    const beginContextLine = 'function Calculation (form) {'
    const endContextLine = '}'
    const body = 'return form.data.name'
    const documentValue = buildConstrainedDocument(body, beginContextLine, false, endContextLine)
    const monaco = createFakeMonaco()
    const model = createFakeModel(documentValue)
    const editor = createFakeEditor(model)
    const onSave = vi.fn()

    registerCodeEditorSaveAction(editor as any, monaco, onSave, ed =>
      extractEditableBody(ed.getValue(), beginContextLine, false, endContextLine)
    )

    editor.triggerCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS)

    expect(onSave).toHaveBeenCalledExactlyOnceWith(body)
    expect(onSave.mock.calls[0][0]).not.toContain(beginContextLine)
    expect(onSave.mock.calls[0][0]).not.toContain(endContextLine)
  })

  it('stops invoking onSave after the action is disposed', () => {
    const monaco = createFakeMonaco()
    const model = createFakeModel('value')
    const editor = createFakeEditor(model)
    const onSave = vi.fn()

    const disposable = registerCodeEditorSaveAction(editor as any, monaco, onSave)
    disposable.dispose()
    editor.triggerCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS)

    expect(onSave).not.toHaveBeenCalled()
  })
})

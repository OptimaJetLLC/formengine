import type {Monaco} from '@monaco-editor/react'
import type {editor, IDisposable} from 'monaco-editor'

/**
 * Registers Ctrl/Cmd+S on a Monaco editor instance to invoke {@link onSave}.
 * Uses {@link editor.IStandaloneCodeEditor.addAction} so the chord is scoped to this editor
 * (same approach as constrained Ctrl/Cmd+A).
 * @param editorInstance the Monaco standalone editor.
 * @param monaco the Monaco namespace.
 * @param onSave the callback that receives the value to save.
 * @param getSaveValue resolves the string passed to {@link onSave}; defaults to the full editor value.
 * @returns the action disposable.
 */
export function registerCodeEditorSaveAction(
  editorInstance: editor.IStandaloneCodeEditor,
  monaco: Monaco,
  onSave: (value: string) => void,
  getSaveValue: (ed: editor.ICodeEditor) => string = ed => ed.getValue()
): IDisposable {
  return editorInstance.addAction({
    id: 'code-editor.save',
    label: 'Save',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
    precondition: 'editorTextFocus',
    run: ed => {
      onSave(getSaveValue(ed))
    },
  })
}

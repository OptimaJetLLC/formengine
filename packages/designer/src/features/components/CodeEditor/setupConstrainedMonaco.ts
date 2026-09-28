import type {Monaco} from '@monaco-editor/react'
import type {editor} from 'monaco-editor'
import type {IDisposable, IKeyboardEvent} from 'monaco-editor/esm/vs/editor/editor.api'
import {extractEditableBody} from './constrainedDocument'
import {getEditablePositionRange, getEditableRangeParams} from './ranges'

type TPosition = {
  lineNumber: number
  column: number
}

const samePosition = (a: TPosition, b: TPosition) => a.lineNumber === b.lineNumber && a.column === b.column

type ConstrainedEditorContext = {
  beginContextLine?: string
  canEditBeginContextLine?: boolean
  endContextLine?: string
}

/**
 * Monaco text model used by the constrained code editor.
 * Extends {@link editor.ITextModel} with a hook to refresh the editable body bounds
 * when context lines or the full document change outside normal typing.
 * Obtain an instance from {@link setupConstrainedMonaco}; pair programmatic
 * {@link editor.ITextModel.setValue} updates with {@link withSuppressedConstrainedValidation}
 * so replacement text is not treated as an out-of-range edit.
 */
export type ConstrainedMonacoEditorModel = editor.ITextModel & {
  /**
   * Recomputes the editable range from the current document and context lines.
   * Call after {@link editor.ITextModel.setValue} while validation is suppressed,
   * or when `beginContextLine`, `endContextLine`, or `canEditBeginContextLine` change.
   * @param context begin/end context line settings for the document.
   */
  updateRestrictions: (context: ConstrainedEditorContext) => void
}

type MonacoRange = InstanceType<Monaco['Range']>

type ModelState = {
  lastEditableRange: MonacoRange
  suppressContentValidation: boolean
}

const contextByModel = new WeakMap<editor.ITextModel, {current: ConstrainedEditorContext}>()
const monacoByModel = new WeakMap<editor.ITextModel, Monaco>()
const stateByModel = new WeakMap<editor.ITextModel, ModelState>()

function getContext(model: editor.ITextModel): ConstrainedEditorContext {
  return contextByModel.get(model)?.current ?? {}
}

function getEditableMonacoRange(model: editor.ITextModel, monaco: Monaco, context: ConstrainedEditorContext): MonacoRange {
  const {endExclusiveOffset, hasEndContextLine} = getEditableRangeParams(model, context.canEditBeginContextLine, context.endContextLine)
  const {startPosition, endPosition} = getEditablePositionRange(
    model,
    context.beginContextLine,
    context.canEditBeginContextLine,
    hasEndContextLine,
    endExclusiveOffset
  )
  return new monaco.Range(startPosition.lineNumber, startPosition.column, endPosition.lineNumber, endPosition.column)
}

function refreshEditableRange(model: editor.ITextModel, context: ConstrainedEditorContext): void {
  const monaco = monacoByModel.get(model)
  const state = stateByModel.get(model)
  if (!monaco || !state) {
    return
  }
  state.lastEditableRange = getEditableMonacoRange(model, monaco, context)
}

function getEditableSelectionRange(model: editor.ITextModel, context: ConstrainedEditorContext) {
  const {endExclusiveOffset, hasEndContextLine} = getEditableRangeParams(model, context.canEditBeginContextLine, context.endContextLine)
  const {startPosition, endPosition} = getEditablePositionRange(
    model,
    context.beginContextLine,
    context.canEditBeginContextLine,
    hasEndContextLine,
    endExclusiveOffset
  )
  return {
    startLineNumber: startPosition.lineNumber,
    startColumn: startPosition.column,
    endLineNumber: endPosition.lineNumber,
    endColumn: endPosition.column,
  }
}

function selectEditableBody(editor: editor.IStandaloneCodeEditor, model: editor.ITextModel, context: ConstrainedEditorContext): void {
  editor.setSelection(getEditableSelectionRange(model, context))
  editor.focus()
}

function registerSelectEditableBodyCommand(editor: editor.IStandaloneCodeEditor, monaco: Monaco, model: editor.ITextModel): void {
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyA, () => {
    if (editor.getModel() !== model) {
      return
    }
    try {
      selectEditableBody(editor, model, getContext(model))
    } catch {
      // Monaco can throw "Model is disposed!" if the command fires during teardown.
    }
  })
}

function getEditableRange(model: editor.ITextModel) {
  const context = getContext(model)

  try {
    const {endExclusiveOffset, hasEndContextLine} = getEditableRangeParams(model, context.canEditBeginContextLine, context.endContextLine)
    const {startPosition} = getEditablePositionRange(
      model,
      context.beginContextLine,
      context.canEditBeginContextLine,
      hasEndContextLine,
      endExclusiveOffset
    )
    return {startPosition, endExclusiveOffset}
  } catch {
    return null
  }
}

function clampCursorToEditableRange(
  editor: editor.IStandaloneCodeEditor,
  model: editor.ITextModel,
  isApplyingRef: {current: boolean}
): IDisposable {
  return editor.onDidChangeCursorPosition(({position, source}) => {
    if (isApplyingRef.current) {
      return
    }
    if (editor.getModel() !== model) {
      return
    }
    const selection = editor.getSelection()
    if (selection && !selection.isEmpty()) {
      return
    }

    const editableRange = getEditableRange(model)
    if (!editableRange) {
      return
    }

    const startOffset = model.getOffsetAt({
      lineNumber: editableRange.startPosition.lineNumber,
      column: editableRange.startPosition.column,
    })
    const offset = model.getOffsetAt(position)

    const target =
      offset < startOffset
        ? {lineNumber: editableRange.startPosition.lineNumber, column: editableRange.startPosition.column}
        : offset > editableRange.endExclusiveOffset
          ? model.getPositionAt(editableRange.endExclusiveOffset)
          : null

    if (!target || samePosition(position, target)) {
      return
    }

    isApplyingRef.current = true
    try {
      editor.setPosition(target, source)
    } finally {
      isApplyingRef.current = false
    }
  })
}

function registerBoundaryDeleteGuards(editor: editor.IStandaloneCodeEditor, model: editor.ITextModel): IDisposable {
  return editor.onKeyDown((e: IKeyboardEvent) => {
    const key = e.browserEvent?.key
    if (key !== 'Backspace' && key !== 'Delete') {
      return
    }
    if (editor.getModel() !== model) {
      return
    }
    const editable = getEditableRange(model)

    if (!editable) {
      return
    }

    const startOffset = model.getOffsetAt({lineNumber: editable.startPosition.lineNumber, column: editable.startPosition.column})
    const endOffset = editable.endExclusiveOffset

    const selection = editor.getSelection()
    if (selection && !selection.isEmpty()) {
      const selectionStartOffset = model.getOffsetAt({lineNumber: selection.startLineNumber, column: selection.startColumn})
      const selectionEndOffset = model.getOffsetAt({lineNumber: selection.endLineNumber, column: selection.endColumn})
      const minOffset = Math.min(selectionStartOffset, selectionEndOffset)
      const maxOffset = Math.max(selectionStartOffset, selectionEndOffset)
      if (minOffset < startOffset || maxOffset > endOffset) {
        e.browserEvent?.preventDefault?.()
        e.browserEvent?.stopPropagation?.()
      }
      return
    }

    const position = editor.getPosition()
    if (!position) {
      return
    }
    const offset = model.getOffsetAt(position)

    if (key === 'Backspace' && offset <= startOffset) {
      e.browserEvent?.preventDefault?.()
      e.browserEvent?.stopPropagation?.()
    }
    if (key === 'Delete' && offset >= endOffset) {
      e.browserEvent?.preventDefault?.()
      e.browserEvent?.stopPropagation?.()
    }
  })
}

function attachContentRestrictions(model: editor.ITextModel, onBodyChange: (body: string) => void): void {
  model.onDidChangeContent(event => {
    const state = stateByModel.get(model)
    if (!state || state.suppressContentValidation) {
      return
    }

    const editableRange = state.lastEditableRange
    const allValid = event.changes.every(change => editableRange.containsRange(change.range))
    if (!allValid) {
      state.suppressContentValidation = true
      try {
        model.undo()
      } finally {
        state.suppressContentValidation = false
      }
      refreshEditableRange(model, getContext(model))
      return
    }

    refreshEditableRange(model, getContext(model))
    const activeContext = getContext(model)
    const body = model.getValueInRange(state.lastEditableRange)
    onBodyChange(
      extractEditableBody(body, activeContext.beginContextLine, activeContext.canEditBeginContextLine, activeContext.endContextLine)
    )
  })
}

/**
 * Runs a callback while content validation is suppressed (for programmatic setValue).
 * @param model restricted Monaco model.
 * @param callback callback to run.
 */
export function withSuppressedConstrainedValidation(model: ConstrainedMonacoEditorModel, callback: () => void): void {
  const state = stateByModel.get(model)
  if (!state) {
    callback()
    return
  }
  state.suppressContentValidation = true
  try {
    callback()
  } finally {
    state.suppressContentValidation = false
  }
}

/**
 * Initializes constrained editing on a Monaco editor instance.
 * @param editor Monaco standalone editor instance.
 * @param monaco Monaco module namespace.
 * @param context begin/end context line settings for the document.
 * @param onBodyChange callback invoked when the editable body changes.
 * @returns the model with an updateRestrictions method.
 */
export function setupConstrainedMonaco(
  editor: editor.IStandaloneCodeEditor,
  monaco: Monaco,
  context: ConstrainedEditorContext,
  onBodyChange: (body: string) => void
): ConstrainedMonacoEditorModel {
  const model = editor.getModel()
  if (!model) {
    throw new Error('Monaco editor has no model')
  }

  contextByModel.set(model, {current: context})
  monacoByModel.set(model, monaco)
  stateByModel.set(model, {
    lastEditableRange: getEditableMonacoRange(model, monaco, context),
    suppressContentValidation: false,
  })

  registerSelectEditableBodyCommand(editor, monaco, model)

  const isApplyingCursorRef = {current: false}
  const cursorClampDisposable = clampCursorToEditableRange(editor, model, isApplyingCursorRef)
  const deleteGuardDisposable = registerBoundaryDeleteGuards(editor, model)
  attachContentRestrictions(model, onBodyChange)

  // Clean up editor-scoped listeners when the model is disposed/swapped.
  // This prevents callbacks from firing against a disposed model.
  model.onWillDispose?.(() => {
    cursorClampDisposable.dispose()
    deleteGuardDisposable.dispose()

    contextByModel.delete(model)
    monacoByModel.delete(model)
    stateByModel.delete(model)
  })

  return Object.assign(model, {
    updateRestrictions(nextContext: ConstrainedEditorContext) {
      contextByModel.set(model, {current: nextContext})
      refreshEditableRange(model, nextContext)
    },
  })
}

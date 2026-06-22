import {describe, expect, it, vi} from 'vitest'

import {buildConstrainedDocument} from '@react-form-builder/designer/src/features/components/CodeEditor/constrainedDocument'
import {
  getEditablePositionRange,
  getEditableRangeParams,
} from '@react-form-builder/designer/src/features/components/CodeEditor/ranges'
import {
  setupConstrainedMonaco,
  withSuppressedConstrainedValidation,
} from '@react-form-builder/designer/src/features/components/CodeEditor/setupConstrainedMonaco'
import {createFakeEditor, createFakeModel, createFakeMonaco} from './helpers/monacoFakes'

describe('setupConstrainedMonaco (minimal restriction engine)', () => {
  type Range = {startLineNumber: number; startColumn: number; endLineNumber: number; endColumn: number}

  function getEditableRangeForTest(
    model: any,
    beginContextLine: string | undefined,
    canEditBeginContextLine: boolean | undefined,
    endContextLine: string | undefined
  ) {
    const params = getEditableRangeParams(model, canEditBeginContextLine, endContextLine)
    const {startPosition, endPosition} = getEditablePositionRange(
      model,
      beginContextLine,
      canEditBeginContextLine,
      params.hasEndContextLine,
      params.endExclusiveOffset
    )

    return {
      startLine: startPosition.lineNumber,
      startColumn: startPosition.column,
      endLine: endPosition.lineNumber,
      endColumn: endPosition.column,
      endExclusiveOffset: params.endExclusiveOffset
    }
  }

  it('does not restore previously deleted text when backspace at the editable start boundary is blocked', () => {
    const monaco = createFakeMonaco()
    const beginContextLine = 'function f() {'
    const endContextLine = '}'
    const doc = buildConstrainedDocument('ABC', beginContextLine, false, endContextLine)
    const model = createFakeModel(doc)
    const editor = createFakeEditor(model)

    setupConstrainedMonaco(editor as any, monaco, {beginContextLine, canEditBeginContextLine: false, endContextLine}, () => {})

    const editable = getEditableRangeForTest(model as any, beginContextLine, false, endContextLine)

    // Step 1: valid selection delete in the body (remove "BC").
    model.applyChangeInRange(
      {startLineNumber: editable.startLine, startColumn: editable.startColumn + 1, endLineNumber: editable.startLine, endColumn: editable.startColumn + 3},
      ''
    )
    expect(model.getValue()).toBe(buildConstrainedDocument('A', beginContextLine, false, endContextLine))

    // Step 2: simulate the caret at the body start and press Backspace.
    // If the key is not prevented, we apply the invalid delete to emulate Monaco behavior.
    editor.setPosition({lineNumber: editable.startLine, column: editable.startColumn})
    const preventDefault = vi.fn()
    const stopPropagation = vi.fn()
    const keyboardEvent = {browserEvent: {key: 'Backspace', preventDefault, stopPropagation}}
    ;(editor as any).emitKeyDown(keyboardEvent)

    const wasPrevented = preventDefault.mock.calls.length > 0
    if (!wasPrevented) {
      const invalidDelete: Range = {
        startLineNumber: 1,
        startColumn: beginContextLine.length,
        endLineNumber: editable.startLine,
        endColumn: editable.startColumn,
      }
      model.applyChangeInRange(invalidDelete, '')
    }

    expect(preventDefault).toHaveBeenCalled()
    expect(stopPropagation).toHaveBeenCalled()
    expect(model.getValue()).toBe(buildConstrainedDocument('A', beginContextLine, false, endContextLine))
  })

  it('undoes edits outside editable body (before prefix)', () => {
    const monaco = createFakeMonaco()
    const beginContextLine = 'function f() {'
    const endContextLine = '}'
    const doc = buildConstrainedDocument('return 1', beginContextLine, false, endContextLine)
    const model = createFakeModel(doc)
    const editor = createFakeEditor(model)

    const onBodyChange = vi.fn()
    setupConstrainedMonaco(editor as any, monaco, {beginContextLine, canEditBeginContextLine: false, endContextLine}, onBodyChange)

    model.applyChangeInRange({startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1}, 'X')
    expect(model.__undoSpy).toHaveBeenCalledTimes(1)
    expect(model.getValue()).toBe(doc)
    expect(onBodyChange).not.toHaveBeenCalled()
  })

  it('undoes edits outside editable body (after suffix)', () => {
    const monaco = createFakeMonaco()
    const beginContextLine = 'function f() {'
    const endContextLine = '}'
    const doc = buildConstrainedDocument('return 1', beginContextLine, false, endContextLine)
    const model = createFakeModel(doc)
    const editor = createFakeEditor(model)

    const onBodyChange = vi.fn()
    setupConstrainedMonaco(editor as any, monaco, {beginContextLine, canEditBeginContextLine: false, endContextLine}, onBodyChange)

    const full = model.getFullModelRange()
    model.applyChangeInRange(
      {startLineNumber: full.endLineNumber, startColumn: full.endColumn, endLineNumber: full.endLineNumber, endColumn: full.endColumn},
      'X'
    )
    expect(model.__undoSpy).toHaveBeenCalledTimes(1)
    expect(model.getValue()).toBe(doc)
    expect(onBodyChange).not.toHaveBeenCalled()
  })

  it('allows edits inside editable body and calls onBodyChange with extracted body', () => {
    const monaco = createFakeMonaco()
    const beginContextLine = 'function f() {'
    const endContextLine = '}'
    const doc = buildConstrainedDocument('return 1', beginContextLine, false, endContextLine)
    const model = createFakeModel(doc)
    const editor = createFakeEditor(model)

    const onBodyChange = vi.fn()
    setupConstrainedMonaco(editor as any, monaco, {beginContextLine, canEditBeginContextLine: false, endContextLine}, onBodyChange)

    const editable = getEditableRangeForTest(model as any, beginContextLine, false, endContextLine)
    model.applyChangeInRange(
      {startLineNumber: editable.startLine, startColumn: editable.startColumn, endLineNumber: editable.startLine, endColumn: editable.startColumn},
      'X'
    )

    expect(model.__undoSpy).not.toHaveBeenCalled()
    expect(onBodyChange).toHaveBeenCalledTimes(1)
    expect(onBodyChange).toHaveBeenCalledWith('Xreturn 1')
  })

  it('withSuppressedConstrainedValidation allows full document replacement via setValue', () => {
    const monaco = createFakeMonaco()
    const beginContextLine = 'function f() {'
    const endContextLine = '}'
    const doc1 = buildConstrainedDocument('return 1', beginContextLine, false, endContextLine)
    const doc2 = buildConstrainedDocument('return 2', beginContextLine, false, endContextLine)
    const model = createFakeModel(doc1)
    const editor = createFakeEditor(model)

    const onBodyChange = vi.fn()
    const constrainedModel = setupConstrainedMonaco(editor as any, monaco, {beginContextLine, canEditBeginContextLine: false, endContextLine}, onBodyChange)

    withSuppressedConstrainedValidation(constrainedModel, () => {
      constrainedModel.setValue(doc2)
      constrainedModel.updateRestrictions({beginContextLine, canEditBeginContextLine: false, endContextLine})
    })

    expect(model.__undoSpy).not.toHaveBeenCalled()
    expect(constrainedModel.getValue()).toBe(doc2)
  })

  it('clamps cursor to editable start/end when moving outside the body', () => {
    const monaco = createFakeMonaco()
    const beginContextLine = 'function f() {'
    const endContextLine = '}'
    const doc = buildConstrainedDocument('return 1', beginContextLine, false, endContextLine)
    const model = createFakeModel(doc)
    const editor = createFakeEditor(model)

    setupConstrainedMonaco(editor as any, monaco, {beginContextLine, canEditBeginContextLine: false, endContextLine}, () => {})

    const editable = getEditableRangeForTest(model as any, beginContextLine, false, endContextLine)
    const params = getEditableRangeParams(model as any, false, endContextLine)

    editor.emitCursor({lineNumber: 1, column: 1})
    expect(editor.getPosition()).toEqual({lineNumber: editable.startLine, column: editable.startColumn})

    editor.emitCursor({lineNumber: 999, column: 999})
    expect(editor.getPosition()).toEqual(model.getPositionAt(params.endExclusiveOffset))
  })

  it('Ctrl/Cmd+A selects only the editable body range', () => {
    const monaco = createFakeMonaco()
    const beginContextLine = 'function f() {'
    const endContextLine = '}'
    const doc = buildConstrainedDocument('return 1', beginContextLine, false, endContextLine)
    const model = createFakeModel(doc)
    const editor = createFakeEditor(model)

    setupConstrainedMonaco(editor as any, monaco, {beginContextLine, canEditBeginContextLine: false, endContextLine}, () => {})

    const keybinding = (monaco.KeyMod.CtrlCmd as number) | (monaco.KeyCode.KeyA as number)
    editor.triggerCommand(keybinding)

    const editable = getEditableRangeForTest(model as any, beginContextLine, false, endContextLine)
    expect(editor.getSelection()).toMatchObject({
      startLineNumber: editable.startLine,
      startColumn: editable.startColumn,
      endLineNumber: editable.endLine,
      endColumn: editable.endColumn,
    })
    expect(editor.focus).toHaveBeenCalled()
  })

  it('updateConstrainedRestrictions recomputes bounds when context changes', () => {
    const monaco = createFakeMonaco()
    const doc = buildConstrainedDocument('x', undefined, undefined, undefined)
    const model = createFakeModel(doc)
    const editor = createFakeEditor(model)

    const onBodyChange = vi.fn()
    const constrainedModel = setupConstrainedMonaco(editor as any, monaco, {}, onBodyChange)

    // Change context to add a non-editable prefix and suffix and update the model value accordingly.
    const beginContextLine = 'function f() {'
    const endContextLine = '}'
    const wrapped = buildConstrainedDocument('x', beginContextLine, false, endContextLine)
    withSuppressedConstrainedValidation(constrainedModel, () => {
      constrainedModel.setValue(wrapped)
      constrainedModel.updateRestrictions({beginContextLine, canEditBeginContextLine: false, endContextLine})
    })

    const editable = getEditableRangeForTest(model as any, beginContextLine, false, endContextLine)
    model.applyChangeInRange(
      {startLineNumber: editable.startLine, startColumn: editable.startColumn, endLineNumber: editable.startLine, endColumn: editable.startColumn},
      'Y'
    )

    expect(onBodyChange).toHaveBeenCalledWith('Yx')
  })
})


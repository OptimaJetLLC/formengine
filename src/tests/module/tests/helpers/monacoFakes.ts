import type {Monaco} from '@monaco-editor/react'
import {vi} from 'vitest'

type Position = { lineNumber: number; column: number }
type CursorChange = { position: Position; source?: string }

export function getPositionAtFromText(text: string, offset: number): Position {
  const before = text.slice(0, offset)
  const lines = before.split('\n')
  return {
    lineNumber: lines.length,
    column: lines[lines.length - 1].length + 1,
  }
}

export function getOffsetAtFromText(text: string, position: Position): number {
  const lines = text.split('\n')
  let offset = 0
  for (let line = 1; line < position.lineNumber; line++) {
    offset += (lines[line - 1]?.length ?? 0) + 1
  }
  return offset + position.column - 1
}

class FakeRange {
  public startLineNumber: number
  public startColumn: number
  public endLineNumber: number
  public endColumn: number

  constructor(startLineNumber: number, startColumn: number, endLineNumber: number, endColumn: number) {
    this.startLineNumber = startLineNumber
    this.startColumn = startColumn
    this.endLineNumber = endLineNumber
    this.endColumn = endColumn
  }

  private compare(a: Position, b: Position): number {
    if (a.lineNumber !== b.lineNumber) {
      return a.lineNumber - b.lineNumber
    }
    return a.column - b.column
  }

  public containsRange(other: { startLineNumber: number; startColumn: number; endLineNumber: number; endColumn: number }): boolean {
    const startOk =
      this.compare(
        {lineNumber: other.startLineNumber, column: other.startColumn},
        {lineNumber: this.startLineNumber, column: this.startColumn}
      ) >= 0
    const endOk =
      this.compare(
        {lineNumber: other.endLineNumber, column: other.endColumn},
        {lineNumber: this.endLineNumber, column: this.endColumn}
      ) <= 0
    return startOk && endOk
  }
}

export function createFakeMonaco(): Monaco {
  return {
    Range: FakeRange as unknown as Monaco['Range'],
    KeyMod: {CtrlCmd: 1 << 11},
    KeyCode: {KeyA: 31},
  } as unknown as Monaco
}

type ContentChange = { range: { startLineNumber: number; startColumn: number; endLineNumber: number; endColumn: number } }

export function createFakeModel(initialText: string) {
  let text = initialText
  const undoStack: string[] = []
  const contentListeners: Array<(event: { changes: ContentChange[] }) => void> = []
  const undoSpy = vi.fn()

  return {
    getValue: () => text,
    setValue: (next: string) => {
      undoStack.push(text)
      text = next
      contentListeners.forEach((fn) =>
        fn({changes: [{range: {startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1}}]})
      )
    },
    onDidChangeContent: (listener: (event: { changes: ContentChange[] }) => void) => {
      contentListeners.push(listener)
      return {
        dispose: () => {
        }
      }
    },
    undo: () => {
      undoSpy()
      const prev = undoStack.pop()
      if (prev !== undefined) {
        text = prev
      }
    },
    getPositionAt: (offset: number) => getPositionAtFromText(text, offset),
    getOffsetAt: (pos: Position) => getOffsetAtFromText(text, pos),
    getFullModelRange: () => {
      const lines = text.split('\n')
      return {
        endLineNumber: lines.length,
        endColumn: (lines[lines.length - 1]?.length ?? 0) + 1,
      }
    },
    getValueInRange: (range: { startLineNumber: number; startColumn: number; endLineNumber: number; endColumn: number }) => {
      const startOffset = getOffsetAtFromText(text, {lineNumber: range.startLineNumber, column: range.startColumn})
      const endOffset = getOffsetAtFromText(text, {lineNumber: range.endLineNumber, column: range.endColumn})
      return text.slice(startOffset, endOffset)
    },
    applyChangeInRange: (range: {
      startLineNumber: number;
      startColumn: number;
      endLineNumber: number;
      endColumn: number
    }, insertedText: string) => {
      undoStack.push(text)
      const startOffset = getOffsetAtFromText(text, {lineNumber: range.startLineNumber, column: range.startColumn})
      const endOffset = getOffsetAtFromText(text, {lineNumber: range.endLineNumber, column: range.endColumn})
      text = text.slice(0, startOffset) + insertedText + text.slice(endOffset)
      contentListeners.forEach((fn) => fn({changes: [{range}]}))
    },
    __undoSpy: undoSpy,
  }
}

export function createFakeEditor(model: any) {
  const commandMap = new Map<number, () => void>()
  const cursorListeners: Array<(e: CursorChange) => void> = []
  const keyDownListeners: Array<(e: any) => void> = []
  let selection:
    | null
    | { isEmpty: () => boolean }
    | { startLineNumber: number; startColumn: number; endLineNumber: number; endColumn: number; isEmpty: () => boolean } = null
  let position: Position | null = null

  return {
    getModel: () => model,
    addCommand: (keybinding: number, handler: () => void) => {
      commandMap.set(keybinding, handler)
      return 'cmd'
    },
    triggerCommand: (keybinding: number) => {
      commandMap.get(keybinding)?.()
    },
    onDidChangeCursorPosition: (listener: (e: CursorChange) => void) => {
      cursorListeners.push(listener)
      return {
        dispose: () => {
        }
      }
    },
    onKeyDown: (listener: (e: any) => void) => {
      keyDownListeners.push(listener)
      return {
        dispose: () => {
        }
      }
    },
    setPosition: (pos: Position) => {
      position = pos
    },
    getPosition: () => position,
    emitCursor: (pos: Position) => {
      cursorListeners.forEach((fn) => fn({position: pos, source: 'test'}))
    },
    setSelection: (next: { startLineNumber: number; startColumn: number; endLineNumber: number; endColumn: number }) => {
      selection = {
        ...next,
        isEmpty: () => next.startLineNumber === next.endLineNumber && next.startColumn === next.endColumn,
      }
    },
    getSelection: () => selection as any,
    getSelections: () => [],
    emitKeyDown: (event: any) => {
      keyDownListeners.forEach((fn) => fn(event))
    },
    focus: vi.fn(),
  }
}


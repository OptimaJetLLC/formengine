import {buildConstrainedDocument} from '@react-form-builder/designer/src/features/components/CodeEditor/constrainedDocument'
import {getEditablePositionRange, getEditableRangeParams,} from '@react-form-builder/designer/src/features/components/CodeEditor/ranges'
import type {editor} from 'monaco-editor'
import {describe, expect, it} from 'vitest'
import {getOffsetAtFromText, getPositionAtFromText} from './helpers/monacoFakes'

function createMockModel(text: string): editor.ITextModel {
  const lines = text.split('\n')
  return {
    getLineCount: () => lines.length,
    getFullModelRange: () => ({
      endLineNumber: lines.length,
      endColumn: lines[lines.length - 1].length + 1
    }),
    getValue: () => text,
    getValueLength: () => text.length,
    getPositionAt: (offset: number) => getPositionAtFromText(text, offset),
    getOffsetAt: (position: { lineNumber: number; column: number }) => getOffsetAtFromText(text, position)
  } as editor.ITextModel
}

function buildDoc(
  beginContextLine: string | undefined,
  canEditBeginContextLine: boolean | undefined,
  body: string,
  endContextLine: string | undefined
): string {
  return buildConstrainedDocument(body, beginContextLine, canEditBeginContextLine, endContextLine)
}

function postfixFor(endContextLine: string | undefined): string {
  return endContextLine ? `\n${endContextLine}` : ''
}

function getPrefixBeforeBodyLength(beginContextLine: string | undefined, canEditBeginContextLine: boolean | undefined): number {
  const prefix = beginContextLine ?? ''
  const contentDelimiter = beginContextLine && canEditBeginContextLine ? '' : '\n'
  if (!beginContextLine) {
    return contentDelimiter.length
  }
  return prefix.length + contentDelimiter.length
}

function getEditableRangeForTest(
  model: editor.ITextModel,
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
    ...params
  }
}

describe('getEditableRange', () => {
  it('uses full model when there is no begin or end context', () => {
    const body = Array.from({length: 11}, (_, i) => `L${i + 2}`).join('\n')
    const text = buildDoc(undefined, undefined, body, undefined)
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, undefined, undefined, undefined)
    expect(range).toMatchObject({
      startLine: 2,
      startColumn: 1,
      endLine: 12,
      endColumn: 4
    })
  })

  it('single-line non-editable begin: first editable cell is line after prefix', () => {
    const begin = 'function foo() {'
    const body = 'a\nb\nc'
    const text = buildDoc(begin, false, body, undefined)
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, begin, false, undefined)
    expect(range).toMatchObject({
      startLine: 2,
      startColumn: 1,
      endLine: 4,
      endColumn: 2
    })
  })

  it('multiline non-editable begin: first editable cell is line after last prefix line', () => {
    const beginContextLine = '/**\n * Doc\n */'
    const body = 'body\nhere'
    const text = buildDoc(beginContextLine, false, body, undefined)
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, beginContextLine, false, undefined)
    expect(range).toMatchObject({
      startLine: 4,
      startColumn: 1,
      endLine: 5,
      endColumn: 5
    })
  })

  it('single-line non-editable begin with editable flag: range starts at end of begin line', () => {
    const begin = 'function foo() {'
    const body = 'return 1'
    const text = buildDoc(begin, true, body, undefined)
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, begin, true, undefined)
    expect(range).toMatchObject({
      startLine: 1,
      startColumn: 17,
      endLine: 1,
      endColumn: 25
    })
  })

  it('single-line end restriction: Monaco end-exclusive stop is first cell after last body character', () => {
    const body = 'x\ny\nz'
    const text = buildDoc(undefined, undefined, body, '}')
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, undefined, undefined, '}')
    const postfix = postfixFor('}')
    expect(range).toMatchObject({
      startLine: 2,
      startColumn: 1,
      endLine: 4,
      endColumn: 2
    })
    expect(getEditableRangeParams(model, undefined, '}')).toMatchObject({
      endExclusiveOffset: text.length - postfix.length,
      hasEndContextLine: true,
      isBeginContextEditable: false
    })
  })

  it('multiline end restriction: end aligns before trailing block lines', () => {
    const endContextLine = '}\n// end'
    const body = 'a\nb\nc'
    const text = buildDoc(undefined, undefined, body, endContextLine)
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, undefined, undefined, endContextLine)
    const postfix = postfixFor(endContextLine)
    expect(range).toMatchObject({
      startLine: 2,
      startColumn: 1,
      endLine: 4,
      endColumn: 2
    })
    expect(getEditableRangeParams(model, undefined, endContextLine)).toMatchObject({
      endExclusiveOffset: text.length - postfix.length,
      hasEndContextLine: true,
      isBeginContextEditable: false
    })
  })

  it('multiline begin and multiline end combined', () => {
    const beginContextLine = 'export const x = () => {\n  return ('
    const endContextLine = ');\n};'
    const body = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15'
    const text = buildDoc(beginContextLine, false, body, endContextLine)
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, beginContextLine, false, endContextLine)
    const postfix = postfixFor(endContextLine)
    expect(range).toMatchObject({
      startLine: 3,
      startColumn: 1,
      endLine: 17,
      endColumn: 3
    })
    expect(getEditableRangeParams(model, false, endContextLine)).toMatchObject({
      endExclusiveOffset: text.length - postfix.length,
      hasEndContextLine: true,
      isBeginContextEditable: false
    })
  })

  it('trailing newline in beginContextLine does not skip the first body line', () => {
    const beginWithTrailingNewline = 'line1\nline2\n'
    const body = '// enter your code here'
    const text = buildDoc(beginWithTrailingNewline, false, body, '}')
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, beginWithTrailingNewline, false, '}')
    const bodyLine = beginWithTrailingNewline.split('\n').length + 1
    expect(range.startLine).toBe(bodyLine)
    expect(range.startColumn).toBe(1)
    expect(text.split('\n')[range.startLine - 1]).toBe(body)
  })

  it('empty body with end context: end offsets match and range collapses to body start', () => {
    const endContextLine = '}'
    const body = ''
    const text = buildDoc(undefined, undefined, body, endContextLine)
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, undefined, undefined, endContextLine)
    const prefixLen = getPrefixBeforeBodyLength(undefined, undefined)
    const params = getEditableRangeParams(model, undefined, endContextLine)
    expect(prefixLen).toBe(1)
    expect(params.endExclusiveOffset).toBe(prefixLen)
    expect(range.startLine).toBe(range.endLine)
    expect(range.startColumn).toBe(range.endColumn)
    expect(params.hasEndContextLine).toBe(true)
  })

  it('empty body without end context: range is delimiter-only body line', () => {
    const body = ''
    const text = buildDoc(undefined, undefined, body, undefined)
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, undefined, undefined, undefined)
    const params = getEditableRangeParams(model, undefined, undefined)
    expect(text).toBe('\n')
    expect(params.endExclusiveOffset).toBe(1)
    expect(range.startLine).toBe(2)
    expect(range.startColumn).toBe(1)
    expect(params.hasEndContextLine).toBe(false)
  })

  it('non-editable begin with empty body and closing brace', () => {
    const begin = 'function f() {'
    const body = ''
    const endContextLine = '}'
    const text = buildDoc(begin, false, body, endContextLine)
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, begin, false, endContextLine)
    const params = getEditableRangeParams(model, false, endContextLine)
    const prefixLen = getPrefixBeforeBodyLength(begin, false)
    expect(params.endExclusiveOffset).toBe(text.length - postfixFor(endContextLine).length)
    expect(params.endExclusiveOffset).toBe(prefixLen)
    expect(range.startLine).toBe(range.endLine)
    expect(range.startColumn).toBe(range.endColumn)
  })

  it('editable begin with end context: calculable-style wrapper', () => {
    const begin = 'export const run = () => {\n  return ('
    const body = '1 + 2'
    const endContextLine = ');\n};'
    const text = buildDoc(begin, true, body, endContextLine)
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, begin, true, endContextLine)
    const params = getEditableRangeParams(model, true, endContextLine)
    const postfix = postfixFor(endContextLine)
    expect(params).toMatchObject({
      hasEndContextLine: true,
      isBeginContextEditable: true,
      endExclusiveOffset: text.length - postfix.length
    })
    expect(text.slice(params.endExclusiveOffset)).toBe(postfix)
    expect(range.endLine).toBeGreaterThan(0)
  })

  it('document invariant: model text between bodyStartOffset and endExclusiveOffset equals stored body', () => {
    const cases: readonly [string | undefined, boolean | undefined, string, string | undefined][] = [
      [undefined, undefined, 'solo line', undefined],
      [undefined, undefined, 'a\nb\nc', '}'],
      ['fn(){', false, 'return null', '}'],
      ['fn(){', true, 'x', '};'],
      ['/**\nx\n*/', false, 'y', '}']
    ]
    for (const [begin, canEdit, body, end] of cases) {
      const text = buildDoc(begin, canEdit, body, end)
      const model = createMockModel(text)
      const range = getEditableRangeForTest(model, begin, canEdit, end)
      const params = getEditableRangeParams(model, canEdit, end)
      const prefixBeforeBodyLen = getPrefixBeforeBodyLength(begin, canEdit)
      expect(params.endExclusiveOffset - prefixBeforeBodyLen, JSON.stringify({begin, body, end})).toBe(body.length)
      const extracted = text.slice(prefixBeforeBodyLen, params.endExclusiveOffset)
      expect(extracted, JSON.stringify({begin, body, end})).toBe(body)
      expect(range.startLine).toBeGreaterThan(0)
    }
  })

  it('mock getOffsetAt round-trips getPositionAt for every offset on sample document with end context', () => {
    const body = 'x\ny'
    const text = buildDoc(undefined, undefined, body, '}')
    const model = createMockModel(text)
    for (let offset = 0; offset <= text.length; offset++) {
      const pos = model.getPositionAt(offset)
      expect(model.getOffsetAt(pos)).toBe(offset)
    }
  })

  it('endExclusiveOffset matches getOffsetAt of Monaco end-exclusive position', () => {
    const text = buildDoc('function(){', false, 'a\nb', '}')
    const model = createMockModel(text)
    const range = getEditableRangeForTest(model, 'function(){', false, '}')
    const params = getEditableRangeParams(model, false, '}')
    const endPos = {lineNumber: range.endLine, column: range.endColumn}
    expect(model.getOffsetAt(endPos)).toBe(params.endExclusiveOffset)
  })
})

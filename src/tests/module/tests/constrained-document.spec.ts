import {
  buildConstrainedDocument,
  extractEditableBody,
  getPostfix,
  getPrefixBeforeBody,
} from '@react-form-builder/designer/src/features/components/CodeEditor/constrainedDocument'
import {describe, expect, it} from 'vitest'

describe('constrainedDocument', () => {
  it('getPrefixBeforeBody uses a delimiter when there is no beginContextLine', () => {
    expect(getPrefixBeforeBody(undefined, undefined)).toBe('\n')
    expect(getPrefixBeforeBody(undefined, false)).toBe('\n')
    expect(getPrefixBeforeBody(undefined, true)).toBe('\n')
  })

  it('getPrefixBeforeBody adds a delimiter when beginContextLine is non-editable', () => {
    expect(getPrefixBeforeBody('header', false)).toBe('header\n')
    expect(getPrefixBeforeBody('header', undefined)).toBe('header\n')
  })

  it('getPrefixBeforeBody does not add a delimiter when beginContextLine is editable', () => {
    expect(getPrefixBeforeBody('header', true)).toBe('header')
  })

  it('getPostfix adds a leading newline when endContextLine exists', () => {
    expect(getPostfix(undefined)).toBe('')
    expect(getPostfix('}')).toBe('\n}')
    expect(getPostfix('}\n// end')).toBe('\n}\n// end')
  })

  it('round-trips buildConstrainedDocument -> extractEditableBody across common shapes', () => {
    const cases: ReadonlyArray<{
      beginContextLine?: string
      canEditBeginContextLine?: boolean
      endContextLine?: string
      body: string
    }> = [
      {body: ''},
      {body: 'x'},
      {body: 'a\nb\nc'},
      {beginContextLine: 'function f() {', canEditBeginContextLine: false, body: 'return 1', endContextLine: '}'},
      {beginContextLine: 'function f() {', canEditBeginContextLine: true, body: 'return 1', endContextLine: '}'},
      {beginContextLine: '/**\n * Doc\n */', canEditBeginContextLine: false, body: 'x\ny', endContextLine: '}'},
      {beginContextLine: 'export const run = () => {\n  return (', canEditBeginContextLine: true, body: '1 + 2', endContextLine: ');\n};'},
    ]

    for (const testCase of cases) {
      const doc = buildConstrainedDocument(
        testCase.body,
        testCase.beginContextLine,
        testCase.canEditBeginContextLine,
        testCase.endContextLine
      )
      const extracted = extractEditableBody(
        doc,
        testCase.beginContextLine,
        testCase.canEditBeginContextLine,
        testCase.endContextLine
      )
      expect(extracted, JSON.stringify(testCase)).toBe(testCase.body)
    }
  })

  it('extractEditableBody tolerates document values that contain beginContextLine not at index 0', () => {
    const beginContextLine = 'id = '
    const body = 'Hello'
    const endContextLine = undefined
    const docValue = `// noise\n${beginContextLine}${body}`

    expect(extractEditableBody(docValue, beginContextLine, true, endContextLine)).toBe(body)
  })
})


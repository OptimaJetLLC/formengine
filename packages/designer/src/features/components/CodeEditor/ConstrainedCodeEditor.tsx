import type {OnMount} from '@monaco-editor/react'
import {constrainedEditor, ConstrainedMonacoEditorModel, RangeRestrictionObject} from 'constrained-editor-plugin'
import type {editor} from 'monaco-editor'
import {useCallback, useEffect, useMemo, useRef} from 'react'
import type {CodeEditorProps} from './CodeEditorProps'
import {MonacoCodeEditor} from './MonacoCodeEditor'

/**
 * The React component that displays constrained code editor.
 * @param props the React component properties.
 * @returns the React element.
 */
export const ConstrainedCodeEditor = (props: CodeEditorProps) => {
  const initialValue = useMemo(() => {
    const prefix = props.beginContextLine ?? ''
    const contentDelimiter = props.beginContextLine && props.canEditBeginContextLine ? '' : '\n'
    const postfix = props.endContextLine ? `\n${props.endContextLine}` : ''
    return prefix + contentDelimiter + props.initialValue + postfix
  }, [props.beginContextLine, props.endContextLine, props.initialValue, props.canEditBeginContextLine])

  const editorRef = useRef<editor.IStandaloneCodeEditor>()
  const constrainedMonacoEditorModelRef = useRef<ConstrainedMonacoEditorModel>()

  const getRestrictions = useCallback((model: editor.ITextModel): RangeRestrictionObject[] => {
    const hasEndContextLine = !!props.endContextLine

    const [beginContextLineEndLine, beginContextLineEndColumn] = getEndPosition(props.beginContextLine ?? '')
    const [endContextLineEndLine] = getEndPosition(props.endContextLine ?? '')
    const lastEditableLine = hasEndContextLine ? model.getLineCount() - (endContextLineEndLine - 1) : model.getLineCount()
    const lastEditableColumn = hasEndContextLine ? 1 : model.getFullModelRange().endColumn

    return [{
      label: 'body',
      allowMultiline: true,
      range: [beginContextLineEndLine, beginContextLineEndColumn, lastEditableLine, lastEditableColumn],
      validate: (current, _, {endLineOfRange, startLineOfRange}) => {
        if (startLineOfRange) return current.startsWith('\n') || props.canEditBeginContextLine
        if (endLineOfRange) return current.endsWith('\n') || !hasEndContextLine
        return true
      }
    }]
  }, [props.beginContextLine, props.canEditBeginContextLine, props.endContextLine])

  useEffect(() => {
    editorRef.current?.setValue(initialValue)
    if (!constrainedMonacoEditorModelRef.current) return

    const restrictions = getRestrictions(constrainedMonacoEditorModelRef.current)
    constrainedMonacoEditorModelRef.current.updateRestrictions(restrictions)
  }, [getRestrictions, initialValue])

  const {onChange} = props
  const handleMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor

    const model = editor.getModel()
    if (!model) return

    const constrainedInstance = constrainedEditor(monaco)
    constrainedInstance.initializeIn(editor)
    const restrictions = getRestrictions(model)
    const constrainedModel = constrainedInstance.addRestrictionsTo(model, restrictions)

    constrainedModel.onDidChangeContentInEditableRange(value => {
      let editableCode = value.body
      if (!editableCode) return

      if (!!props.beginContextLine && editableCode.startsWith('\n')) {
        editableCode = editableCode.substring(1)
      }
      if (!!props.endContextLine && editableCode.endsWith('\n')) {
        editableCode = editableCode.substring(0, editableCode.length - 1)
      }
      onChange(editableCode)
    })
    constrainedMonacoEditorModelRef.current = constrainedModel
  }, [props.beginContextLine, props.endContextLine, getRestrictions, onChange])

  return <MonacoCodeEditor
    onMount={handleMount}
    className={props.className}
    defaultValue={initialValue}
    height={props.height ?? '100%'}
    width={props.width ?? '100%'}
    language={props.language ?? 'javascript'}
    options={{
      wordWrap: 'on',
      ...props.options
    }}
    theme={props.theme}
  />
}

function getEndPosition(str: string) {
  const lines = str.split('\n')
  const lastLineLength = lines.at(-1)?.length ?? 0
  return [lines.length, lastLineLength + 1] as const
}

import type {OnMount} from '@monaco-editor/react'
import type {editor} from 'monaco-editor'
import {useCallback, useEffect, useMemo, useRef} from 'react'
import type {CodeEditorProps} from './CodeEditorProps'
import {buildConstrainedDocument, extractEditableBody, resolveNextConstrainedDocument} from './constrainedDocument'
import {MonacoCodeEditor} from './MonacoCodeEditor'
import type {ConstrainedMonacoEditorModel} from './setupConstrainedMonaco'
import {setupConstrainedMonaco, withSuppressedConstrainedValidation} from './setupConstrainedMonaco'
import {useMonacoAutoformat} from './useMonacoAutoformat'

type ConstrainedContext = {
  beginContextLine?: string
  canEditBeginContextLine?: boolean
  endContextLine?: string
}

const applyConstrainedEditorValue = (
  editor: editor.IStandaloneCodeEditor | null,
  constrainedModel: ConstrainedMonacoEditorModel | null,
  documentValue: string,
  context: ConstrainedContext
): boolean => {
  if (!editor) {
    return false
  }
  if (editor.getValue() === documentValue) {
    constrainedModel?.updateRestrictions(context)
    return false
  }
  if (constrainedModel) {
    withSuppressedConstrainedValidation(constrainedModel, () => {
      editor.setValue(documentValue)
      constrainedModel.updateRestrictions(context)
    })
    return true
  }
  editor.setValue(documentValue)
  return true
}

/**
 * The React component that displays constrained code editor.
 * @param props the React component properties.
 * @returns the React element.
 */
export const ConstrainedCodeEditor = (props: CodeEditorProps) => {
  const {initialValue, onChange, onMount} = props
  const context = useMemo(
    () => ({
      beginContextLine: props.beginContextLine,
      canEditBeginContextLine: props.canEditBeginContextLine,
      endContextLine: props.endContextLine,
    }),
    [props.beginContextLine, props.canEditBeginContextLine, props.endContextLine]
  )

  const documentValue = useMemo(
    () => buildConstrainedDocument(initialValue, context.beginContextLine, context.canEditBeginContextLine, context.endContextLine),
    [context, initialValue]
  )

  const editorRef = useRef<editor.IStandaloneCodeEditor>(null)
  const constrainedModelRef = useRef<ConstrainedMonacoEditorModel>(null)
  const appliedSourceRef = useRef({initialValue, context})

  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    const previous = appliedSourceRef.current
    const nextDocument = resolveNextConstrainedDocument(
      editor.getValue(),
      {
        initialValue: previous.initialValue,
        beginContextLine: previous.context.beginContextLine,
        canEditBeginContextLine: previous.context.canEditBeginContextLine,
        endContextLine: previous.context.endContextLine,
      },
      {
        initialValue,
        beginContextLine: context.beginContextLine,
        canEditBeginContextLine: context.canEditBeginContextLine,
        endContextLine: context.endContextLine,
      }
    )
    if (applyConstrainedEditorValue(editor, constrainedModelRef.current, nextDocument, context)) {
      onChange(extractEditableBody(nextDocument, context.beginContextLine, context.canEditBeginContextLine, context.endContextLine))
    }
    appliedSourceRef.current = {initialValue, context}
  }, [context, initialValue, onChange])

  const handleMount: OnMount = useCallback(
    (editor, monaco) => {
      onMount?.(editor, monaco)
      editorRef.current = editor
      constrainedModelRef.current = setupConstrainedMonaco(editor, monaco, context, onChange)
      appliedSourceRef.current = {initialValue, context}
    },
    [context, initialValue, onChange, onMount]
  )

  const {monacoOptions, onMount: autoformatOnMount} = useMonacoAutoformat(props.autoformat, props.options, handleMount)

  return (
    <MonacoCodeEditor
      onMount={autoformatOnMount}
      className={props.className}
      defaultValue={documentValue}
      height={props.height ?? '100%'}
      width={props.width ?? '100%'}
      language={props.language ?? 'javascript'}
      options={monacoOptions}
      theme={props.theme}
    />
  )
}

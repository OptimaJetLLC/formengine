import type {OnMount} from '@monaco-editor/react'
import type {editor} from 'monaco-editor'
import {useCallback, useEffect, useMemo, useRef} from 'react'
import type {CodeEditorProps} from './CodeEditorProps'
import {buildConstrainedDocument} from './constrainedDocument'
import {MonacoCodeEditor} from './MonacoCodeEditor'
import type {ConstrainedMonacoEditorModel} from './setupConstrainedMonaco'
import {setupConstrainedMonaco, withSuppressedConstrainedValidation} from './setupConstrainedMonaco'

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
) => {
  if (!editor) {
    return
  }
  if (editor.getValue() === documentValue) {
    constrainedModel?.updateRestrictions(context)
    return
  }
  if (constrainedModel) {
    withSuppressedConstrainedValidation(constrainedModel, () => {
      editor.setValue(documentValue)
      constrainedModel.updateRestrictions(context)
    })
    return
  }
  editor.setValue(documentValue)
}

/**
 * The React component that displays constrained code editor.
 * @param props the React component properties.
 * @returns the React element.
 */
export const ConstrainedCodeEditor = (props: CodeEditorProps) => {
  const context = useMemo(
    () => ({
      beginContextLine: props.beginContextLine,
      canEditBeginContextLine: props.canEditBeginContextLine,
      endContextLine: props.endContextLine,
    }),
    [props.beginContextLine, props.canEditBeginContextLine, props.endContextLine]
  )

  const documentValue = useMemo(
    () => buildConstrainedDocument(props.initialValue, context.beginContextLine, context.canEditBeginContextLine, context.endContextLine),
    [context, props.initialValue]
  )

  const editorRef = useRef<editor.IStandaloneCodeEditor>(null)
  const constrainedModelRef = useRef<ConstrainedMonacoEditorModel>(null)

  useEffect(() => {
    applyConstrainedEditorValue(editorRef.current, constrainedModelRef.current, documentValue, context)
  }, [context, documentValue])

  const {onChange, onMount} = props
  const handleMount: OnMount = useCallback(
    (editor, monaco) => {
      onMount?.(editor, monaco)
      editorRef.current = editor
      constrainedModelRef.current = setupConstrainedMonaco(editor, monaco, context, onChange)
    },
    [context, onChange, onMount]
  )

  const options = useMemo(
    () =>
      ({
        wordWrap: 'on',
        ...props.options,
      }) satisfies editor.IStandaloneEditorConstructionOptions,
    [props.options]
  )

  return (
    <MonacoCodeEditor
      onMount={handleMount}
      className={props.className}
      defaultValue={documentValue}
      height={props.height ?? '100%'}
      width={props.width ?? '100%'}
      language={props.language ?? 'javascript'}
      options={options}
      theme={props.theme}
    />
  )
}

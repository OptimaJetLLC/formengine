import {useComponentData} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {createElement, useCallback, useState} from 'react'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {EditorMap} from '../../annotation-editors'
import type {AnnotationEditorProps} from '../../annotation-editors/AnnotationEditorProps'
import {Annotation} from '../../annotation/types/annotations/Annotation'
import {isProperty} from '../../annotation/types/annotations/PropertyAn'
import {Erroneous} from './Erroneous'

interface ControlProps {
  annotation: Annotation
  context: Record<string, any>
}

export const PropertyEditorWrapper = observer(({annotation, context}: ControlProps) => {
  // custom editors have the highest priority
  const store = useBuilderStore()
  const componentData = useComponentData()
  const annotationEditor = store.customPropertyEditor(annotation.editor) ?? EditorMap[annotation.editor]

  const [error, setError] = useState<string>()
  const isProps = isProperty(annotation)

  const value = (isProps ? context[annotation.key]?.value : context[annotation.key]) ?? annotation.default

  const onChange = useCallback((value: any) => {
    if (isProps) {
      context[annotation.key] ??= {}
      context[annotation.key].value = value
      return
    }
    context[annotation.key] = value
  }, [context, annotation])

  const onClean = useCallback(() => delete context[annotation.key], [context, annotation])
  const showError = useCallback((message?: string) => setError(message), [])

  const annotationEditorProps: AnnotationEditorProps = {value, onChange, onClean, annotation, showError, componentData}

  return (
    <Erroneous {...annotationEditorProps} error={error}>
      {createElement(annotationEditor, annotationEditorProps)}
    </Erroneous>
  )
})

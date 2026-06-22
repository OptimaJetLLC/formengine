import type {EditorType} from '@react-form-builder/core'
import {createNonNullableContext} from '@react-form-builder/core'
import type {ComponentType} from 'react'
import type {AnnotationEditorProps} from '../annotation-editors/AnnotationEditorProps'

const [
  useBuiltinPropertyEditors,
  BuiltinPropertyEditorsProvider,
] = createNonNullableContext<Record<EditorType, ComponentType<AnnotationEditorProps>>>('BuiltinPropertyEditorsContext')

export {useBuiltinPropertyEditors, BuiltinPropertyEditorsProvider}

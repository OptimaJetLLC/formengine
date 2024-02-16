import {BuilderView, EditorType, FormViewerProps} from '@react-form-builder/core'
import type {ComponentType, ForwardedRef} from 'react'
import type {AnnotationEditorProps} from './features/annotation-editors/AnnotationEditorProps'
import type {FormBuilderI18n} from './features/localization/FormBuilderLanguage'
import type {IFormStorage} from './stores/IFormStorage'
import type {IFormBuilder} from './utils/types'

/**
 * Properties of the React Form builder component.
 */
export interface FormBuilderProps extends Omit<FormViewerProps, 'view'> {

  /**
   * All the metadata of the components of the form builder.
   */
  view: BuilderView

  /**
   * The external form storage.
   */
  formStorage?: IFormStorage

  /**
   * Custom component property editors. **Attention! Unstable API.**
   */
  propertyEditors?: Record<EditorType, ComponentType<AnnotationEditorProps>>

  /**
   * The i18n data of the form builder.
   */
  i18n?: FormBuilderI18n

  /**
   * The reference to {@link IFormBuilder}.
   */
  builderRef?: ForwardedRef<IFormBuilder>
}

import type {FormViewerProps} from '@react-form-builder/core'
import type {ComponentType} from 'react'
import type {EditorType} from './features/annotation/types'
import {BuilderView} from './features/define/utils/BuilderView'
import type {IFormStorage} from './stores/IFormStorage'

/**
 * Properties of the React Form builder component.
 */
export interface FormBuilderProps extends FormViewerProps {

  /**
   * All the metadata of the components of the form builder.
   */
  view: BuilderView

  /**
   * The external form storage.
   */
  formStorage?: IFormStorage

  /**
   * Custom component property editors.
   */
  externalPropertyEditors?: Record<EditorType, ComponentType>
}

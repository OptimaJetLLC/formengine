import type {BuilderView, EditorType, FormViewerProps} from '@react-form-builder/core'
import type {ComponentType, ForwardedRef} from 'react'
import type {AnnotationEditorProps} from './features/annotation-editors/AnnotationEditorProps'
import type {CustomizationMap} from './features/customization'
import type {FormBuilderI18n} from './features/localization/FormBuilderLanguage'
import type {IPresetComponentOptions} from './features/preset-component/IPresetComponentOptions'
import type {FormBuilderTheme} from './FormBuilderTheme'
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
   * The FormEngine license key.
   */
  licenseKey?: string

  /**
   * The external form storage.
   */
  formStorage?: IFormStorage

  /**
   * The preset component options.
   */
  presetComponentOptions?: IPresetComponentOptions

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

  /**
   * The map of customizations for the FormBuilder components.
   */
  customization?: CustomizationMap

  /**
   * The event is called whenever a form schema changes.
   * @param formSchema the current form schema serialized to JSON.
   */
  onFormSchemaChange?: (formSchema: string) => void

  /**
   * Indicates the theme preference.
   */
  theme?: FormBuilderTheme
  
  /**
   * If true, the form name will be saved to localStorage and restored when the Form builder is reopened.
   * This functionality is enabled by default.
   */
  persistFormName?: boolean
}

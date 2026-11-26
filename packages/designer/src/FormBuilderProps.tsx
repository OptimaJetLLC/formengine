import type {
  BuilderComponent,
  BuilderView,
  ComponentData,
  ComponentLibraryDescription,
  EditorType,
  FormViewerProps,
  Language,
  LanguageFullCode,
} from '@react-form-builder/core'
import type {ComponentType, ForwardedRef} from 'react'
import type {FormBuilderTheme} from './FormBuilderTheme'
import type {AnnotationEditorProps} from './features/annotation-editors/AnnotationEditorProps'
import type {CustomizationMap} from './features/customization/CustomizationMap'
import type {DesignerHotkeysProp} from './features/hotkeys/types'
import type {StylesProviderProps} from './features/localization/components/StylesProviderProps'
import type {FormBuilderI18n} from './features/localization/FormBuilderLanguage'
import type {IPresetComponentOptions} from './features/preset-component/IPresetComponentOptions'
import type {IFormStorage} from './stores/IFormStorage'
import type {IFormBuilder, InsertPosition} from './utils/types'

/**
 * The JSON schema generator.
 */
export type GenerateJsonFormSchemaOptions = {
  /**
   * The array with components metadata.
   */
  components: BuilderComponent[]
  /**
   * The component library description.
   */
  descriptions?: ComponentLibraryDescription[]
}

/**
 * Properties of the React Form builder component.
 */
export interface FormBuilderProps extends Omit<FormViewerProps, 'view' | 'language'> {
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
   * The builder language. When set, it selects the matching entry among {@link FormBuilderI18n.languages}.
   */
  defaultBuilderLanguage?: LanguageFullCode

  /**
   * The initial language of the form viewer (form localization preview), e.g. 'en-US'.
   * Unlike the removed {@link FormViewerProps.language} prop, this value is only used for the initial selection and does not lock the viewer language.
   */
  defaultViewerLanguage?: LanguageFullCode

  /**
   * The reference to {@link IFormBuilder}.
   */
  builderRef?: ForwardedRef<IFormBuilder>

  /**
   * The map of customizations for the FormBuilder components.
   */
  customization?: CustomizationMap

  /**
   * Controls the FormBuilder global keyboard shortcuts.
   * Pass `false` to disable all built-in global hotkeys so the host can register its own
   * and invoke actions through {@link IFormBuilder}. Pass an options object to remap or
   * disable individual actions.
   */
  hotkeys?: DesignerHotkeysProp

  /**
   * The event is called whenever a form schema changes.
   * @param formSchema the current form schema serialized to JSON.
   */
  onFormSchemaChange?: (formSchema: string) => void

  /**
   * Callback invoked when a component is added to the form.
   * @param payload the payload with information about the added component.
   * @param payload.source the source component.
   * @param payload.target the target component.
   * @param payload.insertPosition the position at which to insert the component.
   * @param payload.slot the target slot name.
   * @param payload.slotCondition the target slot condition.
   * @param payload.presetName the applied preset name.
   */
  onFormElementAdd?: (payload: {
    source: ComponentData
    target: ComponentData
    insertPosition?: InsertPosition
    slot?: string
    slotCondition?: string
    presetName?: string
  }) => void

  /**
   * Callback invoked when a component is removed from the form.
   * @param payload the payload with information about the removed component.
   * @param payload.source the removed component.
   */
  onFormElementRemove?: (payload: {source: ComponentData}) => void

  /**
   * A callback invoked when the language is changed in the Builder.
   * @param language the language.
   */
  onBuilderLanguageChange?: (language: Language) => void

  /**
   * A callback invoked when the form's language is changed.
   * @param language the language.
   */
  onViewerLanguageChange?: (language: Language) => void

  /**
   * Indicates the theme preference.
   */
  theme?: FormBuilderTheme

  /**
   * The component that loads the CSS.
   */
  stylesProvider?: ComponentType<StylesProviderProps>

  /**
   * If true, the form name will be saved to localStorage and restored when the Form builder is reopened.
   * This functionality is enabled by default.
   */
  persistFormName?: boolean

  /**
   * The prefix for localStorage keys.
   */
  localStoragePrefix?: string

  /**
   * The JSON schema generator for a form.
   * @param options the generator options.
   * @returns the JSON schema in string format.
   */
  generateJsonFormSchema?: (options: GenerateJsonFormSchemaOptions) => string

  /**
   * The file name for the generated JSON schema.
   */
  jsonSchemaFilename?: string
}

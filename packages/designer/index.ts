export {BuilderView} from '@react-form-builder/core'
export * from './src/FormBuilder'
export type {FormBuilderProps, GenerateJsonFormSchemaOptions} from './src/FormBuilderProps'
export type {FormBuilderTheme} from './src/FormBuilderTheme'
export type {
  AnnotationEditorProps,
  CalculableEditorProps,
  ComputePropertiesParameters,
  ComputeTypeParams,
  LocalizationComputeCodeParams,
} from './src/features/annotation-editors/AnnotationEditorProps'
export * from './src/features/components/EditableTable/CustomCells'
export * from './src/features/components/EditableTable/EditableTable'
export * from './src/features/components/EditableTable/utils'
export type {CustomizationMap} from './src/features/customization/CustomizationMap'
export type {Options} from './src/features/customization/Options'
export type {CustomizableKey} from './src/features/customization/types'
export {CustomizableZone} from './src/features/customization/types'
export type {
  DesignerHotkey,
  DesignerHotkeyAction,
  DesignerHotkeysOptions,
  DesignerHotkeysProp,
} from './src/features/hotkeys/types'
export {verifyDomain} from './src/features/license/domain'
export {isElectron} from './src/features/license/isElectron'
export type {StylesProviderProps} from './src/features/localization/components/StylesProviderProps'
export type {FormBuilderI18n, FormBuilderI18nData} from './src/features/localization/FormBuilderLanguage'
export type {IPresetComponentOptions} from './src/features/preset-component/IPresetComponentOptions'
export type {PresetComponent} from './src/features/preset-component/PresetComponent'
export {PresetComponentLocalStorage} from './src/features/preset-component/PresetComponentLocalStorage'
export {Section} from './src/features/ui/RightPanel/PropertiesEditor/Section'
export {createAddedComponentData} from './src/stores/AvailableComponents'
export type {IFormStorage} from './src/stores/IFormStorage'
export {useFormBuilder} from './src/utils/FormBuilderContext'
export {isDesignerLocalStorageEnabled} from './src/utils/isDesignerLocalStorageEnabled'
export type {IFormBuilder, InsertPosition} from './src/utils/types'

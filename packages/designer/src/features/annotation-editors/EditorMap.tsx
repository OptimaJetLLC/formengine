import type {EditorType} from '@react-form-builder/core'
import type {ComponentType} from 'react'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {ArrayInput} from './ArrayInput'
import {ArrayOfObjectInput} from './ArrayOfObjectInput'
import {ArrayOfStringInput} from './ArrayOfStringInput'
import {AttributesInput} from './AttributesInput/AttributesInput'
import {BooleanInput} from './BooleanInput'
import {ColorInput} from './ColorInput'
import {ComponentTypePicker} from './ComponentTypePicker'
import {DataKeyInput} from './DataKeyInput'
import {DateInput} from './DateInput'
import {DisableDataBindingInput} from './DisableDataBindingInput'
import {EventEditor} from './EventEditor/EventEditor'
import {FormComponentPicker} from './FormComponentPicker'
import {FormNamePicker} from './FormNamePicker'
import {FunctionEditorInput} from './FunctionEditorInput'
import {KeyInput} from './KeyInput'
import {ModalPropertiesEditor} from './ModalPropertiesEditor'
import {MultiPicker} from './MultiPicker'
import {NodeInput} from './NodeInput'
import {NumberInput} from './NumberInput'
import {ObjectInput} from './ObjectInput'
import {Picker} from './Picker'
import {RadioInput} from './RadioInput'
import {RenderWhenEditor} from './RenderWhenEditor'
import {RequiredPropertyInput} from './RequiredPropertyInput'
import {RichTextModulesInput} from './RichTextModulesInput'
import {SizeInput} from './SizeInput'
import {StringInput} from './StringInput'
import {TemplateTypePicker} from './TemplateTypePicker'
import {TimeInput} from './TimeInput'
import {TooltipPropertiesEditor} from './TooltipPropertiesEditor'
import {ComponentValidationSettingsEditor} from './ValidateEditor/ComponentValidationSettingsEditor'
import {CustomValidatorEditor} from './ValidateEditor/CustomValidatorEditor'

export const EditorMap: Record<EditorType, ComponentType<AnnotationEditorProps>> = {
  key: KeyInput,
  dataKey: DataKeyInput,
  disableDataBinding: DisableDataBindingInput,
  htmlAttributes: AttributesInput,
  validation: ComponentValidationSettingsEditor,
  string: StringInput,
  boolean: BooleanInput,
  number: NumberInput,
  date: DateInput,
  time: TimeInput,
  size: SizeInput,
  array: ArrayInput,
  object: ObjectInput,
  richTextModules: RichTextModulesInput,
  required: RequiredPropertyInput,
  arrayOfString: ArrayOfStringInput,
  arrayOfObject: ArrayOfObjectInput,
  color: ColorInput,
  event: EventEditor,
  oneOf: Picker,
  someOf: MultiPicker,
  radio: RadioInput,
  tooltipProps: TooltipPropertiesEditor,
  modalProps: ModalPropertiesEditor,
  useTooltip: BooleanInput,
  renderWhen: RenderWhenEditor,
  customValidator: CustomValidatorEditor,
  function: FunctionEditorInput,
  node: NodeInput,
  formComponent: FormComponentPicker,
  componentType: ComponentTypePicker,
  formNamePicker: FormNamePicker,
  templateTypePicker: TemplateTypePicker,
}

import type {EditorType} from '@react-form-builder/core'
import type {ComponentType} from 'react'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {ArrayInput} from './ArrayInput'
import {ArrayOfStringInput} from './ArrayOfStringInput'
import {AttributesInput} from './AttributesInput'
import {BooleanInput} from './BooleanInput'
import {ColorInput} from './ColorInput'
import {DateInput} from './DateInput'
import {EventEditor} from './EventEditor'
import {KeyInput} from './KeyInput'
import {MultiPicker} from './MultiPicker'
import {NumberInput} from './NumberInput'
import {ObjectInput} from './ObjectInput'
import {Picker} from './Picker'
import {RadioInput} from './RadioInput'
import {RenderWhenEditor} from './RenderWhenEditor'
import {SizeInput} from './SizeInput'
import {StringInput} from './StringInput'
import {TooltipPropertiesEditor} from './TooltipPropertiesEditor'
import {ComponentValidationSettingsEditor} from './ValidateEditor'
import {CustomValidatorEditor} from './ValidateEditor/CustomValidatorEditor'

export const EditorMap: Record<EditorType, ComponentType<AnnotationEditorProps>> = {
  key: KeyInput,
  htmlAttributes: AttributesInput,
  validation: ComponentValidationSettingsEditor,
  string: StringInput,
  boolean: BooleanInput,
  number: NumberInput,
  date: DateInput,
  size: SizeInput,
  array: ArrayInput,
  object: ObjectInput,
  arrayOfString: ArrayOfStringInput,
  color: ColorInput,
  event: EventEditor,
  oneOf: Picker,
  someOf: MultiPicker,
  radio: RadioInput,
  tooltipProps: TooltipPropertiesEditor,
  useTooltip: BooleanInput,
  renderWhen: RenderWhenEditor,
  customValidator: CustomValidatorEditor
}

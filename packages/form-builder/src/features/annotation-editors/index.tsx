import type {ComponentType} from 'react'
import type {EditorType} from '../annotation/types'
import {ErrorConfig} from '../validation/ErrorConfig'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {ArrayInput} from './ArrayInput'
import {ArrayOfStringInput} from './ArrayOfStringInput'
import {AttributesInput} from './AttributesInput'
import {BooleanInput} from './BooleanInput'
import {ChildViewer} from './ChildViewer'
import {ColorInput} from './ColorInput'
import {DateInput} from './DateInput'
import {EventEditor} from './EventEditor'
import {KeyInput} from './KeyInput'
import {MultiPicker} from './MultiPicker'
import {NumberInput} from './NumberInput'
import {Picker} from './Picker'
import {RadioInput} from './RadioInput'
import {RenderWhenEditor} from './RenderWhenEditor'
import {SizeInput} from './SizeInput'
import {StringInput} from './StringInput'
import {TooltipPropertiesEditor} from './TooltipPropertiesEditor'
import {TooltipTypePicker} from './TooltipTypePicker'
import {ComponentValidationSettingsEditor} from './ValidateEditor'

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
  arrayOfString: ArrayOfStringInput,
  color: ColorInput,
  event: EventEditor,
  node: ChildViewer,
  oneOf: Picker,
  someOf: MultiPicker,
  radio: RadioInput,
  tooltipType: TooltipTypePicker,
  tooltipProps: TooltipPropertiesEditor,
  useTooltip: BooleanInput,
  renderWhen: RenderWhenEditor,
  errorConfig: ErrorConfig
}

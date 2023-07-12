import type {ComponentType} from 'react'
import type {EditorType} from '../annotation/types'
import {ErrorConfig} from '../validation/ErrorConfig'
import {ArrayInput} from './ArrayInput'
import AttributesInput from './AttributesInput'
import {BooleanInput} from './BooleanInput'
import {ChildViewer} from './ChildViewer'
import {ColorInput} from './ColorInput'
import {EventEditor} from './EventEditor'
import {KeyInput} from './KeyInput'
import {MultiPicker} from './MultiPicker'
import {NumberInput} from './NumberInput'
import {Picker} from './Picker'
import {RadioInput} from './RadioInput'
import {RenderWhenEditor} from './RenderWhenEditor'
import {SetInput} from './SetInput'
import {SizeInput} from './SizeInput'
import {StringInput} from './StringInput'
import {StyleEditor} from './StyleEditor'
import {TooltipPropertiesEditor} from './TooltipPropertiesEditor'
import {TooltipTypePicker} from './TooltipTypePicker'
import {ValidateEditor} from './ValidateEditor'

//TODO return annotation map to annotation
export const EditorMap: Record<EditorType, ComponentType> = {
  key: KeyInput,
  htmlAttributes: AttributesInput,
  stylization: StyleEditor,
  validation: ValidateEditor,
  string: StringInput,
  boolean: BooleanInput,
  number: NumberInput,
  size: SizeInput,
  array: ArrayInput,
  set: SetInput,
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

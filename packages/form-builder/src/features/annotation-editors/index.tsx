import {ComponentType} from 'react'
import {Annotation} from '../annotation/types/annotations/Annotation'
import {Section, SubSection} from '../ui/RightPanel/PropertiesEditor/Section'
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

//TODO change string type
export const EditorMap: Record<string, ComponentType> = {
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
}

const SectionMap: Record<string, Section> = {
  validation: Section.Rules,
  event: Section.Actions,
}

const SubSectionMap: Record<string, SubSection> = {
  htmlAttributes: SubSection.Additional,
  tooltipProps: SubSection.Tooltip,
  useTooltip: SubSection.Tooltip,
  renderWhen: SubSection.Additional,
}

export const bySection = (section: string) => (annotation: Annotation) => (SectionMap[annotation.editor] ?? Section.Main) === section

export const bySubSection = (section?: string) => (annotation: Annotation) => SubSectionMap[annotation.editor] === section

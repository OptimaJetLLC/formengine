import type {Definer, Model} from '@react-form-builder/core'
import richTextEditorEnUsComponentsDescriptions from './i18n/en-US.json'
import type {RichTextEditorProps} from './RichTextEditor'
import {richTextEditor} from './RichTextEditor'

export const richTextComponent: Definer<RichTextEditorProps> = richTextEditor
export const richTextModel: Model = richTextEditor.build().model
export type {RichTextEditorProps} from './RichTextEditor'

export {richTextEditorEnUsComponentsDescriptions}
export {richTextEditorComponentsDescriptions} from './i18n/richTextEditorComponentsDescriptions'

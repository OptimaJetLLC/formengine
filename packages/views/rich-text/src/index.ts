import richTextEditorEnUsComponentsDescriptions from './i18n/en-US.json'
import {richTextEditor} from './RichTextEditor'

export const richTextComponent = richTextEditor
export const richTextModel = richTextEditor.build().model
export type {RichTextEditorProps} from './RichTextEditor'

export {richTextEditorEnUsComponentsDescriptions}
export {richTextEditorComponentsDescriptions} from './i18n/richTextEditorComponentsDescriptions'

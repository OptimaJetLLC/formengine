import type {ComponentData} from '../../utils/contexts/ComponentDataContext'
import {createAnnotation, string} from '../annotation'
import {toArray} from '../annotation/toArray'
import {Meta} from '../define/utils/Meta'
import {isTemplateType} from '../ui/templateUtil'
import type {ModalProps} from './Modal'
import {modalModel} from './modalModel'

const modalProperties = toArray<ModalProps>({
  modalTemplate: string.required.setup({editor: 'componentType'}).withEditorProps({
    filter: (componentData: ComponentData) => isTemplateType(componentData.model.type)
  })
})

const modalProps = createAnnotation('modalProps')

const modalModules = [
  modalProps.build('modalProps')
]

export const modalMeta = new Meta(modalModel.type, modalProperties, [], [], modalModules,
  undefined, undefined, modalModel.kind)

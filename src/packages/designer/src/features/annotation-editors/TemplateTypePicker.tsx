import {getTemplateName, isTemplateType} from '@react-form-builder/core'
import {useMemo} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {SInputPicker} from './SInputPicker'

/**
 * The property editor for picking a template type by filter.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const TemplateTypePicker = (props: AnnotationEditorProps) => {
  const {availableComponents} = useBuilderStore()
  const {value, onChange, annotation, onClean} = props
  const {...editorProps} = {...props.annotation.editorProps}

  const labelChildren = useMemo(() => {
    return Object.values(availableComponents)
      .flatMap(component => component)
      .filter(({store}) => isTemplateType(store.type))
      .map(cd => ({value: cd.store.type, label: getTemplateName(cd.store.type)}))
  }, [availableComponents])

  return <LabeledProperty {...props}>
    <SInputPicker value={value ?? annotation.default ?? ''} data={labelChildren} onChange={onChange} onClean={onClean}
                  block cleanable size={'xs'} {...editorProps} placement={'autoVerticalEnd'}/>
  </LabeledProperty>
}

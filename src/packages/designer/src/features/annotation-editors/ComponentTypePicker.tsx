import {useMemo} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {SInputPicker} from './SInputPicker'

/**
 * The property editor for picking a component type by filter.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ComponentTypePicker = (props: AnnotationEditorProps) => {
  const {availableComponents} = useBuilderStore()
  const {value, onChange, annotation, onClean} = props
  const {filter = undefined, ...editorProps} = {...props.annotation.editorProps}

  const labelChildren = useMemo(() => {
    return Object.values(availableComponents)
      .flatMap(component => component)
      .filter(cd => filter?.(cd) ?? true)
      .map(cd => ({value: cd.model.type, label: cd.model.name}))
  }, [availableComponents, filter])

  return <LabeledProperty {...props}>
    <SInputPicker value={value ?? annotation.default ?? ''} data={labelChildren} onChange={onChange} onClean={onClean}
                  block cleanable size={'xs'} {...editorProps} placement={'autoVerticalEnd'}/>
  </LabeledProperty>
}

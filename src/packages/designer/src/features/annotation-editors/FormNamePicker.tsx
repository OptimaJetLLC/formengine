import {getTemplateName, isTemplateType} from '@react-form-builder/core'
import {useMemo} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {SInputPicker} from './SInputPicker'

/**
 * The property editor for picking a form name by filter.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const FormNamePicker = (props: AnnotationEditorProps) => {
  const {availableComponents} = useBuilderStore()
  const {value, onChange, annotation, onClean} = props
  const {filter = undefined, ...editorProps} = {...props.annotation.editorProps}

  const labelChildren = useMemo(() => {
    return Object.values(availableComponents)
      .flatMap(component => component)
      .filter(({store}) => isTemplateType(store.type))
      .map(({store}) => {
        const value = getTemplateName(store.type)
        return {value, label: value}
      })
  }, [availableComponents])

  return <LabeledProperty {...props}>
    <SInputPicker value={value ?? annotation.default ?? ''} data={labelChildren} onChange={onChange} onClean={onClean}
                  block cleanable size={'xs'} {...editorProps} placement={'autoVerticalEnd'}
                  data-testid={`${props.annotation.key}-form-name-picker`}/>
  </LabeledProperty>
}

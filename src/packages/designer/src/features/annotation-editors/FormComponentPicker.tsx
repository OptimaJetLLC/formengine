import {useMemo} from 'react'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {SInputPicker} from './SInputPicker'

/**
 * The property editor for picking a component key by filter.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const FormComponentPicker = (props: AnnotationEditorProps) => {
  const {value, onChange, annotation, onClean} = props
  const root = props.componentData.root
  const {filter = undefined, ...editorProps} = {...props.annotation.editorProps}

  const labelChildren = useMemo(() => {
    return root.allChildren
      .filter(cd => filter?.(cd) ?? true)
      .map(cd => ({value: cd.key, label: cd.key}))
  }, [root.allChildren, filter])

  return <LabeledProperty {...props}>
    <SInputPicker value={value ?? annotation.default ?? ''} data={labelChildren} onChange={onChange} onClean={onClean}
                  block cleanable size={'xs'} {...editorProps} placement={'autoVerticalEnd'}
                  data-testid={`${props.annotation.key}-component-key-by-filter-picker`}/>
  </LabeledProperty>
}

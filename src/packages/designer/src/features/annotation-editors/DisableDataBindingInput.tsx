import {useCallback} from 'react'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {BooleanInput} from './BooleanInput'

/**
 * The property editor for the 'disable data binding' property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const DisableDataBindingInput = (props: AnnotationEditorProps) => {
  const {store} = props.componentData
  const value = store.disableDataBinding?.value

  const onChange = useCallback((value: boolean) => {
    store.disableDataBinding = {value}
  }, [store])

  const onClean = useCallback(() => {
    store.disableDataBinding = undefined
  }, [store])

  return <BooleanInput {...props} value={value} onChange={onChange} onClean={onClean}/>
}

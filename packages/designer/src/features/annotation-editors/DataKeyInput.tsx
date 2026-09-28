import {useCallback} from 'react'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {StringInput} from './StringInput'

/**
 * The property editor for the data key property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const DataKeyInput = (props: AnnotationEditorProps) => {
  const {componentData} = props
  const value = componentData.store.dataKey

  const onChange = useCallback(
    (value: string) => {
      // eslint-disable-next-line react-hooks/immutability
      componentData.store.dataKey = value
    },
    [componentData]
  )

  const onClean = useCallback(() => {
    // eslint-disable-next-line react-hooks/immutability
    componentData.store.dataKey = undefined
  }, [componentData])

  return <StringInput {...props} value={value} onChange={onChange} onClean={onClean} />
}

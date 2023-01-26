import {useCallback, useState} from 'react'
import {useAnnotation} from '../../../utils/contexts/EditorContext'
import {isProperty} from './annotations/PropertyAn'

export const useEditor = () => {
  const {annotation, getContext} = useAnnotation()
  const [context] = useState(getContext)
  const isProps = isProperty(annotation)
  const value = (isProps ? context[annotation.key]?.value : context[annotation.key]) ?? annotation.schema?.getDefault()
  const onChange = useCallback((value: any) => {
    if (isProps) {
      context[annotation.key] ??= {}
      context[annotation.key].value = value
      return
    }
    context[annotation.key] = value
  }, [])
  const onRemove = useCallback(() => delete context[annotation.key], [])

  return {value, onChange, onRemove, annotation}
}

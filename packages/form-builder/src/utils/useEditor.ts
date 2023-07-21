import {useCallback, useState} from 'react'
import {isProperty} from '../features/annotation/types/annotations/PropertyAn'
import {useAnnotation} from './EditorContext'

/**
 * @returns the '{value, onChange, onRemove, annotation}' object containing all the necessary data for the component's property editor.
 */
export const useEditor = () => {
  const {annotation, getContext} = useAnnotation()
  const [context] = useState(getContext)
  const isProps = isProperty(annotation)
  const value = (isProps ? context[annotation.key]?.value : context[annotation.key]) ?? annotation.default

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

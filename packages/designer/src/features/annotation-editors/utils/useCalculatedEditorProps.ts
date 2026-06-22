import type {Annotation, ComponentData} from '@react-form-builder/core'
import {useMemo} from 'react'

/**
 * Hook to calculate editor props based on annotation editor props and component data.
 * @param annotation the annotation editor annotation.
 * @param componentData the component data.
 * @returns the calculated editor props with applied calculateEditorProps function.
 */
export function useCalculatedEditorProps(annotation: Annotation, componentData: ComponentData) {
  const {componentState} = componentData
  const calculatedComponentProps = componentState.ownProps

  return useMemo(() => {
    const {calculateEditorProps, ...editorProps} = annotation.editorProps ?? {}
    return {
      ...editorProps,
      ...calculateEditorProps?.(calculatedComponentProps)
    }
  }, [annotation.editorProps, calculatedComponentProps])
}

import {useCallback} from 'react'
import type {ComputeChildren} from '../../utils/ComputeChildren'
import {ComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {getChildren} from '../../utils/getChildren'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'

/**
 * @returns the function that calculates all child properties of a component.
 */
export const useComputeChildren = (): ComputeChildren => {
  const formViewerProps = useViewerProps()
  const formViewerStore = useStore()

  return useCallback((componentData: ComponentData, componentProps: Record<string, any>) => {
    if (formViewerProps.computeChildren) return formViewerProps.computeChildren(componentData, componentProps)
    return getChildren(componentData, formViewerStore.form.componentTree, formViewerStore.componentTreeRenderer, componentProps)
  }, [formViewerProps.computeChildren, formViewerStore.form.componentTree, formViewerStore.componentTreeRenderer])
}

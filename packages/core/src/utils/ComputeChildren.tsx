import {ComponentData} from './contexts/ComponentDataContext'

/**
 * Function that calculates all child properties of a component.
 */
export type ComputeChildren = (componentData: ComponentData,
                               componentProps: Record<string, any>) => Record<string, any>

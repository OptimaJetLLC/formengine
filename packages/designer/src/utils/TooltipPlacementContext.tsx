import {createNonNullableContext} from '@react-form-builder/core'
import type {TypeAttributes} from 'rsuite/esm/internals/types'

const [
  /**
   * **Internal use only.**
   */
  useTooltipPlacement,
  /**
   * **Internal use only.**
   */
  TooltipPlacementProvider,
] = createNonNullableContext<TypeAttributes.Placement>('TooltipPlacementContext')

export {TooltipPlacementProvider, useTooltipPlacement}

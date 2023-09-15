import {createNonNullableContext} from '@react-form-builder/core'
import type {TypeAttributes} from 'rsuite/esm/@types/common'

const [useTooltipPlacement, TooltipPlacementProvider] = createNonNullableContext<TypeAttributes.Placement>('TooltipPlacementContext')

export {useTooltipPlacement, TooltipPlacementProvider}

import React from 'react'
import {ComponentDefinition} from '../../../../../features/annotation/utils/ComponentDefinition'

export interface ToolbarItem {
  title?: any,
  controls: ComponentDefinition<any>[],
}

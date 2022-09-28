import React from 'react'
import {Definition} from '../../../../../features/define'

export interface ToolbarItem {
  title?: any,
  controls: Definition<any>[],
}

import {screenModel, ScreenProps} from 'fb-core'
import {node, tooltipType} from '../annotation'
import {Meta, modules, toArray} from '../define'

export const screenMeta = new Meta(screenModel.type,
  toArray<ScreenProps>({
    children: node,
    tooltipType: tooltipType.calculable(false),
  }), [], modules)

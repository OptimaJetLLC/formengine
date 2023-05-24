import {screenModel, ScreenProps} from '@react-form-builder/core'
import {errorConfig, node, tooltipType} from '../annotation'
import {Meta, modules, toArray} from '../define'

export const screenMeta = new Meta(screenModel.type,
  toArray<ScreenProps>({
    children: node,
    tooltipType: tooltipType.calculable(false),
    errorConfig
  }), [], modules)

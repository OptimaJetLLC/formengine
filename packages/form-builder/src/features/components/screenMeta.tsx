import {screenModel, ScreenProps} from '@react-form-builder/core'
import {node} from '../annotation'
import {Meta, modules, toArray} from '../define'

export const screenMeta = new Meta(screenModel.type,
  toArray<ScreenProps>({
    children: node
  }), [], modules)

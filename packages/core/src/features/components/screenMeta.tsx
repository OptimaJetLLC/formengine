import type {ScreenProps} from '../../types'
import {node} from '../annotation'
import {toArray} from '../define'
import {modules} from '../define/constants'
import {Meta} from '../define/utils/Meta'
import {screenModel} from '../ui/screenModel'

export const screenMeta = new Meta(screenModel.type,
  toArray<ScreenProps>({
    children: node
  }), [], modules)

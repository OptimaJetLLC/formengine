import type {ScreenProps} from '../../types'
import {node} from '../annotation'
import {toArray} from '../annotation/toArray'
import {modules} from '../define/constants'
import {Meta} from '../define/utils/Meta'
import {screenModel, screenStyleProperties} from '../ui/screenModel'

export const screenMeta = new Meta(
  screenModel.type,
  toArray<ScreenProps>({children: node}),
  screenStyleProperties,
  [],
  modules,
  undefined,
  undefined,
  'container'
)

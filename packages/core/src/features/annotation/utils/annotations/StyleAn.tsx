import {CSSProperties} from 'react'
import {Styles} from '../../../style/types'
import {Annotation} from './Annotation'

export class StyleAn extends Annotation {
  readonly css?: {
    readonly string?: string
    readonly object?: object
  }
  readonly className?: string
  readonly inline?: CSSProperties
  readonly default?: Styles
}

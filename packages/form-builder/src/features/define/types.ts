import {CSSObject} from '@emotion/serialize/dist/declarations/types'
import {ActionsInitializer} from 'fb-core'
import {ComponentType, ReactNode} from 'react'
import {BaseBuilder} from '../annotation/utils/builders/BaseBuilder'

export type Annotations<T extends object> =
  {
    [key in keyof T]: BaseBuilder<T[key]> | undefined
  }

export type DefinerData<T extends object> = {
  readonly view: ComponentType<T>,
  name?: string,
  category?: string,
  cssString?: string,
  cssObject?: Annotations<CSSObject>,
  readonly actionsInitializer?: ActionsInitializer,

  properties?: Annotations<T>,
  customPreview?: ReactNode,
}

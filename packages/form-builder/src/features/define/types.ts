import {BaseBuilder} from '../annotation/utils/builders/BaseBuilder'

export type Annotations<T extends object> =
  {
    [key in keyof T]: BaseBuilder<T[key]> | undefined
  }

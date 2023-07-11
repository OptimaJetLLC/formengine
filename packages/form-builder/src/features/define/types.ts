import {BaseBuilder} from '../annotation/utils/builders/BaseBuilder'

/**
 * The type-safe description of the component's metadata property builders.
 */
export type Annotations<T extends object> =
  {
    [key in keyof T]: BaseBuilder<T[key]> | undefined
  }

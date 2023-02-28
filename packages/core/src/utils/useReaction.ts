import {IReactionOptions, IReactionPublic, reaction} from 'mobx'
import {DependencyList, useEffect} from 'react'

export const useReaction = <T, FireImmediately extends boolean = false>(
  expression: (r: IReactionPublic) => T,
  effect: (arg: T, prev: FireImmediately extends true ? (T | undefined) : T, r: IReactionPublic) => void,
  deps?: DependencyList,
  opts?: IReactionOptions<T, FireImmediately>,
) => {
  useEffect(() => reaction(expression, effect, opts), deps)
}

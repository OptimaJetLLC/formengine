import {useMemo} from 'react'

/**
 * Returns the memoized conversion value over an array.
 * @param array the array.
 * @param mapFn the conversion function.
 * @returns the memoized conversion value over an array.
 */
export const useArrayMapMemo = <T, R>(array: T[] | undefined,
                                      mapFn: (item: T, index: number, array: T[]) => R) => {
  const length = array?.length
  return useMemo(() => {
    if (!length) return []
    return array.map(mapFn)
  }, [array, length, mapFn])
}

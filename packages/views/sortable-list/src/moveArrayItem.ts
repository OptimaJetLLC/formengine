/**
 * Returns a copy of the array with the item moved from one index to another.
 * @param items the source array.
 * @param fromIndex the index of the item to move.
 * @param toIndex the destination index.
 * @returns a new array, or the same array if the move is a no-op.
 */
export function moveArrayItem<T>(items: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return items
  if (fromIndex >= items.length || toIndex >= items.length) return items
  const next = [...items]
  const [item] = next.splice(fromIndex, 1)
  next.splice(toIndex, 0, item)
  return next
}

/**
 * Maps sortable (visible-row) indices to value-array indices.
 * @param valueIndices the value-array index for each visible row, in visible order.
 * @param fromSortableIndex the drag source index in the visible list.
 * @param toSortableIndex the drop target index in the visible list.
 * @returns the value-array from/to indices, or undefined when either entry is missing or not finite.
 */
export function resolveValueReorderIndices(
  valueIndices: readonly number[],
  fromSortableIndex: number,
  toSortableIndex: number
): {fromIndex: number; toIndex: number} | undefined {
  const fromIndex = valueIndices[fromSortableIndex]
  const toIndex = valueIndices[toSortableIndex]
  if (!Number.isFinite(fromIndex) || !Number.isFinite(toIndex)) return
  return {fromIndex, toIndex}
}

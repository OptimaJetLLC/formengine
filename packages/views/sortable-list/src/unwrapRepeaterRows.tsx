import type {ComponentData, ComponentTreeProps} from '@react-form-builder/core'
import {ComponentTree} from '@react-form-builder/core'
import type {ComponentType, ReactElement, ReactNode} from 'react'
import {isValidElement, useMemo} from 'react'

/**
 * A sortable row produced from Repeater-cloned ComponentTree children.
 */
interface SortableRowSource {
  /**
   * Stable unique id for React keys and dnd-kit (must not be the value index).
   */
  id: string
  /**
   * The index of this row in the repeater value array.
   */
  valueIndex: number
  /**
   * The React node for a single row.
   */
  node: ReactNode
}

interface RowTreeProps {
  componentData: ComponentData
  componentDataViewer?: ComponentType
}

const RowTree = ({componentData, componentDataViewer}: RowTreeProps) => {
  const data = useMemo(() => [componentData], [componentData])
  return <ComponentTree data={data} componentDataViewer={componentDataViewer} />
}

/**
 * Splits a Repeater `children` ComponentTree into one tree per row.
 * @param children the Repeater viewer children.
 * @returns the rows, or undefined when children are not a ComponentTree of items.
 */
export function unwrapRepeaterRows(children: ReactNode): SortableRowSource[] | undefined {
  if (!isValidElement(children) || children.type !== ComponentTree) return
  const {data, componentDataViewer} = children.props as ComponentTreeProps
  if (!Array.isArray(data)) return
  return data.map((componentData, index) => {
    const valueIndex = componentData.index ?? index
    const node: ReactElement = <RowTree componentData={componentData} componentDataViewer={componentDataViewer} />
    return {id: componentData.id, valueIndex, node}
  })
}

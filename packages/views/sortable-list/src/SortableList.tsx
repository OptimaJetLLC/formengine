import {PointerActivationConstraints} from '@dnd-kit/dom'
import type {DragEndEvent} from '@dnd-kit/react'
import {DragDropProvider, KeyboardSensor, PointerSensor} from '@dnd-kit/react'
import {isSortable} from '@dnd-kit/react/sortable'
import {
  array,
  containerStyles,
  define,
  disabled,
  node,
  RepeaterPropsProvider,
  readOnly,
  string,
  useBuilderMode,
  useComponentData,
  useStore,
} from '@react-form-builder/core'
import type {ReactNode} from 'react'
import {useCallback, useMemo, useState} from 'react'
import {SortableListIcon} from './icon'
import {moveArrayItem} from './moveArrayItem'
import {resolveValueReorderIndices} from './resolveValueReorderIndices'
import type {SortableListProps} from './SortableListProps'
import {SortableRow} from './SortableRow'
import {unwrapRepeaterRows} from './unwrapRepeaterRows'

const {flexDirection, gap} = containerStyles

/** Matches legacy SortableList pointer activation (including when the target is the drag handle). */
const pointerActivationDistance = 5

const pointerSensor = PointerSensor.configure({
  activationConstraints: event => {
    if (event.pointerType === 'touch') {
      return [new PointerActivationConstraints.Delay({value: 250, tolerance: pointerActivationDistance})]
    }
    return [new PointerActivationConstraints.Distance({value: pointerActivationDistance})]
  },
})

const sensors = [pointerSensor, KeyboardSensor]

interface ListContentProps {
  viewerMode: boolean
  insideTemplate: boolean
  children: ReactNode
  className?: string
  wrapperClassName?: string
  rows: ReturnType<typeof unwrapRepeaterRows>
  /**
   * Remount token bumped after a successful reorder (not on row edits).
   */
  listIdentity: number
  sortingDisabled: boolean
  reorderHandleAriaLabel: string
  handleDragEnd: (event: DragEndEvent) => void
}

const renderListContent = ({
  viewerMode,
  insideTemplate,
  children,
  className,
  wrapperClassName,
  rows,
  listIdentity,
  sortingDisabled,
  reorderHandleAriaLabel,
  handleDragEnd,
}: ListContentProps): ReactNode => {
  if (viewerMode && !children) return null

  if (!viewerMode && !insideTemplate) {
    return (
      <div className={wrapperClassName}>
        <div className={className}>{children}</div>
      </div>
    )
  }

  if (!viewerMode || !rows || sortingDisabled) {
    return <div className={wrapperClassName}>{rows ? rows.map(row => <div key={row.id}>{row.node}</div>) : children}</div>
  }

  return (
    <DragDropProvider key={listIdentity} sensors={sensors} onDragEnd={handleDragEnd}>
      <div className={wrapperClassName}>
        {rows.map((row, index) => (
          <SortableRow key={row.id} id={row.id} index={index} reorderHandleAriaLabel={reorderHandleAriaLabel}>
            {row.node}
          </SortableRow>
        ))}
      </div>
    </DragDropProvider>
  )
}

const SortableList = (props: SortableListProps) => {
  const {wrapperClassName, className, children, value, disabled, readOnly: isReadOnly, reorderHandleAriaLabel = 'Reorder row'} = props
  const viewerMode = useBuilderMode() === 'viewer'
  const store = useStore()
  const insideTemplate = store.parentStore
  const {field} = useComponentData()
  const sortingDisabled = Boolean(disabled || isReadOnly)
  const rows = viewerMode ? unwrapRepeaterRows(children) : undefined
  const [listIdentity, setListIdentity] = useState(0)

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (event.canceled) return
      const {source} = event.operation
      if (!isSortable(source) || !rows) return
      const {initialIndex, index} = source
      if (initialIndex === index) return
      const resolved = resolveValueReorderIndices(
        rows.map(row => row.valueIndex),
        initialIndex,
        index
      )
      if (!resolved) return
      const current = Array.isArray(value) ? value : []
      field?.setValue(moveArrayItem(current, resolved.fromIndex, resolved.toIndex))
      setListIdentity(prev => prev + 1)
    },
    [field, rows, value]
  )

  const repeaterProps = useMemo(
    () => ({
      value,
      itemRenderWhen: props.itemRenderWhen,
      className,
      wrapperClassName,
      children,
    }),
    [value, props.itemRenderWhen, className, wrapperClassName, children]
  )

  const content = renderListContent({
    viewerMode,
    insideTemplate: Boolean(insideTemplate),
    children,
    className,
    wrapperClassName,
    rows,
    listIdentity,
    sortingDisabled,
    reorderHandleAriaLabel,
    handleDragEnd,
  })

  return <RepeaterPropsProvider value={repeaterProps}>{content}</RepeaterPropsProvider>
}

export const sortableList = define(SortableList, 'SortableList')
  .kind('repeater')
  .category('structure')
  .icon(SortableListIcon)
  .skipChildrenDuringFieldCollection()
  .props({
    itemRenderWhen: string.notLocalize,
    value: array.valued.setup({editor: 'arrayOfObject'}),
    disabled,
    readOnly,
    reorderHandleAriaLabel: string.default('Reorder row'),
    children: node,
  })
  .css({
    display: string.default('flex').hideEditor(),
    flexDirection: flexDirection.default('column').named('Item direction').hinted('Item direction'),
    gap: gap.default('20px').named('Item gap').hinted('Item gap'),
  })
  .wrapperCss({
    display: string.default('flex').hideEditor(),
    flexDirection: flexDirection.default('column').hinted('List direction'),
    gap: gap.default('20px').hinted('List gap'),
  })

import {namedObserver, useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import {useEffect, useRef} from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'
import {Toolbar} from '../../../dnd/components/Editable/components/Toolbar'
import {useSelection} from '../../../dnd/components/Editable/hooks/useSelection'
import styles from './Tree.module.css'

const RawNonVisualListItem = () => {
  const componentData = useComponentData()
  const [{selected, hovered}, selectionHandlers] = useSelection()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selected && ref.current) {
      scrollIntoView(ref.current, {scrollMode: 'if-needed'})
    }
  }, [selected])

  return (
    <div
      ref={ref}
      className={cx(styles.listItem, hovered && styles.listItemHovered, selected && styles.listItemSelected)}
      data-testid={componentData.key}
      {...selectionHandlers}
    >
      <span>{componentData.key}</span>
      <label>{componentData.model.name}</label>
      {hovered && <Toolbar compact/>}
    </div>
  )
}

export const NonVisualListItem = namedObserver('NonVisualListItem', RawNonVisualListItem)

import {useComponentData} from '@react-form-builder/core'
import {Plus as PlusIcon} from '@rsuite/icons'
import cx from 'clsx'
import type {HTMLAttributes} from 'react'
import {forwardRef, useCallback, useMemo} from 'react'
import {IconButton} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import styles from './DropView.module.css'

interface DropViewProps {
  className?: string
  slot?: string
  slotCondition?: string
}

const AddButton = ({slot, slotCondition}: { slot?: string, slotCondition?: string }) => {
  const builderStore = useBuilderStore()
  const target = useComponentData()
  const handleClick = useCallback(() => {
    builderStore.showComponentsModal(source => {
      builderStore.add(source, target, 'inner', slot, slotCondition)
    }, componentData => {
      return builderStore.canAddComponent(componentData, target, 'inner', slot)
    })
  }, [builderStore, target, slot, slotCondition])

  const plusIcon = useMemo(() => <PlusIcon/>, [])

  return <IconButton onClick={handleClick} icon={plusIcon} color="green" data-testid="add-button" appearance={'primary'} circle
                     size={'xs'}/>
}

/**
 * The React form builder component that displays the inner container into which you can drag and drop a component.
 * @param props the React component properties.
 * @returns the React element.
 */
export const InnerDropView = forwardRef<HTMLDivElement, DropViewProps>(({slot, slotCondition, className}, ref) => {
  return (
    <div
      ref={ref}
      className={cx(styles.innerContainer, className)}
      data-testid="inner-dropzone"
    >
      <AddButton slot={slot} slotCondition={slotCondition}/>
    </div>
  )
})
InnerDropView.displayName = 'InnerDropView'

/**
 * The React form builder component that displays the container into which you can drag and drop a component.
 * @param props the React component properties.
 * @returns the React element.
 */
export const DropView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => {
    return <div {...props} ref={ref} className={cx(styles.dropView, className)}/>
  }
)
DropView.displayName = 'DropView'

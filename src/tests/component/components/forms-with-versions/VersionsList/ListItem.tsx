import {faMarker} from '@fortawesome/free-solid-svg-icons'
import {Close} from '@rsuite/icons'
import cx from 'clsx'
import {useCallback} from 'react'
import {ButtonGroup, IconButton} from 'rsuite'
import {FaIcon} from './Icons'
import styles from './ListItem.module.css'

interface ListItemProps {
  version: number,
  active: boolean,
  onSelect: (formVersion: number) => void,
  onDelete: (version: number) => void
}

/**
 * The list item.
 * @param props the list item props.
 * @returns the React element.
 */
export const ListItem = (props: ListItemProps) => {
  const {version, active, onSelect, onDelete} = props

  const handleSelect = useCallback(() => onSelect(version), [onSelect, version])
  const handleDelete = useCallback(() => onDelete(version), [onDelete, version])

  return <div className={styles.item}>
    <label className={cx(styles.label, active && styles.labelActive)}>{version}</label>
    <ButtonGroup>
      <IconButton onClick={handleSelect} size="xs" icon={<FaIcon icon={faMarker}/>}
                  data-testid={`version-list-open-item-${version}`}/>
      <IconButton onClick={handleDelete} size="xs" icon={<Close/>}/>
    </ButtonGroup>
  </div>
}

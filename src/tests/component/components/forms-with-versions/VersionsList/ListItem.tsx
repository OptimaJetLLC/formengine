import {faMarker} from '@fortawesome/free-solid-svg-icons'
import {Close} from '@rsuite/icons'
import type {CSSProperties} from 'react'
import {useCallback} from 'react'
import {ButtonGroup, IconButton} from 'rsuite'
import {FaIcon} from './Icons'

const itemStyle: CSSProperties = {
  display: 'flex',
  backgroundColor: 'var(--rs-btn-default-bg)',
  borderRadius: 10,
  padding: 8,
  paddingInlineStart: 12,
  alignItems: 'center',
  userSelect: 'none',
  justifyContent: 'space-between'
}

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
  const color = active ? 'var(--rs-navs-selected)' : 'var(--rs-text-secondary)'

  const handleSelect = useCallback(() => onSelect(version), [onSelect, version])
  const handleDelete = useCallback(() => onDelete(version), [onDelete, version])

  return <div style={itemStyle}>
    <label style={{color}}>{version}</label>
    <ButtonGroup>
      <IconButton onClick={handleSelect} size="xs" icon={<FaIcon icon={faMarker}/>}
                  data-testid={`version-list-open-item-${version}`}/>
      <IconButton onClick={handleDelete} size="xs" icon={<Close/>}/>
    </ButtonGroup>
  </div>
}

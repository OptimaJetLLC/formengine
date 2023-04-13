import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faClone from '@fortawesome/free-regular-svg-icons/faClone'
import * as faTrash from '@fortawesome/free-regular-svg-icons/faTrashAlt'
import {useComponentData} from 'fb-core'
import {observer} from 'mobx-react'
import {useCallback, useEffect, useRef} from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {useIsTree} from '../../../../../utils/IsTreeContext'
import {FaIcon} from '../../../../components/Icons'
import {useSelection} from '../hooks/useSelection'
import {AddButton} from './AddButton'

export const Toolbar = observer(() => {
  const store = useBuilderStore()
  const data = useComponentData()
  const [{selected}] = useSelection()
  const ref = useRef<HTMLDivElement>(null)

  const onClone = useCallback(() => store.clone(data), [])
  const onRemove = useCallback(() => store.remove(data), [])
  const isTreeStruct: boolean = useIsTree()

  useEffect(() => {
    if (!isTreeStruct && selected && ref.current) {
      scrollIntoView(ref.current, {scrollMode: 'if-needed'})
    }
  }, [selected, isTreeStruct, ref.current])

  return <ToolbarContainer ref={ref} className={cx({isTreeStruct}, 'Toolbar')}>
    {!isTreeStruct && <Title>
      {data.componentStore.key}
      <label>{` (${data.componentStore.type})`}</label>
    </Title>
    }
    <AddButton/>
    <FaIcon onClick={onClone} icon={faClone as unknown as IconDefinition}/>
    <FaIcon onClick={onRemove} icon={faTrash as unknown as IconDefinition}/>
  </ToolbarContainer>
})

const ToolbarContainer = styled.div`
  inset: initial;
  right: 5px;
  top: -13px;

  &.isTreeStruct {
    top: 8px;
  }

  position: absolute;
  z-index: 11;
  color: var(--rs-btn-ghost-text);
  cursor: pointer !important;
  white-space: nowrap;
  border-radius: 5px;
  height: 20px;
  width: fit-content;
  padding-inline: 5px;
  font-weight: 400;
  background-color: white;

  .rs-theme-dark & {
    background-color: #3b3f43;
  }

  display: flex;
  gap: 5px;
  align-items: center;

  & > .rs-icon {
    cursor: pointer;
  }
`

const Title = styled.label`
  display: inline;
  cursor: move;
`

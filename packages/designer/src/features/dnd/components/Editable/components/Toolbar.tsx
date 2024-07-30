import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faClone from '@fortawesome/free-regular-svg-icons/faClone.js'
import * as faTrash from '@fortawesome/free-regular-svg-icons/faTrashAlt.js'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import type {MouseEventHandler} from 'react'
import {useCallback, useEffect, useRef} from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {stopEvent} from '../../../../../utils/stopEvent'
import {Hinted} from '../../../../annotation-editors/Hinted'
import {FaIcon} from '../../../../components/Icons'
import {useTranslationPart} from '../../../../localization/hooks'
import {useSelection} from '../hooks/useSelection'
import {AddButton} from './AddButton'

/**
 * Toolbar React component properties.
 */
export interface ToolbarProps {
  /**
   * Flag if true - the toolbar is displayed in compact mode, false otherwise.
   */
  compact?: boolean
}

const RawToolbar = ({compact}: ToolbarProps) => {
  const store = useBuilderStore()
  const data = useComponentData()
  const [{selected}] = useSelection()
  const ref = useRef<HTMLDivElement>(null)
  const t = useTranslationPart('toolbar')

  const onClone: MouseEventHandler = useCallback(e => {
    stopEvent(e)
    store.clone(data)
  }, [data, store])

  const onRemove: MouseEventHandler = useCallback(e => {
    stopEvent(e)
    store.remove(data)
  }, [data, store])

  useEffect(() => {
    if (!compact && selected && ref.current) {
      scrollIntoView(ref.current, {scrollMode: 'if-needed'})
    }
  }, [selected, compact])

  return <ToolbarContainer ref={ref} className={cx({compact: compact}, 'Toolbar')}>
    {!compact && <Title>
      {data.store.key}
      <label>{` (${data.store.type})`}</label>
    </Title>
    }
    <AddButton/>
    {!data.isRoot && <>
      <Hinted hint={t('cloneComponent')} placement={'autoVertical'}>
        <FaIcon onClick={onClone} icon={faClone as unknown as IconDefinition}/>
      </Hinted>
      <Hinted hint={t('removeComponent')} placement={'autoVertical'}>
        <FaIcon onClick={onRemove} icon={faTrash as unknown as IconDefinition}/>
      </Hinted>
    </>}
  </ToolbarContainer>
}

export const Toolbar = namedObserver('Toolbar', RawToolbar)

const ToolbarContainer = styled.div`
  inset: initial;
  right: 5px;
  top: -13px;

  &.compact {
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
  font-size: 14px;
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

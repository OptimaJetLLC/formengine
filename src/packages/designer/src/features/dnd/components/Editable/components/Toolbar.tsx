import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faClone from '@fortawesome/free-regular-svg-icons/faClone.js'
import * as faTrash from '@fortawesome/free-regular-svg-icons/faTrashAlt.js'
import {cfDisableComponentRemove, namedObserver, useComponentData} from '@react-form-builder/core'
import type {MouseEventHandler} from 'react'
import {useCallback, useEffect, useMemo, useRef} from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {stopEvent} from '../../../../../utils/stopEvent'
import {Hinted} from '../../../../annotation-editors/Hinted'
import {FaIcon} from '../../../../components/Icons'
import {useTranslationPart} from '../../../../localization/hooks'
import {useSelection} from '../hooks/useSelection'
import {AddButton} from './AddButton'
import {PresetComponentButton} from './PresetComponentButton'

const ToolbarContainer = styled.div`
  inset: initial;
  inset-inline-end: 5px;
  top: -13px;

  &.compact {
    top: 8px;
  }

  position: absolute;
  z-index: 12;
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
  const builderStore = useBuilderStore()
  const data = useComponentData()
  const {model, parent, store, isRoot} = data
  const [{selected}] = useSelection()
  const ref = useRef<HTMLDivElement>(null)
  const t = useTranslationPart('toolbar')
  const disableRemove = useMemo(() => model.isFeatureEnabled(cfDisableComponentRemove), [model])

  const onClone: MouseEventHandler = useCallback(e => {
    stopEvent(e)
    builderStore.clone(data)
  }, [data, builderStore])

  const onRemove: MouseEventHandler = useCallback(e => {
    stopEvent(e)
    builderStore.remove(data)
  }, [data, builderStore])

  useEffect(() => {
    if (!compact && selected && ref.current) {
      scrollIntoView(ref.current, {scrollMode: 'if-needed'})
    }
  }, [selected, compact])

  const clsName = useMemo(() => {
    const parentType = parent ? `parent-type-${parent?.model.type}` : ''
    const type = `type-${model.type}`
    return cx({compact: compact}, 'Toolbar', parentType, type)
  }, [compact, model.type, parent])

  return <ToolbarContainer ref={ref} className={clsName}>
    {!compact && <Title>
      {store.key}
      <label>{` (${store.type})`}</label>
    </Title>
    }
    <AddButton/>
    {!isRoot && <>
      <Hinted hint={t('cloneComponent')} placement={'autoVertical'}>
        <FaIcon data-testid="tree-clone-button" onClick={onClone} icon={faClone as unknown as IconDefinition} className={'clone-button'}/>
      </Hinted>
      {!builderStore.presetComponentOptions.disableCreation && <PresetComponentButton/>}
    </>}
    {!disableRemove &&
      <Hinted hint={t('removeComponent')} placement={'autoVertical'}>
        <FaIcon onClick={onRemove} icon={faTrash as unknown as IconDefinition} className={'remove-button'}/>
      </Hinted>
    }
  </ToolbarContainer>
}

export const Toolbar = namedObserver('Toolbar', RawToolbar)

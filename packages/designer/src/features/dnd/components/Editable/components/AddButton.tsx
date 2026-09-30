import {namedObserver, useComponentData} from '@react-form-builder/core'
import {Plus as PlusIcon, SortDown, SortUp} from '@rsuite/icons'
import {useCallback, useMemo, useRef} from 'react'
import type {WhisperInstance} from 'rsuite'
import {ButtonGroup, IconButton, Popover, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import type {InsertPosition} from '../../../../../utils/types'
import {Hinted} from '../../../../annotation-editors/Hinted'
import {useTranslationPart} from '../../../../localization/hooks'
import styles from './AddButton.module.css'
import {overlayRoot} from './overlayRoot'

const RawAddButton = () => {
  const builderStore = useBuilderStore()
  const target = useComponentData()
  const t = useTranslationPart('componentToolbar')
  const whisperRef = useRef<WhisperInstance>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const hint = t('add')

  const handleClick = useCallback(
    (position: InsertPosition) => {
      whisperRef.current?.close()
      builderStore.showComponentsModal(
        source => {
          builderStore.add(source, target, position)
        },
        componentData => builderStore.getAddComponentResult(componentData, target, position)
      )
    },
    [builderStore, target]
  )

  const sortUpIcon = useMemo(() => <SortUp />, [])
  const sortDownIcon = useMemo(() => <SortDown />, [])

  const handleClickBefore = useCallback(() => handleClick('before'), [handleClick])
  const handleClickAfter = useCallback(() => handleClick('after'), [handleClick])

  const getRoot = useCallback(() => overlayRoot(triggerRef.current), [])

  const popover = useMemo(() => {
    return (
      <Popover className={styles.popover} arrow={false}>
        <div className={styles.container}>
          <p className={styles.label}>{t('add')}</p>
          <ButtonGroup vertical>
            <IconButton onClick={handleClickBefore} icon={sortUpIcon} size={'xs'} appearance={'primary'}>
              {t('before')}
            </IconButton>
            <IconButton onClick={handleClickAfter} icon={sortDownIcon} size={'xs'} appearance={'primary'}>
              {t('after')}
            </IconButton>
          </ButtonGroup>
        </div>
      </Popover>
    )
  }, [t, handleClickBefore, handleClickAfter, sortUpIcon, sortDownIcon])

  return (
    <Whisper placement={builderStore.isRTL ? 'right' : 'left'} speaker={popover} ref={whisperRef} trigger="click" container={getRoot}>
      <button type="button" ref={triggerRef} className={styles.trigger} aria-label={hint}>
        <Hinted hint={hint} placement={'autoVertical'}>
          <PlusIcon className={'add-button'} />
        </Hinted>
      </button>
    </Whisper>
  )
}

export const AddButton = namedObserver('AddButton', RawAddButton)

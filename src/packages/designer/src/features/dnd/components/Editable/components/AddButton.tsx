import {namedObserver, useComponentData} from '@react-form-builder/core'
import {Plus as PlusIcon, SortDown, SortUp} from '@rsuite/icons'
import {useCallback, useMemo, useRef} from 'react'
import type {WhisperInstance} from 'rsuite'
import {ButtonGroup, IconButton, Popover, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import type {InsertPosition} from '../../../../../utils/types'
import {useTranslationPart} from '../../../../localization/hooks'
import styles from './AddButton.module.css'

const RawAddButton = () => {
  const builderStore = useBuilderStore()
  const target = useComponentData()
  const t = useTranslationPart('componentToolbar')
  const whisperRef = useRef<WhisperInstance>(null)

  const handleClick = useCallback((position: InsertPosition) => {
    whisperRef.current?.close()
    builderStore.showComponentsModal(source => {
      builderStore.add(source, target, position)
    }, componentData => {
      return builderStore.canAddComponent(componentData, target, position)
    })
  }, [builderStore, target])

  const sortUpIcon = useMemo(() => <SortUp/>, [])
  const sortDownIcon = useMemo(() => <SortDown/>, [])

  const handleClickBefore = useCallback(() => handleClick('before'), [handleClick])
  const handleClickAfter = useCallback(() => handleClick('after'), [handleClick])

  const popover = useMemo(() => {
    return (
      <Popover className={styles.popover} arrow={false}>
        <div className={styles.container}>
          <p className={styles.label}>{t('add')}</p>
          <ButtonGroup vertical>
            <IconButton onClick={handleClickBefore} icon={sortUpIcon} size={'xs'}
                        appearance={'primary'}>{t('before')}</IconButton>
            <IconButton onClick={handleClickAfter} icon={sortDownIcon} size={'xs'}
                        appearance={'primary'}>{t('after')}</IconButton>
          </ButtonGroup>
        </div>
      </Popover>
    )
  }, [t, handleClickBefore, handleClickAfter, sortUpIcon, sortDownIcon])

  return <>
    <Whisper placement={builderStore.isRTL ? 'right' : 'left'} speaker={popover} ref={whisperRef} enterable trigger="hover">
      <PlusIcon className={'add-button'}/>
    </Whisper>
  </>
}

export const AddButton = namedObserver('AddButton', RawAddButton)

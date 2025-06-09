import styled from '@emotion/styled'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import {Plus as PlusIcon, SortDown, SortUp} from '@rsuite/icons'
import {useRef} from 'react'
import type {WhisperInstance} from 'rsuite'
import {ButtonGroup, IconButton, Popover, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import type {InsertPosition} from '../../../../../utils/types'
import {useTranslationPart} from '../../../../localization/hooks'

const SPopover = styled(Popover)`
  transform: translateX(24px) !important;
  padding: 8px !important;
  border-radius: 14px !important;
`

const Container = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`

const Label = styled.p`
  width: 48px;
  font-weight: bolder;
  line-height: 1.9;
  text-align: center;
  margin-inline-start: 8px;
  color: var(--rs-text-primary);
`

const RawAddButton = () => {
  const builderStore = useBuilderStore()
  const target = useComponentData()
  const t = useTranslationPart('componentToolbar')
  const whisperRef = useRef<WhisperInstance>(null)
  const handleClick = (position: InsertPosition) => {
    whisperRef.current?.close()
    builderStore.showComponentsModal(source => {
      builderStore.add(source, target, position)
    }, componentData => {
      return builderStore.canAddComponent(componentData, target, position)
    })
  }

  const popover = <SPopover arrow={false}>
    <Container>
      <Label>{t('add')}</Label>
      <ButtonGroup vertical>
        <IconButton onClick={() => handleClick('before')} icon={<SortUp/>} size={'xs'}
                    appearance={'primary'}>{t('before')}</IconButton>
        <IconButton onClick={() => handleClick('after')} icon={<SortDown/>} size={'xs'}
                    appearance={'primary'}>{t('after')}</IconButton>
      </ButtonGroup>
    </Container>
  </SPopover>

  return <>
    <Whisper placement={builderStore.isRTL ? 'right' : 'left'} speaker={popover} ref={whisperRef} enterable trigger="hover">
      <PlusIcon className={'add-button'}/>
    </Whisper>
  </>
}

export const AddButton = namedObserver('AddButton', RawAddButton)

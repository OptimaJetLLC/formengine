import styled from '@emotion/styled'
import {SortDown, SortUp} from '@rsuite/icons'
import PlusIcon from '@rsuite/icons/Plus'
import {namedObserver, useComponentData} from 'fb-core'
import {useRef} from 'react'
import {ButtonGroup, IconButton, Popover, Whisper, WhisperInstance} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {InsertPosition} from '../../../../../utils/types'
import {useTranslationPart} from '../../../../localization/hooks'
import {useComponentsModal} from '../../../../ui/ComponentBar/ComponentsModal'

export const AddButton = namedObserver('AddButton', () => {
  const store = useBuilderStore()
  const {openModal, ComponentsModal} = useComponentsModal(useComponentData())
  const t = useTranslationPart('componentToolbar')
  const whisperRef = useRef<WhisperInstance>(null)
  const handleClick = (position: InsertPosition) => {
    whisperRef.current?.close()
    openModal(position)
  }

  const popover = <SPopover arrow={false}>
    <Container>
      <Label>{t('add')}</Label>
      <ButtonGroup vertical>
        <IconButton onClick={() => handleClick(InsertPosition.Before)} icon={<SortUp/>} size={'xs'}
                    appearance={'primary'}>{t('before')}</IconButton>
        <IconButton onClick={() => handleClick(InsertPosition.After)} icon={<SortDown/>} size={'xs'}
                    appearance={'primary'}>{t('after')}</IconButton>
      </ButtonGroup>
    </Container>
  </SPopover>

  return <>
    <Whisper placement={store.isRTL ? 'right' : 'left'} speaker={popover} ref={whisperRef} enterable trigger="hover">
      <PlusIcon/>
    </Whisper>
    <ComponentsModal/>
  </>
})

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
`

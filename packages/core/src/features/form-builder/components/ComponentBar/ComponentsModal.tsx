import styled from '@emotion/styled'
import {isUndefined} from 'lodash'
import React, {useState} from 'react'
import {Modal} from 'rsuite'
import {useBuilderStore} from '../../../../utils/contexts/BuilderStoreContext'
import {ComponentData} from '../../../../utils/contexts/ComponenDataContext'
import {ComponentMove, InsertPosition} from '../../../../utils/types'
import {useTranslationPart} from '../../../localization/hooks'
import {ComponentBar} from './ComponentBar'

export const useComponentsModal = (target: ComponentData) => {
  const store = useBuilderStore()
  const t = useTranslationPart('componentsModal')
  const [insertPosition, setInsertPosition] = useState<InsertPosition | undefined>(undefined)

  const close = () => setInsertPosition(undefined)
  const add = (source: ComponentMove) => {
    close()
    store.add(source, target, insertPosition)
  }
  const openModal = (insertPosition: InsertPosition) => setInsertPosition(insertPosition)

  const ComponentsModal = () => <SModal open={!isUndefined(insertPosition)} onClose={close} size={'lg'}>
    <Modal.Header><h5>{t('clickToAdd')}</h5></Modal.Header>
    <Modal.Body>
      <ComponentBar draggable={false} onAdd={add}/>
    </Modal.Body>
  </SModal>

  return {openModal, ComponentsModal}
}

const SModal = styled(Modal)`
  width: 825px !important;

  .rs-modal-content {
    background-color: var(--rs-btn-default-bg);
  }

  .rs-modal-body {
    padding-bottom: 0;
  }
`

import styled from '@emotion/styled'
import type {ComponentData} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {Modal} from 'rsuite'
import {CanAddComponentProvider} from '../../../utils/AddComponentContext'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {useTranslationPart} from '../../localization/hooks'
import {ComponentBar} from './ComponentBar'

/**
 * The modal window with a list of components that can be added to the form.
 * @returns the React element.
 */
const RawComponentsModal = () => {
  const {componentsModalState} = useBuilderStore()
  const t = useTranslationPart('componentsModal')

  const closeModal = useCallback(() => {
    return componentsModalState.opened = false
  }, [componentsModalState])

  const onAdd = useCallback((source: ComponentData) => {
    if (componentsModalState.opened) {
      closeModal()
      componentsModalState.onSelect(source)
    }
  }, [closeModal, componentsModalState])

  return <SModal open={componentsModalState.opened} onClose={closeModal} size={'lg'}>
    <Modal.Header><h5>{t('clickToAdd')}</h5></Modal.Header>
    <Modal.Body>
      <CanAddComponentProvider value={componentsModalState.canAdd}>
        <ComponentBar draggable={false} onAdd={onAdd}/>
      </CanAddComponentProvider>
    </Modal.Body>
  </SModal>
}

export const ComponentsModal = namedObserver('ComponentsModal', RawComponentsModal)

const SModal = styled(Modal)`
  width: 825px !important;

  .rs-modal-content {
    background-color: var(--rs-btn-default-bg);
  }

  .rs-modal-body {
    margin-top: initial !important;
    padding-top: 20px;
    padding-bottom: 0;
  }
`

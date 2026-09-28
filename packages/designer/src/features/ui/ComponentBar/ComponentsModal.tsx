import type {ComponentData} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {Modal} from 'rsuite'
import {CanAddComponentProvider} from '../../../utils/AddComponentContext'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {useTranslationPart} from '../../localization/hooks'
import {ComponentBar} from './ComponentBar'
import styles from './ComponentsModal.module.css'

/**
 * The modal window with a list of components that can be added to the form.
 * @returns the React element.
 */
const RawComponentsModal = () => {
  const {componentsModalState} = useBuilderStore()
  const t = useTranslationPart('componentsModal')

  const closeModal = useCallback(() => {
    // eslint-disable-next-line react-hooks/immutability
    componentsModalState.opened = false
  }, [componentsModalState])

  const onAdd = useCallback(
    (source: ComponentData) => {
      if (componentsModalState.opened) {
        closeModal()
        componentsModalState.onSelect(source)
      }
    },
    [closeModal, componentsModalState]
  )

  return (
    <Modal className={styles.modal} open={componentsModalState.opened} onClose={closeModal} size={'lg'}>
      <Modal.Header>
        <h5>{t('clickToAdd')}</h5>
      </Modal.Header>
      <Modal.Body>
        <CanAddComponentProvider value={componentsModalState.canAdd}>
          <ComponentBar draggable={false} onAdd={onAdd} />
        </CanAddComponentProvider>
      </Modal.Body>
    </Modal>
  )
}

export const ComponentsModal = namedObserver('ComponentsModal', RawComponentsModal)

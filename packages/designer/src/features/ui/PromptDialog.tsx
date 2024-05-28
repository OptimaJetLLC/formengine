import {namedObserver} from '@react-form-builder/core'
import {Button, Input, Modal} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {useTranslationPart} from '../localization/hooks'

/**
 * The React component that displays prompt dialog
 * @returns the React element.
 */
const RawPromptDialog = () => {
  const builderStore = useBuilderStore()
  const modalState = builderStore.promptModalState
  const t = useTranslationPart('promptDialog')
  const hide = () => modalState.opened = false
  const handleClose = () => {
    hide()
    modalState.onClose?.()
  }
  const handleOk = () => {
    hide()
    modalState.onOk(modalState.value)
  }
  const handleCancel = () => {
    hide()
    modalState.onCancel?.()
  }

  return <Modal backdrop={modalState.backdrop} keyboard={true} open={modalState.opened} onClose={handleClose}>
    <Modal.Header>
      <Modal.Title>{modalState.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Input style={{width: '100%'}} placeholder={modalState.placeholder} autoFocus={true}
             value={modalState.value} onChange={value => modalState.value = value}/>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={handleOk} appearance="primary" active={true}>
        {modalState.okText || t('ok')}
      </Button>
      <Button onClick={handleCancel} appearance="subtle">
        {modalState.cancelText || t('cancel')}
      </Button>
    </Modal.Footer>
  </Modal>
}

export const PromptDialog = namedObserver('PromptDialog', RawPromptDialog)

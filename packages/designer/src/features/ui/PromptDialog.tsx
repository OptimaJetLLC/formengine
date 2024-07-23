import {namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {Button, Input, Modal} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {useTranslationPart} from '../localization/hooks'

const inputStyle = {width: '100%'}

/**
 * The React component that displays prompt dialog
 * @returns the React element.
 */
const RawPromptDialog = () => {
  const builderStore = useBuilderStore()
  const modalState = builderStore.promptModalState
  const t = useTranslationPart('promptDialog')
  const okLabel = modalState.okText || t('ok')
  const cancelLabel = modalState.cancelText || t('cancel')

  const hide = useCallback(() => modalState.opened = false, [modalState])

  const handleClose = useCallback(() => {
    hide()
    modalState.onClose?.()
  }, [hide, modalState])

  const handleOk = useCallback(() => {
    hide()
    modalState.onOk(modalState.value)
  }, [hide, modalState])

  const handleCancel = useCallback(() => {
    hide()
    modalState.onCancel?.()
  }, [hide, modalState])

  const handleChange = useCallback(value => {
    modalState.value = value
  }, [modalState])

  const handleKeys = useCallback(({key}) => {
    switch (key) {
      case 'Escape':
        handleCancel()
        break
      case 'Enter':
        handleOk()
        break
      default:
        break
    }
  }, [handleCancel, handleOk])

  return <Modal backdrop={modalState.backdrop} keyboard={true} open={modalState.opened} onClose={handleClose}>
    <Modal.Header>
      <Modal.Title>{modalState.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Input style={inputStyle} placeholder={modalState.placeholder} autoFocus={true} onKeyDown={handleKeys}
             value={modalState.value} onChange={handleChange}/>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={handleOk} appearance="primary" active={true}>
        {okLabel}
      </Button>
      <Button onClick={handleCancel} appearance="subtle">
        {cancelLabel}
      </Button>
    </Modal.Footer>
  </Modal>
}

export const PromptDialog = namedObserver('PromptDialog', RawPromptDialog)

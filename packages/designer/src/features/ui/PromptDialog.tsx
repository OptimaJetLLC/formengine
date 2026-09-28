import {namedObserver} from '@react-form-builder/core'
import type {KeyboardEvent} from 'react'
import {useCallback} from 'react'
import {Button, Form, Modal} from 'rsuite'
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
  const okLabel = modalState.okText || t('ok')
  const cancelLabel = modalState.cancelText || t('cancel')
  const inputValid = !!Object.values(modalState.value ?? {})[0]?.trim() && !modalState.errors

  // eslint-disable-next-line react-hooks/immutability
  const hide = useCallback(() => (modalState.opened = false), [modalState])

  const handleClose = useCallback(() => {
    hide()
    modalState.onClose?.()
  }, [hide, modalState])

  const handleOk = useCallback(() => {
    hide()
    modalState.onOk(modalState.value ?? {})
  }, [hide, modalState])

  const handleCancel = useCallback(() => {
    hide()
    modalState.onCancel?.()
  }, [hide, modalState])

  const handleChange = useCallback(
    (value: Record<string, any>) => {
      // eslint-disable-next-line react-hooks/immutability
      modalState.value = value
      modalState.validate?.(value)?.then(result => {
        modalState.errors = result
      })
    },
    [modalState]
  )

  const handleKeys = useCallback(
    ({key}: KeyboardEvent<HTMLInputElement>) => {
      switch (key) {
        case 'Escape':
          handleCancel()
          break
        case 'Enter':
          if (inputValid) handleOk()
          break
        default:
          break
      }
    },
    [handleCancel, handleOk, inputValid]
  )

  return (
    <Modal backdrop={modalState.backdrop} keyboard={true} open={modalState.opened} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{modalState.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid onChange={handleChange}>
          {modalState.fields?.map(({name, component, label, value, placeholder, props}) => {
            const error = modalState.errors?.[name]
            const fieldValue = modalState.value?.[name] ?? value
            return (
              <Form.Group key={name}>
                <Form.ControlLabel>{label}</Form.ControlLabel>
                <Form.Control
                  key={name}
                  name={name}
                  value={fieldValue ?? ''}
                  accepter={component}
                  placeholder={placeholder}
                  autoFocus={true}
                  onKeyDown={handleKeys}
                  data-testid={`modal-${name}-input`}
                  {...props}
                />
                <Form.ErrorMessage show={!!error}>{error}</Form.ErrorMessage>
              </Form.Group>
            )
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleOk} appearance="primary" active={true} disabled={!inputValid} data-testid={'modal-ok-button'}>
          {okLabel}
        </Button>
        <Button onClick={handleCancel} appearance="subtle">
          {cancelLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const PromptDialog = namedObserver('PromptDialog', RawPromptDialog)

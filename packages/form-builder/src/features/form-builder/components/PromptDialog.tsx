import {useTranslationPart} from 'fb-core'
import {useState} from 'react'
import {Button, Input, Modal} from 'rsuite'

export interface PromptProps {
  backdrop?: boolean | 'static';
  title: string
  placeholder?: string
  okText?: string
  cancelText?: string
  onOk: (value: string) => void
  onCancel?: () => void
  onClose?: () => void
}

interface PromptDialogProps extends PromptProps {
  open: boolean
  setOpen: (value: boolean) => void
}

const PromptDialog = (props: PromptDialogProps) => {
  const t = useTranslationPart('promptDialog')
  const [value, setValue] = useState<string>('')
  const hide = () => props.setOpen(false)
  const handleClose = () => {
    hide()
    props.onClose?.()
  }
  const handleOk = () => {
    hide()
    props.onOk(value)
  }
  const handleCancel = () => {
    hide()
    props.onCancel?.()
  }

  return <Modal backdrop={props.backdrop} keyboard={true} open={props.open} onClose={handleClose}>
    <Modal.Header>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Input style={{width: '100%'}} placeholder={props.placeholder} value={value} onChange={setValue} autoFocus={true}/>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={handleOk} appearance="primary" active={true}>
        {props.okText || t('ok')}
      </Button>
      <Button onClick={handleCancel} appearance="subtle">
        {props.cancelText || t('cancel')}
      </Button>
    </Modal.Footer>
  </Modal>
}

export const usePromptDialog = (promptDialogProps: PromptProps): [() => void, JSX.Element] => {
  const [open, setOpen] = useState(false)
  const openPromptDialog = () => setOpen(true)
  const props = {...promptDialogProps, open, setOpen}
  return [openPromptDialog, <>{open && <PromptDialog {...props}/>}</>]
}

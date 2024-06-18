import * as faCode from '@fortawesome/free-solid-svg-icons/faCode.js'
import {ComponentProps, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {IconButton, Modal, Tooltip, Whisper} from 'rsuite'
import {FaIcon} from '../../../components/Icons'
import {customizableObserver} from '../../../customization'
import {JsonView} from '../../JsonView'

const icon = <FaIcon icon={faCode as any}/>

type JsonViewButtonProps = Omit<ComponentProps<typeof Whisper>, 'placement' | 'speaker' | 'children'>

const RawJsonViewButton = (props: JsonViewButtonProps) => {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const speaker = <Tooltip>{t('editJson')}</Tooltip>

  return <>
    <Whisper {...props} speaker={speaker} placement="bottom">
      <IconButton onClick={handleOpen} icon={icon} size={'sm'}/>
    </Whisper>
    <Modal open={open} size={'full'} backdrop={true}>
      <Modal.Header closeButton onClose={handleClose}>
        <Modal.Title>{t('editJson')}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height: '100vh'}}>
        <JsonView/>
      </Modal.Body>
    </Modal>
  </>
}

export const JsonViewButton = customizableObserver('JsonViewButton', RawJsonViewButton)

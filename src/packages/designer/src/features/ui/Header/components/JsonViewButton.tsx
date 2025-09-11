import * as faCode from '@fortawesome/free-solid-svg-icons/faCode.js'
import type {ComponentProps} from 'react'
import {useCallback, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {IconButton, Modal, Tooltip, Whisper} from 'rsuite'
import {FaIcon} from '../../../components/Icons'
import {customizableObserver} from '../../../customization'
import {JsonView} from '../../JsonView'

const icon = <FaIcon icon={faCode as any}/>
const modalBodyStyle = {height: '100vh'} as const

type JsonViewButtonProps = Omit<ComponentProps<typeof Whisper>, 'placement' | 'speaker' | 'children'>

const RawJsonViewButton = (props: JsonViewButtonProps) => {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])
  const speaker = useMemo(() => <Tooltip>{t('editJson')}</Tooltip>, [t])

  return <>
    <Whisper {...props} speaker={speaker} placement="bottom">
      <IconButton onClick={handleOpen} icon={icon} size={'sm'}/>
    </Whisper>
    <Modal open={open} size={'full'} backdrop={true}>
      <Modal.Header closeButton onClose={handleClose}>
        <Modal.Title>{t('editJson')}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalBodyStyle}>
        <JsonView/>
      </Modal.Body>
    </Modal>
  </>
}

export const JsonViewButton = customizableObserver('JsonViewButton', RawJsonViewButton)

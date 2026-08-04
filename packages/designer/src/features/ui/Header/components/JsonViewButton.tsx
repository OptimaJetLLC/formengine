import * as faCode from '@fortawesome/free-solid-svg-icons/faCode.js'
import type {ComponentProps} from 'react'
import {useCallback, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {IconButton, Modal, Tooltip, Whisper} from 'rsuite'
import {FaIcon} from '../../../components/Icons'
import {customizableObserver} from '../../../customization/customizableObserver'
import {JsonView} from '../../JsonView'
import styles from './JsonViewButton.module.css'

const icon = <FaIcon icon={faCode as any}/>

type JsonViewButtonProps = Omit<ComponentProps<typeof Whisper>, 'placement' | 'speaker' | 'children'> & {
  className?: string
}

/**
 * Button that opens the form JSON editor modal.
 * Customization (`className`) is applied to the IconButton; remaining props are passed to Whisper.
 * @param props the Whisper props plus optional customization className.
 * @param props.className CSS class name from designer customization.
 * @returns the React element.
 */
const RawJsonViewButton = ({className, ...props}: JsonViewButtonProps) => {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])
  const speaker = useMemo(() => <Tooltip>{t('editJson')}</Tooltip>, [t])

  return <>
    <Whisper {...props} speaker={speaker} placement="bottom">
      <IconButton className={className} onClick={handleOpen} icon={icon} size={'sm'}/>
    </Whisper>
    <Modal open={open} size={'full'} backdrop={true}>
      <Modal.Header closeButton onClose={handleClose}>
        <Modal.Title>{t('editJson')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <JsonView/>
      </Modal.Body>
    </Modal>
  </>
}

export const JsonViewButton = customizableObserver('JsonViewButton', RawJsonViewButton)

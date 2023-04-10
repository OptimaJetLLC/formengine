import styled from '@emotion/styled'
import * as faCode from '@fortawesome/free-solid-svg-icons/faCode'
import {observer} from 'mobx-react'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {IconButton, Modal} from 'rsuite'
import {FaIcon} from '../../../components/Icons'
import {JsonView} from '../../JsonView'

const icon = <FaIcon icon={faCode as any}/>

export const JsonViewButton = observer(() => {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return <>
    <SIconButton onClick={handleOpen} icon={icon} circle/>
    <Modal open={open} size={'full'} backdrop={true}>
      <Modal.Header closeButton onClose={handleClose}>
        <Modal.Title>{t('editJson')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <JsonView/>
      </Modal.Body>
    </Modal>
  </>
})

const SIconButton = styled(IconButton)`
  padding: 5px !important;
`

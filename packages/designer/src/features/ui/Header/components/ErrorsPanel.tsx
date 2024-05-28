import styled from '@emotion/styled'
import {namedObserver} from '@react-form-builder/core'
import {Danger} from '@rsuite/icons'
import {useReducer} from 'react'
import {useTranslation} from 'react-i18next'
import {Col, IconButton, Modal, Row, Tooltip, Whisper} from 'rsuite'
import {PropertyErrors} from './PropertyErrors'

const RawErrorsPanel = () => {
  const {t} = useTranslation()
  const [show, toggleShow] = useReducer(state => !state, false)

  return <>
    <Whisper speaker={<Tooltip>{t('validation.showFormErrors')}</Tooltip>} placement={'bottom'}>
      <SIconButton onClick={toggleShow} icon={<Danger/>} circle/>
    </Whisper>
    <Modal open={show} size={'full'} backdrop={true}>
      <Modal.Header closeButton onClose={toggleShow}>
        <Modal.Title>{t('validation.formErrors')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row style={{marginRight: 0}}>
          <Col md={14}>
            <PropertyErrors onClose={toggleShow}/>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  </>
}

export const ErrorsPanel = namedObserver('ErrorsPanel', RawErrorsPanel)

const SIconButton = styled(IconButton)`
  padding: 5px !important;
`

import styled from '@emotion/styled'
import {namedObserver} from '@react-form-builder/core'
import {Danger} from '@rsuite/icons'
import {useMemo, useReducer} from 'react'
import {useTranslation} from 'react-i18next'
import {Col, IconButton, Modal, Row, Tooltip, Whisper} from 'rsuite'
import {PropertyErrors} from './PropertyErrors'

const SIconButton = styled(IconButton)`
  padding: 5px !important;
`

const rowStyle = {marginRight: 0} as const

const RawErrorsPanel = () => {
  const {t} = useTranslation()
  const [show, toggleShow] = useReducer(state => !state, false)

  const tooltipContent = useMemo(() => <Tooltip>{t('validation.showFormErrors')}</Tooltip>, [t])
  const dangerIcon = useMemo(() => <Danger/>, [])

  return <>
    <Whisper speaker={tooltipContent} placement={'bottom'}>
      <SIconButton onClick={toggleShow} icon={dangerIcon} circle/>
    </Whisper>
    <Modal open={show} size={'full'} backdrop={true}>
      <Modal.Header closeButton onClose={toggleShow}>
        <Modal.Title>{t('validation.formErrors')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row style={rowStyle}>
          <Col md={14}>
            <PropertyErrors onClose={toggleShow}/>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  </>
}

export const ErrorsPanel = namedObserver('ErrorsPanel', RawErrorsPanel)

import {boolean, define, event, string} from '@react-form-builder/core'
import {Modal, ModalProps} from 'antd'
import {useCallback} from 'react'

interface AntModalProps extends ModalProps {
  handleClose?: () => void
}

const AntModal = (props: AntModalProps) => {
  const {handleClose, onOk, onCancel, ...otherProps} = props

  const handleOnOk = useCallback((e: any) => {
    onOk?.(e)
    handleClose?.()
  }, [])

  const handleOnCancel = useCallback((e: any) => {
    onCancel?.(e)
    handleClose?.()
  }, [])

  return <Modal {...otherProps} onOk={handleOnOk} onCancel={handleOnCancel}/>
}

export const antModal = define(AntModal, 'AntModal')
  .name('Ant modal')
  .category('modal')
  .props({
    centered: boolean,
    keyboard: boolean,
    okText: string,
    cancelText: string,
    onOk: event,
    onCancel: event,
  })
  .componentRole('modal')

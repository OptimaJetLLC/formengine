import {boolean, define, event, string} from '@react-form-builder/core'
import type {ModalProps} from 'antd'
import {Modal} from 'antd'
import {useCallback} from 'react'

interface AntModalProps extends ModalProps {
  handleClose?: () => void
}

const AntModal = (props: AntModalProps) => {
  const {handleClose, onOk, onCancel, ...otherProps} = props

  const handleOnOk = useCallback(
    (e: any) => {
      onOk?.(e)
      handleClose?.()
    },
    [handleClose, onOk]
  )

  const handleOnCancel = useCallback(
    (e: any) => {
      onCancel?.(e)
      handleClose?.()
    },
    [handleClose, onCancel]
  )

  return <Modal {...otherProps} onOk={handleOnOk} onCancel={handleOnCancel} />
}

export const antModal = define(AntModal, 'AntModal')
  .category('antd')
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

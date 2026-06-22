import {useCallback} from 'react'
import {Message, useToaster} from 'rsuite'
import type {TypeAttributes} from 'rsuite/esm/internals/types'
import type {PlacementType} from 'rsuite/esm/toaster/ToastContainer'

/**
 * Toast React component settings.
 */
interface ToastSettings {
  /**
   * The message.
   */
  message: string
  /**
   * The title.
   */
  title?: string
  /**
   * The type of message.
   */
  type?: TypeAttributes.Status
  /**
   * The placement.
   */
  placement?: PlacementType
}

/**
 * Returns a stable function that shows a toast for the given {@link ToastSettings}.
 * @returns the function that displays the toast
 */
export const useShowMessage = () => {
  const toaster = useToaster()

  return useCallback((settings: ToastSettings) => {
    const placement = settings.placement || 'bottomEnd'
    const type = settings.type || 'info'
    toaster.push(<Message type={type} title={settings.title}>{settings.message}</Message>, {
      placement: placement
    })
  }, [toaster])
}

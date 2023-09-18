import {useEffect, useState} from 'react'
import {Message, useToaster} from 'rsuite'
import type {TypeAttributes} from 'rsuite/esm/@types/common'
import type {PlacementType} from 'rsuite/esm/toaster/ToastContainer'

/**
 * Toast React component settings.
 */
export interface ToastSettings {
  message: string
  title?: string
  type?: TypeAttributes.Status
  placement?: PlacementType
}

/**
 * Creates the function for changing {@link ToastSettings} settings.
 * @returns the function for setting the {@link ToastSettings} settings.
 */
export const useShowMessage = () => {
  const [settings, setSettings] = useState<ToastSettings>()
  const toaster = useToaster()

  useEffect(() => {
    if (!settings) return
    const placement = settings.placement || 'bottomEnd'
    const type = settings.type || 'info'
    toaster.push(<Message type={type} title={settings.title}>{settings.message}</Message>, {
      placement: placement
    })
    setSettings(undefined)
  }, [settings])
  return setSettings
}

import type {Meta} from '@react-form-builder/core'
import {icons} from './icons'

/**
 * Gets an icon component from the icon name or returns the provided icon component
 * @param icon the icon name string or icon component to resolve
 * @returns the resolved icon component
 */
export const getIcon = (icon: Meta['icon']) => {
  if (typeof icon === 'string') {
    return icons[icon as keyof typeof icons]
  }
  return icon
}

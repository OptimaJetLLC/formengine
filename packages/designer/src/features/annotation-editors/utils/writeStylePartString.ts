import type {ComponentStore} from '@react-form-builder/core'
import type {Device} from '../../../utils/types'

/**
 * The store keys that contain device-specific CSS or inline style strings.
 */
export type StyleStorePart = 'css' | 'wrapperCss' | 'style' | 'wrapperStyle'

/**
 * Writes or clears the CSS or inline style string for the specified store part and device.
 * An empty or omitted value removes the string and prunes empty device and part objects.
 * Other tabs, devices, and object style properties are left unchanged.
 * @param store the component store.
 * @param part the style store part to update.
 * @param device the device whose string value should be updated.
 * @param value the CSS string to store, or empty to reset.
 */
export function writeStylePartString(store: ComponentStore, part: StyleStorePart, device: Device, value?: string): void {
  if (!value) {
    const stylePart = store[part]
    const deviceStyle = stylePart?.[device]
    if (!stylePart || !deviceStyle) return

    delete deviceStyle.string

    if (Object.keys(deviceStyle).length === 0) {
      delete stylePart[device]
    }

    if (Object.keys(stylePart).length === 0) {
      store[part] = undefined
    }
    return
  }

  store[part] ??= {}
  store[part][device] ??= {}
  store[part][device].string = value
}

import type {SelectPickerProps} from 'rsuite'
import {SelectPicker} from 'rsuite'

/**
 * Props for the FixedSelectPicker component.
 * @template T - the type of the item.
 */
export interface FixedSelectPickerProps<T> extends SelectPickerProps<T> {
  /**
   * The picker width.
   */
  width: any
}

/**
 * This is a workaround for the SelectPicker component of RSuite.
 * The 'width' property of the SelectPicker component is required to avoid ResizeObserver errors.
 * @param props the rs component properties.
 * @param props.width the width of the picker.
 * @returns the RSuite select picker.
 */
export const FixedSelectPicker = <T, >({width, ...props}: FixedSelectPickerProps<T>) => {
  return <SelectPicker {...props} style={{width: width}}/>
}

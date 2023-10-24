import {ActionData, Annotation} from '@react-form-builder/core'
import type {ComponentProps} from 'react'

/**
 * Properties of add action menu.
 */
export interface ActionsMenuProps extends ComponentProps<any> {
  /**
   * The callback function called when an action is selected.
   */
  onSelect: (action?: ActionData) => void
  /**
   * The metadata for a React component property.
   */
  annotation: Annotation
}

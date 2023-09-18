import {ActionData, Annotation} from '@react-form-builder/core'
import type {ComponentProps} from 'react'

/**
 * Properties of add action menu.
 */
export interface ActionsMenuProps extends ComponentProps<any> {
  onSelect: (action?: ActionData) => void
  annotation: Annotation
}

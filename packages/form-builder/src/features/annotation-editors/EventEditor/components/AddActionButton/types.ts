import {ActionData} from '@react-form-builder/core'
import {ComponentProps} from 'react'
import {Annotation} from '../../../../annotation/types/annotations/Annotation'


/**
 * Properties of add action menu.
 */
export interface ActionsMenuProps extends ComponentProps<any> {
  onSelect: (action?: ActionData) => void
  annotation: Annotation
}

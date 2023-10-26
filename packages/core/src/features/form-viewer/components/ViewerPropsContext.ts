import {createNonNullableContext} from '../../../utils/createNonNullableContext'

import {FormViewerProps} from '../types'

export const [
  /**
   * **Internal use only.**
   */
  useViewerProps,
  /**
   * **Internal use only.**
   */
  ViewerPropsProvider] = createNonNullableContext<Readonly<FormViewerProps>>('FormViewerPropsContext')

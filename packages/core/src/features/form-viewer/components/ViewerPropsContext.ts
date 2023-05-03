import {createNonNullableContext} from '../../../utils/createNonNullableContext'

import {FormViewerProps} from '../types'

export const [useViewerProps, ViewerPropsProvider] = createNonNullableContext<Readonly<FormViewerProps>>('FormViewerPropsContext')

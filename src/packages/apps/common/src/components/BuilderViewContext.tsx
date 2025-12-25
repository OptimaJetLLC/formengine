import {createNonNullableContext} from '@react-form-builder/core'

const name = 'BuilderViewContext'

/**
 * The type of builder view.
 */
export type ViewType = 'rsuite' | 'mui'

type BuilderViewContext = {
  view: ViewType
  setView: (viewType: ViewType) => void
}

/**
 * Hook and provider for the builder view context.
 */
export const [useBuilderView, BuilderViewProvider] = createNonNullableContext<BuilderViewContext>(name)

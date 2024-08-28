import {createNonNullableContext} from '../createNonNullableContext'
import type {BuilderMode} from './BuilderMode'

/**
 * The FormBuilder context properties.
 */
export type BuilderContextType = {
  /**
   * Form builder mode. Builder or viewer.
   */
  builderMode: BuilderMode
}

export const [
  /**
   * @returns the {@link BuilderContext} value.
   */
  useBuilderContext,
  /**
   * The FormBuilder context provider.
   */
  BuilderContextProvider,
  /**
   * The FormBuilder context.
   */
  BuilderContext,
] = createNonNullableContext<BuilderContextType>('BuilderContext', {
  builderMode: 'viewer'
})

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
  /**
   * The function for translate builder labels.
   * @param key the translation key.
   * @returns the translated label.
   */
  translate?: (key: string) => string
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

import {NoopLocalizationEngine} from '@react-form-builder/core'
import type {BuilderStore} from '../stores/BuilderStore'

/**
 * Checks whether the localization has a non-stub engine.
 * @param builderStore the builder store instance.
 * @returns boolean true, the localization has a non-stub engine, false otherwise.
 */
export const withLocalization = (builderStore: BuilderStore) => {
  return !(builderStore.viewer.form.localization.engine instanceof NoopLocalizationEngine)
}

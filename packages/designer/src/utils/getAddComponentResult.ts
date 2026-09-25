import type {ComponentData} from '@react-form-builder/core'
import {cfSingleton} from '@react-form-builder/core'
import type {BuilderStore, CanAddComponentResult} from '../stores/BuilderStore'
import type {InsertPosition} from './types'

/**
 * Checks whether a component can be added and returns an optional palette disable hint.
 * @param store the designer store.
 * @param source the component to add.
 * @param target the requested insertion target.
 * @param insertPosition the requested insertion position.
 * @param slot the requested parent slot name.
 * @returns whether the component can be added, with a hint when blocked by the singleton rule.
 */
export function getAddComponentResult(
  store: BuilderStore,
  source: ComponentData,
  target: ComponentData,
  insertPosition: InsertPosition = 'after',
  slot?: string
): CanAddComponentResult {
  if (store.canAddComponent(source, target, insertPosition, slot)) return true

  if (source.model.isFeatureEnabled(cfSingleton)) {
    const root = store.viewer.form.componentTree
    const meta = store.getComponentMetadata(source.model.type)
    if (meta.insertRestriction?.(source, root) === false) {
      return {canAdd: false, disableHintKey: 'singletonAlreadyOnForm'}
    }
  }

  return false
}

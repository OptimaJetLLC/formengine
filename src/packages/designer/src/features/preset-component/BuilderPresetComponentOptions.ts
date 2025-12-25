import type {BuilderComponent} from '@react-form-builder/core'
import {definePreset} from '@react-form-builder/core'
import {makeAutoObservable} from 'mobx'
import type {IPresetComponentOptions} from './IPresetComponentOptions'
import type {PresetComponent} from './PresetComponent'
import {PresetComponentLocalStorage} from './PresetComponentLocalStorage'
import {PresetIcon} from './PresetIcon'

/**
 * Class for configuring preset component options.
 */
export class BuilderPresetComponentOptions implements IPresetComponentOptions {

  private readonly storage: PresetComponentLocalStorage
  public presets: BuilderComponent[] = []

  /**
   * Creates an instance of preset component options.
   * @param afterRemove the callback function called when a preset component is removed.
   * @param afterAdd the callback function called when a new preset component is created.
   * @param options the parent preset component options.
   * @param localStoragePrefix the prefix for localStorage key.
   */
  constructor(readonly afterRemove: (name: string) => void,
              readonly afterAdd: (builderComponent: BuilderComponent) => void,
              readonly options?: IPresetComponentOptions,
              localStoragePrefix?: string) {
    const localStorageKey = localStoragePrefix ? `${localStoragePrefix}-presetComponents` : 'presetComponents'
    this.storage = new PresetComponentLocalStorage(localStorageKey)
    const items = this.components ?? []
    items.forEach(preset => this.addPresetComponent(preset))

    makeAutoObservable(this)
  }

  /**
   * @inheritDoc
   */
  get components() {
    if (this.disable) return
    return this.options?.components ?? this.storage.loadPresets()
  }

  /**
   * @inheritDoc
   */
  get disable() {
    return this.options?.disable
  }

  /**
   * @inheritDoc
   */
  get disableCreation() {
    return this.disable || this.options?.disableCreation
  }

  /**
   * @inheritDoc
   */
  get disableRemoving() {
    return this.disable || this.options?.disableRemoving
  }

  /**
   * @inheritDoc
   */
  onCreate(preset: PresetComponent): void {
    if (this.disable) return

    const fn = this.options?.onCreate ?? this.storage.savePreset
    fn(preset)
  }

  /**
   * @inheritDoc
   */
  onRemove(name: string): void {
    if (this.disable) return

    const fn = this.options?.onRemove ?? this.storage.removePreset
    fn(name)
  }

  /**
   * Returns true if the preset component can be removed, false otherwise.
   * @param name the name of the preset component.
   * @returns true if the preset component can be removed, false otherwise.
   */
  canRemovePresetComponent(name: string) {
    if (this.disableRemoving) return false

    const component = this.presets.find(component => component.model.name === name)
    return !!component
  }

  /**
   * Removes the preset component.
   * @param name the name of the preset component.
   */
  removePresetComponent(name: string) {
    if (this.disableRemoving) return

    this.onRemove(name)
    this.presets = this.presets.filter(component => component.model.name !== name)
    this.afterRemove(name)
  }

  /**
   * Creates the new components preset.
   * @param preset the preset of components.
   */
  addPresetComponent(preset: PresetComponent) {
    const {name, category, components} = preset

    const builderComponent = definePreset(name, components)
      .category(category ?? 'Presets')
      .icon(PresetIcon)
      .build()

    this.presets.push(builderComponent)
    this.afterAdd(builderComponent)
  }
}

import type {PresetComponent} from './PresetComponent'

/**
 * Interface for configuring preset component options.
 */
export interface IPresetComponentOptions {

  /**
   * The default preset components.
   */
  components?: PresetComponent[]

  /**
   * The callback function called when a new preset component is created.
   */
  onCreate?: (preset: PresetComponent) => void

  /**
   * The callback function called when a preset component is removed.
   */
  onRemove?: (name: string) => void

  /**
   * The flag to disable the creation of preset components.
   */
  disableCreation?: boolean

  /**
   * The flag to disable the removing of preset components.
   */
  disableRemoving?: boolean

  /**
   * The flag to disable the preset component feature.
   */
  disable?: boolean
}

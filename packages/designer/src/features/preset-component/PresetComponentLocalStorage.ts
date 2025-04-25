import type {PresetComponent} from './PresetComponent'

/**
 * Class for working with the preset components in the local storage.
 */
export class PresetComponentLocalStorage {
  private readonly presetsKey: string

  /**
   * Creates an instance of preset storage in local storage.
   * @param presetsKey the key for the preset components in the local storage.
   */
  constructor(presetsKey = 'presetComponents') {
    this.presetsKey = presetsKey
  }

  /**
   * Loads the preset components from the local storage.
   * @returns the preset components.
   */
  loadPresets = (): PresetComponent[] => {
    return Object.values(this.loadAll())
  }

  /**
   * Saves the preset component to the local storage.
   * @param preset the preset component to save.
   */
  savePreset = (preset: PresetComponent): void => {
    const current = this.loadAll()
    current[preset.name] = preset
    this.saveAll(current)
  }

  /**
   * Removes the preset component from the local storage.
   * @param name the name of the preset component.
   */
  removePreset = (name: string): void => {
    const current = this.loadAll()
    delete current[name]
    this.saveAll(current)
  }

  private loadAll = (): Record<string, PresetComponent> => {
    return JSON.parse(localStorage.getItem(this.presetsKey) ?? '{}') ?? {}
  }

  private saveAll = (presets: Record<string, PresetComponent>): void => {
    localStorage.setItem(this.presetsKey, JSON.stringify(presets))
  }
}

import type {ComponentStore} from '@react-form-builder/core'

/**
 * The preset component settings.
 */
export interface PresetComponent {
  /**
   * The name of the preset component.
   */
  name: string

  /**
   * The category of the preset component.
   */
  category?: string

  /**
   * The components of the preset component.
   */
  components: ComponentStore[]
}

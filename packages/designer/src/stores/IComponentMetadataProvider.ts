import type {Meta} from '@react-form-builder/core'

/**
 * The component metadata provider interface.
 */
export interface IComponentMetadataProvider {
  /**
   * Returns the component metadata for the specified component type name.
   * @param type the component type name.
   * @returns the component metadata for the specified component type name.
   */
  getComponentMetadata(type: string): Meta
}

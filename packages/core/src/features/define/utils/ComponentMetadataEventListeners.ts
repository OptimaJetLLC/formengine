import type {IStore} from '../../../stores/IStore'
import type {ComponentData} from '../../../utils/contexts/ComponentDataContext'

/**
 * A snapshot of a component's position in the component tree.
 */
export interface ComponentNodeLocation {
  /**
   * The parent containing the component.
   */
  readonly parent: ComponentData
  /**
   * The index in the parent's complete child list.
   */
  readonly index: number
  /**
   * The parent slot containing the component. Unset means the parent's `children` slot.
   */
  readonly slot?: string
  /**
   * The source of the condition binding the component to the slot.
   */
  readonly slotCondition?: string
}

/**
 * A completed change to a component's position in the component tree.
 */
export type ComponentPlacementChange =
  | {readonly type: 'insert'; readonly current: ComponentNodeLocation}
  | {readonly type: 'move'; readonly previous: ComponentNodeLocation; readonly current: ComponentNodeLocation}
  | {readonly type: 'remove'; readonly previous: ComponentNodeLocation}

/**
 * Component metadata event listeners.
 */
export interface ComponentMetadataEventListeners {
  /**
   * The callback function that is called when the component is selected.
   * @param node the selected component data.
   * @param self the component data.
   */
  onSelectNode?: (node: ComponentData, self: ComponentData) => void

  /**
   * Called when a component is created and added to a form, including auto-created child wrappers.
   * Runs after {@link ComponentMetadataEventListeners.onNodePlacementChanged} for the same operation.
   * Existing nodes that are only moved are not reported here.
   * @param node the created component data.
   * @param store the form viewer settings.
   */
  onCreateNode?: (node: ComponentData, store: IStore) => void

  /**
   * Called after a component's tree position changes. A removed component is detached but not yet disposed when the callback runs.
   * When a create also occurs for the same operation, this callback runs before
   * {@link ComponentMetadataEventListeners.onCreateNode}.
   * @param node the component whose position changed.
   * @param store the form viewer settings.
   * @param change the completed placement change.
   */
  onNodePlacementChanged?: (node: ComponentData, store: IStore, change: ComponentPlacementChange) => void
}

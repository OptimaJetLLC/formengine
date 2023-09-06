import {ActionEventArgs} from './utils/ActionEventArgs'

/**
 * Event handler function type.
 */
export type ActionEventHandler = (e: ActionEventArgs) => void | Promise<void>

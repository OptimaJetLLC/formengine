import {SyntheticEvent} from 'react'
import {Store} from '../../../stores/Store'
import {ComponentData} from '../../../utils/contexts/ComponentDataContext'

/**
 * Arguments passed to the event handler.
 */
export class ActionEventArgs {

  /**
   * Creates arguments for the event handler.
   * @param type the event type.
   * @param sender the component that triggered the event.
   * @param store the form viewer settings.
   * @param args the event arguments.
   */
  constructor(
    readonly type: string,
    readonly sender: ComponentData,
    readonly store: Store,
    readonly args: any[]
  ) {
  }

  /**
   * @returns the event handled by the event handler.
   */
  get event(): SyntheticEvent | null {
    return this.args.find(this.#isEvent)
  }

  /**
   * @returns the first element of the event argument array, which is treated as a value.
   */
  get value() {
    return this.args.filter(v => typeof v !== 'undefined').find(this.#isNotEvent)
  }

  #isEvent = (value: any) => Boolean(value && value.target && value.type && value.preventDefault)
  #isNotEvent = (value: any) => !this.#isEvent(value)
}

/**
 * Description of the event argument type for the code editor.
 */
export const ActionEventArgsDeclaration = `
/**
 * Arguments passed to the event handler.
 */
declare class ActionEventArgs {

  /**
   * The event type.
   */
  readonly type: string

  /**
   * The component that triggered the event.
   */
  readonly sender: ComponentData

  /**
   * The form viewer settings.
   */
  readonly store: Store

  /**
   * The event arguments.
   */
  readonly args: any[]

  /**
   * @returns the event handled by the event handler.
   */
  get event(): SyntheticEvent | null

  /**
   * @returns the first element of the event argument array, which is treated as a value.
   */
  get value(): any
}
`

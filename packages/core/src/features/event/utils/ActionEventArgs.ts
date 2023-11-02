import {SyntheticEvent} from 'react'
import {ComponentState} from '../../../stores/ComponentState'
import {Store} from '../../../stores/Store'
import {ComponentData} from '../../../utils/contexts/ComponentDataContext'

function createComponentDataProxy(componentData: ComponentData) {
  return new Proxy(componentData, {
    get(target, property: string) {
      if (property === 'toJSON') return () => target.data
      return target.data[property]
    },
    set(target, property: string, value): boolean {
      target.fields.get(property)?.setValue(value)
      return true
    }
  })
}

/**
 * Arguments passed to the event handler.
 */
export class ActionEventArgs {
  #componentDataProxy: any

  /**
   * The component properties that were used to render the sender component.
   */
  renderedProps: Record<string, any>

  /**
   * Creates arguments for the event handler.
   * @param type the event type.
   * @param sender the component that triggered the event.
   * @param store the form viewer settings.
   * @param args the event arguments.
   * @param state the {@link ComponentState} instance.
   */
  constructor(
    readonly type: string,
    readonly sender: ComponentData,
    readonly store: Store,
    readonly args: any[],
    state: ComponentState
  ) {
    this.renderedProps = state.get
    this.#componentDataProxy = createComponentDataProxy(this.store.formData)
  }

  /**
   * Sets user-defined properties for the React component that override other properties of the component.
   * @param props the component properties.
   */
  setUserDefinedProps = (props?: Record<string, any>) => {
    this.sender.userDefinedProps = props
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

  /**
   * @returns the object for reading and changing form data.
   */
  get data(): Record<string, unknown> {
    return this.#componentDataProxy
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
   * The component properties that were used to render the sender component.
   */
  readonly renderedProps: Record<string, any>
  
  /**
   * Sets current props of component.
   */
  readonly setUserDefinedProps: (props: Record<string, any>) => void

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
  
  /**
   * @returns the object for reading and changing form data.
   */
  get data(): Record<string, unknown>
}
`

import {SyntheticEvent} from 'react'
import {Store} from '../../../stores/Store'
import {ComponentData} from '../../../utils/contexts/ComponentDataContext'

export class ActionEventArgs {
  constructor(
    readonly type: string,
    readonly sender: ComponentData,
    readonly store: Store,
    readonly args: any[]
  ) {
  }

  get event(): SyntheticEvent | null {
    return this.args.find(this.#isEvent)
  }

  get value() {
    return this.args.filter(v => v !== undefined).find(this.#isNotEvent)
  }

  #isEvent = (value: any) => Boolean(value && value.target && value.type && value.preventDefault)
  #isNotEvent = (value: any) => !this.#isEvent(value)
}

export const ActionEventArgsDeclaration = `
declare class ActionEventArgs {

  readonly type: string
  readonly sender: ComponentData
  readonly store: Store
  readonly args: any[]

  get event(): SyntheticEvent | null

  get value(): any
}
`

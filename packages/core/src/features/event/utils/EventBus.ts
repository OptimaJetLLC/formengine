import {ActionEventHandler} from '../actionEventHandler'
import {ANY_EVENT} from '../consts'
import {ActionEventArgs} from './ActionEventArgs'

export interface EventFilter {
  readonly target?: string
  readonly type?: string
}

export type EventListener = ActionEventHandler & {
  target?: string
}

export class EventBus {
  readonly #listeners: Record<string | symbol, Set<EventListener>> = {}

  notify(filter: EventFilter, eventArgs: ActionEventArgs) {
    const targets = this.#getTargets(filter)
    targets.forEach((listener) => listener(eventArgs))
  }

  listen(callback: ActionEventHandler, filter?: EventFilter): () => void {
    const type = filter?.type ?? ANY_EVENT
    const listener = callback as EventListener
    listener.target = filter?.target

    this.#listeners[type] ??= new Set()
    this.#listeners[type].add(listener)

    return () => this.#listeners[type].delete(listener)
  }

  #getTargets({type, target}: EventFilter) {
    const notified: EventListener[] = []

    //Listeners by any event
    if (this.#listeners[ANY_EVENT]) {
      notified.push(...this.#listeners[ANY_EVENT])
    }

    if (type && this.#listeners[type]) {
      notified.push(...this.#listeners[type])
    }

    //Filter by target
    return notified.filter(value => value.target === target || !value.target)
  }
}

import {ANY_EVENT} from '../consts'
import {ActionEventHandler, EventListener, ListenerOptions, NotifyTarget} from '../types'
import {ActionEvent} from './ActionEvent'

export class EventBus {
  readonly #listeners: { [eventName: string | symbol]: EventListener[] }

  constructor() {
    this.#listeners = {}
  }

  notify(target: NotifyTarget, arg: ActionEvent) {
    const notified = this.#getNotified(target)
    if (!notified.length) return
    notified.forEach((func) => func(arg))
  }

  listen(callback: ActionEventHandler, options?: ListenerOptions) {
    const eventName = options?.eventName ?? ANY_EVENT
    const listener: EventListener = callback
    listener.target = options?.target

    this.#listeners[eventName] ??= []
    this.#listeners[eventName].push(listener)

    const unlisten = () => {
      this.#listeners[eventName] =
        this.#listeners[eventName]
          .filter((subscriber) => subscriber !== listener)

      if (this.#listeners[eventName].length === 0) delete this.#listeners[eventName]
    }

    return unlisten
  }

  #getNotified({eventName, target}: NotifyTarget) {
    const notified: EventListener[] = []

    //Filter by event
    if (this.#listeners[ANY_EVENT]) {
      notified.push(...this.#listeners[ANY_EVENT])
    }

    if (eventName && this.#listeners[eventName]) {
      notified.push(...this.#listeners[eventName])
    }

    //Filter by target
    return notified.filter(value => value.target === target || !value.target)
  }
}

import {filter, Observable, Observer} from 'rxjs'
import {ActionEventArgs} from './ActionEventArgs'

/**
 * The event stream of the form viewer.
 */
export class EventStream {

  /**
   * Creates the event stream of the form viewer.
   * @param stream the set of observable events.
   */
  constructor(private readonly stream: Observable<ActionEventArgs>) {
  }

  /**
   * Returns the event stream filtered by the specified predicate function.
   * @param predicate the predicate function.
   * @returns the event stream filtered by the specified predicate function.
   */
  filter(predicate: (args: ActionEventArgs) => boolean) {
    const newStream = this.stream.pipe(filter(predicate))
    return new EventStream(newStream)
  }

  /**
   * Returns the event stream filtered by the specified sender keys.
   * @param keys the sender key array.
   * @returns the event stream filtered by the specified sender keys.
   */
  keys(...keys: string[]) {
    const newStream = this.stream.pipe(filter(e => keys.includes(e.sender.key)))
    return new EventStream(newStream)
  }

  /**
   * Returns the event stream filtered by the specified event types.
   * @param types the array of event types.
   * @returns the event stream filtered by the specified event types.
   */
  types(...types: string[]) {
    const newStream = this.stream.pipe(filter(e => types.includes(e.type)))
    return new EventStream(newStream)
  }

  /**
   * Adds the subscriber to the stream of observed events.
   * @param next the subscriber function.
   */
  listen(next: (value: ActionEventArgs) => void): () => void

  /**
   * Adds the specified observer to the stream of observed events.
   * @param observer the observer.
   */
  listen(observer: Partial<Observer<ActionEventArgs>>): () => void

  /**
   * Adds the specified observer to the stream of observed events.
   * @param observerOrNext the observer.
   * @returns the unsubscribe function.
   */
  listen(observerOrNext: any): () => void {
    const subscription = this.stream.subscribe(observerOrNext)
    return () => subscription.unsubscribe()
  }
}

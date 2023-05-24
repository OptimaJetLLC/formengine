import {filter, Observable, Observer} from 'rxjs'
import {ActionEventArgs} from '../index'

export class EventStream {
  constructor(private readonly stream: Observable<ActionEventArgs>) {
  }

  filter(predicate: (args: ActionEventArgs) => boolean) {
    const newStream = this.stream.pipe(filter(predicate))
    return new EventStream(newStream)
  }

  keys(...keys: string[]) {
    const newStream = this.stream.pipe(filter(e => keys.includes(e.sender.key)))
    return new EventStream(newStream)
  }

  types(...types: string[]) {
    const newStream = this.stream.pipe(filter(e => types.includes(e.type)))
    return new EventStream(newStream)
  }

  //TODO rename to e
  listen(next: (value: ActionEventArgs) => void): () => void
  listen(observer: Partial<Observer<ActionEventArgs>>): () => void
  listen(observerOrNext: any): () => void {
    const subscription = this.stream.subscribe(observerOrNext)
    return () => subscription.unsubscribe()
  }
}

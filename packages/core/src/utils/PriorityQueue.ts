export class PriorityNode<T> {
  value: T
  priority: number
  next?: PriorityNode<T>

  constructor(value: T, priority: number) {
    this.value = value
    this.priority = priority
  }
}

export class PriorityQueue<T> {
  #head?: PriorityNode<T>
  #tail?: PriorityNode<T>

  enqueue(value: T, priority: number): PriorityNode<T> {
    const node = new PriorityNode(value, priority)

    if (!this.#head) {
      this.#head = this.#tail = node
      return node
    }

    let previous: PriorityNode<T> | undefined = this.#head
    if (previous.priority < priority) {
      node.next = previous
      this.#head = node
      return node
    }

    let next = previous?.next
    while (previous && next) {
      if (next.priority < priority) {
        node.next = next
        previous.next = node
        return node
      }
      previous = previous.next
      next = next.next
    }

    if (this.#tail) {
      this.#tail.next = node
    }
    this.#tail = node

    return node
  }

  dequeue(): PriorityNode<T> | undefined {
    if (!this.#head) {
      return
    }
    const oldHead = this.#head
    this.#head = oldHead.next
    return oldHead
  }

  peek(): T | undefined {
    return this.#head?.value
  }

  isEmpty(): boolean {
    return this.#head == null
  }

  get data() {
    const values = []
    let head = this.#head
    while (head) {
      values.push(head.value)
      head = head.next
    }
    return values;
  }
}

/**
 * A simple asynchronous queue that executes asynchronous tasks in a specified order.
 */
export class AsyncQueue {

  queue = Promise.resolve()

  /**
   * Adds an asynchronous task to the queue.
   * @param task the asynchronous task.
   * @returns the promise that will be resolved after the task is completed.
   */
  add(task: () => Promise<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue = this.queue.then(async () => {
        try {
          const result = await task()
          resolve(result)
        } catch (error) {
          reject(error as Error)
        }
      })
    })
  }
}

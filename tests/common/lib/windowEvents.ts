type WindowEventMap = {
  unhandledrejection: PromiseRejectionEvent
  error: ErrorEvent
}

type WindowEventType = keyof WindowEventMap

/** Node `process` event name for each supported window event. */
const processEventByWindowType = {
  unhandledrejection: 'unhandledRejection',
  error: 'uncaughtException',
} as const satisfies Record<WindowEventType, string>

type ProcessListener = ((reason: unknown, promise: Promise<unknown>) => void) | ((error: Error) => void)

const processListeners = new WeakMap<object, ProcessListener>()

const canUseProcessBridge = typeof process !== 'undefined' && typeof process.on === 'function'

/**
 * Builds a PromiseRejectionEvent-shaped object for jsdom/Node bridge deliveries.
 * @param reason the rejection reason.
 * @param promise the rejected promise.
 * @returns an event compatible with window unhandledrejection listeners.
 */
const toRejectionEvent = (reason: unknown, promise: Promise<unknown>): PromiseRejectionEvent => {
  if (typeof PromiseRejectionEvent === 'function') {
    try {
      return new PromiseRejectionEvent('unhandledrejection', {cancelable: true, promise, reason})
    } catch {
      // Some runtimes expose the constructor but reject these init fields.
    }
  }
  return Object.assign(new Event('unhandledrejection', {cancelable: true}), {promise, reason}) as PromiseRejectionEvent
}

/**
 * Builds an ErrorEvent-shaped object for jsdom/Node bridge deliveries.
 * @param error the uncaught exception.
 * @returns an event compatible with window error listeners.
 */
const toErrorEvent = (error: Error): ErrorEvent => {
  if (typeof ErrorEvent === 'function') {
    try {
      return new ErrorEvent('error', {cancelable: true, error, message: error.message})
    } catch {
      // Some runtimes expose the constructor but reject these init fields.
    }
  }
  return Object.assign(new Event('error', {cancelable: true}), {error, message: error.message}) as ErrorEvent
}

/**
 * Creates a Node process listener that forwards into a window-style event listener.
 * @param type the supported window event type.
 * @param listener the window-style listener.
 * @returns the process listener to register.
 */
const createProcessBridge = <K extends WindowEventType>(type: K, listener: (event: WindowEventMap[K]) => void): ProcessListener => {
  switch (type) {
    case 'unhandledrejection':
      return (reason: unknown, promise: Promise<unknown>) => {
        ;(listener as (event: PromiseRejectionEvent) => void)(toRejectionEvent(reason, promise))
      }
    case 'error':
      return (error: Error) => {
        ;(listener as (event: ErrorEvent) => void)(toErrorEvent(error))
      }
    default: {
      const unhandled: never = type
      throw new Error(`Unsupported window event: ${unhandled}`)
    }
  }
}

/**
 * Subscribes to a window error event (Vitest browser API).
 * In Node/jsdom, bridges the matching `process` event into the same listener shape.
 * @param type the supported window event type.
 * @param listener the window-style event listener.
 */
export function on<K extends WindowEventType>(type: K, listener: (event: WindowEventMap[K]) => void): void {
  if (canUseProcessBridge) {
    const bridged = createProcessBridge(type, listener)
    processListeners.set(listener, bridged)
    process.on(processEventByWindowType[type], bridged)
  } else {
    window.addEventListener(type, listener as EventListener)
  }
}

/**
 * Removes a listener previously registered with {@link on}.
 * @param type the supported window event type.
 * @param listener the window-style event listener.
 */
export function off<K extends WindowEventType>(type: K, listener: (event: WindowEventMap[K]) => void): void {
  if (canUseProcessBridge) {
    const bridged = processListeners.get(listener)
    if (bridged) {
      process.off(processEventByWindowType[type], bridged)
      processListeners.delete(listener)
    }
  } else {
    window.removeEventListener(type, listener as EventListener)
  }
}

import {action, observable, reaction} from 'mobx'

// Based on https://github.com/httptoolkit/mobx-shallow-undo/

/**
 * Drop-in undo & redo for shallow changes in Mobx
 * @param readObservable the getter, this will be observed.
 * @param setObservable the setter, to reset the value on undo/redo.
 * @param maxStackSize the maximum length of the undo/redo stack.
 * @returns the undoer instance.
 */
export function trackUndo<T>(
  readObservable: () => T,
  setObservable: (value: T) => void,
  maxStackSize?: number,
) {
  let isDisposed = false

  const undoStack: T[] = [readObservable()]
  // Always points to the current value
  const undoPointer = observable.box(undoStack.length - 1)

  let stopTrackingChanges: () => void = () => {
  }
  const trackChanges = () => {
    stopTrackingChanges = reaction(readObservable, (newValue) => {
      if (isDisposed) throw new Error('Undo already disposed')

      undoPointer.set(undoPointer.get() + 1)
      undoStack[undoPointer.get()] = newValue
      // On change, trim any trailing redo's
      undoStack.length = undoPointer.get() + 1

      if (maxStackSize && maxStackSize > 0 && undoStack.length > maxStackSize) {
        undoPointer.set(undoPointer.get() - 1)
        undoStack.splice(0, 1)
      }
    })
  }

  trackChanges()

  return observable({
      undo: action(() => {
        if (isDisposed) throw new Error('Undo already disposed')
        // No undos available
        if (undoPointer.get() === 0) return

        undoPointer.set(undoPointer.get() - 1)

        // We have to make this change without our undo stack including it, but
        // whilst still letting other external viewers observe this as normal.
        stopTrackingChanges()
        setObservable(undoStack[undoPointer.get()])
        trackChanges()
      }),
      redo: action(() => {
        if (isDisposed) throw new Error('Undo already disposed')
        // No redos available
        if (undoPointer.get() >= undoStack.length - 1) return
        undoPointer.set(undoPointer.get() + 1)

        stopTrackingChanges()
        setObservable(undoStack[undoPointer.get()])
        trackChanges()
      }),
      get hasUndo() {
        return undoPointer.get() !== 0
      },
      get hasRedo() {
        return undoPointer.get() < undoStack.length - 1
      },
      dispose: () => {
        stopTrackingChanges()
        isDisposed = true
      }
    }
  )
}

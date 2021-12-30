export class DndStore {
    isDragging: boolean = false
    draggingOverKey?: string
    draggingElementKey?: string
    isResizing?: boolean
    isMoving?: boolean

    constructor() {
    }
}
export default class DragAndDropContext {
    droppables = [];
    layouts = [];
    activeIndex = null;

    registerDroppable(droppable, layout) {
        const index = this.droppables.indexOf(droppable);
        if (index >= 0) {
            this.droppables[index] = droppable;
            this.layouts[index] = layout;
            return;
        }
        this.droppables.push(droppable);
        this.layouts.push(layout);
    }

    unregisterDroppable(droppable) {
        const index = this.droppables.indexOf(droppable);
        if (index >= 0) {
            this.droppables.splice(index, 1);
            this.layouts.splice(index, 1);
        }
    }

    getZoneIndex(gesture) {
        for (let i in this.layouts) {
            if (this.layouts.hasOwnProperty(i)) {
                const dz = this.layouts[i];
                if (gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height
                    && gesture.moveX > dz.x && gesture.moveX < dz.x + dz.width) {
                    return i;
                }
            }
        }
        return null;
    }

    onBeginDrag() {
        for (let item of this.droppables) {
            item.onBeginDrag();
        }
    }

    onEndDrag(gesture, draggable) {
        for (let item of this.droppables) {
            item.onEndDrag();
        }
        const newActive = this.getZoneIndex(gesture);
        if (newActive !== null) {
            const droppable = this.droppables[newActive];
            droppable.onDrop(draggable);
        }
        this.activeIndex = null;
    }

    onMove(gesture) {
        const newActive = this.getZoneIndex(gesture);
        if (newActive === this.activeIndex) {
            return;
        }
        if (this.activeIndex !== null) {
            const droppable = this.droppables[this.activeIndex];
            droppable.onLeave();
        }
        if (newActive !== null) {
            const droppable = this.droppables[newActive];
            droppable.onEnter();
        }
        this.activeIndex = newActive;
    }

    hideZones() {
        for (let item of this.droppables) {
            item.hide();
        }
    }

    showZones() {
        for (let item of this.droppables) {
            item.show();
        }
    }

}

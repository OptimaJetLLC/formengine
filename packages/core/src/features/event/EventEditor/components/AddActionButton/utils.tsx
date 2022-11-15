import {ComponentStore} from '../../../../../stores/ComponentStore'
import {NewActionData} from '../../../types'

function initEvent(componentStore: ComponentStore, eventKey: string) {
  componentStore.events ??= {}
  componentStore.events[eventKey] ??= []
}

function addActionToEvent(componentStore: ComponentStore, eventKey: string, {action, target}: NewActionData) {
  componentStore.events![eventKey].push({
    actionName: action.name,
    targetKey: target?.key,
  })
}

function removeAction(componentStore: ComponentStore, eventKey: string, index: number) {
  componentStore.events![eventKey]?.splice(index, 1)
}

export {initEvent, addActionToEvent, removeAction}

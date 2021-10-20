import {ComponentStore} from "../stores/ComponentStore";
import {Action} from "../api/Types";

export type EventName = string
export type Target = string

export interface Event {

    //targets: Record<target, { method: name, parameters: object }[]>
    targets: {active: boolean, targetKey: string, action: string, args: any[] }[]
}

export type AllEvents = {
    active: boolean,
    eventName: string,
    source: ComponentStore,
    target: ComponentStore,
    action: Action,
    args: any[]
}[]


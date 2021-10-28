import {makeAutoObservable, observable} from "mobx";
import {ComponentDefinition} from "../api/Types";
import {WeakEvent, EventName} from "../utils/Types";

export class ComponentStore {
    key: string = ""
    type: string = ""
    props: Record<string, any> = {}
    events: Record<EventName, WeakEvent[]> = {}
    children?: ComponentStore[]

    constructor(key: string, definition: ComponentDefinition<any>) {
        this.key = key
        this.type = definition.name
        makeAutoObservable(this, {
            events: observable.deep
        });
    }
}


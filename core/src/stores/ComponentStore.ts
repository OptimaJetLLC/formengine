import {makeAutoObservable, observable} from "mobx";
import {ComponentDefinition} from "../api/types";
import {EventName, WeakActionDefinition} from "../utils/Types";

export class ComponentStore {
    key: string = ""
    type: string = ""
    props: Record<string, any> = {}
    events: Record<EventName, WeakActionDefinition[]> = {}
    styles: Record<string, string>[] = [{"": ""}]
    children?: ComponentStore[]

    constructor(key: string, definition?: ComponentDefinition<any>) {
        this.key = key
        if (definition) this.type = definition.name

        makeAutoObservable(this, {
            events: observable.deep,
            props: observable.shallow
        });
    }
}


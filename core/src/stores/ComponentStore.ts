import {makeAutoObservable, observable} from "mobx";
import {ComponentDefinition} from "../features/annotation/types";
import {WeakActionDefinition, EventName} from "../utils/Types";
import {ParsableValidateSchema} from "../features/validation/types";

export class ComponentStore {
    key: string = ""
    type: string = ""
    props: Record<string, any> = {}
    events: Record<EventName, WeakActionDefinition[]> = {}
    styles: Record<string, string>[] = [{"": ""}]
    validation?: ParsableValidateSchema
    children?: ComponentStore[]

    constructor(key: string, definition?: ComponentDefinition<any>) {
        this.key = key
        if (definition) this.type = definition.name

        makeAutoObservable(this, {
            events: observable.deep,
            validation: observable.deep,
            props: observable.shallow
        });
    }
}


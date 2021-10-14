import {makeAutoObservable} from "mobx";
import {ComponentDefinition} from "../api/Types";

export class ComponentStore {
    key: string = ""
    type: string = ""
    props: Record<string, any> = {}
    children?: ComponentStore[]

    constructor(key: string, definition: ComponentDefinition<any>) {
        this.key = key
        this.type = definition.type
        makeAutoObservable(this);
    }
}

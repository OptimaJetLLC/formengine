import {makeAutoObservable, observable} from "mobx";
import {ComponentDefinition} from "../features/annotation/types";
import {EventName, WeakActionDefinition} from "../utils/Types";
import {ParsableValidateSchema} from "../features/validation/types";
import {StyleItem} from "../features/style";

export class ComponentStore {
    key: string = ""
    type: string = ""
    props: Record<string, any> = {}
    events: Record<EventName, WeakActionDefinition[]> = {}
    styles?: Record<string, string>
    cssStyles?: StyleItem[]
    cssBlock?: string
    validation?: ParsableValidateSchema
    children?: ComponentStore[]

    constructor(key: string, type: string) {
        this.key = key;
        this.type = type;

        makeAutoObservable(this, {
            events: observable.deep,
            validation: observable.deep,
            props: observable.shallow
        });
    }
}


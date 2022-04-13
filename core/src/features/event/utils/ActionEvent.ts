import {ComponentStore} from "../../../stores/ComponentStore";
import {Store} from "../../../stores/Store";
import {SyntheticEvent} from "react";

export class ActionEvent {
    constructor(
        readonly eventName: string,
        readonly sender: ComponentStore,
        readonly store: Store, //TODO заменить тип в будущем на упрощенный стор - вью стор
        readonly args: any[]
    ) {
    }

    get event(): SyntheticEvent | null {
        return this.args.find(this.#isEvent)
    }

    get value() {
        return this.args.find(this.#isNotEvent)
    }

    #isEvent = (value: any) => Boolean(value && value.target && value.type && value.preventDefault);
    #isNotEvent = (value: any) => !this.#isEvent(value);
}
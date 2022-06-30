import {screen} from "../components/Screen";
import {ComponentDefinition} from "../features/annotation/utils/ComponentDefinition";
import {ComponentStore} from "../stores/ComponentStore";

export class DefineRegistry {
    #map = new Map<string, ComponentDefinition<any>>()

    constructor(defines: ComponentDefinition<any>[] = []) {
        this.define(screen)
        defines.forEach(this.define.bind(this))
    }

    define(definition: ComponentDefinition<any>) {
        this.#map.set(definition.type, definition)
    }

    get(type: string): ComponentDefinition<any> {
        const result = this.#map.get(type)
        if (result) return result
        throw new Error(`The ${type} is not found!`)
    }

    getModel(store: ComponentStore) {
        return this.get(store.type).init(store)
    }


    all() {
        return [...this.#map.values()]
    }
}

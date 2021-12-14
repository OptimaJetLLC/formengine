import {ComponentDefinition} from "../features/annotation/types";

export class DefineRegistry {
    #map = new Map<string, ComponentDefinition<any>>()

    constructor(defines: ComponentDefinition<any>[] = []) {
        defines.forEach(this.define.bind(this))
    }

    define(definition: ComponentDefinition<any>) {
        this.#map.set(definition.name === "root" ? "" : definition.name, definition)
    }

    get (name: string): ComponentDefinition<any>{
        const result = this.#map.get(name)

        if (result) return result

        throw new Error(`The ${name} is not found!`)
    }

    all() {
        return [...this.#map.values()]
    }
}

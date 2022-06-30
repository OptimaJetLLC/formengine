import {ComponentType} from "react";
import {Annotation} from "./Annotation";
import {ActionDefinition} from "../../event/types";

export class ComponentModel<T> {
    readonly #name?: string

    get name() {
        return this.#name ?? this.type
    }
    get type() {
        return this.view.displayName || this.view.name
    }

    constructor(
        readonly view: ComponentType<T>,
        readonly properties: Annotation<T>[],
        name?: string,
        readonly actions?: ActionDefinition[],
        readonly hint?: string,
    ) {
        this.#name = name
    }
}
import {ComponentType} from "react";
import {ActionDefinition, ActionEventHandler} from "../../event/types";
import {Annotation} from "./Annotation";
import {ActionsInitializer, Annotations} from "../types";
import {defineAction} from "../../event/defineAction";
import {ComponentStore} from "../../../stores/ComponentStore";
import {key, string, style, validation} from "../index";
import {forIn, startCase, transform} from "lodash";
import {isFunction} from "../../../utils";
import {ComponentModel} from "./ComponentModel";


//TODO проброс пропертей в инициализатор экшенов.
export class ComponentDefinition<T extends object> {
    readonly #name?: string

    get name() {
        return this.#name ?? this.type
    }
    get type(): string {
        return this.view.displayName || this.view.name
    }

    private constructor(
        readonly view: ComponentType<T>,
        name?: string,
        readonly properties?: Annotations<T>,
        readonly actionsInitializer?: ActionsInitializer,
        readonly hint?: string,
    ) {
        this.#name = name
    }

    named = (name: string) => this.#cloneWith({name});
    props = (properties: Annotations<T>) => this.#cloneWith({properties});
    actions = (fn: ActionsInitializer) => this.#cloneWith({actionsInitializer: fn});
    hinted = (hint: string) => this.#cloneWith({hint});

    static define<T extends object>(view: ComponentType<T>) {
        checkExistName()
        return new ComponentDefinition<T>(view)


        function checkExistName() {
            const name = view.displayName || view.name
            if (!name)
                throw Error("Component must be named!")
        }
    }

    init(store: ComponentStore) {
        return new ComponentModel(
            this.view,
            initProperties(this.properties),
            this.#name,
            initActions(this.actionsInitializer?.(store.props, defineAction)),
            this.hint,
        )


        function initProperties(annotations?: Annotations<T>) {
            if (!annotations) return []

            const properties: Annotation<any>[] = [
                key.build("key"),
                style.build("style"),
                validation.build("validation"),
            ]

            forIn(annotations, (value, key) => properties.push(value?.build(key) ?? string.build(key)))

            return properties
        }
        function initActions(actions?: Record<string, ActionEventHandler | ActionDefinition>): ActionDefinition[] | undefined {
            if (!actions) return

            return transform(actions, (result, value, key) => {
                if (isFunction(value)) {
                    result.push({
                        name: startCase(key),
                        func: value,
                    })
                    return
                }

                result.push(value)
            }, [] as ActionDefinition[])
        }
    }

    #cloneWith(opts: Partial<ComponentDefinition<T>>): ComponentDefinition<T> {
        return new ComponentDefinition(
            opts.view || this.view,
            opts.name || this.#name,
            opts.properties || this.properties,
            opts.actionsInitializer || this.actionsInitializer,
            opts.hint || this.hint,
        )
    }
}


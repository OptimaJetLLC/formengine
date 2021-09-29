import React, {Component, FunctionComponent, ReactNode} from "react";
import {observer} from "mobx-react-lite";
import {store} from "../stores/Store";
import ComponentDefinition, {AllKeysOf} from "./constants";
import {extend} from "lodash";

export class Renderer {
    mapper!: Record<string, ComponentDefinition<any>>

    static create(components: ComponentDefinition<any>[]) {
        let instance = new Renderer()
        instance.mapper = {}
        components.forEach(value => instance.mapper[value.type] = value)

        return instance
    }

    render(): JSX.Element[] {

        return store.models.map(store => {
            let definition = this.mapper[store.type]

            let component = hoc(definition.view)

            const ObservableComponent = observer(component);

            return <ObservableComponent key={store.key} {...store.props} />
        })
    }


}

export const define = <T extends object>(view: FunctionComponent<T>, description: Partial<AllKeysOf<T>>)
    : ComponentDefinition<any> => {
    return ({
        type: view.name || view.displayName || "Component",
        view,
        description
    })
}


export function hoc<T extends object>(WrappedComponent: React.ComponentType<T>) {
    const ComponentWithTheme = (props: T) => <WrappedComponent {...props} />;

    return ComponentWithTheme;
}

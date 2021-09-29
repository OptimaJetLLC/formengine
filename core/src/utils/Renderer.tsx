import React from "react";
import {observer} from "mobx-react-lite";
import {store} from "../stores/Store";
import ComponentDefinition from "./constants";

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


export function hoc<T extends object>(WrappedComponent: React.ComponentType<T>) {
    const ComponentWithTheme = (props: T) => <WrappedComponent {...props} />;

    return ComponentWithTheme;
}

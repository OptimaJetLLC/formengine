import React, {FunctionComponent, ReactNode} from "react";
import {observer} from "mobx-react-lite";
import {store} from "../stores/Store";
import ComponentDefinition, {AllPropsDescriptionOf} from "./constants";

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
            let component = this.mapper[store.type]
            const ObservableComponent = observer(component.view);

            return <ObservableComponent key={store.key} {...store.props} />
        })
    }
}

export const define = <T extends object>(view: FunctionComponent<T>, description: AllPropsDescriptionOf<T>): ComponentDefinition<any> => {
    return ({
        type: view.name,
        view,
        description
    })
}


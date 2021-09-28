import React, {FunctionComponent, ReactNode} from "react";
import {ComponentStore} from "../stores/ComponentStore";
import {observer} from "mobx-react-lite";
import {store} from "../stores/Store";
import _ from "lodash";
import ComponentDefinition, {AllPropsDescriptionOf} from "./constants";
import {AHeader, AHeaderProps} from "../views/AHeader";

export class Renderer {
    //mapper!: { [p: string]: ComponentDefinition<any> };
    mapper!: Record<string, ComponentDefinition<any>>

    //mapper!: { [key: string]: <T>() => any; };
    /*static create<Props>(mapper: { [type: string]: React.FunctionComponent<Props> }) {
        this.mapper = mapper

        return this;
    }*/

    //static create<Props extends object>(mapper: { [type: string]: React.FunctionComponent<Props> }) {
    //static create(mapper: { [type: string]: ComponentDefinition<any> }) {
    static create(components: ComponentDefinition<any>[]) {
        let instance = new Renderer()
        instance.mapper = {}
        components.forEach(value => instance.mapper[value.type] = value)


        return instance
    }

    render(): JSX.Element[] {

        return store.componentStores.map(store => {
            let component = this.mapper[store.type]
            const ObservableComponent = observer(component.view);

            //debugger
            if (_.isEmpty(store.props)) {
                Object.keys(component.description).forEach(key => {
                    if (key.includes(".") || key === "key")
                        _.set(store.props, key, component.description[key]?.defaultValue ?? "")
                })
            }
            return <ObservableComponent key={store.key} {...store.props} />
        })

    }

    /*static create(mapper: { AHeader: (props: AHeaderProps) => JSX.Element }) {

    }*/
}

export const define = <T extends object>(view: FunctionComponent<T>, description: AllPropsDescriptionOf<T>): ComponentDefinition<any> => {
    return ({
        type: view.name,
        view,
        description
    })
}

let a = define(AHeader, {
    "main.content": null,
    "main.subheader": null,
    key: null,
    main: null
})

/** @jsxImportSource @emotion/react */
import _ from "lodash";
import React, {ComponentType, createElement, ReactElement, useEffect, useMemo} from "react";
import {observer} from "mobx-react";
import {ComponentDefinition} from "../features/annotation/types";
import {ComponentStore} from "../stores/ComponentStore";
import {useEvent} from "../features/event/useEvent";
import {FieldProps, useValidation} from "../features/validation/useValidation";
import {toValidateScheme} from "../features/validation/toValidateScheme";
import {WithErrorMessage} from "../features/validation/withErrorMessage";
import {transformStyles} from "../features/style";
import {useSubstitution} from "../features/substitution/useSubstitution";
import {useStore} from "../utils/StoreContext";
import {toJS} from "mobx";
import {useComponentStore} from "../utils/ComponentStoreContext";
import {Components} from "./Components";

interface ComponentProps {
    wrapper?: ComponentType<{ child: ReactElement }>
}

export const Component = observer(({wrapper}: ComponentProps) => {
    const store = useStore()
    const componentStore = useComponentStore()
    const currentProps: Record<string, any> = {}
    const componentDefinition = store.view.get(componentStore.type);

    const defaultProps = useDefaultProps(componentDefinition)
    const [events, eventActions] = useEvent(componentStore, componentDefinition);
    const [field, meta] = useValidation({
        key: componentStore.key,
        scheme: toValidateScheme(componentStore.validation),
    })
    const substitutedValues = useSubstitution(componentStore.props)

    useInjectedValidation(events, eventActions, field)

    if (componentStore.children)
        currentProps.children = <Components components={componentStore.children} wrapper={wrapper}/>

    currentProps.className = transformStyles(componentStore);

    const storedProps = toJS(componentStore.props)
    const props = Object.assign(defaultProps, events, storedProps, currentProps, substitutedValues)
    const element = React.createElement(componentDefinition.view, props)

    //const element = React.createElement(componentDefinition.view, {...props, ...eventMap, ...componentStore.props})

    //TODO for builder need render another component without error message and events
    const withError = React.createElement(WithErrorMessage, {child: element, meta})

    //return wrapper ? wrapper({componentStore, children: element}) : withError;
    return wrapper ? createElement(wrapper, {child: element}) : withError;
});

function useDefaultProps(definition: ComponentDefinition<any>) {
    return useMemo(() => {
        const props: Record<string, any> = {}

        definition.annotations.forEach((value) => {
            if (value.isSystem) return
            if (value.isFunction) return
            if (value.isContainer) return

            props[value.key] = value.defaultValue
        })

        return props
    }, [])
}

function useInjectedValidation(events: Record<string, any>, eventActions: Record<string, any[]>, field: FieldProps) {
    useEffect(() => {
        if (eventActions["onChange"]) eventActions["onChange"].push(field.setValue)
        else events.onChange = field.setValue

        if (eventActions["onBlur"]) eventActions["onBlur"].push(() => field.setTouched())
        else events.onBlur = () => field.setTouched()

        //props.value = field.value
    }, [events])
}
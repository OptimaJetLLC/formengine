/** @jsxImportSource @emotion/react */
import _ from "lodash";
import React, {useEffect, useMemo} from "react";
import {observer} from "mobx-react";
import {ComponentDefinition} from "../features/annotation/types";
import {ComponentStore} from "../stores/ComponentStore";
import {useEvent} from "../features/event/useEvent";
import {useValidation} from "../features/validation/useValidation";
import {toValidateScheme} from "../features/validation/toValidateScheme";
import {WithErrorMessage} from "../features/validation/withErrorMessage";
import {transformStyles} from "../features/style";
import {useSubstitution} from "../features/substitution/useSubstitution";
import {useStore} from "../utils/StoreContext";
import {toJS} from "mobx";

interface ComponentProps {
    componentStore: ComponentStore,
    wrapper?: Function
}

export const Component = observer(({componentStore, wrapper}: ComponentProps) => {
    const store = useStore()
    const currentProps: Record<string, any> = {}
    const componentDefinition = store.view.get(componentStore.type);

    const defaultProps = useDefaultProps(componentDefinition)
    const [events, eventActions] = useEvent(componentStore, componentDefinition);
    const [field, meta] = useValidation({
        key: componentStore.key,
        scheme: toValidateScheme(componentStore.validation),
    })

    //injectValidation()
    useEffect(() => {
        if (eventActions["onChange"]) eventActions["onChange"].push(field.setValue)
        else events.onChange = field.setValue

        if (eventActions["onBlur"]) eventActions["onBlur"].push(() => field.setTouched())
        else events.onBlur = () => field.setTouched()

        //props.value = field.value
    }, [events])

    useSubstitution(currentProps, componentDefinition)

    currentProps.children = currentProps.children
        || componentStore.children?.map(child =>
            <Component key={child.key} componentStore={child} wrapper={wrapper}/>);

    currentProps.className = transformStyles(componentStore);

    const storedProps = toJS(componentStore.props)
    const props = Object.assign(defaultProps, currentProps, events, storedProps)
    const element = React.createElement(componentDefinition.view, props)

    //const element = React.createElement(componentDefinition.view, {...props, ...eventMap, ...componentStore.props})

    //TODO for builder need render another component without error message and events
    const withError = React.createElement(WithErrorMessage, {child: element, meta})

    return wrapper ? wrapper({componentStore, children: element}) : withError;
});

function useDefaultProps(definition: ComponentDefinition<any>) {
    return useMemo(() => {
        const props: Record<string, any> = {}

        _.forIn(definition.annotations, (value, key) => {
            if (value.isSystem) return
            if (value.isFunction) return
            if (value.isContainer) return

            props[key] = value.defaultValue
        })

        return props
    }, [])
}
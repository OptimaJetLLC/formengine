/** @jsxImportSource @emotion/react */
import _ from "lodash";
import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react";
import {ComponentDefinition} from "../features/annotation/types";
import {ComponentStore} from "../stores/ComponentStore";
import {transformEvent} from "../features/event/transformEvent";
import {useEvent} from "../features/event/useEvent";
import {useValidation} from "../features/validation/useValidation";
import {toValidateScheme} from "../features/validation/toValidateScheme";
import {WithErrorMessage} from "../features/validation/withErrorMessage";
import {transformStyles} from "../features/style";
import {useSubstitution} from "../features/substitution/useSubstitution";
import {useStore} from "../utils/StoreContext";
import {Store} from "../stores/Store";

interface ComponentProps {
    componentStore: ComponentStore,
    wrapper?: Function
}

export const Component = observer(({componentStore, wrapper}: ComponentProps) => {
    const store = useStore()
    const {props} = componentStore;
    const componentDefinition = store.view.get(componentStore.type);

    useEffect(() => initDefaultValue(store, componentStore, componentDefinition), [])

    const eventMap = useEvent(componentStore, componentDefinition);

    const [field, meta] = useValidation({
        key: componentStore.key,
        scheme: toValidateScheme(componentStore.validation),
    })

    //injectValidation()
    useEffect(() => {
        if (eventMap["onChange"]) eventMap["onChange"].push(field.setValue)
        else props.onChange = field.setValue

        if (eventMap["onBlur"]) eventMap["onBlur"].push(() => field.setTouched())
        else props.onBlur = () => field.setTouched()

        //props.value = field.value
    }, [])


    useSubstitution(props, componentDefinition)

    props.children = props.children
        || componentStore.children?.map(child =>
            <Component key={child.key} componentStore={child} wrapper={wrapper}/>);

    props.className = transformStyles(componentStore);

    const element = React.createElement(componentDefinition.view, props)

    //TODO for builder need render another component without error message and events
    const withError = React.createElement(WithErrorMessage, {child: element, meta})

    return wrapper ? wrapper({componentStore, children: element}) : withError;
});

function initDefaultValue(store: Store, componentStore: ComponentStore, definition: ComponentDefinition<any>) {

    _.forIn(definition.annotations, (value, key) => {
        if (value.isSystem) return

        if (value.isFunction)
            componentStore.props[key] = transformEvent(store, key, componentStore, definition)
        else
            componentStore.props[key] = componentStore.props[key] ?? value.defaultValue
    })
}

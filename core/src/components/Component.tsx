import _ from "lodash";
import React, {useEffect} from "react";
import {mapper} from "../views";
import {observer} from "mobx-react";
import {ComponentDefinition} from "../api/types";
import {ComponentStore} from "../stores/ComponentStore";
import {transformEvent} from "../features/event/transformEvent";
import {useEvent} from "../features/event/useEvent";
import {useStyle} from "../features/style/useStyle";
import {useValidation} from "../features/validation/useValidation";
import {toValidateScheme} from "../features/validation/toValidateScheme";
import {WithErrorMessage, withErrorMessage} from "../features/validation/withErrorMessage";
import * as Yup from "yup";

interface ComponentProps {
    componentStore: ComponentStore,
    wrapper?: Function
}

export const Component = observer(({componentStore, wrapper}: ComponentProps) => {
    const {props} = componentStore;
    const componentDefinition = mapper[componentStore.type];

    useEffect(() => initDefaultValue(componentStore, componentDefinition), [])

    const actions = useEvent(componentStore, componentDefinition);
    useStyle(componentStore);

    const [field, meta] = useValidation({
        key: componentStore.key,
        scheme: toValidateScheme(componentStore.validation),
        //scheme: Yup.string().required().min(3),
    })

    //injectValidation()
    useEffect(() => {
        if (actions["onChange"]) actions["onChange"].push(field.setValue)
        else props.onChange = field.setValue

        if (actions["onBlur"]) actions["onBlur"].push(() => field.setTouched())
        else props.onBlur = () => field.setTouched()

        props.value = field.value
    }, [])

    props.children = props.children
        || componentStore.children?.map(child =>
            <Component key={child.key} componentStore={child} wrapper={wrapper}/>)

    //TODO for builder need render another component without error message and events
    const element = React.createElement(componentDefinition.view, props);

    const withError = React.createElement(WithErrorMessage, {child: element, meta})

    return wrapper ? wrapper({componentStore, children: element}) : withError;
});

function initDefaultValue(store: ComponentStore, definition: ComponentDefinition<any>) {

    _.forIn(definition.annotations, (value, key) => {
        if (value.isSystem) return

        if (value.isFunction)
            store.props[key] = transformEvent(key, store, definition)
        else
            store.props[key] = store.props[key] ?? value.defaultValue
    })
}


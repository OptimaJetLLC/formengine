/** @jsxImportSource @emotion/react */
import {ComponentType, createElement, ReactElement} from "react";
import {observer} from "mobx-react";
import {useEvent} from "../../features/event/useEvent";
import {useValidation} from "../../features/validation/useValidation";
import {toValidateScheme} from "../../features/validation/toValidateScheme";
import {WithErrorMessage} from "../../features/validation/withErrorMessage";
import {transformStyles} from "../../features/style";
import {useSubstitution} from "../../features/substitution/useSubstitution";
import {useStore} from "../../utils/StoreContext";
import {toJS} from "mobx";
import {useComponentStore} from "../../utils/ComponentStoreContext";
import {useDefaultProps} from "./hooks/useDefaultProps";
import {useInjectedValidation} from "./hooks/useInjectedValidation";
import {useChildren} from "./hooks/useChildren";

interface ComponentProps {
    wrapper?: ComponentType<{ child: ReactElement }>
}

//TODO update hooks: hide definition,
//TODO update useValidation - hide parameters,
//TODO transformStyles to hook
export const Component = observer(({wrapper}: ComponentProps) => {
    const store = useStore()
    const componentStore = useComponentStore()
    const currentProps: Record<string, any> = {}
    const definition = store.view.get(componentStore.type);

    const defaultProps = useDefaultProps(definition)
    const [events, eventActions] = useEvent(definition);
    const [field, meta] = useValidation({
        key: componentStore.key,
        scheme: toValidateScheme(componentStore.validation),
    })
    const substitutedValues = useSubstitution()
    useInjectedValidation(events, eventActions, field)
    useChildren(currentProps, definition, wrapper);

    currentProps.className = transformStyles(componentStore);

    //TODO inline
    const storedProps = toJS(componentStore.props)
    const props = Object.assign(defaultProps, events, storedProps, currentProps, substitutedValues)

    const element = createElement(definition.view, props)

    //const element = React.createElement(definition.view, {...props, ...eventMap, ...componentStore.props})

    //TODO for builder need render another component without error message and events
    const withError = createElement(WithErrorMessage, {child: element, meta})

    //return wrapper ? wrapper({componentStore, children: element}) : withError;
    return wrapper ? createElement(wrapper, {child: element}) : withError;
});
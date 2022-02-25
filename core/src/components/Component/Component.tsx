/** @jsxImportSource @emotion/react */
import {ComponentType} from "react";
import {observer} from "mobx-react";
import {useEvent} from "../../features/event/useEvent";
import {useComponentValidation} from "../../features/validation/useValidation";
import {WithErrorMessage} from "../../features/validation/withErrorMessage";
import {useTransformStyles} from "../../features/style";
import {useSubstitution} from "../../features/substitution/useSubstitution";
import {toJS} from "mobx";
import {useComponentData} from "../../utils/contexts/ComponenDataContext";
import {useDefaultProps} from "./hooks/useDefaultProps";
import {useInjectedValidation} from "./hooks/useInjectedValidation";
import {useChildren} from "./hooks/useChildren";
import {Wrapper} from "../../utils/types";

interface ComponentProps {
    Wrapper?: Wrapper
}

export const Component = observer(({Wrapper}: ComponentProps) => {
    const currentProps: Record<string, any> = {}

    const {componentStore, definition: {view}} = useComponentData()
    const defaultProps = useDefaultProps()
    const [events, eventActions] = useEvent();
    const [field, meta] = useComponentValidation()
    const substitutedValues = useSubstitution()
    useInjectedValidation(events, eventActions, field)
    useChildren(currentProps, Wrapper);
    currentProps.className = useTransformStyles();
    //TODO inline

    const storedProps = toJS(componentStore.props)
    const props = Object.assign({}, defaultProps, events, storedProps, currentProps, substitutedValues)

    //TODO for builder need render another component without error message and events
    //TODO to Component Type
    //const withError = createElement(WithErrorMessage, {child: element, meta})


    const View = observer(view)
    if (Wrapper)
        return <Wrapper View={View} viewProps={props}/>

    return <View {...props}/>
});
import {useMemo} from "react";
import {observer} from "mobx-react";
import {useEvents} from "../../features/event";
import {useComponentValidation} from "../../features/validation/useValidation";
import {WithErrorMessage} from "../../features/validation/withErrorMessage";
import {useSubstitution} from "../../features/substitution/useSubstitution";
import {toJS} from "mobx";
import {useComponentData} from "../../utils/contexts/ComponenDataContext";
import {useDefaultProps} from "./hooks/useDefaultProps";
import {useInjectedValidation} from "./hooks/useInjectedValidation";
import {useChildren} from "./hooks/useChildren";
import {Wrapper} from "../../utils/types";
import {assign} from "lodash";
import { useStyles } from "../../features/style";

interface ComponentProps {
    Wrapper?: Wrapper
}

//TODO часть хуков используется только в режиме вью и превью - вынести?
export const Component = observer(({Wrapper}: ComponentProps) => {
    const currentProps: Record<string, any> = {}

    const {componentStore, definition: {view}} = useComponentData()
    const defaultProps = useDefaultProps()
    const [eventHandlers, actionsMap] = useEvents();
    const [field, meta] = useComponentValidation()
    const substitutedValues = useSubstitution()
    useInjectedValidation(eventHandlers, actionsMap, field)
    useChildren(currentProps, Wrapper);
    currentProps.className = useStyles();

    currentProps.value = field.value

    const storedProps = toJS(componentStore.props)
    const props = assign({}, defaultProps, eventHandlers, storedProps, currentProps, substitutedValues)

    //TODO for builder need render another component without error message and events
    //TODO to Component Type
    //const withError = createElement(WithErrorMessage, {child: element, meta})

    const View = useMemo(() => observer(view), [])

    if (Wrapper)
        return <Wrapper View={View} viewProps={props}/>

    return <View key={componentStore.key} {...props}/>
});
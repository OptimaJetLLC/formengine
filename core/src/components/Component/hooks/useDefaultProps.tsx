import {ComponentDefinition} from "../../../features/annotation/types";
import {useMemo} from "react";

export function useDefaultProps(definition: ComponentDefinition<any>) {
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
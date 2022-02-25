import {useMemo} from "react";
import {useComponentData} from "../../../utils/contexts/ComponenDataContext";

export function useDefaultProps() {
    const {definition} = useComponentData()

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
import {ComponentDefinition} from "../annotation/types";
import {useContext, useEffect, useMemo, useRef} from "react";
import {FormikContext} from "formik";
import {store} from "../../stores/Store";

export const useSubstitution = (props: Record<string, any>, {annotations}: ComponentDefinition<any>) => {
    let formik = useContext(FormikContext)

    const originalProps: any = useRef({})

    useEffect(() => {
        for (let key in props) {
            let value = props[key]
            if (typeof value !== "string" || key === "value") continue

            if (store.isBuilderMode) continue

            if (!originalProps.current[key])
                originalProps.current[key] = props[key]

            props[key] = substitute(originalProps.current[key], formik.values)
        }

        return () => {
            Object.assign(props, originalProps.current)
        }

    })
}

const substitute = (value: string, values: any) => {

    return value.replace(/{([\w ]+)}/g, (match, replaceable) => {
        return values[replaceable] ? values[replaceable] : match
    })
}
import {useContext} from "react";
import {FormikContext} from "formik";
import {useStore} from "../../utils/StoreContext";
import {useObserver} from "mobx-react";

export const useSubstitution = (props: Readonly<Record<string, any>>) => {
    const store = useStore()
    const formik = useContext(FormikContext)

    return useObserver(() => {
        let result: Record<string, any> = {}

        for (let key in props) {
            const value = props[key]
            if (typeof value !== "string" || key === "value") continue

            if (store.isBuilderMode) continue

            result[key] = substitute(value, formik.values)
        }

        return result
    })


    function substitute(value: string, values: any) {
        return value.replace(/{([\w ]+)}/g, (match, replaceable) => {
            return values[replaceable] ? values[replaceable] : match
        })
    }
}
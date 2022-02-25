import {useContext} from "react";
import {FormikContext} from "formik";
import {useStore} from "../../utils/contexts/StoreContext";
import {useObserver} from "mobx-react";
import {useComponentData} from "../../utils/contexts/ComponenDataContext";

export const useSubstitution = () => {
    const store = useStore()
    const formik = useContext(FormikContext)
    const {componentStore: {props}} = useComponentData()

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
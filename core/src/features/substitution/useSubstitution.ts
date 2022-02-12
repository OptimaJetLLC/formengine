import {useContext} from "react";
import {FormikContext} from "formik";
import {useStore} from "../../utils/StoreContext";
import {useObserver} from "mobx-react";
import {useComponentStore} from "../../utils/ComponentStoreContext";

export const useSubstitution = () => {
    const store = useStore()
    const formik = useContext(FormikContext)
    const  {props} = useComponentStore()

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
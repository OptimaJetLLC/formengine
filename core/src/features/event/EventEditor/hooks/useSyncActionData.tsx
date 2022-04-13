import _ from "lodash";
import {WeakActionData} from "../../types";
import {useStore} from "../../../../utils/contexts/StoreContext";
import {useEffect} from "react";
import {useLocalObservable} from "mobx-react";
import {toActionData} from "../../utils/toActionData";
import {observe} from "mobx";
import {toWeakActionData} from "../../utils/toWeakActionData";

/**
 * Return the shallow observable action data which connected with the stored weak action data: changing returned value change stored data.
 */
export const useSyncActionData = (weakData: WeakActionData) => {
    const store = useStore()
    const data = useLocalObservable(() => toActionData(weakData, store))

    useEffect(() => {
        const disposer = observe(data, () => {
            _.assign(weakData, toWeakActionData(data))
        })

        return () => disposer()
    }, [])

    return data
}
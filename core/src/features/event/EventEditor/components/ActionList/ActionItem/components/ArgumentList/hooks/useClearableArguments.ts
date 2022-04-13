import {useActionData} from "../../../contexts/ActionDataContext";
import {useEffect} from "react";
import _ from "lodash/fp";

// Delete arguments object on unmount if it is empty.
export const useClearableArguments = () => {
    const data = useActionData()

    useEffect(() => {
        return () => {
            if (_.isEmpty(data.weakArgs))
                delete data.weakArgs
        }
    }, [])
}
import React from "react";
import {observer} from "mobx-react";
import {Rows} from "../../components/UI/Containers";
import {useStore} from "../../utils/StoreContext";


const Errors = observer((props: any) => {
    const store = useStore()
    if (!store.formContext) return null;
    const {errors, values} = store.formContext;
    return (<Rows {...props} margin={10}>
            <div>
                <h6>Data</h6>
                {prettyPrint(values)}
            </div>
            <div>
                <h6>Errors</h6>
                {prettyPrint(errors)}
            </div>
        </Rows>
    );
})

const prettyPrint = (obj: Object) => {
    return <pre style={{whiteSpace: "pre-wrap", marginTop: 5}}>{JSON.stringify(filterObj(obj), null, 2)}</pre>;
}

const filterObj = (obj: Object) => {
    const filtered: any = {};
    Object.entries(obj).forEach(([key, value]) => {
        const typeIs = (valueType: string) => typeof value == valueType;

        if (!(typeIs('string') || typeIs('number') || typeIs('boolean'))) {
            return;
        }

        filtered[key as string] = value;
    });

    return filtered;
}

export {Errors}
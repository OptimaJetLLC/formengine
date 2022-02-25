import React from "react";
import {observer} from "mobx-react";
import {Rows} from "../../components/UI/Containers";
import {useStore} from "../../utils/contexts/StoreContext";
import { useTranslation } from 'react-i18next';


const Errors = observer((props: any) => {
    const store = useStore();
    const { t } = useTranslation();
    if (!store.formContext) return null;
    const {errors, values} = store.formContext;

    return (<Rows {...props} margin={10}>
            <div>
                <h6>{t('errorsPanel.data')}</h6>
                {prettyPrint(values)}
            </div>
            <div>
                <h6>{t('errorsPanel.errors')}</h6>
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

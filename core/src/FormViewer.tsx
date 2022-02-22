import {observer} from "mobx-react";
import React, {ComponentType, ReactElement, useEffect} from "react";
import {ComponentStore} from "./stores/ComponentStore";
import {getForm as getStandardForm} from "./utils/getForm";
import {ObservableFormik} from "./features/validation/components/ObserableFormik";
import {DefineRegistry} from "./utils/DefineRegistry";
import {useStore} from "./utils/StoreContext";
import {Components} from "./components/Components";
import {Wrapper} from "./utils/types";

export interface FormViewerProps {
    //TODO onEvent?: (key: string, action: any, eventName: string) => void
    getForm: ((code: string) => ComponentStore[]),
    Wrapper?: Wrapper
    view: DefineRegistry
}

export const FormViewer = observer((props: FormViewerProps) => {
    const {getForm, Wrapper, view} = props
    const store = useStore()
    //const store = useMemo(() => new Store(view), [])
    useEffect(() => {
        getStandardForm("test", getForm, store);
        //Получаем форму
        //Иницилизируем значения по умолчания или делать это в компонентах?
        //Потом можно рендерить

    }, [getForm]);

    return (
        //<StoreProvider view={rsuite}>
        <ObservableFormik>
            <Components components={store.model.components} Wrapper={Wrapper}/>
        </ObservableFormik>
        //</StoreProvider>
    )
})



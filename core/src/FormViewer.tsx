import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {ComponentStore} from "./stores/ComponentStore";
import {getForm as getStandardForm} from "./utils/getForm";
import {Component} from "./components/Component";
import {ObservableFormik} from "./features/validation/components/ObserableFormik";
import {DefineRegistry} from "./utils/DefineRegistry";
import {useStore} from "./utils/StoreContext";

export interface FormViewerProps {
    //TODO onEvent?: (key: string, action: any, eventName: string) => void
    getForm: ((code: string) => ComponentStore[]),
    wrapper?: Function //TODO change type of wrapper
    view: DefineRegistry
}

export const FormViewer = observer((props: FormViewerProps) => {
    const {getForm, wrapper, view} = props
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
                {store.model.components?.map(componentStore => {
                    return React.createElement(Component, {key: componentStore.key, componentStore, wrapper});
                })}
            </ObservableFormik>
        //</StoreProvider>
    )
})



import {store} from "./stores/Store";
import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {ComponentStore} from "./stores/ComponentStore";
import {getForm as getStandardForm} from "./utils/getForm";
import {Component} from "./components/Component";

export interface FormViewerProps {
    //TODO onEvent?: (key: string, action: any, eventName: string) => void
    getForm: ((code: string) => ComponentStore[]),
    wrapper?: Function //TODO change type of wrapper
}

export const FormViewer = observer(({getForm, wrapper}: FormViewerProps) => {
    useEffect(() => {
        getStandardForm("test", getForm);
        //Получаем форму
        //Иницилизируем значения по умолчания или делать это в компонентах?
        //Потом можно рендерить

    }, [getForm]);

    return <div>
        {store.model.components?.map(componentStore => {
            return React.createElement(Component, {key: componentStore.key, componentStore, wrapper});
        })}
    </div>;
})



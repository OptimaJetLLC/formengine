import {Form as FormikForm, FormikContext, FormikContextType} from "formik";
import React, {useContext} from "react";
import {useStore} from "../../../utils/StoreContext";
import {observable} from "mobx";

export const Form = (props: any) => {
    const store = useStore()
    store.formContext = useContext<FormikContextType<any>>(FormikContext);
    store.formContext.values = store.selected?.data.props ?? observable({})

    //TODO вывод данных об значениях поля, ошибках и тд для инспекции

    return (
        <FormikForm>
            {props.children}
        </FormikForm>
    );
};
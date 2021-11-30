import {Form as FormikForm, FormikContext, FormikContextType} from "formik";
import React, {useContext} from "react";
import {store} from "../../../stores/Store";

export const Form = (props: any) => {
    store.formContext = useContext<FormikContextType<any>>(FormikContext);

    //TODO вывод данных об значениях поля, ошибках и тд для инспекции

    return (
        <FormikForm>
            {props.children}
        </FormikForm>
    );
};
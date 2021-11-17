import {Form as FormikForm} from "formik";
import React from "react";

export const Form = (props: any) => {

    //TODO вывод данных об значениях поля, ошибках и тд для инспекции

    return (
        <FormikForm>
            {props.children}
        </FormikForm>
    );
};
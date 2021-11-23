import {Form as FormikForm, FormikContext, FormikContextType} from "formik";
import React, {ReactNode, useContext} from "react";

interface FormProps {
    values?: object
    children: ReactNode
}

export const Form = (props: any) => {
    const formik: FormikContextType<any> = useContext<FormikContextType<any>>(FormikContext);

    //TODO вывод данных об значениях поля, ошибках и тд для инспекции

    return (
        <FormikForm>
            {props.children}
        </FormikForm>
    );
};
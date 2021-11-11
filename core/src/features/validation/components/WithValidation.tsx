import _ from "lodash";
import {ComponentType, ReactChild, ReactElement, ReactNode} from "react";
import {ErrorMessage} from "./ErrorMessage";
import {useField, useFormikContext, Formik, Form, Field, FieldProps, withFormik, FormikProps} from "formik";
import {PropertyEditorProps} from "../../../api/Types";
import {Annotation} from "../../../api/annotation/Annotation";
import * as Yup from 'yup';
import {store} from "../../../stores/Store";

interface WithValidationProps<T extends object = object> {
    WrappedComponent: ComponentType<T>
}

interface ValidatorProps {
    children?: ReactNode
    dataStore: object
}

export const withValidation1 = (Component: ComponentType, dataStore: object) => (props: any) => (
    <Validator dataStore={dataStore}>
        <Component {...props}/>
    </Validator>
)


export const Validator = (props: ValidatorProps) => {


    return (
        <Formik

            initialValues={_.cloneDeep(props.dataStore)}

            onSubmit={(values, formikHelpers) => {
                console.log(values)
                console.log(formikHelpers)
            }}>
            <Form>
                {props.children}
            </Form>
        </Formik>

    )
}


const MyForm = (props: any) => {

    return (
        <Form>
            {props.children}
        </Form>
    );
};

export const Validator1 = withFormik({
    mapPropsToValues: () => (store.currentNode!.data.props),

    validationSchema: Yup.object().shape({
        ["label"]: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    }),


    handleSubmit: (values, {setSubmitting}) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'BasicForm',
})(MyForm)


export const WithValidation = <T extends any>({annotation, Component, ...props1}: any) => {
    const [fields, meta, helpers] = useField<T>(annotation.key);

    return (
        <div>
            <Component fields={fields} helpers={helpers} annotation={annotation} {...props1}/>
            <ErrorMessage {...meta}/>
        </div>
    )
}

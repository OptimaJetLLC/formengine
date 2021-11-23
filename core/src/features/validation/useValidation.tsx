import {ComponentStore} from "../../stores/ComponentStore";
import _ from "lodash";
import {FieldMetaProps, FormikContext, FormikContextType, useField} from "formik";
import {useContext} from "react";
import * as Yup from "yup";
import {BaseSchema, ValidationError} from "yup";
import {toJS} from "mobx";

interface ValidationConfig {
    key: string
    //validate?: (value: any) => string | void
    scheme?: BaseSchema
}

interface FieldProps {
    setTouched: (value?: boolean, shouldValidate?: boolean) => void;
    setError: (value: any) => void;
    setValue: (value: any, shouldValidate?: boolean) => void;
    value: any
}

export const useValidation = <T extends any = any>(keyOrConfig: string | ValidationConfig): [FieldProps, FieldMetaProps<any>] => {
    const {key, scheme}: ValidationConfig = _.isObject(keyOrConfig) ? keyOrConfig : {key: keyOrConfig}

    //TODO check exists formik context?
    const formik: FormikContextType<any> = useContext<FormikContextType<any>>(FormikContext);

    const getValue = () => toJS(formik.values[key]);

    const meta = formik.getFieldMeta(key)

    return [
        {
            value: getValue(),
            setValue,
            setTouched,
            setError,
        },
        meta,
    ]


    function setValue(value: any, shouldValidate?: boolean) {
        if (_.isArray(value)) formik.values[key] = _.first(value)
        else formik.values[key] = value

        if (formik.validateOnChange || shouldValidate) validate(getValue())
    }

    function setTouched(value?: boolean, shouldValidate?: boolean) {
        formik.touched[key] = value ?? true;

        if (formik.validateOnBlur || shouldValidate) validate(getValue())
    }

    function setError(value: any | undefined) {
        if (value) formik.errors[key] = value
        else delete formik.errors[key]
    }

    function validate(value: any) {
        try {
            scheme?.validateSync(value)
            setError(undefined)
        } catch (e: any) {
            if (e instanceof ValidationError)
                setError(e.message)
        }
    }
}
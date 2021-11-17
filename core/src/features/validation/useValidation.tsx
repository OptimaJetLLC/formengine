import {ComponentStore} from "../../stores/ComponentStore";
import _ from "lodash";
import {FormikContext, FormikContextType} from "formik";
import {useContext} from "react";
import * as Yup from "yup";
import {ValidationError} from "yup";
import {toJS} from "mobx";

interface ValidationConfig {
    key: string
    value?: any;
    onChange?: (...args: any[]) => void
    onBlur?: (...args: any[]) => void
}

export const useValidation = <T extends any = any>(keyOrConfig: string | ValidationConfig, store: ComponentStore) => {
    const {key, ...props}: ValidationConfig = _.isObject(keyOrConfig) ? keyOrConfig : {key: keyOrConfig}

    //TODO check exists formik context?
    const formik: FormikContextType<any> = useContext<FormikContextType<any>>(FormikContext);

    if (_.isEmpty(formik)) return []

    //TODO temporarily
    const scheme = Yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')


    //useEffect(() => formik.setValues(store.props), [])

    const getValue = () => toJS(formik.values[key]);

    const onChange = props.onChange ? _.flow(handleChange, props.onChange) : handleChange

    const onBlur = props.onBlur ? _.flow(handleBlur, props.onBlur) : handleBlur

    const meta = formik.getFieldMeta(key)

    return [
        getValue(),
        onChange,
        onBlur,
        meta,
    ]


    function handleChange(value: any) {
        if (_.isArray(value)) formik.values[key] = _.first(value)
        else formik.values[key] = value

        if (formik.validateOnChange) validate()
    }

    function handleBlur() {
        formik.touched[key] = true;

        if (formik.validateOnBlur) validate()
    }

    function validate() {
        try {
            scheme.validateSync(formik.values[key])
            formik.errors[key] = undefined
        } catch (e: any) {
            if (e instanceof ValidationError)
                formik.errors[key] = e.message
        }
    }
}
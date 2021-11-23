import {PropertyEditorProps} from "../types";
import {Input} from "rsuite";
import {LabeledInput} from "../../../components/GroupItems";
import {FieldHelperProps, FieldInputProps, FieldProps} from "formik";


export default (props: PropertyEditorProps<string | undefined>) => {
    const {componentStore, annotation, onChange, onBlur, value} = props

    //if (!fields) return null
    //if (!helpers) return null

    console.log(value)
    return (
        <LabeledInput>
        <label>{annotation.title}</label>
        <Input
            name={annotation.key}
            /*value={componentStore.props[annotation.key]}*/
            value={value}
            /*onChange={value => componentStore.props[annotation.key] = value as string | undefined}*/
            onChange={onChange}
            onBlur={onBlur}
        />
    </LabeledInput>
    );
}

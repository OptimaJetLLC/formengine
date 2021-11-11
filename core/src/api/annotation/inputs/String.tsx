import {PropertyEditorProps} from "../../Types";
import {Input} from "rsuite";
import {LabeledInput} from "../../../components/GroupItems";
import {FieldHelperProps, FieldInputProps, FieldProps} from "formik";


export default ({componentStore, annotation, fields, helpers}:
                    PropertyEditorProps<string | undefined> & { fields?: FieldInputProps<any>, helpers?:  FieldHelperProps<any> }) => {
    let a = 4
    if (!fields) return null
    if (!helpers) return null
    return (
        <LabeledInput>
        <label>{annotation.title}</label>
        <Input
            /*value={componentStore.props[annotation.key]}*/
            value={componentStore.props[annotation.key]}
            /*onChange={value => componentStore.props[annotation.key] = value as string | undefined}*/
            onChange={(value) => {

                helpers.setValue(value, true)
                componentStore.props[annotation.key] = value as string | undefined

                let b = 5
            }}
        />
    </LabeledInput>
    );
}

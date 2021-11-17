import {PropertyEditorProps} from "../../types";
import {Form, InputPicker} from "rsuite";

//TODO this uncompleted
export default <T extends unknown>({componentStore, annotation}: PropertyEditorProps<T>) => (
    <div>
        <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
        <InputPicker
            block
            value={componentStore.props[annotation.key]}
            onChange={value => componentStore.props[annotation.key] = value as T}
            data={[
                {label: "XSmall", value: "xs"},
                {label: "Small", value: "sm"},
                {label: "Medium", value: "md"},
                {label: "Large", value: "lg"}
            ]}
        />
    </div>
)

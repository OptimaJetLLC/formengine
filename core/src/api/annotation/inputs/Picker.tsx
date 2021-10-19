import {PropertyEditorProps} from "../../Types";
import {Form, InputPicker} from "rsuite";

//TODO this uncompleted
export default <T extends unknown>({model, annotation}: PropertyEditorProps<T>) => (
    <div>
        <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
        <InputPicker
            value={model.props[annotation.key]}
            onChange={value => model.props[annotation.key] = value as T}
            data={[
                {label: "XSmall", value: "xs"},
                {label: "Small", value: "sm"},
                {label: "Medium", value: "md"},
                {label: "Large", value: "lg"}
            ]}
        />
    </div>
)

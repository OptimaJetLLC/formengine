import {PropertyEditorProps} from "../../Types";
import {Checkbox, Form} from "rsuite";

export default ({model, annotation}: PropertyEditorProps<boolean | undefined>) => (
    <div>
        <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
        <Checkbox
            value={model.props[annotation.key]}
            onChange={(value, checked) => model.props[annotation.key] = checked}
        />
    </div>
);

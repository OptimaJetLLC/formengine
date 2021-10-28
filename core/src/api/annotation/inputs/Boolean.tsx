import {PropertyEditorProps} from "../../Types";
import {Checkbox, Form} from "rsuite";

export default ({componentStore, annotation}: PropertyEditorProps<boolean | undefined>) => (
    <div>
        <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
        <Checkbox
            value={componentStore.props[annotation.key]}
            onChange={(value, checked) => componentStore.props[annotation.key] = checked}
        />
    </div>
);

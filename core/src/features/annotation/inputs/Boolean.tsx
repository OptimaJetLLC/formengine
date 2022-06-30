import {PropertyEditorProps} from "../types";
import {Checkbox, Form} from "rsuite";

const BooleanInput = ({componentStore, annotation}: PropertyEditorProps<boolean | undefined>) => <div>
    <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
    <Checkbox
        value={componentStore.props[annotation.key]}
        onChange={(value, checked) => componentStore.props[annotation.key] = checked}
    />
</div>;

export {BooleanInput}
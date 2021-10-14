import {PropertyEditorProps} from "../../Types";
import {Form, Input} from "rsuite";

export default ({model, annotation}: PropertyEditorProps<string>) => (
    <div>
        <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
        <Input
            value={model.key}
            onChange={value => model.key = value as string}
        />
    </div>
);

import {PropertyEditorProps} from "../../Types";
import {Form, Input} from "rsuite";

export default ({componentStore, annotation}: PropertyEditorProps<string>) => (
    <div>
        <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
        <Input
            value={componentStore.key}
            onChange={value => componentStore.key = value as string}
        />
    </div>
);

import {PropertyEditorProps} from "../../Types";
import {Form, Input} from "rsuite";

export default ({model, annotation}: PropertyEditorProps<string | undefined>) => (
    <div>
        <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
        <Input
            value={model.props[annotation.key]}
            onChange={value => model.props[annotation.key] = value as string | undefined}
        />
    </div>
)

import {PropertyEditorProps} from "../../Types";
import {Form, Input} from "rsuite";

export default ({componentStore, annotation}: PropertyEditorProps<string | undefined>) => (
    <div>
        <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
        <Input
            value={componentStore.props[annotation.key]}
            onChange={value => componentStore.props[annotation.key] = value as string | undefined}
        />
    </div>
)

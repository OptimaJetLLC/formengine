import {PropertyEditorProps} from "../../Types";
import {Checkbox, Form} from "rsuite";
import React from "react";

export default <T extends boolean | undefined>({model, annotation}: PropertyEditorProps<T>) => <div>
    <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
    <Checkbox
        value={model.props[annotation.key]}
        onChange={value => model.props[annotation.key] = value}
    />
</div>

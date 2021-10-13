import {PropertyEditorProps} from "../../Types";
import {Form, Input} from "rsuite";
import React from "react";

export default <T extends string | undefined>({model, annotation}: PropertyEditorProps<T>) => <div>
    <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
    <Input
        value={model.props[annotation.key]}
        onChange={value => model.props[annotation.key] = value as T}
    />
</div>;

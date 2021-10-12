import {PropertyEditorProps} from "../../Types";
import {Form, Input} from "rsuite";
import React from "react";

export default ({model, annotation}: PropertyEditorProps) => (
    <div>
        <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
        <Input
            value={model.props[annotation.key]}
            onChange={value => model.props[annotation.key] = value as string}
        />
    </div>
);

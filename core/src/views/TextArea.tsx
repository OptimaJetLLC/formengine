import {Form, Input} from "rsuite";
import {define} from "../utils/define";

export interface TextAreaProps {
    label: string,
    rows: number,
    placeholder: string,
}

export const TextArea = (props :TextAreaProps) => {
    return (
        <div>
            <Form.ControlLabel>{props.label}</Form.ControlLabel>
            <Textarea {...props}/>
        </div>
    )
}

const Textarea = (props: any) =>
    <Input rows={5} as="textarea" {...props}/>;

export const textArea = define(TextArea, {
    "label": undefined,
    "placeholder": undefined,
    "rows": undefined,
})

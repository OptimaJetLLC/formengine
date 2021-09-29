import {Form, Input} from "rsuite";
import {define} from "../utils/define";

export interface TextAreaProps {
    main: {
        label: string,
        rows: number,
        placeholder: string,
    }
}

export const TextArea = (props :TextAreaProps) => {
    return (
        <div>
            <Form.ControlLabel>{props.main.label}</Form.ControlLabel>
            <Textarea {...props.main}/>
        </div>
    )
}

const Textarea = (props: any) =>
    <Input rows={5} as="textarea" {...props}/>;

export const textArea = define(TextArea, {
    key: null,
    "main.label": null,
    "main.placeholder": null,
    "main.rows": null,
    main: null
})

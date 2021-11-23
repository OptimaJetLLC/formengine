import {Form, InputPicker} from "rsuite";
import {CSSProperties} from "react";
import {define} from "../features/annotation/define";
import {boolean, string} from "../features/annotation";

export interface DropdownProps {
    label: string,
    data: { label: string, value: string }[]
    placeholder: string
    style: CSSProperties | undefined
    className: string
    block: boolean
}

export const Dropdown = ({label, ...props} : DropdownProps ) => {

    return (
        <div>
            <Form.ControlLabel>{label}</Form.ControlLabel>
            <InputPicker {...props}/>
        </div>
    )
}

export const dropdown = define("Dropdown", Dropdown, {
    "block": boolean.isRequired(false),
    "data": undefined,
    "label": string.isRequired(""),
    "placeholder": string.isRequired(""),

})

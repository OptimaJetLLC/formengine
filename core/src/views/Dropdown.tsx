import {Form, InputPicker} from "rsuite";
import {CSSProperties} from "react";
import {define} from "../utils/define";
import {boolean, string} from "../utils/DefaultAnnotations";

export interface DropdownProps {
    label: string,
    data: { label: string, value: string }[]
    placeholder: string
    style: CSSProperties | undefined
    className: string
    block: boolean
}

export const Dropdown = (props : DropdownProps ) => {

    return (
        <div>
            <Form.ControlLabel>{props.label}</Form.ControlLabel>
            <InputPicker data={props.data} placeholder={props.placeholder}/>
        </div>
    )
}

export const dropdown = define("Dropdown", Dropdown, {
    "block": boolean,
    "data": undefined,
    "label": string,
    "placeholder": string,

})

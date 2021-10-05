import {Form, InputPicker} from "rsuite";
import {CSSProperties} from "react";
import {define} from "../utils/define";
import {InputPickerProps} from "rsuite/esm/InputPicker/InputPicker";
import {Annotations1} from "../utils/constants";
import {boolean, booleanOptional, string} from "../utils/AnnotationBuilder";

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

export const dropdown = define(Dropdown, {
    "block": boolean,
    "data": undefined,
    "label": string,
    "placeholder": string,

})

let a: Annotations1<InputPickerProps> = {
    data: undefined,
    block: booleanOptional,
    appearance: undefined,
    placeholder: string.setTitle(""),
}

export const inputPicker = define(InputPicker, a)

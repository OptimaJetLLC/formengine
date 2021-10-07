import {Form, Input as RInput} from "rsuite";
import {CSSProperties, SyntheticEvent} from "react";
import {define} from "../utils/define";

export interface InputProps {
    value: string | number | readonly string[];
    onChange: ((value: string | number | readonly string[], event: SyntheticEvent<Element, Event>) => void);

    label: string
    type: InputType
    labelPosition: InputLabelPosition
    placeholder: string
    size: Size
    disabled: boolean
    transparent: boolean
    fluid: boolean
    readOnly: boolean

    style: CSSProperties | undefined
    className: string
    hidden: boolean
    hiddenInPrintMode: boolean
    adaptiveLayout: boolean

    /*events: {
        "onChange timeout": number
        onChange: Action
    }
    tooltip: {}
    other: {
        Required: boolean
    }*/

}

export enum InputType {
    Text,
    Number,
    Password,
    File,
    Date,
    Time,
    DateTime,
}

export enum InputLabelPosition {
    Default,
    Left,
    Right,
    "Left corner",
    "Right corner",
}

export enum Size {
    Default,
    Mini,
    Tiny,
    Small,
    Medium,
    Large,
}

export class Action {
    name: string = ""
    parameters: { name: string, value: string }[] = [{name: "", value: ""}]
    targets: string[] = []
}



export const Input = (props: InputProps ) => {

    return (
        <div style={props.style} className={props.className}>
            {props.label &&
            <Form.ControlLabel>{props.label}</Form.ControlLabel>}
            <RInput
                placeholder={props.placeholder}
                disabled={props.disabled}
                readOnly={props.readOnly}
                onChange={props.onChange}
                value={props.value}
            />
        </div>
    );
}

export const input = define(Input, {
    adaptiveLayout: undefined,
    disabled: undefined,
    fluid: undefined,
    hidden: undefined,
    hiddenInPrintMode: undefined,
    label: undefined,
    labelPosition: undefined,
    onChange: undefined,
    placeholder: undefined,
    readOnly: undefined,
    size: undefined,
    transparent: undefined,
    type: undefined,
    value: undefined

    /*key: null,
    "adaptiveLayout": {title: "Adaptive Layout", defaultValue: ""},
    "className": {title: "Class name", defaultValue: ""},
    "hidden": {title: "Hidden", defaultValue: ""},
    "hiddenInPrintMode": {title: "Hidden In PrintMode", defaultValue: ""},
    "style": {title: "Style", defaultValue: undefined},
    "disabled": {title: "Disabled", defaultValue: false},
    "fluid": {title: "Fluid", defaultValue: ""},
    "label": {title: "Label", defaultValue: ""},
    "labelPosition": {title: "Label position", defaultValue: ""},
    "placeholder": {title: "Placeholder", defaultValue: ""},
    "readOnly": {title: "Readonly", defaultValue: false},
    "size": {title: "Size", defaultValue: ""},
    "transparent": {title: "Transparent", defaultValue: ""},
    "type": {title: "Type", defaultValue: ""},
    onChange: null,
    value: null*/
})

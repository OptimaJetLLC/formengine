import {Form, Input as RInput} from "rsuite";
import {CSSProperties, SyntheticEvent} from "react";
import {define} from "../utils/Renderer";

export interface InputProps {
    value: string | number | readonly string[];
    onChange: ((value: string | number | readonly string[], event: SyntheticEvent<Element, Event>) => void);

    main: {
        label: string
        type: InputType
        labelPosition: InputLabelPosition
        placeholder: string
        size: Size
        disabled: boolean
        transparent: boolean
        fluid: boolean
        readOnly: boolean
    }
    design: {
        style: CSSProperties | undefined
        className: string
        hidden: boolean
        hiddenInPrintMode: boolean
        adaptiveLayout: boolean
    }

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
        <div style={props.design.style} className={props.design.className}>
            {props.main.label &&
            <Form.ControlLabel>{props.main.label}</Form.ControlLabel>}
            <RInput
                placeholder={props.main.placeholder}
                disabled={props.main.disabled || props.main.readOnly}
                onChange={props.onChange}
                value={props.value}
            />
        </div>
    );
}

export const input = define(Input, {
    key: null,
    "design.adaptiveLayout": {title: "Adaptive Layout", defaultValue: ""},
    "design.className": {title: "Class name", defaultValue: ""},
    "design.hidden": {title: "Hidden", defaultValue: ""},
    "design.hiddenInPrintMode": {title: "Hidden In PrintMode", defaultValue: ""},
    "design.style": {title: "Style", defaultValue: undefined},
    "main.disabled": {title: "Disabled", defaultValue: false},
    "main.fluid": {title: "Fluid", defaultValue: ""},
    "main.label": {title: "Label", defaultValue: ""},
    "main.labelPosition": {title: "Label position", defaultValue: ""},
    "main.placeholder": {title: "Placeholder", defaultValue: ""},
    "main.readOnly": {title: "Readonly", defaultValue: false},
    "main.size": {title: "Size", defaultValue: ""},
    "main.transparent": {title: "Transparent", defaultValue: ""},
    "main.type": {title: "Type", defaultValue: ""},
    design: null,
    main: null,
    onChange: null,
    value: null
})

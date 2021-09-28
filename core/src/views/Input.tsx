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
    "design.className": {title: "Adaptive Layout", defaultValue: ""},
    "design.hidden": {title: "Adaptive Layout", defaultValue: ""},
    "design.hiddenInPrintMode": {title: "Adaptive Layout", defaultValue: ""},
    "design.style": {title: "Adaptive Layout", defaultValue: {}},
    "main.disabled": {title: "Adaptive Layout", defaultValue: ""},
    "main.fluid": {title: "Adaptive Layout", defaultValue: ""},
    "main.label": {title: "Adaptive Layout", defaultValue: ""},
    "main.labelPosition": {title: "Adaptive Layout", defaultValue: ""},
    "main.placeholder": {title: "Adaptive Layout", defaultValue: ""},
    "main.readOnly": {title: "Adaptive Layout", defaultValue: ""},
    "main.size": {title: "Adaptive Layout", defaultValue: ""},
    "main.transparent": {title: "Adaptive Layout", defaultValue: ""},
    "main.type": {title: "Adaptive Layout", defaultValue: ""},
    design: null,
    main: null,
    onChange: null,
    value: null
})

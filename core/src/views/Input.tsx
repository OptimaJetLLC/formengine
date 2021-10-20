import {Form, Input as RInput, InputProps as RInputProps} from "rsuite";
import {CSSProperties, SyntheticEvent} from "react";
import {define} from "../api/define";
import {boolean, func, select, string} from "../api/annotation";
import {AnnotationBuilder} from "../api/annotation/AnnotationBuilder";
import defineLocalAction from "../api/defineAction";

export interface InputProps extends RInputProps {
    label: string
    style: CSSProperties | undefined
    className: string
}

export enum Size {
    XSmall = "xs",
    Small = "sm",
    Medium = "md",
    Large = "lg",
}

export class Event {
    actions: string[] = []
    parameters: { name: string, value: string }[] = [{name: "", value: ""}]
    targets: string[] = []
}


export const Input = ({style, className, label, ...props}: InputProps) => {

    return (
        <div style={style} className={className}>
            <Form.ControlLabel>{label}</Form.ControlLabel>
            <RInput {...props}/>
        </div>
    );
}
// "lg" | "md" | "sm" | "xs"
export const input = define<InputProps>("Input", Input, {
        disabled: boolean,
        label: string.isRequired("Input"),
        placeholder: string,
        readOnly: boolean,
        //size: new AnnotationBuilder<InputProps["size"]>(),
        size: select,
        //size: new AnnotationBuilder<"lg" | "md" | "sm" | "xs" | undefined>()
        onChange: func,
        value: undefined
    },
    [
        defineLocalAction("Action1", (...args) => {
            let a = 1
            let b = args
            debugger
        }),
        defineLocalAction("Action2", (...args) => {
            let a = 2
            let b = args
            debugger
        }),
        defineLocalAction("Action3", (...args) => {
            let a = 3
            let b = args
            debugger
        }),
    ])

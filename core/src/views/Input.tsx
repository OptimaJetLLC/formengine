import {Form, Input as RInput, InputProps as RInputProps} from "rsuite";
import {CSSProperties, SyntheticEvent} from "react";
import {define} from "../api/define";
import {boolean, select, string} from "../api/annotation";
import {AnnotationBuilder} from "../api/annotation/AnnotationBuilder";

export interface InputProps extends RInputProps {
    //value: string | number | readonly string[];
    //onChange: ((value: string | number | readonly string[], event: SyntheticEvent<Element, Event>) => void);
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

export class Action {
    name: string = ""
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
    onChange: new AnnotationBuilder<InputProps["onChange"]>(),
    value: undefined
})

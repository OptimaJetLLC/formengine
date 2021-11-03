import {Form, Input as RInput, InputProps as RInputProps} from "rsuite";
import {CSSProperties} from "react";
import {define} from "../api/define";
import {boolean, event, select, string} from "../api/annotation";
import defineLocalAction from "../api/defineAction";
import {ComponentStore} from "../stores/ComponentStore";

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
        onChange: event,
        value: undefined
    },
    [
        defineLocalAction("setValue", (actionArgs, eventArgs) => {
            let a = 1
            const store: ComponentStore = eventArgs[2];
            store.props.value = actionArgs.param1;
            //let b = args
            debugger
        }, ["param1"]),
        defineLocalAction("Action2", ({name, value, isActive}, eventArgs) => {
            let a = 2
            //let b = args
            debugger
        }, ["name", "value", "isActive"]),
        defineLocalAction("Action3", (...args) => {
            let a = 3
            let b = args
            debugger
        }),
    ])

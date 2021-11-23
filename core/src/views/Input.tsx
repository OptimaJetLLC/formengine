import {Input as RInput, InputProps as RInputProps} from "rsuite";
import {define} from "../features/annotation/define";
import {boolean, event, select, string} from "../features/annotation";
import defineLocalAction from "../features/annotation/defineAction";
import {setValue} from "../utils/Actions";
import {LabeledInput} from "../components/GroupItems";

export interface InputProps extends RInputProps {
    label: string
    className: string
}

export enum Size {
    XSmall = "xs",
    Small = "sm",
    Medium = "md",
    Large = "lg",
}

export const Input = ({style, className, label, ...props}: InputProps) => {

    return (
        <LabeledInput style={style} className={className}>
            <label>{label}</label>
            <RInput {...props}/>
        </LabeledInput>
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
        value: undefined,

    },
    [
        setValue,
        defineLocalAction("Action2", ({name, value, isActive}, eventArgs) => {
            console.log({name, value, isActive}, eventArgs);
        }, ["name", "value", "isActive"]),
        defineLocalAction("Action3", (...args) => {
            console.log(args);
        }),
    ])

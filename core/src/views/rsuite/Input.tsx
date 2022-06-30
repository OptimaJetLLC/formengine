import {Input as RInput, InputProps as RInputProps} from "rsuite";
import {define} from "../../features/annotation/utils/define";
import {boolean, event, string} from "../../features/annotation";
import {LabeledInput} from "../../features/ui/Containers";
import {AnnotationBuilder} from '../../features/annotation/utils/AnnotationBuilder';
import {WithPicker} from '../../features/annotation/inputs/Picker';
import styled from '@emotion/styled';

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

// todo этот компонент должен поддерижвать numeric input only (number format в старом фб)

const RtlLabel = styled.label`
  text-align: left;
`

export const Input = ({style, className, label, ...props}: InputProps) => {

    return (
        <LabeledInput style={style} className={className}>
            <RtlLabel>{label}</RtlLabel>
            <RInput {...props}/>
        </LabeledInput>
    );
}
// "lg" | "md" | "sm" | "xs"
export const input = define(Input)
    .props({
        disabled: boolean,
        label: string.isRequired("Input"),
        placeholder: string,
        readOnly: boolean,
        //size: new AnnotationBuilder<InputProps["size"]>(),
        size: new AnnotationBuilder<"lg" | "md" | "sm" | "xs" | undefined>({
            component: WithPicker([
                {label: 'Extra small', value: 'xs'},
                {label: 'Small', value: 'sm'},
                {label: 'Medium', value: 'md'},
                {label: 'Large', value: 'lg'},
            ]),
        }),
        //size: new AnnotationBuilder<"lg" | "md" | "sm" | "xs" | undefined>()
        onChange: event,
        value: undefined,

    })
    .actions((props, def) => {
        return {
            action1: def("Action2", ({name, value, isActive}, eventArgs) => {
                console.log({name, value, isActive}, eventArgs);
            }, ["name", "value", "isActive"]),
            valueLogger: def("Value console logger", e => console.log(e.value)),
            setLabel: e => props.label = e.value,
        }
    })




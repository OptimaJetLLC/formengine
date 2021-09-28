import {Form, InputPicker} from "rsuite";
import {CSSProperties} from "react";
import {define} from "../utils/Renderer";

export interface DropdownProps {
    main: {
        label: string,
        data: { label: string, value: string }[]
        placeholder: string
    }
    design: {
        style: CSSProperties | undefined
        className: string
        block: boolean
    }
}

export const Dropdown = (props : DropdownProps ) => {

    return (
        <div>
            <Form.ControlLabel>{props.main.label}</Form.ControlLabel>
            <InputPicker {...props.design} data={props.main.data} placeholder={props.main.placeholder}/>
        </div>
    )
}

export const dropdown = define(Dropdown, {
    key: null,
    "design.block": null,
    "design.className": null,
    "design.style": {title: 'Style', defaultValue: undefined},
    "main.data": null,
    "main.label": null,
    "main.placeholder": null,
    design: null,
    main: null,

})

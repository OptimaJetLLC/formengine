import {Button as RButton} from "rsuite";
import {define} from "../utils/Renderer";


export interface ButtonProps {
    main: {
        content: string
        appearance: "default" | "primary" | "link" | "subtle" | "ghost"
    }
}

export const Button = (props: ButtonProps ) => {

    return (
        <RButton appearance={props.main.appearance} children={props.main.content}/>
    )
}

export const button = define(Button, {
    key: null,
    "main.appearance": null,
    "main.content": null,
    main: null,

})

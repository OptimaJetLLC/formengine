import {Button as RButton, ButtonProps} from "rsuite";
import {define} from "../utils/Renderer";


/*export interface ButtonProps {
    /!*main: {
        content: string
        appearance: "default" | "primary" | "link" | "subtle" | "ghost"
    }*!/
    children: string
    appearance: "default" | "primary" | "link" | "subtle" | "ghost"
}*/

/*export const Button = (props: ButtonProps ) => {

    return (
        //<RButton appearance={props.main.appearance} children={props.main.content}/>
        <RButton {...props}/>
    )
}*/

/*export const button = define(Button, {
    key: null,
    "main.appearance": null,
    "main.content": null,
    main: null,

})*/

export const button = define(RButton, {
    key: null,
    children: {title: 'Content', defaultValue: "Button"},
    appearance: {title: "Appearance", defaultValue: "default"},
    style: null
})

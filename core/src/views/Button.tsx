import {Button} from "rsuite";
import {define} from "../utils/define";

export const button = define(Button, {
    key: null,
    children: {title: 'Content', defaultValue: "Button"},
    appearance: {title: "Appearance", defaultValue: "default"},
    style: null,
    title: {title: 'Title', defaultValue: "Button"},

})


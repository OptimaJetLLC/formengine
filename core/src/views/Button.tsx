import {Button} from "rsuite";
import {define} from "../api/define";
import {string} from "../api/annotation";

export const button = define("Button", Button, {
    children: string.isRequired("Button"),
    //appearance: {title: "Appearance", defaultValue: "default"},
    //title: {title: 'Title', defaultValue: "Button"},
})


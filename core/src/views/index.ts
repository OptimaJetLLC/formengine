import {button} from "./Button";
import {container} from "./Container";
import {dropdown} from "./Dropdown";
import {header} from "./Header";
import {input} from "./Input";
import {textArea} from "./TextArea";
import {ComponentDefinition} from "../api/types";

export const components = [button, container, dropdown, header, input, textArea]

export const mapper: Record<string, ComponentDefinition<any>> = {}

components.reduce((acc, value) => {
    acc[value.name] = value
    return acc;
}, mapper)


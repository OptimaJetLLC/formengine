import {RuleDescription} from "./types";

export const StringRules: RuleDescription[] = [
    {key: "required", name: "Required", params: [{name: "message", type: "string"}]},
    {
        key: "min",
        name: "Min",
        params: [{name: "min", type: "number", required: true}, {name: "message", type: "string"}]
    },
    {
        key: "max",
        name: "Max",
        params: [{name: "max", type: "number", required: true}, {name: "message", type: "string"}]
    },
]

export enum ValueType {
    string = "string",
    number = "number",
    boolean = "boolean",
}
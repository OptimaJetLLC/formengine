import {ValueType} from "./const";

export type RuleDescription = {
    key: string
    name: string
    params: { name: string, type: string, required?: boolean }[]
}

export interface ParsableValidateSchema {
    type: ValueType
    rules: { [name: string]: { [parameterName: string]: any } }
}
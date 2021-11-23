import * as Yup from "yup";
import {BooleanSchema, NumberSchema, StringSchema} from "yup";
import _ from "lodash";
import {ParsableValidateSchema} from "./types";
import {StringRules, ValueType} from "./const";

export function toValidateScheme(object?: ParsableValidateSchema) {
    if (!object) return

    switch (object.type) {
        case ValueType.string:
            return addStringChain(Yup.string(), object)
        case ValueType.number:
            return addNumberChain(Yup.number(), object)
        case ValueType.boolean:
            return addBooleanChain(Yup.boolean(), object)
    }
}


function addStringChain(scheme: StringSchema, object: ParsableValidateSchema) {
    let result = scheme

    _.forIn(object.rules, (value, key) => {
        const descRule = _.find(StringRules, {key})

        if (!descRule) return

        //TODO localized default value
        //TODO Handle required value
        let params = descRule.params.map((param) => value[param.name]).filter(Boolean)

        result = chain(key, params)
    })


    return result

    //TODO
    function chain(method: string, ...args: any[]): StringSchema {
        switch (method) {
            case "email":
                // @ts-ignore
                return result.email([...args])
            case "min":
                // @ts-ignore
                return result.min([...args])
            case "max":
                // @ts-ignore
                return result.max([...args])
            case "required":
                // @ts-ignore
                return result.required([...args])
            default:
                throw Error("Unknown validate method!")
        }
    }
}

function addNumberChain(scheme: NumberSchema, object: ParsableValidateSchema) {
    let result = scheme

    _.forIn(object.rules, (value, key) => {
        const descRule = _.find(StringRules, {key})

        if (!descRule) return

        let params = descRule.params.map((param) => value.params[param.name])

        result = chain(key, params)
    })


    return result

    //TODO
    function chain(method: string, ...args: any[]): NumberSchema {
        switch (method) {
            case "integer":
                // @ts-ignore
                return result.integer([...args])
            case "min":
                // @ts-ignore
                return result.min([...args])
            case "max":
                // @ts-ignore
                return result.max([...args])
            case "required":
                // @ts-ignore
                return result.required([...args])
            default:
                throw Error("Unknown validate method!")
        }
    }
}

function addBooleanChain(scheme: BooleanSchema, object: ParsableValidateSchema) {
    let result = scheme

    _.forIn(object.rules, (value, key) => {
        const descRule = _.find(StringRules, {key})

        if (!descRule) return

        let params = descRule.params.map((param) => value.params[param.name])

        result = chain(key, params)
    })


    return result

    //TODO
    function chain(method: string, ...args: any[]): BooleanSchema {
        switch (method) {
            case "isFalse":
                // @ts-ignore
                return result.isFalse([...args])
            case "isTrue":
                // @ts-ignore
                return result.isTrue([...args])
            case "required":
                // @ts-ignore
                return result.required([...args])
            default:
                throw Error("Unknown validate method!")
        }
    }
}
import {StringSchema} from "yup";
import {Rule, RuleParam, Rules} from "../types";

export const StringRules: Rules<StringSchema> = {
    required: new Rule("Required",
        (scheme, message?: string) => scheme.required(message), [
            new RuleParam("message", "string")
        ]),
    length: new Rule("Length",
        (scheme, length: number, message?: string) => scheme.length(length, message), [
            new RuleParam("length", "number", true),
            new RuleParam("message", "string")
        ]),
    min: new Rule("Min",
        (scheme, min: number, message?: string) => scheme.min(min, message), [
            new RuleParam("min", "number", true),
            new RuleParam("message", "string")
        ]),
    max: new Rule("Max",
        (scheme, min: number, message?: string) => scheme.max(min, message), [
            new RuleParam("min", "number", true),
            new RuleParam("message", "string")
        ]),
    matches: new Rule("Matches",
        (scheme, regex: RegExp, message?: string) => scheme.matches(new RegExp(regex), message), [
            new RuleParam("regex", "RegExp", true),
            new RuleParam("message", "string")
        ]),
    email: new Rule("Email",
        (scheme, message?: string) => scheme.email(message), [
            new RuleParam("message", "string")
        ]),
    url: new Rule("Url",
        (scheme, message?: string) => scheme.url(message), [
            new RuleParam("message", "string")
        ]),
    uuid: new Rule("Uuid",
        (scheme, message?: string) => scheme.uuid(message), [
            new RuleParam("message", "string")
        ]),
    ensure: new Rule("Ensure",
        (scheme) => scheme.ensure(), []),
    trim: new Rule("Trim",
        (scheme, message?: string) => scheme.strict().trim(message), [
            new RuleParam("message", "string")
        ]),
    lowercase: new Rule("Lowercase",
        (scheme, message?: string) => scheme.strict().lowercase(message), [
            new RuleParam("message", "string")
        ]),
    uppercase: new Rule("Uppercase",
        (scheme, message?: string) => scheme.strict().uppercase(message), [
            new RuleParam("message", "string")
        ]),
}
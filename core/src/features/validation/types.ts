import {StringRules} from './rules/StringRules'

export type StringRuleKey = keyof typeof StringRules

export enum ValueType {
  mixed = 'mixed', //Need this? TI think yes
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  date = 'date',
  object = 'object',
  array = 'array'
}

export interface ParsableValidateSchema {
  type: ValueType
  rules: { [name: string]: { [parameterName: string]: any } }
}

export type Rules<T> = {
  [key in keyof Partial<T>]: Rule<T>;
};

//TODO parameters from type of function
export class Rule<T> {
  constructor(
    public name: string,
    public apply: (scheme: T, ...args: any[]) => T,
    public params: RuleParam[],
    public hint?: string,
    public description?: string,
  ) {
  }

}

export class RuleParam {
  constructor(
    public name: string,
    public type: string,
    public required: boolean = false
  ) {
  }
}

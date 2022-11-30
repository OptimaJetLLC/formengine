import {BaseSchema} from 'yup'

export type Rules<T> = {
  [key in keyof Partial<T>]: Rule<T>
}

export type ValidationSchema = {
  autoTransform?: boolean
  rules: string[]
  data?: Record<string, any[]>
}

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

export type SchemaCtor = new () => BaseSchema

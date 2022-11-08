import _ from 'lodash'
import * as Yup from 'yup'
import {StringRules} from '../rules/StringRules'
import {ParsableValidateSchema, StringRuleKey, ValueType} from '../types'

//TODO
export function toValidateScheme(object?: ParsableValidateSchema) {
  if (!object) return

  switch (object.type) {
    case ValueType.string:
      return buildStringScheme(object)
    case ValueType.number:
    //return buildNumberScheme(object)
    case ValueType.boolean:
    //return buildBooleanScheme(object)
  }
}

function buildStringScheme(object: ParsableValidateSchema) {
  let scheme = Yup.string()

  _.forIn(object.rules, (value, key) => {
    const descRule = StringRules[key as StringRuleKey]

    if (!descRule) return

    //TODO localized default value
    //TODO Handle required value
    let params = descRule.params.map((param) => value[param.name]).filter(Boolean)

    scheme = params.length && descRule.apply(scheme, ...params) || descRule.apply(scheme)
  })

  return scheme
}

/*function buildNumberScheme(object: ParsableValidateSchema) {
    let scheme = Yup.number()

        _.forIn(object.rules, (value, key) => {
        const descRule: Rule | undefined = StringRules[key as Rules]

        if (!descRule) return

        let params = descRule.params.map((param) => value.params[param.name])

        scheme = chain(key, params)
    })


    return scheme
}*/

/*
function buildBooleanScheme(object: ParsableValidateSchema) {
    let scheme = Yup.boolean()

    _.forIn(object.rules, (value, key) => {
        const descRule: Rule | undefined = StringRules[key as Rules]

        if (!descRule) return

        let params = descRule.params.map((param) => value.params[param.name])

        scheme = chain(key, params)
    })


    return scheme
}*/

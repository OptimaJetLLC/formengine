import {generateTemplateTypeName} from 'fb-core'
import {boolean} from '../annotation'
import {Meta, modules, toArray} from '../define'

interface TemplateProps {
  storeDataInParentForm?: boolean
}

export function createTemplateMeta(name: string) {
  const typeName = generateTemplateTypeName(name)
  return new Meta(typeName,
    toArray<TemplateProps>({
      storeDataInParentForm: boolean.default(true).calculable(false)
        .hinted('Store data in parent form')
        .named('Store data in parent form'),
    }),
    [], modules, <>Template: {name}</>)
}

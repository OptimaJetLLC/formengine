import {generateTemplateTypeName} from '@react-form-builder/core'
import {boolean} from '../annotation'
import {Meta, modules, toArray} from '../define'

interface TemplateProps {
  storeDataInParentForm?: boolean
}

const storeDataInParentForm = boolean
  .default(true)
  .calculable(false)
  .hinted('Store data in parent form')
  .named('Store data in parent form')

/**
 * Creates the template component metadata for the form builder.
 * @param name the template name.
 * @returns the template component metadata for the form builder.
 */
export function createTemplateMeta(name: string) {
  const typeName = generateTemplateTypeName(name)
  return new Meta(typeName,
    toArray<TemplateProps>({
      storeDataInParentForm,
    }),
    [], modules, <>Template: {name}</>)
}

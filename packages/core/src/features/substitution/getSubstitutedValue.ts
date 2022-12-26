import {Store} from '../../stores/Store'

export const getSubstitutedValue = (props: Record<string, any>, store: Store) => {
  let result: Record<string, any> = {}

  for (let key in props) {
    const value = props[key]

    if (typeof value !== 'string' || key === 'value') continue
    //if (store.isBuilderMode) continue

    result[key] = substitute(value, store.form.data)
  }

  return result

  function substitute(value: string, values: any) {
    return value.replace(/{([\w ]+)}/g, (match, replaceable) => {
      return values[replaceable] ? values[replaceable] : match
    })
  }
}

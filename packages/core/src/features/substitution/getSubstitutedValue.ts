import {ComponentProperty} from '../../stores/ComponentStore'
import {Store} from '../../stores/Store'

export const getSubstitutedValue = (props: Record<string, ComponentProperty>, store: Store) => {
  const result: Record<string, any> = {}

  for (const key in props) {
    const value = props[key]?.value

    if (props[key]?.useFn || typeof value !== 'string' || key === 'value') continue
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

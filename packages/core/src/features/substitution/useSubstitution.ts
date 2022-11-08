import {useComponentData} from '../../utils/contexts/ComponenDataContext'
import {useStore} from '../../utils/contexts/StoreContext'

export const useSubstitution = () => {
  const store = useStore()
  const {componentStore: {props}} = useComponentData()

  return getSubstitutedValue()


  function getSubstitutedValue() {
    let result: Record<string, any> = {}

    for (let key in props) {
      const value = props[key]

      if (typeof value !== 'string' || key === 'value') continue
      //if (store.isBuilderMode) continue

      result[key] = substitute(value, store.form.data)
    }

    return result
  }

  function substitute(value: string, values: any) {
    return value.replace(/{([\w ]+)}/g, (match, replaceable) => {
      return values[replaceable] ? values[replaceable] : match
    })
  }
}

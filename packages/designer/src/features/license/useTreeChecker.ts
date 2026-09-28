import type {ComponentData} from '@react-form-builder/core'
import {isEqualWith} from '@react-form-builder/core'
import {reaction} from 'mobx'
import {useEffect, useMemo, useState} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import type {LicenseFeatureDescription} from './license'

type Features = Array<LicenseFeatureDescription>

const empty: Features = []

const equalFeatureSet = (arr1: Features, arr2: Features) => {
  return isEqualWith(arr1, arr2, (obj1, obj2, key) => {
    if (key === 'name') return obj1.name === obj2.name
    return undefined
  })
}

const viewerFeatureList = new Set<LicenseFeatureDescription['name']>([
  'ftComponentRepeater',
  'ftComponentTemplates',
  'ftLocaleCount',
  'ftComponentQrCode',
  'ftComponentSignature',
])

/**
 * @ignore
 * @internal
 */
export const useTreeChecker = (): [Features, typeof viewerFeatureList] => {
  const {viewer} = useBuilderStore()
  const [features, setFeatures] = useState<Features>([])

  useEffect(() => {
    const effect = (components: Array<ComponentData>) => {
      if (!viewer) return setFeatures(empty)

      const rules: Features = []

      if (components.some(f => f.model.kind === 'repeater')) {
        rules.push({name: 'ftComponentRepeater'})
      }

      if (components.some(f => f.model.kind === 'template')) {
        rules.push({name: 'ftComponentTemplates'})
      }

      if (components.some(f => f.model.typeName === 'RsSignature')) {
        rules.push({name: 'ftComponentSignature'})
      }

      if (components.some(f => f.model.typeName === 'FastQR')) {
        rules.push({name: 'ftComponentQrCode'})
      }

      rules.push({
        name: 'ftLocaleCount',
        check: ({actualCount}, restrictionCount) => {
          if (restrictionCount === -1) return true

          return restrictionCount >= actualCount
        },
        actualCount: viewer.form.languages.length,
      })

      setFeatures(prev => {
        if (equalFeatureSet(prev, rules)) return prev
        return rules
      })
    }

    const disposer = reaction(() => viewer.form.componentTree.allChildren, effect)

    return () => {
      disposer()
    }
  }, [features, viewer])

  return useMemo(() => [features, viewerFeatureList], [features])
}

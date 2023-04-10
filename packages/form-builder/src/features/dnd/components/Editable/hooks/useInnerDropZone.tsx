import {useComponentData, useComputed} from 'fb-core'
import {assign} from 'lodash-es'
import {useRef} from 'react'
import {useMeta} from '../../../../../utils/useMeta'
import {isContainer} from '../../../../annotation'
import {DropZone} from '../components/DropZone'

export function useInnerDropZone() {
  const meta = useMeta()
  const data = useComponentData()
  const overrides = useRef<Record<string, any>>()

  const containers = meta?.properties.filter(isContainer)

  const existBinds = useComputed(() => data.componentStore.children?.map(cs => cs.bindTo ?? 'children'))
  const emptySlots = containers?.filter(an => !existBinds?.includes(an.key) || an.bindConditionBuilder)

  overrides.current = emptySlots?.reduce((acc, container) => {
    const bindTo = container.key === 'children' ? undefined : container.key
    const bindCondition = container?.bindConditionBuilder?.(assign({}, data.model.defaultProps, data.componentStore.props))

    acc[container.key] = <DropZone isInner={true} bindTo={bindTo} bindCondition={bindCondition}></DropZone>
    return acc
  }, {} as Record<string, any>)

  return overrides
}

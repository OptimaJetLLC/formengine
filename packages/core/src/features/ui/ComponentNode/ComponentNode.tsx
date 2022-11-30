import {assign} from 'lodash'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import {useMemo} from 'react'
import {useComponentData} from '../../../utils/contexts/ComponenDataContext'
import {useStore} from '../../../utils/contexts/StoreContext'
import {Wrapper} from '../../../utils/types'
import {useEvents} from '../../event'
import {removePropsStyles, useStyles} from '../../style'
import {useSubstitution} from '../../substitution'
import {Erroneous, useValidation} from '../../validation'
import {useChildren} from './hooks/useChildren'
import {useDefaultProps} from './hooks/useDefaultProps'

//TODO useLocalObservable instead of hooks and states?
//TODO часть хуков используется только в режиме вью и превью - вынести?
const _ComponentNode = () => {
  const currentProps: Record<string, any> = {}
  const {componentStore, model: {view}} = useComponentData()
  const defaultProps = useDefaultProps()
  const [eventHandlers, actionsMap] = useEvents()
  const field = useValidation(actionsMap)
  const substitutedValues = useSubstitution()
  useChildren(currentProps)
  currentProps.className = useStyles()

  if (field) currentProps[field.valuedAn.key] = field.value

  const storedProps = toJS(componentStore.props)
  const props = removePropsStyles(assign({key: componentStore.key}, defaultProps, eventHandlers, storedProps, currentProps, substitutedValues))

  //TODO for form-builder need render another component without error message and events

  const View = useMemo(() => observer(view), [])

  const {Wrapper} = useStore()
  if (Wrapper) return <Wrapper View={View} viewProps={props}/>

  return <Erroneous field={field} View={View} viewProps={props}/>
}

export const ComponentNode = observer(_ComponentNode)

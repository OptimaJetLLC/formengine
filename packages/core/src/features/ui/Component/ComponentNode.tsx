import {assign} from 'lodash'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import {useMemo} from 'react'
import {useComponentData} from '../../../utils/contexts/ComponenDataContext'
import {useStore} from '../../../utils/contexts/StoreContext'
import {Wrapper} from '../../../utils/types'
import {useEvents} from '../../event'
import {useStyles} from '../../style'
import {useSubstitution} from '../../substitution'
import {Erroneous, useValidation} from '../../validation'
import {useChildren} from './hooks/useChildren'
import {useDefaultProps} from './hooks/useDefaultProps'

//TODO часть хуков используется только в режиме вью и превью - вынести?
export const ComponentNode = observer(() => {
  const currentProps: Record<string, any> = {}
  const {componentStore, model: {view}} = useComponentData()
  const defaultProps = useDefaultProps()
  const [eventHandlers, actionsMap] = useEvents()
  const field = useValidation(actionsMap)
  const substitutedValues = useSubstitution()
  useChildren(currentProps)
  currentProps.className = useStyles()

  currentProps.value = field.value ?? undefined

  const storedProps = toJS(componentStore.props)
  const props = assign({key: componentStore.key}, defaultProps, eventHandlers, storedProps, currentProps, substitutedValues)

  //TODO for form-builder need render another component without error message and events
  //TODO to Component Type
  //const withError = createElement(WithErrorMessage, {child: element, meta})

  const View = useMemo(() => observer(view), [])

  const {Wrapper} = useStore()
  if (Wrapper) return <Wrapper View={View} viewProps={props}/>

  return <Erroneous field={field} View={View} viewProps={props}/>
})


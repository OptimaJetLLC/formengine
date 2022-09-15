import {ComponentModel} from '../../features/annotation/utils/ComponentModel'
import {ComponentStore} from '../../stores/ComponentStore'
import {createContext} from '../createContextHook'

export type ComponentData = {
  readonly parent?: ComponentStore,
  readonly componentStore: ComponentStore,
  readonly model: ComponentModel<any>,
}

const [useComponentData, ComponentDataProvider] = createContext<ComponentData>('ComponentDataContext')

export {useComponentData, ComponentDataProvider}

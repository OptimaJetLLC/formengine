import {Model} from '../../features/define/utils/Model'
import {ComponentStore} from '../../stores/ComponentStore'
import {createContext} from '../createContextHook'

export type ComponentData = {
  readonly parent?: ComponentStore,
  readonly componentStore: ComponentStore,
  readonly model: Model<any>,
}

const [useComponentData, ComponentDataProvider] = createContext<ComponentData>('ComponentDataContext')

export {useComponentData, ComponentDataProvider}

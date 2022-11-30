import {Model} from '../../features/define'
import {ComponentStore} from '../../stores/ComponentStore'
import {createContext} from '../createContextHook'

export type ComponentData = {
  readonly parentStore?: ComponentStore,
  readonly componentStore: ComponentStore,
  readonly model: Model<any>,
}

const [useComponentData, ComponentDataProvider] = createContext<ComponentData>('ComponentDataContext')

export {useComponentData, ComponentDataProvider}

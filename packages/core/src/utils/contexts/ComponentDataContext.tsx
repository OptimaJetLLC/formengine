import {createNamedContext} from 'form-viewer'
import {Model} from '../../features/define'
import {Field} from '../../features/validation'
import {ComponentStore} from '../../stores/ComponentStore'

export type ComponentData = {
  readonly key: string,
  readonly parentStore?: ComponentStore,
  readonly componentStore: ComponentStore,
  readonly model: Model<any>,
  readonly field?: Field,
}

const [useComponentData, ComponentDataProvider] = createNamedContext<ComponentData>('ComponentDataContext')

export {useComponentData, ComponentDataProvider}

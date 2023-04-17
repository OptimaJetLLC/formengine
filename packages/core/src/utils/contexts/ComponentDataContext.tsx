import {Model} from '../../features/define'
import {Field} from '../../features/validation'
import {ComponentStore} from '../../stores/ComponentStore'
import {createNonNullableContext} from '../createNonNullableContext'

export type ComponentData = {
  readonly key: string,
  readonly parentStore?: ComponentStore,
  readonly componentStore: ComponentStore,
  readonly model: Model,
  readonly field?: Field,
}

const [useComponentData, ComponentDataProvider] = createNonNullableContext<ComponentData>('ComponentDataContext')

export {useComponentData, ComponentDataProvider}

import type {ComponentStore} from '../../../stores/ComponentStore'
import type {ComponentData} from '../../../utils/contexts/ComponentDataContext'
import type {Model} from '../../define'
import type {IDataContext} from './IDataContext'

/**
 * The factory for creating ComponentData instances. **Internal use only.**
 */
export interface IComponentDataFactory {

  /**
   * Creates the element for the component tree. **Internal use only.**
   * @param componentStore the component settings.
   * @param deferFieldCalculation if true, then the calculated field must be explicitly initialized.
   * @param model the component's metadata.
   * @param dataContext the context for working with data.
   * @returns the element for the component tree.
   */
  createComponentData(componentStore: ComponentStore, deferFieldCalculation: boolean, model?: Model,
                      dataContext?: IDataContext): ComponentData

}

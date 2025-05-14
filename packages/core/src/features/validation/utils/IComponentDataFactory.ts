import type {ComponentStore} from '../../../stores/ComponentStore'
import type {ComponentData} from '../../../utils/contexts/ComponentDataContext'
import type {IDataContext} from './IDataContext'

/**
 * The factory for creating ComponentData instances. **Internal use only.**
 */
export interface IComponentDataFactory {

  /**
   * Creates the element for the component tree. **Internal use only.**
   * @param componentStore the component settings.
   * @param deferFieldCalculation if true, then the calculated field must be explicitly initialized.
   * @param dataContext the context for working with data.
   * @returns the element for the component tree.
   */
  createComponentData(componentStore: ComponentStore, deferFieldCalculation: boolean,
                      dataContext?: IDataContext): ComponentData

}

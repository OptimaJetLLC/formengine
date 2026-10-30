import type {ComponentData, Store} from '@react-form-builder/core'
import {ComponentStore} from '@react-form-builder/core'
import {InputCell} from '../InputCell'
import {RsWizardStepComponentType} from './RsWizardStep'

type LabelValue = {label: string}

/**
 * Creates a component store containing the Wizard step.
 * @param index the step index.
 * @returns the component store containing the Wizard step.
 */
export const createStep = (index: number) => {
  const componentStore = new ComponentStore(`step${index}`, RsWizardStepComponentType)
  componentStore.props.label = {value: `Step ${index}`}
  return componentStore
}

export const editorProps = {
  /**
   * Adds a step to the Wizard component.
   * @param index the insertion index.
   * @param wizardComponentData the Wizard component data.
   * @param viewerStore the form viewer store.
   */
  onAdd: (index: number, wizardComponentData: ComponentData, viewerStore: Store) => {
    const componentStore = createStep(index + 1)
    const componentData = viewerStore.createComponentData(componentStore)
    const activeIndex = (wizardComponentData.store.props.activeIndex ??= {})
    activeIndex.value = index
    if (wizardComponentData.children?.length) {
      wizardComponentData.children[index - 1]?.insertAfterMe(componentData)
      return
    }
    componentData.setParent(wizardComponentData)
  },
  /**
   * Removes a step from the Wizard component.
   * @param index the removal index.
   * @param wizardComponentData the Wizard component data.
   */
  onRemove: (index: number, wizardComponentData: ComponentData) => {
    const {activeIndex} = wizardComponentData.store.props
    if (activeIndex?.value === index && index > 0) {
      activeIndex.value = index - 1
    }
    wizardComponentData.children[index].delete()
  },
  columns: [{name: 'label', input: InputCell}],
  /**
   * Creates the Wizard editor data and change handler.
   * @param componentData the Wizard component data.
   * @returns the editor data and change handler.
   */
  calculateEditorProps: (componentData: ComponentData) => {
    const {store} = componentData
    const data =
      store.children?.map(({props}) => ({
        label: props.label?.value,
      })) ?? []
    const handleChange = (labels: LabelValue[]) => {
      labels.forEach(({label}, index) => {
        if (!store.children?.[index]) return
        const {props} = store.children[index]
        props.label = {value: label}
      })
    }
    return {data, onChange: handleChange}
  },
}

import type {BuilderComponent} from '@react-form-builder/core'
import {ComponentDataProvider, namedObserver, useModalComponentData, useModalType} from '@react-form-builder/core'
import {useCallback, useEffect, useMemo} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {useTranslationPart} from '../localization/hooks'
import {PropertyBlock} from '../ui/RightPanel/PropertiesEditor/components/PropertyBlock'
import {Section} from '../ui/RightPanel/PropertiesEditor/Section'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {HintedLabel} from './Hinted'
import styles from './ModalPropertiesEditor.module.css'

interface InnerModalPropertiesEditor extends AnnotationEditorProps {
  builderComponent: BuilderComponent
}

const RawSelectedModalPropertiesEditor = (props: InnerModalPropertiesEditor) => {
  const t = useTranslationPart('annotation.modalProps')
  const {builderComponent, componentData} = props
  const inActions = props.displayedSection === Section.Actions

  const modalAnnotations = useMemo(() => {
    return builderComponent.meta.properties.filter(a => {
      return inActions ? a.editor === 'event' : a.editor !== 'event'
    })
  }, [builderComponent.meta.properties, inActions])

  const selectedComponentStore = componentData.store
  const modalProps = selectedComponentStore.modal?.props ?? {}

  const selectedModalComponentData = useModalComponentData(componentData, builderComponent.model.type)

  const initContext = useCallback((() => {
    selectedComponentStore.modal ??= {props: {}}
    return selectedComponentStore?.modal.props
  }), [selectedComponentStore])

  useEffect(() => {
    // workaround, we need the selectedModalComponentData.store.events and selectedComponentStore.modal.events objects to be identical
    // therefore, we initialize objects here so that the selectedModalComponentData.store object
    // matches the selectedComponentStore.modal references.
    selectedComponentStore.modal ??= {props: {}, events: {}}
    selectedComponentStore.modal.events ??= {}
  }, [selectedComponentStore, selectedComponentStore.modal])

  return <>
    {!inActions && (<HintedLabel hint={<>{t('modalComponentPropertiesHint')}</>}>
      <h6>{t('modalComponentProperties')}</h6>
    </HintedLabel>)}
    <ComponentDataProvider value={selectedModalComponentData}>
      <div className={styles.root}>
        <PropertyBlock propertyBlockType={'modal'} annotations={modalAnnotations} context={modalProps}
                       initContext={initContext}
        />
      </div>
    </ComponentDataProvider>
  </>
}

const SelectedModalPropertiesEditor = namedObserver('SelectedModalPropertiesEditor', RawSelectedModalPropertiesEditor)

/**
 * React form builder component that displays the modal property editor.
 * @param props the React component properties.
 * @returns the React element.
 */
const RawModalPropertiesEditor = (props: AnnotationEditorProps) => {
  const t = useTranslationPart('annotation.modalProps')
  const builderStore = useBuilderStore()
  const selectedModalType = useModalType()

  const builderComponent = useMemo(() => {
    if (!selectedModalType) return

    return builderStore.view.builderComponents.find(builderComponent => {
      return builderComponent.model.type === selectedModalType
    })
  }, [selectedModalType, builderStore.view])

  if (!builderComponent) {
    return <HintedLabel hint={<>{t('noModalComponentHint')}</>}>
      <h6>{t('noModalComponent')}</h6>
    </HintedLabel>
  }

  return <SelectedModalPropertiesEditor {...props} builderComponent={builderComponent}/>
}

export const ModalPropertiesEditor = namedObserver('ModalPropertiesEditor', RawModalPropertiesEditor)

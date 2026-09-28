import type {Annotation, ComponentData, NodeEditorType} from '@react-form-builder/core'
import {boolean, isContainer, namedObserver} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {Rows} from '../components/Containers'
import LabeledProperty from '../components/LabeledProperty'
import {useTranslatedComponentProperty} from '../components/useTranslatedComponentProperty'
import {useTranslationPart} from '../localization/hooks'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {SCheckbox} from './BooleanInput'
import styles from './NodeInput.module.css'
import {ResizableStringInput} from './StringInput'

function getEditorType(annotation: Annotation, componentData: ComponentData) {
  const componentStore = componentData.store
  const property = componentStore.props[annotation.key]
  return isContainer(annotation) ? annotation.getNodeEditorType(property) : 'node'
}

const useDropzoneLabelProps = (props: AnnotationEditorProps, editorType: NodeEditorType): AnnotationEditorProps => {
  const {annotation, componentData} = props
  const {label} = useTranslatedComponentProperty(annotation, componentData.model.type)
  const t = useTranslationPart('annotation.useDropzone')
  const hint = t('hint').replace('{{propertyName}}', label)
  const annotationEditor = isContainer(annotation) ? annotation.defaultEditor : undefined
  const defaultEditor = annotationEditor ?? 'string'

  return useMemo(() => {
    const annotation = boolean
      .calculable(false)
      .default(defaultEditor === 'node')
      .hinted(hint)
      .build('useDropzone')

    return {
      ...props,
      value: editorType === 'node',
      annotation,
    }
  }, [defaultEditor, editorType, hint, props])
}

const RawUseDropzoneInput = (props: AnnotationEditorProps) => {
  const {annotation, componentData} = props
  const componentStore = componentData.store
  const editorType = getEditorType(annotation, componentData)
  const value = editorType === 'node'
  const builderStore = useBuilderStore()

  const onChange = useCallback(
    (_: any, checked: boolean) => {
      const newEditorType = checked ? 'node' : 'string'
      // eslint-disable-next-line react-hooks/immutability
      componentStore.props[annotation.key] = {editorType: newEditorType}

      if (!checked && componentStore.children) {
        componentStore.children.forEach(child => {
          const key = annotation.key
          const viewerStore = builderStore.viewer

          if (!(child.slot === key || (key === 'children' && !child.slot))) return
          const found = viewerStore.form.componentTree.findByKey(child.key)
          if (found) builderStore.remove(found)
        })
      }
    },
    [annotation.key, builderStore, componentStore.children, componentStore.props]
  )

  const labelProps = useDropzoneLabelProps(props, editorType)

  return (
    <LabeledProperty {...labelProps}>
      <SCheckbox checked={value} onChange={onChange} />
    </LabeledProperty>
  )
}

const UseDropzoneInput = namedObserver('UseDropzoneInput', RawUseDropzoneInput)

const RawStringNodeEditor = (props: AnnotationEditorProps) => {
  const {annotation, componentData, onClean} = props
  const componentStore = componentData.store
  const editorType = getEditorType(annotation, componentData)

  const handleChange = useCallback(
    (value: any) => {
      componentStore.props[annotation.key] ??= {}
      componentStore.props[annotation.key].value = value
      componentStore.props[annotation.key].editorType = editorType
    },
    [annotation.key, componentStore.props, editorType]
  )

  const handleClean = useCallback(() => {
    onClean()
    componentStore.props[annotation.key] ??= {editorType}
  }, [annotation.key, componentStore.props, editorType, onClean])

  const value = componentStore.props[annotation.key]?.value
  const editorProps = {...props, onChange: handleChange, onClean: handleClean, value}

  return (
    <LabeledProperty {...editorProps}>
      <ResizableStringInput {...editorProps} />
    </LabeledProperty>
  )
}

const StringNodeEditor = namedObserver('StringNodeEditor', RawStringNodeEditor)

/**
 * The property editor for the node property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const NodeInput = (props: AnnotationEditorProps) => {
  const {annotation, componentData} = props
  const show = isContainer(annotation) ? !!annotation.defaultEditor : false
  const editorType = getEditorType(annotation, componentData)

  if (!show) return null

  return (
    <Rows className={styles.rows}>
      <UseDropzoneInput {...props} />
      {editorType === 'string' && <StringNodeEditor {...props} />}
    </Rows>
  )
}

import type {Annotation, ComponentStore, CssPart, Meta, Model, PropertyBlockType} from '@react-form-builder/core'
import {
  cfDisableActionEditors,
  cfDisableAdditionalProperties,
  cfDisableMainComponentProperties,
  cfDisableStyleProperties,
  cfDisableStyles,
  cfDisableStylesForClassNameEditor,
  cfDisableTooltipProperties,
  cfDisableWrapperStyles,
  cfEnableInlineStylesEditor,
  className,
  ComponentDataProvider,
  key,
  namedObserver,
  useStore,
  useTooltipType
} from '@react-form-builder/core'
import cx from 'clsx'
import {useCallback, useState} from 'react'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import type {Device} from '../../../../../utils/types'
import {CSSEditor} from '../../../../annotation-editors/CSSEditor'
import {Hinted} from '../../../../annotation-editors/Hinted'
import {StyleEditor} from '../../../../annotation-editors/StyleEditor'
import {CenteredLabel} from '../../../../components/Labels'
import {PropertyEditorWrapper} from '../../../../components/PropertyEditorWrapper/PropertyEditorWrapper'
import {customizableObserver} from '../../../../customization/customizableObserver'
import {useTranslationPart} from '../../../../localization/hooks'
import {dataKey} from '../annotations/dataKeyAnnotation'
import {disableDataBinding} from '../annotations/disableDataBindingAnnotation'
import {Section, SubSection} from '../Section'
import {DevicePicker} from './DevicePicker'
import styles from './Properties.module.css'

const useCssContextInitializer = (fieldKey: CssPart, store: ComponentStore, device: Device) =>
  useCallback(() => {
    store[fieldKey] ??= {}
    store[fieldKey][device] ??= {}
    store[fieldKey][device].object ??= {}
    return store[fieldKey][device].object ?? {}
  }, [fieldKey, store, device])

const SectionMap: Record<string, Section> = {
  validation: Section.Rules,
  event: Section.Actions,
}

const SubSectionMap: Record<string, SubSection> = {
  htmlAttributes: SubSection.Additional,
  tooltipProps: SubSection.Tooltip,
  useTooltip: SubSection.Tooltip,
  renderWhen: SubSection.Additional,
}

const bySection = (section: Section) => (annotation: Annotation) => (SectionMap[annotation.editor] ?? Section.Main) === section

const bySubSection = (section?: SubSection) => (annotation: Annotation) => SubSectionMap[annotation.editor] === section

/**
 * Represents the properties of PropertyBlock component.
 */
interface PropertyBlockProps {
  /**
   * The array of metadata properties of a React component.
   */
  annotations: Annotation[],
  /**
   * The context containing the property data.
   */
  context?: object,
  /**
   * The function for creating an editing context, used if no context is specified.
   */
  initContext?: () => Record<string, any>,
  /**
   * The title of the component's property block.
   */
  header?: string,
  /**
   * The hint for header.
   */
  headerHint?: string,
  /**
   * The property block type.
   */
  propertyBlockType?: PropertyBlockType
  /**
   * The displayed section.
   */
  displayedSection?: Section
}

/**
 * React form builder component that displays the properties of the component.
 * @param props the React component properties.
 * @param props.annotations the array of form builder component metadata.
 * @param props.context the properties of the form builder component.
 * @param props.initContext the function initializes the context for the first change.
 * @param props.header the property block title.
 * @param props.headerHint the hint for the property block title.
 * @param props.propertyBlockType the type of the property block.
 * @param props.displayedSection the displayed section.
 * @returns the React element.
 */
export const PropertyBlock = ({
                                annotations,
                                context,
                                initContext,
                                displayedSection,
                                header,
                                headerHint,
                                propertyBlockType = 'component'
                              }: PropertyBlockProps) => {
  if (!context) return null

  return <>
    {!!header && <Hinted hint={headerHint}><h6>{header}</h6></Hinted>}
    {annotations.map(annotation => <PropertyEditorWrapper
      key={annotation.key}
      propertyBlockType={propertyBlockType}
      annotation={annotation}
      context={context}
      initContext={initContext}
      displayedSection={displayedSection}
    />)}
  </>
}

interface StyleBlockProps {
  meta: Meta
  store: ComponentStore
  device: Device
  cssPart: CssPart
  header: string
  headerHint: string
}

const RawStyleBlock = ({meta, store, device, cssPart, header, headerHint}: StyleBlockProps) => {
  const initContext = useCssContextInitializer(cssPart, store, device)
  const viewerStore = useStore()
  const model = viewerStore.getModel(meta.type)
  const context = store[cssPart]?.[device]?.object ?? {}
  const isComponent = model.kind === 'component' || model.kind === 'repeater'

  return (
    <PropertyBlock header={isComponent ? header : undefined}
                   headerHint={isComponent ? headerHint : undefined}
                   annotations={meta[cssPart]} context={context} initContext={initContext}/>
  )
}


interface PropertiesProps {
  activeTab: Section
  className?: string
}

const RawProperties = ({activeTab, ...props}: PropertiesProps) => {
  const builderStore = useBuilderStore()
  const tooltipType = useTooltipType()
  const getLabel = useTranslationPart('propertiesEditor')
  const data = builderStore.oneSelectedComponentData

  if (!data) {
    return (
      <div className={cx(styles.container, props.className)}>
        <CenteredLabel className={styles.emptyLabel}>{getLabel('selectElementForEdit')}</CenteredLabel>
      </div>
    )
  }

  const meta = builderStore.getComponentMetadata(data.store.type)
  const {model} = data

  const modalActions = data.model.type === 'Modal' && activeTab === Section.Actions
  const current = [...meta.properties, ...meta.modules].filter(bySection(activeTab))
  const properties = current.filter(bySubSection())
  const additionalProperties = current.filter(bySubSection(SubSection.Additional))
  const tooltipProps = current.filter(bySubSection(SubSection.Tooltip))
  const showTooltipProps = model.kind === 'component' && !!tooltipProps?.length && !!tooltipType
  const editorsDisabled = activeTab === Section.Actions && model.isFeatureEnabled(cfDisableActionEditors)

  return (
    <ComponentDataProvider value={data}>
      <div {...props} className={cx(styles.container, props.className)}>
        <div className={styles.propertiesList}>
          {activeTab === Section.Main && <PropertyEditorWrapper annotation={key} context={data.store}/>}
          {!model.isFeatureEnabled(cfDisableMainComponentProperties) && <>
            {data.model.dataBindingType === 'oneWay' && activeTab === Section.Main && <>
              <PropertyEditorWrapper annotation={disableDataBinding} context={data.store}/>
              {data.store.disableDataBinding?.value !== true &&
                <PropertyEditorWrapper annotation={dataKey} context={data.store}/>
              }
            </>}
            {data.model.dataBindingType === 'twoWay' && activeTab === Section.Main && <>
              <PropertyEditorWrapper annotation={dataKey} context={data.store}/>
            </>}
            {!editorsDisabled && <PropertyBlock annotations={properties} context={data.store.props}/>}
          </>
          }
          {activeTab === Section.Style && !model.isFeatureEnabled(cfDisableStyleProperties) &&
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            <Styles meta={meta} store={data.store}/>
          }
          {modalActions && <PropertyBlock annotations={meta.modules} context={data.store.props} displayedSection={activeTab}/>}
        </div>

        {showTooltipProps && !model.isFeatureEnabled(cfDisableTooltipProperties) &&
          <PropertyBlock annotations={tooltipProps} context={data.store.props}/>
        }

        {!!additionalProperties?.length && !model.isFeatureEnabled(cfDisableAdditionalProperties) &&
          <PropertyBlock annotations={additionalProperties} context={data.store.props}
                         header={getLabel('subSection.additionalProperties')}/>
        }
      </div>
    </ComponentDataProvider>
  )
}

const Properties = customizableObserver('RightPanel_Content', RawProperties)

const StyleBlock = namedObserver('StyleBlock', RawStyleBlock)

const isCssEditorHidden = (model: Model) => {
  if (model.isFeatureEnabled(cfDisableStylesForClassNameEditor)) return true

  const disableStyles = model.isFeatureEnabled(cfDisableStyles)
  const disableWrapperStyles = model.isFeatureEnabled(cfDisableWrapperStyles)

  if (model.kind === 'template' && disableWrapperStyles) return true
  if (model.kind === 'component' && disableStyles && disableWrapperStyles) return true

  return disableStyles
}

const getDefaultActiveCssTab = (model: Model) => {
  if (model.kind === 'template') return 'wrapperCss'

  if (model.kind === 'component' && model.isFeatureEnabled(cfDisableStyles)) {
    return 'wrapperCss'
  }

  return 'css'
}

const isStylesEditorVisible = (model: Model) => {
  if (!model.isFeatureEnabled(cfEnableInlineStylesEditor)) return false

  const disableStyles = model.isFeatureEnabled(cfDisableStyles)
  const disableWrapperStyles = model.isFeatureEnabled(cfDisableWrapperStyles)

  if (model.kind === 'template' && disableWrapperStyles) return false
  if (model.kind === 'component' && disableStyles && disableWrapperStyles) return false

  return !disableStyles
}

const getDefaultActiveStyleTab = (model: Model) => {
  if (model.kind === 'template') return 'wrapperStyle'

  if (model.kind === 'component' && model.isFeatureEnabled(cfDisableStyles)) {
    return 'wrapperStyle'
  }

  return 'style'
}

const RawStyles = ({meta, store}: { meta: Meta, store: ComponentStore }) => {
  const t = useTranslationPart('style')
  const [device, setDevice] = useState<Device>('any')
  const viewerStore = useStore()
  const model = viewerStore.getModel(meta.type)
  const isComponent = model.kind === 'component'
  const isTemplate = model.kind === 'template'
  const classNameEditor = <PropertyEditorWrapper annotation={className} context={store.props}/>

  const cssEditorHidden = isCssEditorHidden(model)
  const stylesEditorVisible = isStylesEditorVisible(model)
  const disableStyles = model.isFeatureEnabled(cfDisableStyles)
  const disableWrapperStyles = model.isFeatureEnabled(cfDisableWrapperStyles)

  // only components have styles and wrapper styles
  const useWrapperStyles = isComponent && !disableStyles && !disableWrapperStyles

  const activeCssTab = getDefaultActiveCssTab(model)
  const activeStyleTab = getDefaultActiveStyleTab(model)

  if (disableStyles && disableWrapperStyles) return null

  return <>
    <DevicePicker value={device} onChange={setDevice}/>
    {!isTemplate && !disableStyles &&
      <StyleBlock meta={meta} store={store} device={device} cssPart={'css'} header={t('component')} headerHint={t('componentHint')}/>
    }
    {isComponent && !disableStyles && classNameEditor}
    {!disableWrapperStyles &&
      <StyleBlock meta={meta} store={store} device={device} cssPart={'wrapperCss'} header={t('wrapper')} headerHint={t('wrapperHint')}/>
    }
    {!isComponent && !disableWrapperStyles && classNameEditor}

    {!cssEditorHidden &&
      <CSSEditor device={device} useWrapperStyles={useWrapperStyles} defaultActiveTab={activeCssTab}/>
    }

    {stylesEditorVisible &&
      <StyleEditor device={device} useWrapperStyles={useWrapperStyles} defaultActiveTab={activeStyleTab}/>
    }
  </>
}

const Styles = namedObserver('Styles', RawStyles)

export {Properties}

import type {Annotation, ComponentData, Meta, Model} from '@react-form-builder/core'
import {
  cfDisableActionEditors,
  cfDisableAdditionalProperties,
  cfDisableMainComponentProperties,
  cfDisableStyleProperties,
  cfDisableTooltipProperties,
  ComponentDataProvider,
  key,
  useTooltipType
} from '@react-form-builder/core'
import cx from 'clsx'
import type {HTMLAttributes, ReactNode} from 'react'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {CenteredLabel} from '../../../../components/Labels'
import {PropertyEditorWrapper} from '../../../../components/PropertyEditorWrapper/PropertyEditorWrapper'
import {customizableObserver} from '../../../../customization/customizableObserver'
import type {CustomizableKey} from '../../../../customization/types'
import {useTranslationPart} from '../../../../localization/hooks'
import {dataKey} from '../annotations/dataKeyAnnotation'
import {disableDataBinding} from '../annotations/disableDataBindingAnnotation'
import {Section, SubSection} from '../Section'
import styles from './Properties.module.css'
import {PropertyBlock} from './PropertyBlock'
import {Styles} from './Styles'

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

type TabContentProps = HTMLAttributes<HTMLDivElement>

type SectionAnnotations = {
  data: ComponentData
  meta: Meta
  model: Model
  properties: Annotation[]
  additionalProperties: Annotation[]
  tooltipProps: Annotation[]
  showTooltipProps: boolean
}

const useSectionAnnotations = (section: Section): SectionAnnotations | undefined => {
  const builderStore = useBuilderStore()
  const tooltipType = useTooltipType()
  const data = builderStore.oneSelectedComponentData

  if (!data) return undefined

  const meta = builderStore.getComponentMetadata(data.store.type)
  const {model} = data
  const current = [...meta.properties, ...meta.modules].filter(bySection(section))
  const properties = current.filter(bySubSection())
  const additionalProperties = current.filter(bySubSection(SubSection.Additional))
  const tooltipProps = current.filter(bySubSection(SubSection.Tooltip))
  const showTooltipProps = model.kind === 'component' && !!tooltipProps?.length && !!tooltipType

  return {data, meta, model, properties, additionalProperties, tooltipProps, showTooltipProps}
}

const SectionExtras = ({annotations}: { annotations: SectionAnnotations }) => {
  const getLabel = useTranslationPart('propertiesEditor')
  const {model, data, additionalProperties, tooltipProps, showTooltipProps} = annotations

  const showTooltip = showTooltipProps && !model.isFeatureEnabled(cfDisableTooltipProperties)
  const showAdditional = !!additionalProperties?.length && !model.isFeatureEnabled(cfDisableAdditionalProperties)

  if (!showTooltip && !showAdditional) return null

  return (
    <div className={styles.sectionExtras}>
      {showTooltip &&
        <PropertyBlock annotations={tooltipProps} context={data.store.props}/>
      }
      {showAdditional &&
        <PropertyBlock annotations={additionalProperties} context={data.store.props}
                       header={getLabel('subSection.additionalProperties')}/>
      }
    </div>
  )
}

const createSectionTabContent = (
  section: Section,
  customizableKey: CustomizableKey,
  renderBody: (annotations: SectionAnnotations) => ReactNode
) => {
  const RawTabContent = ({className, ...props}: TabContentProps) => {
    const annotations = useSectionAnnotations(section)

    if (!annotations) return null

    return (
      <div {...props} className={className}>
        {renderBody(annotations)}
        {section === Section.Main && <SectionExtras annotations={annotations}/>}
      </div>
    )
  }

  return customizableObserver(customizableKey, RawTabContent)
}

const MainTabContent = createSectionTabContent(Section.Main, 'Main_Tab_Content', ({data, model, properties}) => (
  <>
    <PropertyEditorWrapper annotation={key} context={data.store}/>
    {!model.isFeatureEnabled(cfDisableMainComponentProperties) && <>
      {data.model.dataBindingType === 'oneWay' && <>
        <PropertyEditorWrapper annotation={disableDataBinding} context={data.store}/>
        {data.store.disableDataBinding?.value !== true &&
          <PropertyEditorWrapper annotation={dataKey} context={data.store}/>
        }
      </>}
      {data.model.dataBindingType === 'twoWay' &&
        <PropertyEditorWrapper annotation={dataKey} context={data.store}/>
      }
      <PropertyBlock annotations={properties} context={data.store.props}/>
    </>}
  </>
))

const StyleTabContent = createSectionTabContent(Section.Style, 'Style_Tab_Content', ({data, meta, model}) => (
  !model.isFeatureEnabled(cfDisableStyleProperties)
    ? <Styles meta={meta} store={data.store}/>
    : null
))

const ActionsTabContent = createSectionTabContent(Section.Actions, 'Actions_Tab_Content', ({data, meta, model, properties}) => (
  <>
    {!model.isFeatureEnabled(cfDisableMainComponentProperties) && !model.isFeatureEnabled(cfDisableActionEditors) &&
      <PropertyBlock annotations={properties} context={data.store.props}/>
    }
    {data.model.type === 'Modal' &&
      <PropertyBlock annotations={meta.modules} context={data.store.props} displayedSection={Section.Actions}/>
    }
  </>
))

const RulesTabContent = createSectionTabContent(Section.Rules, 'Rules_Tab_Content', ({data, model, properties}) => (
  !model.isFeatureEnabled(cfDisableMainComponentProperties)
    ? <PropertyBlock annotations={properties} context={data.store.props}/>
    : null
))

const renderActiveTabContent = (activeTab: Section): ReactNode => {
  switch (activeTab) {
    case Section.Main:
      return <MainTabContent/>
    case Section.Style:
      return <StyleTabContent/>
    case Section.Actions:
      return <ActionsTabContent/>
    case Section.Rules:
      return <RulesTabContent/>
    default:
      return activeTab satisfies never
  }
}

interface PropertiesProps {
  activeTab: Section
  className?: string
}

const RawProperties = ({activeTab, ...props}: PropertiesProps) => {
  const builderStore = useBuilderStore()
  const getLabel = useTranslationPart('propertiesEditor')
  const data = builderStore.oneSelectedComponentData

  if (!data) {
    return (
      <div className={cx(styles.container, props.className)}>
        <CenteredLabel className={styles.emptyLabel}>{getLabel('selectElementForEdit')}</CenteredLabel>
      </div>
    )
  }

  return (
    <ComponentDataProvider value={data}>
      <div {...props} className={cx(styles.container, props.className)}>
        <div className={styles.propertiesList}>
          {renderActiveTabContent(activeTab)}
        </div>
      </div>
    </ComponentDataProvider>
  )
}

export const Properties = customizableObserver('RightPanel_Content', RawProperties)

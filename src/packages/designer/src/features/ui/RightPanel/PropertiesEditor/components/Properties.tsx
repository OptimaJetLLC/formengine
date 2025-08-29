import styled from '@emotion/styled'
import type {Annotation, ComponentStore, CssPart, Meta, PropertyBlockType} from '@react-form-builder/core'
import {
  cfDisableAdditionalProperties,
  cfDisableMainComponentProperties,
  cfDisableStyleProperties,
  cfDisableStylesForClassNameEditor,
  cfDisableTooltipProperties,
  cfEnableInlineStylesEditor,
  className,
  ComponentDataProvider,
  key,
  namedObserver,
  useStore,
  useTooltipType
} from '@react-form-builder/core'
import {useCallback, useState} from 'react'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import type {Device} from '../../../../../utils/types'
import {CSSEditor} from '../../../../annotation-editors/CSSEditor'
import {Hinted} from '../../../../annotation-editors/Hinted'
import {StyleEditor} from '../../../../annotation-editors/StyleEditor'
import {CenteredLabel} from '../../../../components/Labels'
import {PropertyEditorWrapper} from '../../../../components/PropertyEditorWrapper'
import {customizableObserver} from '../../../../customization'
import {useTranslationPart} from '../../../../localization/hooks'
import {dataKey} from '../annotations/dataKeyAnnotation'
import {disableDataBinding} from '../annotations/disableDataBindingAnnotation'
import {Section, SubSection} from '../Section'
import {DevicePicker} from './DevicePicker'

const PropertiesList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding-right: 5px;
  justify-content: space-between;

  & > * {
    margin-bottom: 5px;
  }
`

const useCssContextInitializer = (fieldKey: CssPart, store: ComponentStore, device: Device) =>
  useCallback(() => {
    store[fieldKey] ??= {}
    store[fieldKey]![device] ??= {}
    store[fieldKey]![device]!.object ??= {}
    return store[fieldKey]![device]!.object ?? {}
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

const bySection = (section: string) => (annotation: Annotation) => (SectionMap[annotation.editor] ?? Section.Main) === section

const bySubSection = (section?: string) => (annotation: Annotation) => SubSectionMap[annotation.editor] === section

/**
 * Represents the properties of PropertyBlock component.
 */
export interface PropertyBlockProps {
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
}

const RawProperties = ({activeTab, ...props}: PropertiesProps) => {
  const builderStore = useBuilderStore()
  const tooltipType = useTooltipType()
  const getLabel = useTranslationPart('propertiesEditor')
  const data = builderStore.oneSelectedComponentData

  if (!data) {
    return (
      <Container>
        <CenteredLabel style={{height: '40%'}}>{getLabel('selectElementForEdit')}</CenteredLabel>
      </Container>
    )
  }

  const meta = builderStore.getComponentMetadata(data.store.type)
  const {model} = data

  const modalActions = data.model.type === 'Modal' && activeTab === Section.Actions
  const current = meta.properties.concat(meta.modules).filter(bySection(activeTab))
  const properties = current.filter(bySubSection())
  const additionalProperties = current.filter(bySubSection(SubSection.Additional))
  const tooltipProps = current.filter(bySubSection(SubSection.Tooltip))
  const showTooltipProps = model.kind === 'component' && !!tooltipProps?.length && !!tooltipType

  return (
    <ComponentDataProvider value={data}>
      <Container  {...props}>
        <PropertiesList>
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
            <PropertyBlock annotations={properties} context={data.store.props}/>
          </>
          }
          {activeTab === Section.Style && !model.isFeatureEnabled(cfDisableStyleProperties) &&
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            <Styles meta={meta} store={data.store}/>
          }
          {modalActions && <PropertyBlock annotations={meta.modules} context={data.store.props} displayedSection={activeTab}/>}
        </PropertiesList>

        {showTooltipProps && !model.isFeatureEnabled(cfDisableTooltipProperties) &&
          <PropertyBlock annotations={tooltipProps} context={data.store.props}/>
        }

        {!!additionalProperties?.length && !model.isFeatureEnabled(cfDisableAdditionalProperties) &&
          <PropertyBlock annotations={additionalProperties} context={data.store.props}
                         header={getLabel('subSection.additionalProperties')}/>
        }
      </Container>
    </ComponentDataProvider>
  )
}

const Properties = customizableObserver('RightPanel_Content', RawProperties)

const StyleBlock = namedObserver('StyleBlock', RawStyleBlock)

const RawStyles = ({meta, store}: { meta: Meta, store: ComponentStore }) => {
  const t = useTranslationPart('style')
  const [device, setDevice] = useState<Device>('any')
  const viewerStore = useStore()
  const model = viewerStore.getModel(meta.type)
  const isComponent = model.kind === 'component'
  const isTemplate = model.kind === 'template'
  const classNameEditor = <PropertyEditorWrapper annotation={className} context={store.props}/>
  const cssEditorHidden = model.isFeatureEnabled(cfDisableStylesForClassNameEditor)
  const stylesEditorVisible = model.isFeatureEnabled(cfEnableInlineStylesEditor)

  return <>
    <DevicePicker value={device} onChange={setDevice}/>
    {!isTemplate &&
      <StyleBlock meta={meta} store={store} device={device} cssPart={'css'} header={t('component')} headerHint={t('componentHint')}/>
    }
    {isComponent && classNameEditor}
    <StyleBlock meta={meta} store={store} device={device} cssPart={'wrapperCss'} header={t('wrapper')} headerHint={t('wrapperHint')}/>
    {!isComponent && classNameEditor}

    {!cssEditorHidden &&
      <CSSEditor device={device} useWrapperStyles={isComponent} defaultActiveTab={isTemplate ? 'wrapperCss' : 'css'}/>
    }

    {stylesEditorVisible &&
      <StyleEditor device={device} useWrapperStyles={isComponent} defaultActiveTab={isTemplate ? 'wrapperStyle' : 'style'}/>
    }
  </>
}

const Styles = namedObserver('Styles', RawStyles)

export {Properties}

import styled from '@emotion/styled'
import type {CssPart, PropertyBlockType} from '@react-form-builder/core'
import {
  Annotation,
  className,
  ComponentDataProvider,
  ComponentStore,
  key,
  Meta,
  namedObserver,
  useTooltipType
} from '@react-form-builder/core'
import {useCallback, useState} from 'react'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {Device} from '../../../../../utils/types'
import {CSSEditor} from '../../../../annotation-editors/CSSEditor'
import {Hinted} from '../../../../annotation-editors/Hinted'
import {CenteredLabel} from '../../../../components/Labels'
import {PropertyEditorWrapper} from '../../../../components/PropertyEditorWrapper'
import {customizableObserver} from '../../../../customization'
import {useTranslationPart} from '../../../../localization/hooks'
import {Section, SubSection} from '../Section'
import {DevicePicker} from './DevicePicker'

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

interface PropertiesProps {
  activeTab: Section
}

const Properties = customizableObserver('RightPanel_Content', ({activeTab, ...props}: PropertiesProps) => {
  const store = useBuilderStore()
  const tooltipType = useTooltipType()
  const getLabel = useTranslationPart('propertiesEditor')
  const data = store.oneSelectedComponentData

  if (!data) {
    return (
      <Container>
        <CenteredLabel style={{height: '40%'}}>{getLabel('selectElementForEdit')}</CenteredLabel>
      </Container>
    )
  }

  const meta = store.getComponentMetadata(data.store.type)

  const current = meta.properties.concat(meta.modules).filter(bySection(activeTab))
  const properties = current.filter(bySubSection())
  const additionalProperties = current.filter(bySubSection(SubSection.Additional))
  const tooltipProps = current.filter(bySubSection(SubSection.Tooltip))
  const showTooltipProps = meta.kind === 'component' && !!tooltipProps?.length && !!tooltipType
  const notSlot = meta.kind !== 'slot'

  return (
    <ComponentDataProvider value={data}>
      <Container  {...props}>
        <PropertiesList>
          {activeTab === Section.Main && <PropertyEditorWrapper annotation={key} context={data.store}/>}
          {notSlot && <PropertyBlock annotations={properties} context={data.store.props}/>}
          {activeTab === Section.Style && notSlot &&
            <Styles meta={meta} store={data.store}/>
          }
        </PropertiesList>

        {showTooltipProps && notSlot &&
          <PropertyBlock annotations={tooltipProps} context={data.store.props}/>
        }

        {!!additionalProperties?.length && notSlot &&
          <PropertyBlock annotations={additionalProperties} context={data.store.props}
                         header={getLabel('subSection.additionalProperties')}/>
        }
      </Container>
    </ComponentDataProvider>
  )
})

const Styles = namedObserver('Styles', ({meta, store}: { meta: Meta, store: ComponentStore }) => {
  const t = useTranslationPart('style')
  const [device, setDevice] = useState<Device>('any')
  const isComponent = meta.kind === 'component'
  const isTemplate = meta.kind === 'template'
  const classNameEditor = <PropertyEditorWrapper annotation={className} context={store.props}/>

  return <>
    <DevicePicker value={device} onChange={setDevice}/>
    {!isTemplate &&
      <StyleBlock meta={meta} store={store} device={device} cssPart={'css'} header={t('component')} headerHint={t('componentHint')}/>
    }
    {isComponent && classNameEditor}
    <StyleBlock meta={meta} store={store} device={device} cssPart={'wrapperCss'} header={t('wrapper')} headerHint={t('wrapperHint')}/>
    {!isComponent && classNameEditor}
    <CSSEditor device={device} useWrapperStyles={isComponent} defaultActiveTab={isTemplate ? 'wrapperCss' : 'css'}/>
  </>
})

interface StyleBlockProps {
  meta: Meta
  store: ComponentStore
  device: Device
  cssPart: CssPart
  header: string
  headerHint: string
}

const StyleBlock = namedObserver('StyleBlock', ({meta, store, device, cssPart, header, headerHint}: StyleBlockProps) => {
  const initContext = useCssContextInitializer(cssPart, store, device)
  const context = store[cssPart]?.[device]?.object ?? {}
  const isComponent = meta.kind === 'component'

  return (
    <PropertyBlock header={isComponent ? header : undefined}
                   headerHint={isComponent ? headerHint : undefined}
                   annotations={meta[cssPart]} context={context} initContext={initContext}/>
  )
})

const useCssContextInitializer = (fieldKey: CssPart, store: ComponentStore, device: Device) =>
  useCallback(() => {
    store[fieldKey] ??= {}
    store[fieldKey]![device] ??= {}
    store[fieldKey]![device]!.object ??= {}
    return store[fieldKey]![device]!.object ?? {}
  }, [fieldKey, store, device])

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
 * @returns the React element.
 */
export const PropertyBlock = ({
                                annotations,
                                context,
                                initContext,
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
      initContext={initContext}/>)}
  </>
}

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

export {Properties}

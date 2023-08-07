import styled from '@emotion/styled'
import {ComponentDataProvider, ComponentStore, useTooltipType} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {key, stylization} from '../../../../annotation'
import {Annotation} from '../../../../annotation/types/annotations/Annotation'
import {CenteredLabel} from '../../../../components/Labels'
import {PropertyEditorWrapper} from '../../../../components/PropertyEditorWrapper'
import {useTranslationPart} from '../../../../localization/hooks'
import {Section, SubSection} from '../Section'

//TODO return section map to annotation
const SectionMap: Record<string, Section> = {
  validation: Section.Rules,
  event: Section.Actions,
}

//TODO return sub section map to annotation
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

const Properties = observer(({activeTab}: PropertiesProps) => {
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

  const meta = store.view.getMeta(data.store.type)

  const current = meta.properties.concat(meta.modules).filter(bySection(activeTab))
  const properties = current.filter(bySubSection(undefined))
  const additionalProperties = current.filter(bySubSection(SubSection.Additional))
  const style = meta.css.filter(bySection(activeTab)).filter(bySubSection(undefined))
  const tooltipProps = current.filter(bySubSection(SubSection.Tooltip))

  return (
    <ComponentDataProvider value={data}>
      <Container>
        <PropertiesList>
          {activeTab === Section.Main && <PropertyEditorWrapper annotation={key} getContext={() => data.store}/>}
          <PropertyBlock annotations={properties} context={data.store.props}/>
          <StyleBlock annotations={style} store={data.store}/>
          {activeTab === Section.Style && <PropertyEditorWrapper annotation={stylization} getContext={() => ({})}/>}
        </PropertiesList>

        {!!tooltipProps?.length && tooltipType &&
          <PropertyBlock annotations={tooltipProps} context={data.store.props}/>
        }

        {!!additionalProperties?.length &&
          <PropertyBlock annotations={additionalProperties} context={data.store.props}
                         header={getLabel('subSection.additionalProperties')}/>
        }
      </Container>
    </ComponentDataProvider>
  )
})

const StyleBlock = observer(({annotations, store}: { annotations: Annotation[], store: ComponentStore }) => {
  useEffect(() => {
    if (annotations.length) store.css ??= {object: {}}
  }, [])

  return <PropertyBlock annotations={annotations} context={store.css?.object}/>
})

/**
 * React form builder component that displays the properties of the component.
 * @param props the React component properties.
 * @param props.annotations the array of form builder component metadata.
 * @param props.context the properties of the form builder component.
 * @param props.header the property block title.
 * @returns the React element.
 */
export const PropertyBlock = ({annotations, context, header}: { annotations: Annotation[], context?: object, header?: string }) => {
  if (!context) return null

  return <>
    {!!header && <h6>{header}</h6>}
    {annotations.map(annotation => <PropertyEditorWrapper key={annotation.key} annotation={annotation} getContext={() => context}/>)}
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

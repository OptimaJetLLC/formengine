import styled from '@emotion/styled'
import {ComponentDataProvider, ComponentStore} from 'fb-core'
import {observer} from 'mobx-react'
import {createElement, useEffect} from 'react'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {AnnotationProvider} from '../../../../../utils/EditorContext'
import {key, stylization} from '../../../../annotation'
import {bySection, bySubSection, EditorMap} from '../../../../annotation-editors'
import {Annotation} from '../../../../annotation/types/annotations/Annotation'
import {CenteredLabel} from '../../../../components/Labels'
import {useTranslationPart} from '../../../../localization/hooks'
import {Section, SubSection} from '../Section'

interface PropertiesProps {
  activeTab: Section
}

const Properties = observer(({activeTab}: PropertiesProps) => {
  const store = useBuilderStore()
  const selected = store.oneSelected
  const getLabel = useTranslationPart('propertiesEditor')

  if (!selected) {
    return (
      <Container>
        <CenteredLabel style={{height: '40%'}}>{getLabel('selectElementForEdit')}</CenteredLabel>
      </Container>
    )
  }

  const meta = store.view.getMeta(selected.type)
  const data = store.viewer.getComponentData(selected)

  const current = meta.properties.concat(meta.modules).filter(bySection(activeTab))
  const properties = current.filter(bySubSection(undefined))
  const additionalProperties = current.filter(bySubSection(SubSection.Additional))
  const style = meta.css.filter(bySection(activeTab)).filter(bySubSection(undefined))
  const tooltipProps = current.filter(bySubSection(SubSection.Tooltip))

  return (
    <ComponentDataProvider value={data}>
      <Container>
        <PropertiesList>
          {activeTab === Section.Main && <Property annotation={key} getContext={() => ({})}/>}
          <PropertyBlock annotations={properties} context={data.store.props}/>
          <StyleBlock annotations={style} store={data.store}/>
          {activeTab === Section.Style && <Property annotation={stylization} getContext={() => ({})}/>}
        </PropertiesList>

        {!!tooltipProps?.length && store.viewer.tooltipType &&
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

export const PropertyBlock = ({annotations, context, header}: { annotations: Annotation[], context?: object, header?: string }) => {
  if (!context) return null

  return <>
    {!!header && <h6>{header}</h6>}
    {annotations.map(annotation => <Property key={annotation.key} annotation={annotation} getContext={() => context}/>)}
  </>
}

const Property = ({annotation, getContext}: { annotation: Annotation, getContext: () => object }) => (
  <AnnotationProvider value={{annotation, getContext}}>
    {createElement(observer(EditorMap[annotation.editor]))}
  </AnnotationProvider>
)

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

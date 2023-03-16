import styled from '@emotion/styled'
import {Annotation, ComponentDataProvider, ComponentStore} from 'fb-core'
import {observer} from 'mobx-react'
import {createElement, useEffect} from 'react'
import {Panel} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {AnnotationProvider} from '../../../../../utils/EditorContext'
import {bySection, bySubSection, EditorMap} from '../../../../annotation-editors'
import {useTranslationPart} from '../../../../localization/hooks'
import {CenteredLabel} from '../../../common/Labels'
import {Section, SubSection} from '../Section'

interface PropertiesProps {
  activeTab: Section
}

const Properties = observer(({activeTab}: PropertiesProps) => {
  const {selected, viewer} = useBuilderStore()
  const getLabel = useTranslationPart('propertiesEditor')

  useEffect(() => {
    if (selected) {
      selected.data.styles ??= {}
      selected.data.styles.cssObject ??= {}
    }
  }, [selected])

  if (!selected) {
    return (
      <Container>
        <CenteredLabel style={{height: '40%'}}>{getLabel('selectElementForEdit')}</CenteredLabel>
      </Container>
    )
  }

  const {data, model, parent} = selected

  const current = model.properties.filter(bySection(activeTab))
  const properties = current.filter(bySubSection(undefined))
  const additionalProperties = current.filter(bySubSection(SubSection.Additional))
  const style = model.style.filter(bySection(activeTab)).filter(bySubSection(undefined))
  const tooltipProps = current.filter(bySubSection(SubSection.Tooltip))

  return (
    <ComponentDataProvider value={{key: data.key, componentStore: data, model, parentStore: parent?.data}}>
      <Container>
        <PropertiesList>
          {renderProperties(properties, data)}
          {renderStyleProperties(style, data)}
        </PropertiesList>
        {!!tooltipProps?.length && viewer.tooltipType &&
          <SPanel header={getLabel('subSection.tooltipProps')} collapsible bodyFill>
            {renderProperties(tooltipProps, data)}
          </SPanel>
        }
        {!!additionalProperties?.length &&
          <SPanel header={getLabel('subSection.additionalProperties')} collapsible bodyFill>
            {renderProperties(additionalProperties, data)}
          </SPanel>
        }
      </Container>
    </ComponentDataProvider>
  )
})

export const renderProperties = (properties: Annotation[], cs: ComponentStore) => {
  return renderSubsectionProperties(properties, () => cs.props)
}

export const renderSubsectionProperties = (properties: Annotation[], getContext: () => Record<string, any>) => {
  return properties.map(annotation => <AnnotationProvider key={annotation.key} value={{annotation, getContext: getContext}}>
    {createElement(observer(EditorMap[annotation.editor]))}
  </AnnotationProvider>)
}

const renderStyleProperties = (properties: Annotation[], cs: ComponentStore) => {
  const cssObject = cs.styles?.cssObject
  if (!cssObject) return null

  return properties.map(annotation =>
    <AnnotationProvider key={annotation.key} value={{
      annotation, getContext: () => cssObject
    }}>
      {createElement(observer(EditorMap[annotation.editor]))}
    </AnnotationProvider>)
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
  max-width: 256px;
  margin-right: 10px;
  justify-content: space-between;

  & > * {
    margin-bottom: 5px;
  }
`

const SPanel = styled(Panel)`
  .rs-panel-header {
    padding-inline: 0;

    .rs-icon {
      left: 0;
      right: inherit;
      margin-right: 10px;
      top: 22px;
      transform: rotate(-90deg) !important;
    }
  }

  & .rs-panel-title {
    margin-left: 20px;
    font-weight: bolder;
  }

  &.rs-panel-in .rs-panel-header > .rs-icon {
    transform: rotate(0deg) !important;
  }
`


export {Properties}

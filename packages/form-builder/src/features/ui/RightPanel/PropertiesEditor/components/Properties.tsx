import styled from '@emotion/styled'
import {Annotation, ComponentDataProvider, key} from 'fb-core'
import {observer} from 'mobx-react'
import {createElement} from 'react'
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
  const store = useBuilderStore()
  const selected = store.getSingleSelected()
  const getLabel = useTranslationPart('propertiesEditor')

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
          <Property annotation={key} getContext={() => ({})}/>
          <PropertyBlock annotations={properties} context={data.props}/>
          <PropertyBlock annotations={style} context={data.styles?.cssObject}/>
        </PropertiesList>

        {!!tooltipProps?.length && store.viewer.tooltipType &&
          <SPanel header={getLabel('subSection.tooltipProps')} collapsible bodyFill>
            <PropertyBlock annotations={tooltipProps} context={data.props}/>
          </SPanel>
        }

        {!!additionalProperties?.length &&
          <SPanel header={getLabel('subSection.additionalProperties')} collapsible bodyFill>
            <PropertyBlock annotations={additionalProperties} context={data.props}/>
          </SPanel>
        }
      </Container>
    </ComponentDataProvider>
  )
})

export const PropertyBlock = ({annotations, context}: { annotations: Annotation[], context?: object }) => {
  if (!context) return null

  return <>
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

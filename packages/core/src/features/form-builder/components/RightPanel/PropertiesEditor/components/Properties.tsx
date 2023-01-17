import styled from '@emotion/styled'
import {isUndefined} from 'lodash'
import {observer} from 'mobx-react'
import React, {createElement, useEffect} from 'react'
import {Panel} from 'rsuite'
import {ComponentStore} from '../../../../../../stores/ComponentStore'
import {useBuilderStore} from '../../../../../../utils/contexts/BuilderStoreContext'
import {ComponentDataProvider} from '../../../../../../utils/contexts/ComponenDataContext'
import {AnnotationProvider} from '../../../../../../utils/contexts/EditorContext'
import {Annotation} from '../../../../../annotation/utils/annotations/Annotation'
import {useTranslationPart} from '../../../../../localization/hooks'
import {CenteredLabel} from '../../../../../ui/Labels'
import {Section, SubSection} from '../Section'

interface PropertiesProps {
  activeTab: Section
}

const Properties = observer(({activeTab}: PropertiesProps) => {
  const {selected} = useBuilderStore()
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

  const current = model.properties.filter(({section}) => section === activeTab)
  const properties = current.filter(({subsection}) => isUndefined(subsection))
  const style = model.style.filter(({section}) => section === activeTab).filter(({subsection}) => isUndefined(subsection))
  const additionalProperties = current.filter(({subsection}) => subsection === SubSection.Additional)

  return (
    <ComponentDataProvider value={{componentStore: data, model, parentStore: parent?.data}}>
      <Container>
        <div>
          {renderProperties(properties, data)}
          {renderStyleProperties(style, data)}
        </div>
        {!!additionalProperties?.length &&
          <SPanel header={getLabel('subSection.additionalProperties')}
                  collapsible bodyFill>
            {renderProperties(additionalProperties, data)}
          </SPanel>
        }
      </Container>
    </ComponentDataProvider>
  )
})

const renderProperties = (properties: Annotation[], cs: ComponentStore) => {
  return properties.map(annotation =>
    <AnnotationProvider key={annotation.key} value={{annotation, getContext: () => cs.props}}>
      {createElement(observer(annotation.editor))}
    </AnnotationProvider>)
}

const renderStyleProperties = (properties: Annotation[], cs: ComponentStore) => {
  const cssObject = cs.styles?.cssObject
  if (!cssObject) return null

  return properties.map(annotation =>
    <AnnotationProvider key={annotation.key} value={{
      annotation, getContext: () => cssObject
    }}>
      {createElement(observer(annotation.editor))}
    </AnnotationProvider>)
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
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

import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import React, {createElement} from 'react'
import {useTranslation} from 'react-i18next'
import {useBuilderStore} from '../../../../../../utils/contexts/BuilderStoreContext'
import {ComponentDataProvider} from '../../../../../../utils/contexts/ComponenDataContext'
import {CenteredLabel} from '../../../../../ui/Labels'
import {Section} from '../Section'

interface PropertiesProps {
  activeTab: Section
}

const Properties = observer(({activeTab}: PropertiesProps) => {
  const {selected} = useBuilderStore()
  const {t} = useTranslation()

  if (!selected) {
    return (
      <Container>
        <CenteredLabel style={{height: '40%'}}>{t('propertiesEditor.selectElementForEdit')}</CenteredLabel>
      </Container>
    )
  }

  const {data, model, parent} = selected

  const properties = model.properties
    .filter(annotation => annotation.section === activeTab)
    .map(annotation =>
      //<WithValidation annotation={annotation} Component={observer(annotation.editor)} key={annotation.key}/>
    //TODO in editor the hook
      createElement(observer(annotation.editor), {key:annotation.key, annotation, componentStore: data})
    )

  return (
    <ComponentDataProvider value={{componentStore: data, model, parent: parent?.data}}>
      <Container>
          {properties}
      </Container>
    </ComponentDataProvider>
  )
})

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-right: 10px;
`


export {Properties}

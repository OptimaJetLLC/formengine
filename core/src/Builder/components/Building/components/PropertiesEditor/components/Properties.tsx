import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {CenteredLabel} from '../../../../../../features/ui/Labels'
import {ObservableFormik} from '../../../../../../features/validation/components/ObserableFormik'
import {WithValidation} from '../../../../../../features/validation/components/WithValidation'
import {ComponentDataProvider} from '../../../../../../utils/contexts/ComponenDataContext'
import {useStore} from '../../../../../../utils/contexts/StoreContext'
import {Section} from '../Section'

interface PropertiesProps {
  activeTab: Section
}

const Properties = observer(({activeTab}: PropertiesProps) => {
  const {selected} = useStore()
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
      <WithValidation annotation={annotation} Component={observer(annotation.editor)} key={annotation.key}/>
    )

  return (
    <ComponentDataProvider value={{componentStore: data, model, parent: parent?.data}}>
      <Container>
        <ObservableFormik>
          {properties}
        </ObservableFormik>
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

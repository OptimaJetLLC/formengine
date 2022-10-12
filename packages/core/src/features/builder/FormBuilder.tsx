import styled from '@emotion/styled'
import {configure} from 'mobx'
import {observer} from 'mobx-react'
import React, { Suspense } from 'react'
import {Loader} from 'rsuite'
import {FormViewerProps} from '../viewer/FormViewer'
import {useStore} from '../../utils/contexts/StoreContext'
import {BuilderProviders} from './BuilderProviders'
import {Building} from './components/Building'
import {PropertiesEditor} from './components/Building/components/PropertiesEditor'
import {Tree} from './components/Building/components/Tree'
import {Header} from './components/Header/Header'
import {Panel, PanelContainer} from './components/Panel'
import {Preview} from './components/Preview'
import {Errors} from './components/Preview/components/Errors'

export interface FormBuilderProps extends FormViewerProps {
}

export const FormBuilder = (props: FormBuilderProps) => (
  <BuilderProviders view={props.view}>
    <FormBuilderBody {...props}/>
  </BuilderProviders>
)

const FormBuilderBody = observer((props: FormBuilderProps) => {
  const store = useStore()
  const {event, ...builderProps} = props

  return (
    <Suspense fallback={<Loader center content="loading" />}>
      <Container>
        <Header/>
        <Content>
          <Panel name={'leftPanel'}>{
            store.isBuilderMode
              ? <Tree/>
              : <Errors style={{margin: 20}}/>}
          </Panel>
          <FormContainer>{
            store.isBuilderMode
              ? <Building {...builderProps}/>
              : <Preview {...props}/>}
          </FormContainer>
          <Panel name={'rightPanel'} rightPlacement>{
            store.isBuilderMode
            && <PropertiesEditor/>}
          </Panel>
        </Content>
      </Container>
    </Suspense>
  )
})

const FormContainer = styled(PanelContainer)`
  flex: 1;
  z-index: 1;
  flex-direction: column;
  width: initial;
  margin-inline: 15px;
  padding: 12px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: height .2s ease, width .2s ease, border-radius .2s ease;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 15%);
  background-color: white;
`

const Container = styled.div`
  background-color: #f7f7fa;

  .rs-theme-dark & {
    background-color: #3b3f43;
  }
`

const Content = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 56px);
  flex-direction: row;
`

//TODO move to other common place
//State can be changed from anywhere
configure({enforceActions: 'never'})

import {configure} from 'mobx';
import {observer} from 'mobx-react';
import React, {useMemo} from 'react';
import styled from '@emotion/styled';
import {FormViewerProps} from '../FormViewer';
import {StoreProvider} from '../utils/StoreContext';
import {Store} from '../stores/Store';
import {Header} from './components/Header/Header';
import {BuilderView} from './BuilderView';
import {Preview} from './Preview';

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Localization} from '../features/localization';

export interface FormBuilderProps extends FormViewerProps {

}

const FormBuilder = observer((props: FormBuilderProps) => {
    const store = useMemo(() => new Store(props.view), []);

    return (
        <Localization store={store}>
            <StoreProvider store={store}>
                <Container>
                    <DndProvider  backend={HTML5Backend}>
                        <Header/>
                        <Content>
                            {store.isBuilderMode
                                ? <BuilderView getForm={props.getForm} view={props.view}/>
                                : <Preview getForm={props.getForm} view={props.view}/>
                            }
                        </Content>
                    </DndProvider>
                </Container>
            </StoreProvider>
        </Localization>
    );
});


const PanelContainer = styled.div`
  width: 280px;
  margin: 15px 0;
  padding: 10px;
  background-color: #ffffffa1;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 15%);
  display: flex;
`

export const LeftPanel = styled(PanelContainer)`
  //width: 200px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  //background-color: inherit; 
  box-shadow: none;
`

export const FormContainer = styled(PanelContainer)`
  flex: 1;
  display: block;
  width: initial;
  background-color: white;
  margin: 15px;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: height .2s ease, width .2s ease, border-radius .2s ease;
`

const Container = styled.div`
  background-color: #f7f7fa;
`

const Content = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 56px);
  flex-direction: row;
  //background-color: #f7f7fa;
  //box-shadow: inset 0 0 4px 0 rgb(0 0 0 / 25%);
`

export const RightPanel = styled(PanelContainer)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  //background-color: inherit;
  box-shadow: none;
`

//TODO move to other common place
//State can be changed from anywhere
configure({enforceActions: "never"})

export {FormBuilder}

import _ from "lodash";
import {observer} from "mobx-react"
import {Section} from "../Section";
import {WithValidation} from "../../../../features/validation/components/WithValidation";
import React from "react";
import {ObservableFormik} from "../../../../features/validation/components/ObserableFormik";
import {CenteredLabel} from "../../../../components/UI/Labels";
import styled from "@emotion/styled";
import {useStore} from "../../../../utils/StoreContext";
import {Button} from "rsuite";
import { useTranslation } from 'react-i18next';

interface PropertiesProps {
    activeTab: Section
}

const Properties = observer(({activeTab}: PropertiesProps) => {
    const store = useStore();
    const { t } = useTranslation();

    if (!store.selected)
        return (<Container>
            <CenteredLabel style={{height: "40%"}}>{t('propertiesEditor.selectElementForEdit')}</CenteredLabel>
        </Container>)

    const annotations = _.values(store.selected.definition.annotations)

    const properties = annotations
        .filter(annotation => annotation.section === activeTab)
        .map(annotation =>
            <WithValidation annotation={annotation} Component={annotation.component} key={annotation.key}
                            componentStore={store.selected!.data}/>
        )

    return <Container>
        <ObservableFormik>
            {properties}


            <Button style={{marginTop: 15}} block appearance="primary" color="red"  children="Delete"/>
        </ObservableFormik>
    </Container>
});

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-right: 10px;
`


export {Properties}

import _ from "lodash";
import {observer} from "mobx-react"
import {Section} from "../Section";
import {store} from "../../../../stores/Store";
import {WithValidation} from "../../../../features/validation/components/WithValidation";
import React from "react";
import {ObservableFormik} from "../../../../features/validation/components/ObserableFormik";
import {CenteredLabel} from "../../../../components/Labels";
import styled from "@emotion/styled";

interface PropertiesProps {
    activeTab: Section
}

const Properties = observer(({activeTab}: PropertiesProps) => {
    if (!store.currentNode)
        return (
            <CenteredLabel style={{height: "40%"}}>Select element on form for edit properties</CenteredLabel>
        )

    const annotations = _.values(store.currentNode.definition.annotations)

    const properties = annotations
        .filter(annotation => annotation.section == activeTab)
        .map(annotation =>
            <WithValidation annotation={annotation} Component={annotation.component}
                            componentStore={store.currentNode!.data}/>
        )

    return <Container>
        <ObservableFormik>
            {properties}
        </ObservableFormik>
    </Container>
});

const Container = styled.div`
  margin-right: 10px;
`


export {Properties}

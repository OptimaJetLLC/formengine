import _ from "lodash";
import {observer} from "mobx-react"
import {Section} from "../Section";
import {store} from "../../../../stores/Store";
import {WithValidation} from "../../../../features/validation/components/WithValidation";
import React from "react";
import {ObservableFormik} from "../../../../features/validation/components/ObserableFormik";
import {CenteredLabel} from "../../../../components/Labels";

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

    return <ObservableFormik>
        {properties}
    </ObservableFormik>
});

export {Properties}

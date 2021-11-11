import { observer } from "mobx-react"
import {Section} from "../Section";
import {store} from "../../../../stores/Store";
import _ from "lodash";
import {Validator1, WithValidation} from "../../../../features/validation/components/WithValidation";
import React from "react";

interface PropertiesProps {
    activeTab: Section
}

const Properties = observer(({activeTab}: PropertiesProps) => {
    if (!store.currentNode) return null

    let properties = _.values(store.currentNode.definition.annotations)
        .filter(annotation => annotation.section == activeTab)
        .map(annotation =>
            <WithValidation annotation={annotation} Component={annotation.component}
                            componentStore={store.currentNode!.data}/>
        )

    return <Validator1>
        {properties}
    </Validator1>
})

export {Properties}
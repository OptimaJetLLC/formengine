import React, {ComponentType} from "react";
import {ErrorMessage} from "./ErrorMessage";
import {PropertyEditorProps} from "../../../api/types";
import {Annotation} from "../../../api/annotation/Annotation";
import {ComponentStore} from "../../../stores/ComponentStore";
import {observer} from "mobx-react";
import {useValidation} from "../useValidation";


interface WithValidationProps<T> {
    annotation: Annotation<any>
    Component: ComponentType<PropertyEditorProps<any>>
    componentStore: ComponentStore
}

export const WithValidation = observer(<T extends any>(props: WithValidationProps<T> & T) => {
    const {annotation, Component, componentStore} = props

    const [value, onChange, onBLur, meta] = useValidation(annotation.key, componentStore)

    return <div>
        <Component
            onChange={onChange}
            onBlur={onBLur}
            value={value}
            annotation={annotation}
            componentStore={componentStore}/>
        <ErrorMessage {...meta}/>
    </div>
})

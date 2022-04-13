import React, {ComponentType} from "react";
import {ErrorMessage} from "./ErrorMessage";
import {PropertyEditorProps} from "../../annotation/types";
import {Annotation} from "../../annotation/Annotation";
import {ComponentStore} from "../../../stores/ComponentStore";
import {observer} from "mobx-react";
import {useValidation} from "../useValidation";
import * as Yup from "yup";
import {useComponentData} from "../../../utils/contexts/ComponenDataContext";

interface WithValidationProps<T> {
    annotation: Annotation<any>
    Component: ComponentType<PropertyEditorProps<any>>
}

export const WithValidation = observer(<T extends any>(props: WithValidationProps<T> & T) => {
    const {annotation, Component} = props
    const {componentStore} = useComponentData()

    const scheme = Yup.string().required().min(3) //TODO scheme from annotation

    const [field, meta] = useValidation({key: annotation.key, scheme})

    return <div>
        <Component
            onChange={field.setValue}
            onBlur={() => field.setTouched()}
            value={field.value}
            annotation={annotation}
            componentStore={componentStore}/>
        <ErrorMessage {...meta}/>
    </div>
})

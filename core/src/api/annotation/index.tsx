import React from "react";
import {PropertyEditorProps} from "../Types";
import {Checkbox, Form, Input} from "rsuite";
import {AnnotationBuilder} from "./AnnotationBuilder";

//TODO следует ли компоновать их и засунуть в один объект?
//TODO избавиться от опционалов?
export const key = new AnnotationBuilder("", {input: KeyInput})
export const string = new AnnotationBuilder("", {input: StringInput})
export const stringOptional = new AnnotationBuilder("" as string | undefined, {input: StringInput})
export const boolean = new AnnotationBuilder(false, {input: BooleanInput})
export const booleanOptional = new AnnotationBuilder(false as boolean | undefined, {input: BooleanInput})

function KeyInput({model, annotation}: PropertyEditorProps) {

    return (
        <div>
            <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
            <Input
                value={model.key}
                onChange={value => model.key = value as string}
            />
        </div>
    )
}

function StringInput({model, annotation}: PropertyEditorProps) {

    return (
        <div>
            <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
            <Input
                value={model.props[annotation.key]}
                onChange={value => model.props[annotation.key] = value as string}
            />
        </div>
    )
}

function BooleanInput({model, annotation}: PropertyEditorProps) {

    return (
        <div>
            <Form.ControlLabel>{annotation.title}</Form.ControlLabel>
            <Checkbox
                value={model.props[annotation.key]}
                onChange={value => model.props[annotation.key] = value}
            />
        </div>
    )
}

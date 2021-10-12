import React from "react";
import {AnnotationBuilder} from "./AnnotationBuilder";
import Key from "./inputs/Key";
import String from "./inputs/String";
import Boolean from "./inputs/Boolean";

//TODO следует ли компоновать их и засунуть в один объект?
//TODO избавиться от опционалов?
export const key = new AnnotationBuilder("", {input: Key})
export const string = new AnnotationBuilder("", {input: String})
export const stringOptional = new AnnotationBuilder(undefined as string | undefined, {input: String})
export const boolean = new AnnotationBuilder(false, {input: Boolean})
export const booleanOptional = new AnnotationBuilder(undefined as boolean | undefined, {input: Boolean})


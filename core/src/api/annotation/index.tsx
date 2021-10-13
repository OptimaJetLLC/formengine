import React from "react";
import {AnnotationBuilder} from "./AnnotationBuilder";
import Key from "./inputs/Key";
import String from "./inputs/String";
import Boolean from "./inputs/Boolean";

//TODO следует ли компоновать их и засунуть в один объект?
//TODO избавиться от опционалов?
export const key = new AnnotationBuilder<string>({input: Key})
export const string = new AnnotationBuilder<string | undefined>({input: String})
export const boolean = new AnnotationBuilder<boolean | undefined>({input: Boolean})


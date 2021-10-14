import React from "react";
import {AnnotationBuilder} from "./AnnotationBuilder";
import Key from "./inputs/Key";
import String from "./inputs/String";
import Boolean from "./inputs/Boolean";

//TODO следует ли компоновать их и засунуть в один объект?
export const key = new AnnotationBuilder<string>({input: Key, isSystem: true}).isRequired("")
export const string = new AnnotationBuilder<string | undefined>({input: String})
export const boolean = new AnnotationBuilder<boolean | undefined>({input: Boolean})

//Аннотация: спсиок допустимых параметров - просто массив
//Аннотация: список допустимых параметров с его label - value. Label всегда текст, а значение принимает заданный тип
//Аннотация: построитель объекта?
//Аннотация: ReactNode: обозначает, что объект является контейнером. Также его можно инициировать как строку, бул
// и другие совместимые с нодой свойства
export const list = new AnnotationBuilder<string[] | undefined>()
export const l1 = new AnnotationBuilder<object | undefined>()
export const l2 = new AnnotationBuilder<Record<string, any> | undefined>()


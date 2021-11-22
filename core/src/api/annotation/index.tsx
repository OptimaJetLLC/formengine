import React from "react";
import {AnnotationBuilder} from "./AnnotationBuilder";
import Key from "./inputs/Key";
import String from "./inputs/String";
import Boolean from "./inputs/Boolean";
import Picker from "./inputs/Picker";
import Event from "./inputs/Event";
import Style from "./inputs/Style";
import {Section} from "../../Builder/components/PropertiesEditor/Section";

//TODO следует ли компоновать их и засунуть в один объект?
export const key = new AnnotationBuilder<string>({component: Key, isSystem: true}).isRequired("")
export const string = new AnnotationBuilder<string | undefined>({component: String})
export const boolean = new AnnotationBuilder<boolean | undefined>({component: Boolean})
//TODO Like function
export const select = new AnnotationBuilder<"lg" | "md" | "sm" | "xs" | undefined>({component: Picker})
export const style = new AnnotationBuilder<Record<string, string>[] | undefined>({
    component: Style,
    section: Section.Style
})
export const event = new AnnotationBuilder<Function | undefined>({
    component: Event,
    section: Section.Actions,
    isFunction: true
})

//Аннотация: спсиок допустимых параметров - просто массив
//Аннотация: список допустимых параметров с его label - value. Label всегда текст, а значение принимает заданный тип
//Аннотация: построитель объекта?
//Аннотация: ReactNode: обозначает, что объект является контейнером. Также его можно инициировать как строку, бул
// и другие совместимые с нодой свойства
export const list = new AnnotationBuilder<string[] | undefined>()
export const l1 = new AnnotationBuilder<object | undefined>()
export const l2 = new AnnotationBuilder<Record<string, any> | undefined>()
export const number = new AnnotationBuilder<number | undefined>()


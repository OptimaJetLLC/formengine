import {ReactNode} from "react";
import {AnnotationBuilder} from "./utils/AnnotationBuilder";
import {KeyInput} from "./inputs/Key";
import {StringInput} from "./inputs/String";
import {BooleanInput} from "./inputs/Boolean";
import {EventEditor} from "../event";
import {StyleEditor} from "../style";
import {ValidateEditor} from "../validation/components/ValidateEditor";
import {Container} from "./inputs/Container";
import {Section} from "../../Builder/components/Building/components/PropertiesEditor/Section";

//TODO следует ли компоновать их и засунуть в один объект?
export const key = new AnnotationBuilder<string>({component: KeyInput, isSystem: true}).isRequired("")
export const string = new AnnotationBuilder<string | undefined>({component: StringInput})
export const boolean = new AnnotationBuilder<boolean | undefined>({component: BooleanInput})
export const style = new AnnotationBuilder<Record<string, string>[] | undefined>({
    component: StyleEditor,
    section: Section.Style
})
export const event = new AnnotationBuilder<Function | undefined>({
    component: EventEditor,
    section: Section.Actions,
    isFunction: true
})
// set
export const validation = new AnnotationBuilder<any>({component: ValidateEditor, section: Section.Validation})

export const node = new AnnotationBuilder<ReactNode>({isContainer: true, component: Container})
export const element = new AnnotationBuilder<ReactNode>({isContainer: true, component: Container})

//Аннотация: спсиок допустимых параметров - просто массив
//Аннотация: список допустимых параметров с его label - value. Label всегда текст, а значение принимает заданный тип
//Аннотация: построитель объекта?
//Аннотация: ReactNode: обозначает, что объект является контейнером. Также его можно инициировать как строку, бул
// и другие совместимые с нодой свойства
export const list = new AnnotationBuilder<string[] | undefined>()
export const l1 = new AnnotationBuilder<object | undefined>()
export const l2 = new AnnotationBuilder<Record<string, any> | undefined>()
export const number = new AnnotationBuilder<number | undefined>()


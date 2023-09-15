/**
 * The generic type denoting one of the values of type T.
 */
export type Enum<T extends [any, ...any[]]> = T[number]

/**
 * Type of component property description in the form builder.
 */
export type AnnotationType = 'Property' | 'Container' | 'Event' | 'Module' | 'Style'

/**
 * The generic type that returns the first parameter of the generic type T.
 */
export type FirstParameter<T extends (...args: any) => any> = Parameters<T>[0]

/**
 * A type that denotes the name of the property editor.
 */
export type EditorType = string

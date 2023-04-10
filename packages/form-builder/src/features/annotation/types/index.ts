export type Enum<T extends [any, ...any[]]> = T[number]

export type AnnotationType = 'Property' | 'Container' | 'Event' | 'Module' | 'Style'

export type FirstParameter<T extends (...args: any) => any> = Parameters<T>[0]

export type EditorType = string

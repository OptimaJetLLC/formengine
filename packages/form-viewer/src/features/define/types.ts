export type Ancestor<T> = T extends infer R ? R : never;

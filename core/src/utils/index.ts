export function isFunction(fn: any): fn is Function {
  return typeof fn === 'function'
}

export function isString(value: any): value is string {
  return typeof value === 'string'
}

export function isObject(value: any): value is Object {
  return value !== null && typeof value === 'object'
}

export function treeFind<T extends { key: string, children?: T[] }>(value: T, key?: string): T | null {
  if (value.key === key) return value

  if (!value.children) return null

  for (let child of value.children) {
    let childNode = treeFind(child, key)
    if (childNode) return childNode
  }

  return null
}

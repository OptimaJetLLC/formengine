import {ComponentStore} from '@react-form-builder/core'

const generateComponentKey = (typeName: string, postfix = '') => {
  const key = `${typeName}${postfix}`
  if (key.length > 0) {
    return `${key[0].toLocaleLowerCase()}${key.substring(1)}`
  }
  return key
}

/**
 * Returns a new instance of {@link ComponentStore} for the specified component type name.
 * @param typeName the component type name.
 * @param componentKeyPostfix the optional component key prefix.
 * @returns the new instance of {@link ComponentStore} for the specified component type name.
 */
export const createComponentStore = (typeName: string, componentKeyPostfix = '') => {
  const key = generateComponentKey(typeName, componentKeyPostfix)
  return new ComponentStore(key, typeName)
}

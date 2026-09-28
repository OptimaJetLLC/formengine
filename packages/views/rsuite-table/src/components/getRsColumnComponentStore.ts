import {createComponentStore} from './createComponentStore'
import {rsCellTypeName, rsColumnTypeName, rsHeaderCellTypeName} from './typeNames'

const getRsHeaderCellComponentStore = (componentKeyPostfix = '1') => {
  const componentStore = createComponentStore(rsHeaderCellTypeName, componentKeyPostfix)
  componentStore.props = {
    children: {value: 'Header'},
  }
  return componentStore
}

/**
 * Returns a column preset component.
 * @param componentKeyPostfix the optional component key prefix.
 * @returns the column preset component.
 */
export const getRsColumnComponentStore = (componentKeyPostfix = '1') => {
  const result = createComponentStore(rsColumnTypeName, componentKeyPostfix)
  result.children = [getRsHeaderCellComponentStore(componentKeyPostfix), createComponentStore(rsCellTypeName, componentKeyPostfix)]
  return result
}

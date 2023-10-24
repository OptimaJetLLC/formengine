/**
 * The type of item being dragged.
 */
export enum ItemType {
  Component = 'Component',
  AddedComponent = 'AddedComponent'
}

export const AcceptDrop = [ItemType.Component, ItemType.AddedComponent]

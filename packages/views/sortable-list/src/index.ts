import type {Definer, Model} from '@react-form-builder/core'
import sortableListEnUsComponentsDescriptions from './i18n/en-US.json'
import {sortableList} from './SortableList'
import type {SortableListProps} from './SortableListProps'

export const sortableListComponent: Definer<SortableListProps> = sortableList
export const sortableListModel: Model = sortableList.build().model
export {sortableListComponentsDescriptions} from './i18n/sortableListComponentsDescriptions'
export type {SortableListProps} from './SortableListProps'
export {sortableListEnUsComponentsDescriptions}

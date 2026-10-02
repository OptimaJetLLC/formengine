import type {Definer} from '@react-form-builder/core'
import {rsCell} from './components/RsCell'
import {rsColumn} from './components/RsColumn'
import {rsColumnGroup} from './components/RsColumnGroup'
import {rsHeaderCell} from './components/RsHeaderCell'
import {rsTable} from './components/RsTable'
import rSuiteTableEnUsComponentsDescriptions from './i18n/en-US.json'

/**
 * An array of rSuite table component metadata factories.
 */
export const rSuiteTableComponents: Definer<any>[] = [rsColumn, rsColumnGroup, rsTable, rsHeaderCell, rsCell]

/**
 * An array of rSuite tables components metadata for use in FormBuilder.
 */
const tableBuilderComponents = rSuiteTableComponents.map(def => def.build())

/**
 * An array of rSuite tables components metadata for use in FormViewer.
 */
export const tableModels = tableBuilderComponents.map(({model}) => model)

export {rSuiteTableComponentsDescriptions} from './i18n/rSuiteTableComponentsDescriptions'
export {rSuiteTableEnUsComponentsDescriptions}

import type {Definer} from '@react-form-builder/core'
import {rsCell} from '../components/RsCell'
import {rsColumn} from '../components/RsColumn'
import {rsColumnGroup} from '../components/RsColumnGroup'
import {rsHeaderCell} from '../components/RsHeaderCell'
import {rsTable} from '../components/RsTable'

const categories = {
  structure: [
    rsColumn,
    rsColumnGroup,
    rsTable,
    rsHeaderCell,
    rsCell,
  ],
}

/**
 * An array of rSuite table component metadata factories.
 */
export const rSuiteTableComponents: Definer<any>[] = []

const prefix = 'Rs'
Object.entries(categories).forEach(([category, components]) => {
  components.forEach(c => {
    if (!c.getType().startsWith(prefix)) {
      throw new Error(`The component type must start with '${prefix}', type: '${c.getType()}'`)
    }
    c.category(category)
    rSuiteTableComponents.push(c)
  })
})

/**
 * An array of rSuite tables components metadata for use in FormBuilder.
 */
const tableBuilderComponents = rSuiteTableComponents.map(def => def.build())

/**
 * An array of rSuite tables components metadata for use in FormViewer.
 */
export const tableModels = tableBuilderComponents.map(({model}) => model)

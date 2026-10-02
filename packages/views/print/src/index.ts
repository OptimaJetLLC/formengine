import type {Definer} from '@react-form-builder/core'
import printEnUsComponentsDescriptions from './i18n/en-US.json'
import {pageBreak} from './PageBreak'
import {printSettings} from './PrintSettings'

/**
 * An array of print component metadata factories.
 */
export const printComponents: Definer<any>[] = [pageBreak, printSettings]

/**
 * An array of print component metadata for use in FormViewer.
 */
export const printModels = printComponents.map(def => def.build().model)

export {printComponentsDescriptions} from './i18n/printComponentsDescriptions'
export type {PageBreakProps, PageBreakRule} from './PageBreak'
export type {PrintSettingsProps} from './PrintSettings'
export {pageBreak, printEnUsComponentsDescriptions, printSettings}

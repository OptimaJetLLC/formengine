import {createView, Definer} from '@react-form-builder/core'
import {rsBreadcrumb} from './components/RsBreadcrumb'
import {rsButton} from './components/RsButton'
import {rsCalendar} from './components/RsCalendar'
import {rsCard} from './components/RsCard'
import {rsCheckbox} from './components/RsCheckbox'
import {rsCollectionEditor} from './components/RsCollectionEditor'
import {rsContainer} from './components/RsContainer'
import {rsCustomBlock} from './components/RsCustomBlock'
import {rsCustomControl} from './components/RsCustomControl'
import {rsDatePicker} from './components/RsDatePicker'
import {rsDropdown} from './components/RsDropdown'
import {rsDropzone} from './components/RsDropzone'
import {rsErrorMessage, RsErrorMessageProps} from './components/RsErrorMessage'
import {rsGrid} from './components/RsGrid'
import {rsGridLayout} from './components/RsGridLayout'
import {rsGridView} from './components/RsGridView'
import {rsHeader} from './components/RsHeader'
import {rsImage} from './components/RsImage'
import {rsInput} from './components/RsInput'
import {rsLabel} from './components/RsLabel'
import {rsContent, rsFooter, rsHeader as rSuiteHeader, rsSidebar} from './components/RsLayout'
import {RsLocalizationWrapper} from './components/RsLocalizationWrapper'
import {rsMenu} from './components/RsMenu'
import {rsMessage} from './components/RsMessage'
import {rsNumberFormat} from './components/RsNumberFormat'
import {rsPatternFormat} from './components/RsPatternFormat'
import {rsProgressCircle, rsProgressLine} from './components/RsProgress'
import {rsRadioGroup} from './components/RsRadioGroup'
import {rsRepeater} from './components/RsRepeater'
import {rsRichTextEditor} from './components/RsRichTextEditor'
import {rsSearch} from './components/RsSearch'
import {rsStaticContent} from './components/RsStaticContent'
import {rsTab} from './components/RsTab'
import {rsTextArea} from './components/RsTextArea'
import {rsTooltip, RsTooltipProps} from './components/RsTooltip'
import {rsTreePicker} from './components/RsTreePicker'
import {rsUploader} from './components/RsUploader'
import {ltrCssLoader, rtlCssLoader} from './cssLoader'

const categories = {
  fields: [
    rsCalendar,
    rsCheckbox,
    rsDatePicker,
    rsDropdown,
    rsInput,
    rsNumberFormat,
    rsPatternFormat,
    rsRadioGroup,
    rsSearch,
    rsTextArea,
    rsUploader
  ],
  static: [
    rsButton,
    rsHeader,
    rsImage,
    rsLabel,
    rsMenu,
    rsMessage,
    rsProgressCircle,
    rsProgressLine,
    rsStaticContent,
    rsTooltip,
  ],
  structure: [
    rsBreadcrumb,
    rsCard,
    rsContainer,
    rsTab,
  ],
  notImplemented: [
    rsCollectionEditor,
    rsRichTextEditor,
    rsTreePicker,
    rsCustomBlock,
    rsCustomControl,
    rsDropzone,
    rsGrid,
    rsGridLayout,
    rsGridView,
    rsContent,
    rsFooter,
    rSuiteHeader,
    rsSidebar,
    rsRepeater
  ]
}

const rSuiteComponents: Definer<any>[] = []
const {notImplemented, ...implemented} = categories

Object.entries(implemented).forEach(([category, components]) => {
  components.forEach(c => {
    const prefix = 'Rs'
    if (!c.getType().startsWith(prefix)) {
      throw new Error(`The component type must start with '${prefix}', type: '${c.getType()}'`)
    }
    c.category(category)
    rSuiteComponents.push(c)
  })
})

export {rSuiteComponents, rsErrorMessage, rsTooltip, RsLocalizationWrapper, rtlCssLoader, ltrCssLoader}
export type {RsErrorMessageProps, RsTooltipProps}

const components = rSuiteComponents.map(def => def.build())
export const models = components.map(({model}) => model)

export const view = createView(...models)

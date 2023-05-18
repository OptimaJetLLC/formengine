import {BuilderView, createView, Definer} from '@react-form-builder/builder/view'
import {rsBreadcrumb} from './components/RsBreadcrumb'
import {rsButton} from './components/RsButton'
import {rsCard} from './components/RsCard'
import {rsCheckbox} from './components/RsCheckbox'
import {rsCollectionEditor} from './components/RsCollectionEditor'
import {rsContainer} from './components/RsContainer'
import {rsCustomBlock} from './components/RsCustomBlock'
import {rsCustomControl} from './components/RsCustomControl'
import {rsDropdown} from './components/RsDropdown'
import {rsDropzone} from './components/RsDropzone'
import {rsErrorMessage} from './components/RsErrorMessage'
import {rsGrid} from './components/RsGrid'
import {rsGridLayout} from './components/RsGridLayout'
import {rsGridView} from './components/RsGridView'
import {rsImage} from './components/RsImage'
import {rsInput} from './components/RsInput'
import {rsLabel} from './components/RsLabel'
import {rsContent, rsFooter, rsHeader, rsSidebar} from './components/RsLayout'
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
import {rsTitle} from './components/RsTitle'
import {rsTooltip} from './components/RsTooltip'
import {rsTreePicker} from './components/RsTreePicker'

const definitions = [
  rsBreadcrumb,
  rsButton,
  rsCard,
  rsCheckbox,
  rsCollectionEditor,
  rsContainer,
  rsCustomBlock,
  rsCustomControl,
  rsDropdown,
  rsDropzone,
  rsErrorMessage,
  rsGrid,
  rsGridLayout,
  rsGridView,
  rsImage,
  rsInput,
  rsNumberFormat,
  rsPatternFormat,
  rsLabel,
  rsContent,
  rsFooter,
  rsHeader,
  rsSidebar,
  rsMenu,
  rsMessage,
  rsProgressCircle,
  rsProgressLine,
  rsRadioGroup,
  rsRepeater,
  rsRichTextEditor,
  rsSearch,
  rsStaticContent,
  rsTab,
  rsTextArea,
  rsTitle,
  rsTreePicker,
  rsTooltip
]

definitions.forEach(c => {
  const prefix = 'Rs'
  if (!c.getType().startsWith(prefix)) {
    throw new Error(`The component type must start with '${prefix}', type: '${c.getType()}'`)
  }
  c.category('RSuite components')
})

export const rSuiteComponents: Definer<any>[] = definitions

export {rsErrorMessage, rsTooltip}

const components = rSuiteComponents.map(def => def.build())
export const models = components.map(({model}) => model)

export const builderView = new BuilderView(components)
export const view = createView(...models)

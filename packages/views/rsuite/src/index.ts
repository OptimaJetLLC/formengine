import {createView, Definition} from 'fb-core/src/features/define'
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
import {rsNav, rsNavItem} from './components/RsNav'
import {rsProgressCircle, rsProgressLine} from './components/RsProgress'
import {rsRadioGroup} from './components/RsRadioGroup'
import {rsRepeater} from './components/RsRepeater'
import {rsRichTextEditor} from './components/RsRichTextEditor'
import {rsSearch} from './components/RsSearch'
import {rsStaticContent} from './components/RsStaticContent'
import {rsTextArea} from './components/RsTextArea'
import {rsTitle} from './components/RsTitle'
import {rsTreePicker} from './components/RsTreePicker'

const components = [
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
  rsLabel,
  rsContent,
  rsFooter,
  rsHeader,
  rsSidebar,
  rsMenu,
  rsMessage,
  rsNav,
  rsNavItem,
  rsProgressCircle,
  rsProgressLine,
  rsRadioGroup,
  rsRepeater,
  rsRichTextEditor,
  rsSearch,
  rsStaticContent,
  rsTextArea,
  rsTitle,
  rsTreePicker,
]

components.forEach(c => {
  const prefix = 'Rs'
  if (!c.type.startsWith(prefix)) {
    throw new Error(`The component type must start with '${prefix}', type: '${c.type}'`)
  }
})

export const rSuiteComponents: Definition<any>[] = components

export const rSuite = createView(...components).withError(rsErrorMessage)

export {rsErrorMessage}

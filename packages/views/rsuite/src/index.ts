import {View} from 'fb-core'
import {breadcrumb} from './components/Breadcrumb'
import {button} from './components/Button'
import {card} from './components/Card'
import {checkbox} from './components/Checkbox'
import {collectionEditor} from './components/CollectionEditor'
import {container} from './components/Container'
import {customBlock} from './components/CustomBlock'
import {customControl} from './components/CustomControl'
import {dropdown} from './components/Dropdown'
import {dropzone} from './components/Dropzone'
import {grid} from './components/Grid'
import {gridLayout} from './components/GridLayout'
import {gridView} from './components/GridView'
import {header} from './components/Header'
import {image} from './components/Image'
import {input} from './components/Input'
import {label} from './components/Label'
import {menu} from './components/Menu'
import {message} from './components/Message'
import {radioGroup} from './components/RadioGroup'
import {repeater} from './components/Repeater'
import {richTextEditor} from './components/RichTextEditor'
import {search} from './components/Search'
import {staticContent} from './components/StaticContent'
import {textArea} from './components/TextArea'
import {treePicker} from './components/TreePicker'

export const rsuite = new View([
  textArea,
  input,
  header,
  dropdown,
  container,
  button,
  //tab,
  //nav, navItem,
  staticContent,
  card,
  customBlock,
  customControl,
  gridLayout,
  gridView,
  collectionEditor,
  repeater,
  breadcrumb,
  treePicker,
  checkbox,
  radioGroup,
  label,
  message,
  dropzone,
  search,
  menu,
  richTextEditor,
  image,
  grid
])







import {DefineRegistry} from '../../utils/DefineRegistry'
import {breadcrumb} from './Breadcrumb'
import {button} from './Button'
import {card} from './Card'
import {checkbox} from './Checkbox'
import {collectionEditor} from './CollectionEditor'
import {container} from './Container'
import {customBlock} from './CustomBlock'
import {customControl} from './CustomControl'
import {dropdown} from './Dropdown'
import {dropzone} from './Dropzone'
import {grid} from './Grid'
import {gridLayout} from './GridLayout'
import {gridView} from './GridView'
import {header} from './Header'
import {image} from './Image'
import {input} from './Input'
import {label} from './Label'
import {menu} from './Menu'
import {message} from './Message'
import {radioGroup} from './RadioGroup'
import {repeater} from './Repeater'
import {richTextEditor} from './RichTextEditor'
import {search} from './Search'
import {staticContent} from './StaticContent'
import {nav, navItem, tab} from './Tab'
import {textArea} from './TextArea'
import {treePicker} from './TreePicker'

export const rsuite = new DefineRegistry([
  textArea,
  input,
  header,
  dropdown,
  container,
  button,
  tab,
  nav, navItem,
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







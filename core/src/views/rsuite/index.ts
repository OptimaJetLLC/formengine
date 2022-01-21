import {DefineRegistry} from "../../utils/DefineRegistry";
import {textArea} from "./TextArea";
import {input} from "./Input";
import {header} from "./Header";
import {dropdown} from "./Dropdown";
import {container} from "./Container";
import {button} from "./Button";
import {nav, navItem, tab} from "./Tab";
import { staticContent } from './StaticContent';
import { card } from './Card';
import { customBlock } from './CustomBlock';
import { customControl } from './CustomControl';
import { gridLayout } from './GridLayout';
import { gridView } from './GridView';
import { collectionEditor } from './CollectionEditor';
import { repeater } from './Repeater';
import { breadcrumb } from './Breadcrumb';
import { treePicker } from './TreePicker';
import { checkbox } from './Checkbox';
import { radioGroup } from './RadioGroup';
import { label } from './Label';
import { message } from './Message';
import { dropzone } from './Dropzone';
import { search } from './Search';
import { menu } from './Menu';
import { richTextEditor } from './RichTextEditor';
import { image } from './Image';

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
])







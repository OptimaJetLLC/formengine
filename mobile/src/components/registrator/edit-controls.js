import './controls';
import ContainerEditControl from '../edit-control/container-edit-control.jsx';
import HeaderEditControl from '../edit-control/header-edit-control.jsx';
import StaticContentEditControl from '../edit-control/static-content-edit-control.jsx';
import FormEditControl from '../edit-control/form-edit-control.jsx';
import FormGroupEditControl from '../edit-control/form-group-edit-control.jsx';
import TabEditControl from '../edit-control/tab-edit-control.jsx';
import CustomBlockEditControl from '../edit-control/custom-block-edit-control.jsx';
import NumberFormatEditControl from '../edit-control/number-format-edit-control.jsx';
import TextAreaEditControl from '../edit-control/text-area-edit-control.jsx';
import CollectionEditorEditControl from '../edit-control/collection-editor-edit-control.jsx';
import RepeaterEditControl from '../edit-control/repeater-edit-control.jsx';
import DictionaryEditControl from '../edit-control/dictionary-edit-control.jsx';
import InputEditControl from '../edit-control/input-edit-control.jsx';
import DropdownEditControl from '../edit-control/dropdown-edit-control.jsx';
import CheckboxEditControl from '../edit-control/checkbox-edit-control.jsx';
import RadioGroupEditControl from '../edit-control/radio-group-edit-control.jsx';
import ButtonEditControl from '../edit-control/button-edit-control.jsx';
import LabelEditControl from '../edit-control/label-edit-control.jsx';
import MessageEditControl from '../edit-control/message-edit-control.jsx';
import ImageEditControl from '../edit-control/image-edit-control.jsx';
import CustomEditControl from '../edit-control/custom-edit-control.jsx';
import DropdownTriggerEditControl from '../edit-control/dropdown-trigger-edit-control.jsx';
import FilesEditControl from '../edit-control/files-edit-control.jsx';
import SearchEditControl from '../edit-control/search-edit-control.jsx';
import MenuEditControl from '../edit-control/menu-edit-control.jsx';
import { getItems, registerItems } from 'optimajet-builder-shared';
import TreePickerEditControl from '../edit-control/tree-picker-edit-control.jsx';
import CardEditControl from '../edit-control/card-edit-control.jsx';

const items = {
    'container': ContainerEditControl,
    'staticcontent': StaticContentEditControl,
    'form': FormEditControl,
    'formgroup': FormGroupEditControl,
    'tab': TabEditControl,
    'customblock': CustomBlockEditControl,
    'collectioneditor': CollectionEditorEditControl,
    'repeater': RepeaterEditControl,
    'header': HeaderEditControl,
    'input': InputEditControl,
    'numberformat': NumberFormatEditControl,
    'textarea': TextAreaEditControl,
    'dictionary': DictionaryEditControl,
    'treepicker': TreePickerEditControl,
    'dropdown': DropdownEditControl,
    'checkbox': CheckboxEditControl,
    'radiogroup': RadioGroupEditControl,
    'button': ButtonEditControl,
    'label': LabelEditControl,
    'message': MessageEditControl,
    'image': ImageEditControl,
    'customcontrol': CustomEditControl,
    'dropdowntrigger': DropdownTriggerEditControl,
    'files': FilesEditControl,
    'search': SearchEditControl,
    'menu': MenuEditControl,
    'card': CardEditControl
};

function registerEditControls() {
    const viewItems = getItems();
    for (let viewItem of viewItems) {
        const editItem = items[viewItem.key];
        if (editItem) {
            viewItem.editControl = editItem;
        }
    }
    registerItems(viewItems);
}

registerEditControls();

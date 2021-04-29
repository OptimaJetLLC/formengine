import './controls';
import BreadcrumbEditControl from '../edit-control/breadcrumb-edit-control';
import ButtonEditControl from '../edit-control/button-edit-control';
import CameraEditControl from '../edit-control/Camera-edit-control';
import ChartEditControl from '../edit-control/chart-edit-control';
import CheckboxEditControl from '../edit-control/checkbox-edit-control';
import CollectionEditorEditControl from '../edit-control/collection-editor-edit-control';
import ContainerEditControl from '../edit-control/container-edit-control';
import CustomBlockEditControl from '../edit-control/custom-block-edit-control';
import CustomEditControl from '../edit-control/custom-edit-control';
import DictionaryEditControl from '../edit-control/dictionary-edit-control';
import DropdownEditControl from '../edit-control/dropdown-edit-control';
import DropdownTriggerEditControl from '../edit-control/dropdown-trigger-edit-control';
import DropzoneEditControl from '../edit-control/dropzone-edit-control';
import FilesEditControl from '../edit-control/files-edit-control';
import FormEditControl from '../edit-control/form-edit-control';
import FormGroupEditControl from '../edit-control/form-group-edit-control';
import GridEditControl from '../edit-control/grid-edit-control';
import GridLayoutEditControl from '../edit-control/grid-layout-edit-control';
import HeaderEditControl from '../edit-control/header-edit-control';
import ImageEditControl from '../edit-control/image-edit-control';
import InputEditControl from '../edit-control/input-edit-control';
import LabelEditControl from '../edit-control/label-edit-control';
import MenuEditControl from '../edit-control/menu-edit-control';
import MessageEditControl from '../edit-control/message-edit-control';
import NumberFormatEditControl from '../edit-control/number-format-edit-control';
import RadioGroupEditControl from '../edit-control/radio-group-edit-control';
import RepeaterEditControl from '../edit-control/repeater-edit-control';
import RichTextEditorEditControl from '../edit-control/rich-text-editor-control';
import SearchEditControl from '../edit-control/search-edit-control';
import SignatureCanvasEditControl from '../edit-control/signature-canvas-edit-control';
import StaticContentEditControl from '../edit-control/static-content-edit-control';
import TabEditControl from '../edit-control/tab-edit-control';
import TextAreaEditControl from '../edit-control/text-area-edit-control';
import TreePickerEditControl from '../edit-control/tree-picker-edit-control';
import { getItems, registerItems } from 'optimajet-builder-shared';
import CardEditControl from '../edit-control/card-edit-control';
import AccordionEditControl from '../edit-control/accordion-edit-control';


const items = {
    'container': ContainerEditControl,
    'staticcontent': StaticContentEditControl,
    'form': FormEditControl,
    'formgroup': FormGroupEditControl,
    'tab': TabEditControl,
    'camera': CameraEditControl,
    'customblock': CustomBlockEditControl,
    'gridlayout': GridLayoutEditControl,
    'gridview': GridEditControl,
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
    'dropdowntrigger': DropdownTriggerEditControl,
    'dropzonecontrol': DropzoneEditControl,
    'files': FilesEditControl,
    'breadcrumb': BreadcrumbEditControl,
    'search': SearchEditControl,
    'menu': MenuEditControl,
    'richtexteditor': RichTextEditorEditControl,
    'barchart': ChartEditControl,
    'linechart': ChartEditControl,
    'scatterchart': ChartEditControl,
    'doughnutchart': ChartEditControl,
    'piechart': ChartEditControl,
    'radarchart': ChartEditControl,
    'card': CardEditControl,
    'signaturecanvas': SignatureCanvasEditControl,
    'accordion': AccordionEditControl
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

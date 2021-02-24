import './react-native-registrator-viewer.js';
import ContainerEditControl from '../edit-control/container-edit-control.jsx';
import HeaderEditControl from '../edit-control/header-edit-control.jsx';
import StaticContentEditControl from '../edit-control/static-content-edit-control.jsx';
import RnActivityIndicatorEditControl from '../edit-control/react-native/rn-activity-indicator-edit-control.jsx';
import RnButtonEditControl from '../edit-control/react-native/rn-button-edit-control.jsx';
import RnFlatListControl from '../edit-control/react-native/rn-flat-list-edit-control.jsx';
import RnImageEditControl from '../edit-control/react-native/rn-image-edit-control.jsx';
import RnImageBackgroundEditControl from '../edit-control/react-native/rn-image-background-edit-control.jsx';
import RnKeyboardAvoidingViewEditControl from '../edit-control/react-native/rn-keyboard-avoiding-view-edit-control.jsx';
import RnModalEditControl from '../edit-control/react-native/rn-modal-edit-control.jsx';
import RnPickerEditControl from '../edit-control/react-native/rn-picker-edit-control.jsx';
import RnRefreshControlEditControl from '../edit-control/react-native/rn-refresh-control-edit-control.jsx';
import RnSafeAreaViewEditControl from '../edit-control/react-native/rn-safe-area-view-edit-control.jsx';
import RnScrollViewEditControl from '../edit-control/react-native/rn-scroll-view-edit-control.jsx';
import RnSectionListEditControl from '../edit-control/react-native/rn-section-list-edit-control.jsx';
import RnStatusbarEditControl from '../edit-control/react-native/rn-statusbar-edit-control.jsx';
import RnSwitchEditControl from '../edit-control/react-native/rn-switch-edit-control.jsx';
import RnTextEditControl from '../edit-control/react-native/rn-text-edit-control.jsx';
import RnTextInputEditControl from '../edit-control/react-native/rn-text-input-edit-control.jsx';
import RnTouchableHighlightEditControl from '../edit-control/react-native/rn-touchable-highlight-edit-control.jsx';
import RnTouchableOpacityEditControl from '../edit-control/react-native/rn-touchable-opacity-edit-control.jsx';
import RnTouchableWithoutFeedbackEditControl
    from '../edit-control/react-native/rn-touchable-without-feedback-edit-control.jsx';
import RnViewEditControl from '../edit-control/react-native/rn-view-edit-control.jsx';
import RnVirtualizedListEditControl from '../edit-control/react-native/rn-virtualized-list-edit-control.jsx';
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
import StatisticEditControl from '../edit-control/statistic-edit-control.jsx';
import CustomEditControl from '../edit-control/custom-edit-control.jsx';
import DropdownTriggerEditControl from '../edit-control/dropdown-trigger-edit-control.jsx';
import FilesEditControl from '../edit-control/files-edit-control.jsx';
import BreadcrumbEditControl from '../edit-control/breadcrumb-edit-control.jsx';
import SearchEditControl from '../edit-control/search-edit-control.jsx';
import MenuEditControl from '../edit-control/menu-edit-control.jsx';
import WorkflowBarEditControl from '../edit-control/workflow-bar-editor-control.jsx';
import { getItems, registerItems } from 'optimajet-builder-shared';
import TreePickerEditControl from '../edit-control/tree-picker-edit-control.jsx';
import CardEditControl from '../edit-control/card-edit-control.jsx';

const reactNativeItems = {
    'rnactivityindicator': RnActivityIndicatorEditControl,
    'rnbutton': RnButtonEditControl,
    'rnflatlist': RnFlatListControl,
    'rnimage': RnImageEditControl,
    'rnimagebackground': RnImageBackgroundEditControl,
    'rnkeyboardavoidingview': RnKeyboardAvoidingViewEditControl,
    'rnmodal': RnModalEditControl,
    'rnpicker': RnPickerEditControl,
    'rnrefreshcontrol': RnRefreshControlEditControl,
    'rnsafeareaview': RnSafeAreaViewEditControl,
    'rnscrollview': RnScrollViewEditControl,
    'rnsectionlist': RnSectionListEditControl,
    'rnstatusbar': RnStatusbarEditControl,
    'rnswitch': RnSwitchEditControl,
    'rntext': RnTextEditControl,
    'rntextinput': RnTextInputEditControl,
    'rntouchablehighlight': RnTouchableHighlightEditControl,
    'rntouchableopacity': RnTouchableOpacityEditControl,
    'rntouchablewithoutfeedback': RnTouchableWithoutFeedbackEditControl,
    'rnview': RnViewEditControl,
    'rnvirtualizedlist': RnVirtualizedListEditControl,
};

const items = {
    ...reactNativeItems,
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
    'statistic': StatisticEditControl,
    'customcontrol': CustomEditControl,
    'dropdowntrigger': DropdownTriggerEditControl,
    'files': FilesEditControl,
    'breadcrumb': BreadcrumbEditControl,
    'search': SearchEditControl,
    'menu': MenuEditControl,
    'workflowbar': WorkflowBarEditControl,
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

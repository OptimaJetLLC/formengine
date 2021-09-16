// @ts-nocheck
// todo remove it from formBuilder!!!

function dwKitDateFormat(defaultValue) {
    if (window.DWKitLang && window.DWKitLang.common && window.DWKitLang.common.dateFormat) {
        return window.DWKitLang.common.dateFormat;
    }
    return defaultValue;
}

function dwKitTimeFormat(defaultValue) {
    if (window.DWKitLang && window.DWKitLang.common && window.DWKitLang.common.timeFormat) {
        return window.DWKitLang.common.timeFormat;
    }
    return defaultValue;
}

function dwKitExternalControlList() {
    if (window.DWKitFormSettings) {
        return window.DWKitFormSettings.externalControlList
    }
}

function dwKitExternalControlRender() {
    if (window.DWKitFormSettings) {
        return window.DWKitFormSettings.externalControlRender;
    }
}

function dwKitExternalControlsOnly() {
    if (window.DWKitFormSettings) {
        return window.DWKitFormSettings.externalControlsOnly;
    }
}

function dwKitAdminLangCollectionEditor() {
    if (window.DWKitAdminLang && window.DWKitAdminLang.collectioneditor) {
        return window.DWKitAdminLang.collectioneditor;
    }
}

function dwKitAdminLangButton() {
    if (window.DWKitAdminLang && window.DWKitAdminLang.button) {
        return window.DWKitAdminLang.button;
    }
}

function dwKitAdminLangWorkflowBar() {
    if (window.DWKitAdminLang && window.DWKitAdminLang.workflowbar) {
        return window.DWKitAdminLang.workflowbar;
    }
}

export {
    dwKitExternalControlList, dwKitExternalControlRender, dwKitExternalControlsOnly, dwKitDateFormat, dwKitTimeFormat,
    dwKitAdminLangCollectionEditor, dwKitAdminLangButton, dwKitAdminLangWorkflowBar,
};

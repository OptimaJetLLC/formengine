---
id: "react_form_builder_designer"
title: "Module: @react-form-builder/designer"
sidebar_label: "@react-form-builder/designer"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [BuilderView](../classes/react_form_builder_designer.BuilderView.md)

## Interfaces

- [ActionCellProps](../interfaces/react_form_builder_designer.ActionCellProps.md)
- [AnnotationEditorProps](../interfaces/react_form_builder_designer.AnnotationEditorProps.md)
- [CalculableEditorProps](../interfaces/react_form_builder_designer.CalculableEditorProps.md)
- [ColumnDescription](../interfaces/react_form_builder_designer.ColumnDescription.md)
- [EditableTableProps](../interfaces/react_form_builder_designer.EditableTableProps.md)
- [EditableTableState](../interfaces/react_form_builder_designer.EditableTableState.md)
- [FormBuilderProps](../interfaces/react_form_builder_designer.FormBuilderProps.md)
- [IFormBuilder](../interfaces/react_form_builder_designer.IFormBuilder.md)
- [IFormStorage](../interfaces/react_form_builder_designer.IFormStorage.md)
- [InputCellProps](../interfaces/react_form_builder_designer.InputCellProps.md)
- [SelectCellProps](../interfaces/react_form_builder_designer.SelectCellProps.md)

## Type Aliases

### CustomizableKey

Ƭ **CustomizableKey**: ``"MainContainer"`` \| ``"Header"`` \| ``"MainMenu_Button"`` \| ``"MainMenu_Dropdown"`` \| ``"Header_Toolbar"`` \| ``"ToggleModeButton"`` \| ``"ResolutionSelect"`` \| ``"LocalizationSelect"`` \| ``"JsonViewButton"`` \| ``"ToggleThemeButton"`` \| ``"LeftPanel"`` \| ``"LeftPanel_Nav"`` \| ``"LeftPanel_Content"`` \| ``"Tree_Tab"`` \| ``"Tree_Tab_Content"`` \| ``"Components_Tab"`` \| ``"Components_Tab_Content"`` \| ``"Settings_Tab"`` \| ``"Settings_Tab_Content"`` \| ``"Forms_Tab"`` \| ``"Forms_Tab_Content"`` \| ``"CentralPanel"`` \| ``"FormContainer"`` \| ``"RightPanel"`` \| ``"RightPanel_Nav"`` \| ``"RightPanel_Content"`` \| ``"Main_Tab"`` \| ``"Main_Tab_Content"`` \| ``"Style_Tab"`` \| ``"Style_Tab_Content"`` \| ``"Actions_Tab"`` \| ``"Actions_Tab_Content"`` \| ``"Rules_Tab"`` \| ``"Rules_Tab_Content"`` \| ``"LabeledProperty"`` \| ``"PropertyCodeButton"`` \| ``"PropertyLabel"`` \| ``"PropertyInput"``

The available keys of the customizable components

___

### CustomizationMap

Ƭ **CustomizationMap**: `Partial`<`Record`<[`CustomizableKey`](react_form_builder_designer.md#customizablekey), [`Options`](react_form_builder_designer.md#options)\>\>

The map of customizations for the FormBuilder components.

___

### FormBuilderI18n

Ƭ **FormBuilderI18n**: `Object`

The i18n data of the form builder.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `getData` | (`languageFullCode`: `string`) => `Promise`<[`FormBuilderI18nData`](react_form_builder_designer.md#formbuilderi18ndata)\> | The callback function called when loading data for i18n. Accepts the full code (en-US, en-GB, etc.) of a language. |
| `languages` | [`Language`](../classes/react_form_builder_core.Language.md)[] | The languages. |

___

### FormBuilderI18nData

Ƭ **FormBuilderI18nData**: `Object`

Data required to translate the form builder interface.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentsLocale?` | `any` | The locale for translating rSuite components https://rsuitejs.com/guide/i18n/#supported-locales. |
| `data` | `any` | The JSON with translation. |

___

### Options

Ƭ **Options**: `Object`

Customization options for the FormBuilder component.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `className?` | `string` | The component className. |
| `customRenderer?` | (`defaultElement`: `ReactElement`, `component`: `ComponentType`<`any`\>, `props`: `any`) => `ReactElement` | The component custom renderer. |
| `hidden?` | `boolean` | True if you want to hide the component. |
| `style?` | `CSSProperties` \| `string` | The component style. Supported formats - CSSProperties object, standard CSS as string, nested selectors. |

## Functions

### ActionCell

▸ **ActionCell**(`props`): `Element`

The React component that displays the table cell with the icon button. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`ActionCellProps`](../interfaces/react_form_builder_designer.ActionCellProps.md) | the React component properties. |

#### Returns

`Element`

the React element.

___

### CheckCell

▸ **CheckCell**(`props`): `Element`

The React component that displays the table cell with the checkbox. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`InputCellProps`](../interfaces/react_form_builder_designer.InputCellProps.md) | the React component properties. |

#### Returns

`Element`

the React element.

___

### EditableTable

▸ **EditableTable**(`props`): `Element`

The React component that displays the table with editable cells. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`EditableTableProps`](../interfaces/react_form_builder_designer.EditableTableProps.md) | the React component properties. |

#### Returns

`Element`

the React element.

___

### FormBuilder

▸ **FormBuilder**(`props`): `Element`

The React component that displays the form builder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`FormBuilderProps`](../interfaces/react_form_builder_designer.FormBuilderProps.md) | the React component properties. |

#### Returns

`Element`

the React element.

___

### InputCell

▸ **InputCell**(`props`): `Element`

The React component that displays the table cell with the input. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`InputCellProps`](../interfaces/react_form_builder_designer.InputCellProps.md) | the React component properties. |

#### Returns

`Element`

the React element.

___

### SelectCell

▸ **SelectCell**(`props`): `Element`

The React component that displays the table cell with the select input. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`SelectCellProps`](../interfaces/react_form_builder_designer.SelectCellProps.md) | the React component properties. |

#### Returns

`Element`

the React element.

___

### makeColumns

▸ **makeColumns**(`columns`): `Element`[]

Creates table columns based on their descriptions. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `columns` | [`ColumnDescription`](../interfaces/react_form_builder_designer.ColumnDescription.md)[] | the column descriptions. |

#### Returns

`Element`[]

the array with React elements.

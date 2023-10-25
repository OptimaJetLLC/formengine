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
- [IFormStorage](../interfaces/react_form_builder_designer.IFormStorage.md)
- [InputCellProps](../interfaces/react_form_builder_designer.InputCellProps.md)
- [SelectCellProps](../interfaces/react_form_builder_designer.SelectCellProps.md)

## Type Aliases

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

## Functions

### ActionCell

▸ **ActionCell**(`props`): `Element`

The React component that displays the table cell with the icon button.

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

The React component that displays the table cell with the checkbox.

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

The React component that displays the table with editable cells.

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

The React component that displays the table cell with the input.

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

The React component that displays the table cell with the select input.

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

Creates table columns based on their descriptions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `columns` | [`ColumnDescription`](../interfaces/react_form_builder_designer.ColumnDescription.md)[] | the column descriptions. |

#### Returns

`Element`[]

the array with React elements.

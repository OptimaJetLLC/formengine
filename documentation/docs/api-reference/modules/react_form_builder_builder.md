---
id: "react_form_builder_builder"
title: "Module: @react-form-builder/builder"
sidebar_label: "@react-form-builder/builder"
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [ColumnDescription](../interfaces/react_form_builder_builder.ColumnDescription.md)
- [EditableTableProps](../interfaces/react_form_builder_builder.EditableTableProps.md)
- [EditableTableState](../interfaces/react_form_builder_builder.EditableTableState.md)
- [FormBuilderProps](../interfaces/react_form_builder_builder.FormBuilderProps.md)
- [FormStorage](../interfaces/react_form_builder_builder.FormStorage.md)

## Functions

### ActionCell

▸ **ActionCell**(`props`): `Element`

The React component that displays the table cell with the icon button.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `ActionCellProps` | the React component properties. |

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
| `props` | `InputCellProps` | the React component properties. |

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
| `props` | [`EditableTableProps`](../interfaces/react_form_builder_builder.EditableTableProps.md) | the React component properties. |

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
| `props` | [`FormBuilderProps`](../interfaces/react_form_builder_builder.FormBuilderProps.md) | the React component properties. |

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
| `props` | `InputCellProps` | the React component properties. |

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
| `props` | `SelectCellProps` | the React component properties. |

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
| `columns` | [`ColumnDescription`](../interfaces/react_form_builder_builder.ColumnDescription.md)[] | the column descriptions. |

#### Returns

`Element`[]

the array with React elements.

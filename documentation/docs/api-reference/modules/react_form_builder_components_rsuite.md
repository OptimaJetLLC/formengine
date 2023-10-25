---
id: "react_form_builder_components_rsuite"
title: "Module: @react-form-builder/components-rsuite"
sidebar_label: "@react-form-builder/components-rsuite"
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [RsErrorMessageProps](../interfaces/react_form_builder_components_rsuite.RsErrorMessageProps.md)
- [RsTooltipProps](../interfaces/react_form_builder_components_rsuite.RsTooltipProps.md)

## Variables

### models

• `Const` **models**: [`Model`](../classes/react_form_builder_core.Model.md)<`any`\>[]

___

### rSuiteComponents

• `Const` **rSuiteComponents**: [`Definer`](../classes/react_form_builder_core.Definer.md)<`any`\>[] = `[]`

___

### rsErrorMessage

• `Const` **rsErrorMessage**: [`Definer`](../classes/react_form_builder_core.Definer.md)<[`RsErrorMessageProps`](../interfaces/react_form_builder_components_rsuite.RsErrorMessageProps.md)\>

___

### rsTooltip

• `Const` **rsTooltip**: [`Definer`](../classes/react_form_builder_core.Definer.md)<[`RsTooltipProps`](../interfaces/react_form_builder_components_rsuite.RsTooltipProps.md)\>

___

### view

• `Const` **view**: [`View`](../classes/react_form_builder_core.View.md)

## Functions

### RsLocalizationWrapper

▸ **RsLocalizationWrapper**(`props`): `Element`

Wrapper component for RSuite components localization.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`FormViewerWrapperComponentProps`](../interfaces/react_form_builder_core.FormViewerWrapperComponentProps.md) | the component props. |

#### Returns

`Element`

the wrapped components with localization settings applied.

___

### ltrCssLoader

▸ **ltrCssLoader**(): `Promise`<`void`\>

Loads the Left-To-Right (LTR) CSS for the "rsuite" library.

#### Returns

`Promise`<`void`\>

the Promise that resolves when the LTR CSS has been loaded successfully.

___

### rtlCssLoader

▸ **rtlCssLoader**(): `Promise`<`void`\>

Loads the Right-to-Left (RTL) CSS for the "rsuite" library.

#### Returns

`Promise`<`void`\>

the Promise that resolves when the RTL CSS has been loaded successfully.

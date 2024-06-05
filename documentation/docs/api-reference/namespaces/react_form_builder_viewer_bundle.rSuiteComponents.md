---
id: "react_form_builder_viewer_bundle.rSuiteComponents"
title: "Namespace: rSuiteComponents"
sidebar_label: "rSuiteComponents"
custom_edit_url: null
---

[@react-form-builder/viewer-bundle](../modules/react_form_builder_viewer_bundle.md).rSuiteComponents

## Interfaces

- [RsErrorMessageProps](../interfaces/react_form_builder_viewer_bundle.rSuiteComponents.RsErrorMessageProps.md)
- [RsTooltipProps](../interfaces/react_form_builder_viewer_bundle.rSuiteComponents.RsTooltipProps.md)

## Variables

### models

• `Const` **models**: [`Model`](../classes/react_form_builder_core.Model.md)<`any`\>[]

An array of rSuite component metadata for use in FormViewer.

___

### rSuiteComponents

• `Const` **rSuiteComponents**: [`Definer`](../classes/react_form_builder_core.Definer.md)<`any`\>[] = `[]`

An array of rSuite component metadata factories.

___

### rsErrorMessage

• `Const` **rsErrorMessage**: [`Definer`](../classes/react_form_builder_core.Definer.md)<[`RsErrorMessageProps`](../interfaces/react_form_builder_viewer_bundle.rSuiteComponents.RsErrorMessageProps.md)\>

Metadata builder for rSuite-based error display component.

___

### rsTooltip

• `Const` **rsTooltip**: [`Definer`](../classes/react_form_builder_core.Definer.md)<[`RsTooltipProps`](../interfaces/react_form_builder_viewer_bundle.rSuiteComponents.RsTooltipProps.md)\>

Metadata builder for rSuite-based tooltip display component.

___

### view

• `Const` **view**: [`View`](../classes/react_form_builder_core.View.md)

An assembled set of rSuite components, ready to be passed as a property to the FormViewer.

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

### formEngineRsuiteCssLoader

▸ **formEngineRsuiteCssLoader**(): `Promise`<`void`\>

Loads FormEngine specific styles over "rsuite" library.

#### Returns

`Promise`<`void`\>

the Promise that resolves when the custom styles have been loaded successfully.

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

---
id: "form_builder"
title: "Module: form-builder"
sidebar_label: "form-builder"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [BuilderView](../classes/form_builder.BuilderView.md)
- [Definer](../classes/form_builder.Definer.md)

## Interfaces

- [ErrorMessageProps](../interfaces/form_builder.ErrorMessageProps.md)
- [FormBuilderProps](../interfaces/form_builder.FormBuilderProps.md)
- [LabeledValue](../interfaces/form_builder.LabeledValue.md)

## Type Aliases

### WrapperProps

Ƭ **WrapperProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `ReactNode` |

## Variables

### array

• `Const` **array**: `SchemedBuilder`<`undefined` \| `any`[]\>

___

### boolean

• `Const` **boolean**: `SchemedBuilder`<`undefined` \| `boolean`\>

___

### color

• `Const` **color**: `SchemedBuilder`<`undefined` \| `string`\>

___

### event

• `Const` **event**: `AnnotationBuilder`<`unknown`\>

___

### htmlAttributes

• `Const` **htmlAttributes**: `AnnotationBuilder`<`unknown`\>

___

### key

• `Const` **key**: `Annotation`

___

### labeledValue

• `Const` **labeledValue**: [`LabeledValue`](../interfaces/form_builder.LabeledValue.md)

___

### node

• `Const` **node**: `AnnotationBuilder`<`ReactNode`\>

___

### number

• `Const` **number**: `SchemedBuilder`<`undefined` \| `number`\>

___

### renderWhen

• `Const` **renderWhen**: `SchemedBuilder`<`undefined` \| `boolean`\>

___

### size

• `Const` **size**: `SchemedBuilder`<`TypeOfShape`<{}\>\>

___

### string

• `Const` **string**: `SchemedBuilder`<`undefined` \| `string`\>

___

### stylization

• `Const` **stylization**: `Annotation`

___

### tooltipProps

• `Const` **tooltipProps**: `AnnotationBuilder`<`unknown`\>

___

### tooltipType

• `Const` **tooltipType**: `SchemedBuilder`<`undefined` \| `string`\>

___

### useTooltip

• `Const` **useTooltip**: `SchemedBuilder`<`undefined` \| `boolean`\>

___

### validation

• `Const` **validation**: `AnnotationBuilder`<`unknown`\>

## Functions

### FormBuilder

▸ **FormBuilder**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FormBuilderProps`](../interfaces/form_builder.FormBuilderProps.md) |

#### Returns

`Element`

___

### createAnnotation

▸ **createAnnotation**<`T`\>(`editor`): `AnnotationBuilder`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `editor` | `string` |

#### Returns

`AnnotationBuilder`<`T`\>

___

### createProperty

▸ **createProperty**(`editor`): `AnnotationBuilder`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `editor` | `string` |

#### Returns

`AnnotationBuilder`<`unknown`\>

___

### createView

▸ **createView**(`...models`): [`View`](../classes/fb_core.View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...models` | [`Model`](../classes/fb_core.Model.md)[] |

#### Returns

[`View`](../classes/fb_core.View.md)

___

### define

▸ **define**<`T`\>(`view`): [`Definer`](../classes/form_builder.Definer.md)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `view` | `ComponentType`<`T`\> |

#### Returns

[`Definer`](../classes/form_builder.Definer.md)<`T`\>

___

### isContainer

▸ **isContainer**(`value`): value is ContainerAn

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Annotation` |

#### Returns

value is ContainerAn

___

### isFunc

▸ **isFunc**(`value`): value is EventAn

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Annotation` |

#### Returns

value is EventAn

___

### isModule

▸ **isModule**(`value`): value is ModuleAn

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Annotation` |

#### Returns

value is ModuleAn

___

### isStyle

▸ **isStyle**(`value`): value is StyleAn

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Annotation` |

#### Returns

value is StyleAn

___

### oneOf

▸ **oneOf**<`U`, `D`\>(`...values`): `OneOfBuilder`<`Enum`<`D`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends `string` \| `number` |
| `D` | extends [`U`, ...U[]] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...values` | `D` |

#### Returns

`OneOfBuilder`<`Enum`<`D`\>\>

___

### someOf

▸ **someOf**<`U`, `D`\>(`...values`): `SomeOfBuilder`<`Enum`<`D`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends `string` \| `number` |
| `D` | extends [`U`, ...U[]] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...values` | `D` |

#### Returns

`SomeOfBuilder`<`Enum`<`D`\>\>

___

### toLabeledValues

▸ **toLabeledValues**(`items`, `upper?`): { `label`: `undefined` \| `string` ; `value`: `string` \| `number`  }[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `items` | `string`[] \| [`LabeledValue`](../interfaces/form_builder.LabeledValue.md)[] | `undefined` |
| `upper` | `boolean` | `true` |

#### Returns

{ `label`: `undefined` \| `string` ; `value`: `string` \| `number`  }[]

___

### useComponentData

▸ **useComponentData**(): [`ComponentData`](fb_core.md#componentdata)

#### Returns

[`ComponentData`](fb_core.md#componentdata)

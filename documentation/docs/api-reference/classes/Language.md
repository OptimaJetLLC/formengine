---
id: "Language"
title: "Class: Language"
sidebar_label: "Language"
sidebar_position: 0
custom_edit_url: null
---

The language to localize the form builder.

## Constructors

### constructor

• **new Language**(`code`, `dialect`, `name`, `description`, `bidi?`)

Creates a localization language for the form builder.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `code` | `string` | `undefined` | the language code, for example, 'en'. |
| `dialect` | `string` | `undefined` | the dialect code, for example, 'US'. |
| `name` | `string` | `undefined` | the name of the language, for example 'English'. |
| `description` | `string` | `undefined` | the description of the language, for example 'American English'. |
| `bidi` | [`BiDi`](../enums/BiDi.md) | `BiDi.LTR` | the type of text layout, for example, BiDi.LTR. |

## Properties

### bidi

• `Readonly` **bidi**: [`BiDi`](../enums/BiDi.md) = `BiDi.LTR`

the type of text layout, for example, BiDi.LTR.

___

### code

• `Readonly` **code**: `string`

the language code, for example, 'en'.

___

### description

• `Readonly` **description**: `string`

the description of the language, for example 'American English'.

___

### dialect

• `Readonly` **dialect**: `string`

the dialect code, for example, 'US'.

___

### name

• `Readonly` **name**: `string`

the name of the language, for example 'English'.

## Accessors

### fullCode

• `get` **fullCode**(): `string`

#### Returns

`string`

Full code of the Language i.e en-US, en-GB etc.

## Methods

### clone

▸ `Static` **clone**(`source`): [`Language`](Language.md)

Clones an existing instance of the language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | [`Language`](Language.md) | the cloning object. |

#### Returns

[`Language`](Language.md)

the object clone.

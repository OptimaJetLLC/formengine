# Class: Language

The language to localize the form builder.

## Constructors

### new Language()

> **new Language**(`code`, `dialect`, `name`, `description`, `bidi`): [`Language`](Language.md)

Creates a localization language for the form builder.

#### Parameters

• **code**: `string`

the language code, for example, 'en'.

• **dialect**: `string`

the dialect code, for example, 'US'.

• **name**: `string`

the name of the language, for example 'English'.

• **description**: `string`

the description of the language, for example 'American English'.

• **bidi**: [`BiDi`](../enumerations/BiDi.md) = `BiDi.LTR`

the type of text layout, for example, BiDi.LTR.

#### Returns

[`Language`](Language.md)

## Properties

### bidi

> `readonly` **bidi**: [`BiDi`](../enumerations/BiDi.md) = `BiDi.LTR`

the type of text layout, for example, BiDi.LTR.

***

### code

> `readonly` **code**: `string`

the language code, for example, 'en'.

***

### description

> `readonly` **description**: `string`

the description of the language, for example 'American English'.

***

### dialect

> `readonly` **dialect**: `string`

the dialect code, for example, 'US'.

***

### name

> `readonly` **name**: `string`

the name of the language, for example 'English'.

## Accessors

### fullCode

#### Get Signature

> **get** **fullCode**(): \`$\{string\}-$\{string\}\`

##### Returns

\`$\{string\}-$\{string\}\`

Full code of the Language i.e en-US, en-GB etc.

## Methods

### clone()

> `static` **clone**(`source`): [`Language`](Language.md)

Clones an existing instance of the language.

#### Parameters

• **source**: [`Language`](Language.md)

the cloning object.

#### Returns

[`Language`](Language.md)

the object clone.

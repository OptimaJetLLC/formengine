# Class: CalculableResult

Calculable result.

## Constructors

### new CalculableResult()

> **new CalculableResult**(`error`, `result`?, `exceptions`?): [`CalculableResult`](CalculableResult.md)

Constructor.

#### Parameters

• **error**: `boolean` = `false`

the error.

• **result?**: `any`

the result.

• **exceptions?**: `Error`[]

the exceptions.

#### Returns

[`CalculableResult`](CalculableResult.md)

## Properties

### error

> `readonly` **error**: `boolean` = `false`

the error.

***

### exceptions?

> `readonly` `optional` **exceptions**: `Error`[]

the exceptions.

***

### result?

> `readonly` `optional` **result**: `any`

the result.

## Methods

### error()

> `static` **error**(`exceptions`): [`CalculableResult`](CalculableResult.md)

Creates a new instance of CalculableResult class with an error.

#### Parameters

• **exceptions**: `Error`[]

the exception array.

#### Returns

[`CalculableResult`](CalculableResult.md)

the new instance of CalculableResult class.

***

### success()

> `static` **success**(`result`): [`CalculableResult`](CalculableResult.md)

Creates a new instance of the CalculableResult class with a successful result.

#### Parameters

• **result**: `any`

the calculable result.

#### Returns

[`CalculableResult`](CalculableResult.md)

the new instance of CalculableResult class.

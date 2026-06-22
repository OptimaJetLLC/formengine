# Class: CalculableResult

Calculable result.

## Constructors

### Constructor

> **new CalculableResult**(`error`, `result?`, `exceptions?`, `warning?`): `CalculableResult`

Constructor.

#### Parameters

##### error

`boolean` = `false`

the error.

##### result?

`any`

the result.

##### exceptions?

`Error`[]

the exceptions.

##### warning?

`boolean`

the warning.

#### Returns

`CalculableResult`

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

***

### warning?

> `readonly` `optional` **warning**: `boolean`

the warning.

## Methods

### error()

> `static` **error**(`exceptions`): `CalculableResult`

Creates a new instance of CalculableResult class with an error.

#### Parameters

##### exceptions

`Error`[]

the exception array.

#### Returns

`CalculableResult`

the new instance of CalculableResult class.

***

### success()

> `static` **success**(`result`): `CalculableResult`

Creates a new instance of the CalculableResult class with a successful result.

#### Parameters

##### result

`any`

the calculable result.

#### Returns

`CalculableResult`

the new instance of CalculableResult class.

***

### warning()

> `static` **warning**(`result`): `CalculableResult`

Creates a new instance of the CalculableResult class with a warning result.

#### Parameters

##### result

`any`

the calculable result.

#### Returns

`CalculableResult`

the new instance of CalculableResult class.

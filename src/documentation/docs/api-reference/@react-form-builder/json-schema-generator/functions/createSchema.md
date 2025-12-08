# Function: createSchema()

> **createSchema**(`components`, `descriptions?`): `boolean` \| \{ `$comment?`: `string`; `$id?`: `string`; `$ref?`: `string`; `$schema?`: `string`; `additionalItems?`: `JSONSchema`\<`any`, `TypeValue`\>; `additionalProperties?`: `JSONSchema`\<`any`, `TypeValue`\>; `allOf?`: `MaybeReadonlyArray`\<`JSONSchema`\<`any`, `TypeValue`\>\>; `anyOf?`: `MaybeReadonlyArray`\<`JSONSchema`\<`any`, `TypeValue`\>\>; `const?`: `any`; `contains?`: `JSONSchema`\<`any`, `TypeValue`\>; `contentEncoding?`: `"base64"` \| `"7bit"` \| `"8bit"` \| `"binary"` \| `"ietf-token"` \| `"quoted-printable"` \| `"x-token"`; `contentMediaType?`: `string`; `default?`: `any`; `definitions?`: `Record`\<`string`, `JSONSchema`\<`any`, `TypeValue`\>\>; `dependencies?`: `Record`\<`string`, `JSONSchema`\<`any`, `TypeValue`\> \| `MaybeReadonlyArray`\<`string`\>\>; `description?`: `string`; `else?`: `JSONSchema`\<`any`, `TypeValue`\>; `enum?`: `MaybeReadonlyArray`\<`any`\>; `examples?`: `MaybeReadonlyArray`\<`any`\>; `exclusiveMaximum?`: `number`; `exclusiveMinimum?`: `number`; `format?`: `string`; `if?`: `JSONSchema`\<`any`, `TypeValue`\>; `items?`: `JSONSchema`\<`any`, `TypeValue`\> \| `MaybeReadonlyArray`\<`JSONSchema`\<`any`, `TypeValue`\>\>; `maximum?`: `number`; `maxItems?`: `number`; `maxLength?`: `number`; `maxProperties?`: `number`; `minimum?`: `number`; `minItems?`: `number`; `minLength?`: `number`; `minProperties?`: `number`; `multipleOf?`: `number`; `not?`: `JSONSchema`\<`any`, `TypeValue`\>; `oneOf?`: `MaybeReadonlyArray`\<`JSONSchema`\<`any`, `TypeValue`\>\>; `pattern?`: `string`; `patternProperties?`: `Record`\<`string`, `JSONSchema`\<`any`, `TypeValue`\>\>; `properties?`: `Record`\<`string`, `JSONSchema`\<`any`, `TypeValue`\>\>; `propertyNames?`: `JSONSchema`\<`any`, `TypeValue`\>; `readOnly?`: `boolean`; `required?`: `MaybeReadonlyArray`\<`string`\>; `then?`: `JSONSchema`\<`any`, `TypeValue`\>; `title?`: `string`; `type?`: `TypeValue`; `uniqueItems?`: `boolean`; `writeOnly?`: `boolean`; \}

Creates the JSON Schema for builder components.

## Parameters

### components

[`BuilderComponent`](../../core/interfaces/BuilderComponent.md)[]

the components to generate schema for.

### descriptions?

[`ComponentLibraryDescription`](../../core/type-aliases/ComponentLibraryDescription.md)[]

the component descriptions to include in the schema.

## Returns

`boolean`

\{ `$comment?`: `string`; `$id?`: `string`; `$ref?`: `string`; `$schema?`: `string`; `additionalItems?`: `JSONSchema`\<`any`, `TypeValue`\>; `additionalProperties?`: `JSONSchema`\<`any`, `TypeValue`\>; `allOf?`: `MaybeReadonlyArray`\<`JSONSchema`\<`any`, `TypeValue`\>\>; `anyOf?`: `MaybeReadonlyArray`\<`JSONSchema`\<`any`, `TypeValue`\>\>; `const?`: `any`; `contains?`: `JSONSchema`\<`any`, `TypeValue`\>; `contentEncoding?`: `"base64"` \| `"7bit"` \| `"8bit"` \| `"binary"` \| `"ietf-token"` \| `"quoted-printable"` \| `"x-token"`; `contentMediaType?`: `string`; `default?`: `any`; `definitions?`: `Record`\<`string`, `JSONSchema`\<`any`, `TypeValue`\>\>; `dependencies?`: `Record`\<`string`, `JSONSchema`\<`any`, `TypeValue`\> \| `MaybeReadonlyArray`\<`string`\>\>; `description?`: `string`; `else?`: `JSONSchema`\<`any`, `TypeValue`\>; `enum?`: `MaybeReadonlyArray`\<`any`\>; `examples?`: `MaybeReadonlyArray`\<`any`\>; `exclusiveMaximum?`: `number`; `exclusiveMinimum?`: `number`; `format?`: `string`; `if?`: `JSONSchema`\<`any`, `TypeValue`\>; `items?`: `JSONSchema`\<`any`, `TypeValue`\> \| `MaybeReadonlyArray`\<`JSONSchema`\<`any`, `TypeValue`\>\>; `maximum?`: `number`; `maxItems?`: `number`; `maxLength?`: `number`; `maxProperties?`: `number`; `minimum?`: `number`; `minItems?`: `number`; `minLength?`: `number`; `minProperties?`: `number`; `multipleOf?`: `number`; `not?`: `JSONSchema`\<`any`, `TypeValue`\>; `oneOf?`: `MaybeReadonlyArray`\<`JSONSchema`\<`any`, `TypeValue`\>\>; `pattern?`: `string`; `patternProperties?`: `Record`\<`string`, `JSONSchema`\<`any`, `TypeValue`\>\>; `properties?`: `Record`\<`string`, `JSONSchema`\<`any`, `TypeValue`\>\>; `propertyNames?`: `JSONSchema`\<`any`, `TypeValue`\>; `readOnly?`: `boolean`; `required?`: `MaybeReadonlyArray`\<`string`\>; `then?`: `JSONSchema`\<`any`, `TypeValue`\>; `title?`: `string`; `type?`: `TypeValue`; `uniqueItems?`: `boolean`; `writeOnly?`: `boolean`; \}

### $comment?

> `optional` **$comment**: `string`

This keyword is reserved for comments from schema authors to readers or
maintainers of the schema. The value of this keyword MUST be a string.
Implementations MUST NOT present this string to end users. Tools for
editing schemas SHOULD support displaying and editing this keyword.

The value of this keyword MAY be used in debug or error output which is
intended for developers making use of schemas. Schema vocabularies
SHOULD allow `comment` within any object containing vocabulary
keywords.

Implementations MAY assume `comment` is allowed unless the vocabulary
specifically forbids it. Vocabularies MUST NOT specify any effect of
`comment` beyond what is described in this specification. Tools that
translate other media types or programming languages to and from
`application/schema+json` MAY choose to convert that media type or
programming language's native comments to or from `comment` values.

The behavior of such translation when both native comments and
`comment` properties are present is implementation-dependent.
Implementations SHOULD treat `comment` identically to an unknown
extension keyword.

They MAY strip `comment` values at any point during processing. In
particular, this allows for shortening schemas when the size of deployed
schemas is a concern. Implementations MUST NOT take any other action
based on the presence, absence, or contents of `comment` properties.

### $id?

> `optional` **$id**: `string`

The `$id` keyword defines a URI for the schema, and the base URI that
other URI references within the schema are resolved against. A
subschema's `$id` is resolved against the base URI of its parent
schema. If no parent sets an explicit base with `$id`, the base URI is
that of the entire document, as determined per
[RFC 3986 section 5][RFC3986].

If present, the value for this keyword MUST be a string, and MUST
represent a valid [URI-reference][RFC3986]. This value SHOULD be
normalized, and SHOULD NOT be an empty fragment `#` or an empty string.

[RFC3986]: https://datatracker.ietf.org/doc/html/rfc3986

#### Format

"uri-reference"

### $ref?

> `optional` **$ref**: `string`

The `$ref` keyword is used to reference a schema, and provides the
ability to validate recursive structures through self-reference.

An object schema with a `$ref` property MUST be interpreted as a
`$ref` reference. The value of the `$ref` property MUST be a URI
Reference. Resolved against the current URI base, it identifies the URI
of a schema to use. All other properties in a `$ref` object MUST be
ignored.

The URI is not a network locator, only an identifier. A schema need not
be downloadable from the address if it is a network-addressable URL, and
implementations SHOULD NOT assume they should perform a network
operation when they encounter a network-addressable URI.

A schema MUST NOT be run into an infinite loop against a schema. For
example, if two schemas `"#alice"` and `"#bob"` both have an
`allOf` property that refers to the other, a naive validator might get
stuck in an infinite recursive loop trying to validate the instance.
Schemas SHOULD NOT make use of infinite recursive nesting like this; the
behavior is undefined.

#### Format

"uri-reference"

### $schema?

> `optional` **$schema**: `string`

The `$schema` keyword is both used as a JSON Schema version identifier
and the location of a resource which is itself a JSON Schema, which
describes any schema written for this particular version.

The value of this keyword MUST be a [URI][RFC3986] (containing a scheme)
and this URI MUST be normalized. The current schema MUST be valid
against the meta-schema identified by this URI.

If this URI identifies a retrievable resource, that resource SHOULD be
of media type `application/schema+json`.

The `$schema` keyword SHOULD be used in a root schema. It MUST NOT
appear in subschemas.

Values for this property are defined in other documents and by other
parties. JSON Schema implementations SHOULD implement support for
current and previous published drafts of JSON Schema vocabularies as
deemed reasonable.

[RFC3986]: https://datatracker.ietf.org/doc/html/rfc3986

#### Format

"uri"

### additionalItems?

> `optional` **additionalItems**: `JSONSchema`\<`any`, `TypeValue`\>

The value of `additionalItems` MUST be a valid JSON Schema.

This keyword determines how child instances validate for arrays, and
does not directly validate the immediate instance itself.

If `items` is an array of schemas, validation succeeds if every
instance element at a position greater than the size of `items`
validates against `additionalItems`.

Otherwise, `additionalItems` MUST be ignored, as the `items` schema
(possibly the default value of an empty schema) is applied to all
elements.

Omitting this keyword has the same behavior as an empty schema.

### additionalProperties?

> `optional` **additionalProperties**: `JSONSchema`\<`any`, `TypeValue`\>

The value of `additionalProperties` MUST be a valid JSON Schema.

This keyword determines how child instances validate for objects, and
does not directly validate the immediate instance itself.

Validation with `additionalProperties` applies only to the child
values of instance names that do not match any names in `properties`,
and do not match any regular expression in `patternProperties`.

For all such properties, validation succeeds if the child instance
validates against the `additionalProperties` schema.

Omitting this keyword has the same behavior as an empty schema.

### allOf?

> `optional` **allOf**: `MaybeReadonlyArray`\<`JSONSchema`\<`any`, `TypeValue`\>\>

This keyword's value MUST be a non-empty array. Each item of the array
MUST be a valid JSON Schema.

An instance validates successfully against this keyword if it validates
successfully against all schemas defined by this keyword's value.

### anyOf?

> `optional` **anyOf**: `MaybeReadonlyArray`\<`JSONSchema`\<`any`, `TypeValue`\>\>

This keyword's value MUST be a non-empty array. Each item of the array
MUST be a valid JSON Schema.

An instance validates successfully against this keyword if it validates
successfully against at least one schema defined by this keyword's
value.

### const?

> `optional` **const**: `any`

An instance validates successfully against this keyword if its value is
equal to the value of the keyword.

Use of this keyword is functionally equivalent to the `enum` keyword
with a single value.

### contains?

> `optional` **contains**: `JSONSchema`\<`any`, `TypeValue`\>

The value of this keyword MUST be a valid JSON Schema.

An array instance is valid against `contains` if at least one of its
elements is valid against the given schema.

### contentEncoding?

> `optional` **contentEncoding**: `"base64"` \| `"7bit"` \| `"8bit"` \| `"binary"` \| `"ietf-token"` \| `"quoted-printable"` \| `"x-token"`

If the instance value is a string, this property defines that the
string SHOULD be interpreted as binary data and decoded using the
encoding named by this property. [RFC 2045, Sec 6.1][RFC2045] lists the
possible values for this property.

The value of this property SHOULD be ignored if the instance described
is not a string.

[RFC2045]: https://datatracker.ietf.org/doc/html/rfc2045#section-6.1

### contentMediaType?

> `optional` **contentMediaType**: `string`

The value of this property must be a media type, as defined by
[RFC 2046][RFC2046]. This property defines the media type of instances
which this schema defines.

The value of this property SHOULD be ignored if the instance described
is not a string.

If the `contentEncoding` property is not present, but the instance
value is a string, then the value of this property SHOULD specify a text
document type, and the character set SHOULD be the character set into
which the JSON string value was decoded (for which the default is
Unicode).

[RFC2046]: https://datatracker.ietf.org/doc/html/rfc2046

### default?

> `optional` **default**: `any`

This keyword can be used to supply a default JSON value associated with
a particular schema. It is RECOMMENDED that a `default` value be valid
against the associated schema.

### definitions?

> `optional` **definitions**: `Record`\<`string`, `JSONSchema`\<`any`, `TypeValue`\>\>

The `definitions` keywords provides a standardized location for schema
authors to inline re-usable JSON Schemas into a more general schema. The
keyword does not directly affect the validation result.

This keyword's value MUST be an object. Each member value of this object
MUST be a valid JSON Schema.

### dependencies?

> `optional` **dependencies**: `Record`\<`string`, `JSONSchema`\<`any`, `TypeValue`\> \| `MaybeReadonlyArray`\<`string`\>\>

This keyword specifies rules that are evaluated if the instance is an
object and contains a certain property.

This keyword's value MUST be an object. Each property specifies a
dependency. Each dependency value MUST be an array or a valid JSON
Schema.

If the dependency value is a subschema, and the dependency key is a
property in the instance, the entire instance must validate against the
dependency value.

If the dependency value is an array, each element in the array, if any,
MUST be a string, and MUST be unique. If the dependency key is a
property in the instance, each of the items in the dependency value must
be a property that exists in the instance.

Omitting this keyword has the same behavior as an empty object.

### description?

> `optional` **description**: `string`

Can be used to decorate a user interface with explanation or information
about the data produced.

### else?

> `optional` **else**: `JSONSchema`\<`any`, `TypeValue`\>

This keyword's value MUST be a valid JSON Schema.

When `if` is present, and the instance fails to validate against its
subschema, then validation succeeds against this keyword if the instance
successfully validates against this keyword's subschema.

This keyword has no effect when `if` is absent, or when the instance
successfully validates against its subschema. Implementations MUST NOT
evaluate the instance against this keyword, for either validation or
annotation collection purposes, in such cases.

### enum?

> `optional` **enum**: `MaybeReadonlyArray`\<`any`\>

The value of this keyword MUST be an array. This array SHOULD have at
least one element. Elements in the array SHOULD be unique.

An instance validates successfully against this keyword if its value is
equal to one of the elements in this keyword's array value.

Elements in the array might be of any type, including `null`.

### examples?

> `optional` **examples**: `MaybeReadonlyArray`\<`any`\>

The value of this keyword MUST be an array. When multiple occurrences of
this keyword are applicable to a single sub-instance, implementations
MUST provide a flat array of all values rather than an array of arrays.

This keyword can be used to provide sample JSON values associated with a
particular schema, for the purpose of illustrating usage. It is
RECOMMENDED that these values be valid against the associated schema.

Implementations MAY use the value(s) of `default`, if present, as an
additional example. If `examples` is absent, `default` MAY still be
used in this manner.

### exclusiveMaximum?

> `optional` **exclusiveMaximum**: `number`

The value of `exclusiveMaximum` MUST be a number, representing an
exclusive upper limit for a numeric instance.

If the instance is a number, then the instance is valid only if it has a
value strictly less than (not equal to) `exclusiveMaximum`.

### exclusiveMinimum?

> `optional` **exclusiveMinimum**: `number`

The value of `exclusiveMinimum` MUST be a number, representing an
exclusive lower limit for a numeric instance.

If the instance is a number, then the instance is valid only if it has a
value strictly greater than (not equal to) `exclusiveMinimum`.

### format?

> `optional` **format**: `string`

The `format` keyword functions as both an [annotation][annotation] and
as an [assertion][assertion]. While no special effort is required to
implement it as an annotation conveying semantic meaning, implementing
validation is non-trivial.

Implementations MAY support the `format` keyword as a validation
assertion.

Implementations MAY add custom `format` attributes. Save for agreement
between parties, schema authors SHALL NOT expect a peer implementation
to support this keyword and/or custom `format` attributes.

[annotation]: https://json-schema.org/draft-07/json-schema-validation.html#annotations
[assertion]: https://json-schema.org/draft-07/json-schema-validation.html#assertions

### if?

> `optional` **if**: `JSONSchema`\<`any`, `TypeValue`\>

This keyword's value MUST be a valid JSON Schema.

This validation outcome of this keyword's subschema has no direct effect
on the overall validation result. Rather, it controls which of the
`then` or `else` keywords are evaluated.

Instances that successfully validate against this keyword's subschema
MUST also be valid against the subschema value of the `then` keyword,
if present.

Instances that fail to validate against this keyword's subschema MUST
also be valid against the subschema value of the `else` keyword, if
present.

If [annotations][annotations] are being collected, they are collected
from this keyword's subschema in the usual way, including when the
keyword is present without either `then` or `else`.

[annotations]: https://json-schema.org/draft-07/json-schema-validation.html#annotations

### items?

> `optional` **items**: `JSONSchema`\<`any`, `TypeValue`\> \| `MaybeReadonlyArray`\<`JSONSchema`\<`any`, `TypeValue`\>\>

The value of `items` MUST be either a valid JSON Schema or an array of
valid JSON Schemas.

This keyword determines how child instances validate for arrays, and
does not directly validate the immediate instance itself.

If `items` is a schema, validation succeeds if all elements in the
array successfully validate against that schema.

If `items` is an array of schemas, validation succeeds if each element
of the instance validates against the schema at the same position, if
any.

Omitting this keyword has the same behavior as an empty schema.

### maximum?

> `optional` **maximum**: `number`

The value of `maximum` MUST be a number, representing an inclusive
upper limit for a numeric instance.

If the instance is a number, then this keyword validates only if the
instance is less than or exactly equal to `maximum`.

### maxItems?

> `optional` **maxItems**: `number`

The value of this keyword MUST be a non-negative integer.

An array instance is valid against `maxItems` if its size is less
than, or equal to, the value of this keyword.

#### Minimum

0

### maxLength?

> `optional` **maxLength**: `number`

The value of this keyword MUST be a non-negative integer.

A string instance is valid against this keyword if its length is less
than, or equal to, the value of this keyword.

The length of a string instance is defined as the number of its
characters as defined by [RFC 7159][RFC7159].

[RFC7159]: https://datatracker.ietf.org/doc/html/rfc7159

#### Minimum

0

### maxProperties?

> `optional` **maxProperties**: `number`

The value of this keyword MUST be a non-negative integer.

An object instance is valid against `maxProperties` if its number of
`properties` is less than, or equal to, the value of this keyword.

#### Minimum

0

### minimum?

> `optional` **minimum**: `number`

The value of `minimum` MUST be a number, representing an inclusive
lower limit for a numeric instance.

If the instance is a number, then this keyword validates only if the
instance is greater than or exactly equal to `minimum`.

### minItems?

> `optional` **minItems**: `number`

The value of this keyword MUST be a non-negative integer.

An array instance is valid against `minItems` if its size is greater
than, or equal to, the value of this keyword.

Omitting this keyword has the same behavior as a value of `0`.

#### Default

```ts
0
```

#### Minimum

0

### minLength?

> `optional` **minLength**: `number`

The value of this keyword MUST be a non-negative integer.

A string instance is valid against this keyword if its length is greater
than, or equal to, the value of this keyword.

The length of a string instance is defined as the number of its
characters as defined by [RFC 7159][RFC7159].

Omitting this keyword has the same behavior as a value of `0`.

[RFC7159]: https://datatracker.ietf.org/doc/html/rfc7159

#### Default

```ts
0
```

#### Minimum

0

### minProperties?

> `optional` **minProperties**: `number`

The value of this keyword MUST be a non-negative integer.

An object instance is valid against `minProperties` if its number of
`properties` is greater than, or equal to, the value of this keyword.

Omitting this keyword has the same behavior as a value of `0`.

#### Default

```ts
0
```

#### Minimum

0

### multipleOf?

> `optional` **multipleOf**: `number`

The value of `multipleOf` MUST be a number, strictly greater than
`0`.

A numeric instance is valid only if division by this keyword's value
results in an integer.

#### Exclusive Minimum

0

### not?

> `optional` **not**: `JSONSchema`\<`any`, `TypeValue`\>

This keyword's value MUST be a valid JSON Schema.

An instance is valid against this keyword if it fails to validate
successfully against the schema defined by this keyword.

### oneOf?

> `optional` **oneOf**: `MaybeReadonlyArray`\<`JSONSchema`\<`any`, `TypeValue`\>\>

This keyword's value MUST be a non-empty array. Each item of the array
MUST be a valid JSON Schema.

An instance validates successfully against this keyword if it validates
successfully against exactly one schema defined by this keyword's value.

### pattern?

> `optional` **pattern**: `string`

The value of this keyword MUST be a string. This string SHOULD be a
valid regular expression, according to the [ECMA-262][ecma262] regular
expression dialect.

A string instance is considered valid if the regular expression matches
the instance successfully. Recall: regular expressions are not
implicitly anchored.

[ecma262]: https://www.ecma-international.org/publications-and-standards/standards/ecma-262/

#### Format

"regex"

### patternProperties?

> `optional` **patternProperties**: `Record`\<`string`, `JSONSchema`\<`any`, `TypeValue`\>\>

The value of `patternProperties` MUST be an object. Each property name
of this object SHOULD be a valid regular expression, according to the
[ECMA-262][ecma262] regular expression dialect. Each property value of
this object MUST be a valid JSON Schema.

This keyword determines how child instances validate for objects, and
does not directly validate the immediate instance itself. Validation of
the primitive instance type against this keyword always succeeds.

Validation succeeds if, for each instance name that matches any regular
expressions that appear as a property name in this keyword's value, the
child instance for that name successfully validates against each schema
that corresponds to a matching regular expression.

Omitting this keyword has the same behavior as an empty object.

[ecma262]: https://www.ecma-international.org/publications-and-standards/standards/ecma-262/

### properties?

> `optional` **properties**: `Record`\<`string`, `JSONSchema`\<`any`, `TypeValue`\>\>

The value of `properties` MUST be an object. Each value of this object
MUST be a valid JSON Schema.

This keyword determines how child instances validate for objects, and
does not directly validate the immediate instance itself.

Validation succeeds if, for each name that appears in both the instance
and as a name within this keyword's value, the child instance for that
name successfully validates against the corresponding schema.

Omitting this keyword has the same behavior as an empty object.

### propertyNames?

> `optional` **propertyNames**: `JSONSchema`\<`any`, `TypeValue`\>

The value of `propertyNames` MUST be a valid JSON Schema.

If the instance is an object, this keyword validates if every property
name in the instance validates against the provided schema. Note the
property name that the schema is testing will always be a string.

Omitting this keyword has the same behavior as an empty schema.

### readOnly?

> `optional` **readOnly**: `boolean`

The value of this keyword MUST be a boolean. When multiple occurrences
of this keyword are applicable to a single sub-instance, the resulting
value MUST be `true` if any occurrence specifies a `true` value, and
MUST be `false` otherwise.

If `readOnly` has a value of boolean `true`, it indicates that the
value of the instance is managed exclusively by the owning authority,
and attempts by an application to modify the value of this property are
expected to be ignored or rejected by that owning authority.

An instance document that is marked as `readOnly` for the entire
document MAY be ignored if sent to the owning authority, or MAY result
in an error, at the authority's discretion.

For example, `readOnly` would be used to mark a database-generated
serial number as read-only.

This keyword can be used to assist in user interface instance
generation.

#### Default

```ts
false
```

### required?

> `optional` **required**: `MaybeReadonlyArray`\<`string`\>

The value of this keyword MUST be an array. Elements of this array, if
any, MUST be strings, and MUST be unique.

An object instance is valid against this keyword if every item in the
array is the name of a property in the instance.

Omitting this keyword has the same behavior as an empty array.

### then?

> `optional` **then**: `JSONSchema`\<`any`, `TypeValue`\>

This keyword's value MUST be a valid JSON Schema.

When `if` is present, and the instance successfully validates against
its subschema, then validation succeeds against this keyword if the
instance also successfully validates against this keyword's subschema.

This keyword has no effect when `if` is absent, or when the instance
fails to validate against its subschema. Implementations MUST NOT
evaluate the instance against this keyword, for either validation or
annotation collection purposes, in such cases.

### title?

> `optional` **title**: `string`

Can be used to decorate a user interface with a short label about the
data produced.

### type?

> `optional` **type**: `TypeValue`

The value of this keyword MUST be either a string or an array. If it is
an array, elements of the array MUST be strings and MUST be unique.

String values MUST be one of the six primitive types (`"null"`,
`"boolean"`, `"object"`, `"array"`, `"number"`, or
`"string"`), or `"integer"` which matches any number with a zero
fractional part.

An instance validates if and only if the instance is in any of the sets
listed for this keyword.

### uniqueItems?

> `optional` **uniqueItems**: `boolean`

The value of this keyword MUST be a boolean.

If this keyword has boolean value `false`, the instance validates
successfully. If it has boolean value `true`, the instance validates
successfully if all of its elements are unique.

Omitting this keyword has the same behavior as a value of `false`.

#### Default

```ts
false
```

### writeOnly?

> `optional` **writeOnly**: `boolean`

The value of this keyword MUST be a boolean. When multiple occurrences
of this keyword is applicable to a single sub-instance, the resulting
value MUST be `true` if any occurrence specifies a `true` value, and
MUST be `false` otherwise.

If `writeOnly` has a value of boolean `true`, it indicates that the
value is never present when the instance is retrieved from the owning
authority. It can be present when sent to the owning authority to update
or create the document (or the resource it represents), but it will not
be included in any updated or newly created version of the instance.

An instance document that is marked as `writeOnly` for the entire
document MAY be returned as a blank document of some sort, or MAY
produce an error upon retrieval, or have the retrieval request ignored,
at the authority's discretion.

For example, `writeOnly` would be used to mark a password input field.

These keywords can be used to assist in user interface instance
generation. In particular, an application MAY choose to use a widget
that hides input values as they are typed for write-only fields.

#### Default

```ts
false
```

the generated JSON Schema with definitions for each builder component.

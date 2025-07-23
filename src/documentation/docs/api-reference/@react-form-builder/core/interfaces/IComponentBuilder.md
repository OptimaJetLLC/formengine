# Interface: IComponentBuilder

Interface for configuring a specific component within the form.

## Extends

- [`IFormJsonBuilder`](IFormJsonBuilder.md)

## Extended by

- [`IEventHandlerBuilder`](IEventHandlerBuilder.md)
- [`IValidationBuilder`](IValidationBuilder.md)

## Methods

### children()

> **children**(`childrenBuilder`): `IComponentBuilder`

Adds child components inside this component.

#### Parameters

##### childrenBuilder

(`builder`) => [`IFormJsonBuilder`](IFormJsonBuilder.md)

the function that builds the child components.

#### Returns

`IComponentBuilder`

the component builder for method chaining.

***

### component()

> **component**(`key`, `type`): `IComponentBuilder`

Adds a component to the form.

#### Parameters

##### key

`string`

the unique identifier of the component.

##### type

`string`

the type of the component.

#### Returns

`IComponentBuilder`

the component builder for further configuration.

#### Inherited from

[`IFormJsonBuilder`](IFormJsonBuilder.md).[`component`](IFormJsonBuilder.md#component)

***

### computedProp()

> **computedProp**(`key`, `value`): `IComponentBuilder`

Sets a computed property on the component.

#### Parameters

##### key

`string`

the name of the property.

##### value

`string`

the code of the function for calculating the property value.

#### Returns

`IComponentBuilder`

the component builder for method chaining.

***

### event()

> **event**(`eventName`): [`IEventHandlerBuilder`](IEventHandlerBuilder.md)

Starts configuring an event handler for the given event name.

#### Parameters

##### eventName

`string`

the name of the event (e.g., "onClick", "onChange").

#### Returns

[`IEventHandlerBuilder`](IEventHandlerBuilder.md)

the event handler builder.

***

### json()

> **json**(): `string`

Serializes the current state of the form into a JSON string.

#### Returns

`string`

JSON representation of the form.

#### Inherited from

[`IFormJsonBuilder`](IFormJsonBuilder.md).[`json`](IFormJsonBuilder.md#json)

***

### localizedProp()

> **localizedProp**(`key`, `language`, `value`): `IComponentBuilder`

Sets a localized property on the component.

#### Parameters

##### key

`string`

the name of the property.

##### language

`` `${string}-${string}` ``

the localized code, e.g. 'en-US'.

##### value

`any`

the localized value of the property.

#### Returns

`IComponentBuilder`

the component builder for method chaining.

***

### prop()

> **prop**(`key`, `value`): `IComponentBuilder`

Sets a property on the component.

#### Parameters

##### key

`string`

the name of the property.

##### value

`any`

the value of the property.

#### Returns

`IComponentBuilder`

the component builder for method chaining.

***

### style()

> **style**(`value`, `device?`): `IComponentBuilder`

Applies styles to the component, optionally per device.

#### Parameters

##### value

the style string (e.g., "color: red") or object with style properties.

`string` | `CSSProperties`

##### device?

[`Device`](../type-aliases/Device.md)

the optional device-specific styling.

#### Returns

`IComponentBuilder`

the component builder for method chaining.

***

### validation()

> **validation**(`key`): [`IValidationBuilder`](IValidationBuilder.md)

Starts configuring validation rules for the specified field.

#### Parameters

##### key

`string`

the name of the validation rule.

#### Returns

[`IValidationBuilder`](IValidationBuilder.md)

the validation builder for defining arguments.

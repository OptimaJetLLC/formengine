# Interface: IEventHandlerBuilder

Interface for defining event handlers for a component.

## Extends

- [`IComponentBuilder`](IComponentBuilder.md)

## Methods

### args()

> **args**(`val`): `IEventHandlerBuilder`

Specifies the arguments passed to the event handler.

#### Parameters

##### val

`any`

the arguments to pass to the handler.

#### Returns

`IEventHandlerBuilder`

the event handler builder.

***

### children()

> **children**(`childrenBuilder`): [`IComponentBuilder`](IComponentBuilder.md)

Adds child components inside this component.

#### Parameters

##### childrenBuilder

(`builder`) => [`IFormJsonBuilder`](IFormJsonBuilder.md)

the function that builds the child components.

#### Returns

[`IComponentBuilder`](IComponentBuilder.md)

the component builder for method chaining.

#### Inherited from

[`IComponentBuilder`](IComponentBuilder.md).[`children`](IComponentBuilder.md#children)

***

### commonAction()

> **commonAction**(`name`): `IEventHandlerBuilder`

Sets a common handler for the event.

#### Parameters

##### name

`string`

the name of the common handler.

#### Returns

`IEventHandlerBuilder`

the event handler builder.

***

### component()

> **component**(`key`, `type`): [`IComponentBuilder`](IComponentBuilder.md)

Adds a component to the form.

#### Parameters

##### key

`string`

the unique identifier of the component.

##### type

`string`

the type of the component.

#### Returns

[`IComponentBuilder`](IComponentBuilder.md)

the component builder for further configuration.

#### Inherited from

[`IComponentBuilder`](IComponentBuilder.md).[`component`](IComponentBuilder.md#component)

***

### computedProp()

> **computedProp**(`key`, `value`): [`IComponentBuilder`](IComponentBuilder.md)

Sets a computed property on the component.

#### Parameters

##### key

`string`

the name of the property.

##### value

`string`

the code of the function for calculating the property value.

#### Returns

[`IComponentBuilder`](IComponentBuilder.md)

the component builder for method chaining.

#### Inherited from

[`IComponentBuilder`](IComponentBuilder.md).[`computedProp`](IComponentBuilder.md#computedprop)

***

### customAction()

> **customAction**(`name`): `IEventHandlerBuilder`

Sets a custom handler for the event.

#### Parameters

##### name

`string`

the name of the custom handler function.

#### Returns

`IEventHandlerBuilder`

the event handler builder.

***

### event()

> **event**(`eventName`): `IEventHandlerBuilder`

Starts configuring an event handler for the given event name.

#### Parameters

##### eventName

`string`

the name of the event (e.g., "onClick", "onChange").

#### Returns

`IEventHandlerBuilder`

the event handler builder.

#### Inherited from

[`IComponentBuilder`](IComponentBuilder.md).[`event`](IComponentBuilder.md#event)

***

### json()

> **json**(): `string`

Serializes the current state of the form into a JSON string.

#### Returns

`string`

JSON representation of the form.

#### Inherited from

[`IComponentBuilder`](IComponentBuilder.md).[`json`](IComponentBuilder.md#json)

***

### localizedProp()

> **localizedProp**(`key`, `language`, `value`): [`IComponentBuilder`](IComponentBuilder.md)

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

[`IComponentBuilder`](IComponentBuilder.md)

the component builder for method chaining.

#### Inherited from

[`IComponentBuilder`](IComponentBuilder.md).[`localizedProp`](IComponentBuilder.md#localizedprop)

***

### prop()

> **prop**(`key`, `value`): [`IComponentBuilder`](IComponentBuilder.md)

Sets a property on the component.

#### Parameters

##### key

`string`

the name of the property.

##### value

`any`

the value of the property.

#### Returns

[`IComponentBuilder`](IComponentBuilder.md)

the component builder for method chaining.

#### Inherited from

[`IComponentBuilder`](IComponentBuilder.md).[`prop`](IComponentBuilder.md#prop)

***

### style()

> **style**(`value`, `device?`): [`IComponentBuilder`](IComponentBuilder.md)

Applies styles to the component, optionally per device.

#### Parameters

##### value

the style string (e.g., "color: red") or object with style properties.

`string` | `CSSProperties`

##### device?

[`Device`](../type-aliases/Device.md)

the optional device-specific styling.

#### Returns

[`IComponentBuilder`](IComponentBuilder.md)

the component builder for method chaining.

#### Inherited from

[`IComponentBuilder`](IComponentBuilder.md).[`style`](IComponentBuilder.md#style)

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

#### Inherited from

[`IComponentBuilder`](IComponentBuilder.md).[`validation`](IComponentBuilder.md#validation)

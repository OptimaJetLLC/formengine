# Interface: IComponentState

Calculates all the properties of the form view component.

## Accessors

### get

#### Get Signature

> **get** **get**(): `Record`\<`string`, `any`\>

##### Returns

`Record`\<`string`, `any`\>

combined in order of priority component properties.

***

### isDisabled

#### Get Signature

> **get** **isDisabled**(): `boolean`

##### Returns

`boolean`

true if the component has a disabled property and this property is true, false otherwise.

***

### isReadOnly

#### Get Signature

> **get** **isReadOnly**(): `boolean`

##### Returns

`boolean`

true if the component has a read-only property and this property is true, false otherwise.

***

### ownProps

#### Get Signature

> **get** **ownProps**(): `Record`\<`string`, `any`\>

##### Returns

`Record`\<`string`, `any`\>

combined in order of priority component properties without children props.

***

### propsWithoutChildren

#### Get Signature

> **get** **propsWithoutChildren**(): `Record`\<`string`, `any`\>

##### Returns

`Record`\<`string`, `any`\>

combined component properties in order of priority, excluding child components, the className property
does not contain styles additionally defined for the component.

***

### wrapperClassName

#### Get Signature

> **get** **wrapperClassName**(): `string`

Calculates and returns wrapper className property.

##### Returns

`string`

the Record that contains the className property for the wrapper of component.

## Methods

### onDidMount()

> **onDidMount**(): `void`

The method that is called when the component is mounted.

#### Returns

`void`

***

### onWillUnmount()

> **onWillUnmount**(): `void`

The method that is called when the component is unmounted.

#### Returns

`void`

# Interface: IPresetComponentOptions

Interface for configuring preset component options.

## Properties

### components?

> `optional` **components?**: [`PresetComponent`](PresetComponent.md)[]

The default preset components.

***

### disable?

> `optional` **disable?**: `boolean`

The flag to disable the preset component feature.

***

### disableCreation?

> `optional` **disableCreation?**: `boolean`

The flag to disable the creation of preset components.

***

### disableRemoving?

> `optional` **disableRemoving?**: `boolean`

The flag to disable the removing of preset components.

***

### localStoragePrefix?

> `optional` **localStoragePrefix?**: `string`

The prefix for localStorage key.

***

### onCreate?

> `optional` **onCreate?**: (`preset`) => `void`

The callback function called when a new preset component is created.

#### Parameters

##### preset

[`PresetComponent`](PresetComponent.md)

#### Returns

`void`

***

### onRemove?

> `optional` **onRemove?**: (`name`) => `void`

The callback function called when a preset component is removed.

#### Parameters

##### name

`string`

#### Returns

`void`

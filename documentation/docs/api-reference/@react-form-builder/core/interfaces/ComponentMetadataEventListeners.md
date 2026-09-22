# Interface: ComponentMetadataEventListeners

Component metadata event listeners.

## Properties

### onCreateNode?

> `optional` **onCreateNode?**: (`node`, `store`) => `void`

The callback function that is called when a component is created and added to a form.

#### Parameters

##### node

[`ComponentData`](../classes/ComponentData.md)

the created component data.

##### store

[`IStore`](IStore.md)

the form viewer settings.

#### Returns

`void`

***

### onSelectNode?

> `optional` **onSelectNode?**: (`node`, `self`) => `void`

The callback function that is called when the component is selected.

#### Parameters

##### node

[`ComponentData`](../classes/ComponentData.md)

the selected component data.

##### self

[`ComponentData`](../classes/ComponentData.md)

the component data.

#### Returns

`void`

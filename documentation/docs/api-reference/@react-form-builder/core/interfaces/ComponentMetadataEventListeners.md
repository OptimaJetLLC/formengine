# Interface: ComponentMetadataEventListeners

Component metadata event listeners.

## Properties

### onCreateNode?

> `optional` **onCreateNode?**: (`node`, `store`) => `void`

Called when a component is created and added to a form, including auto-created child wrappers.
Runs after [ComponentMetadataEventListeners.onNodePlacementChanged](#onnodeplacementchanged) for the same operation.
Existing nodes that are only moved are not reported here.

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

### onNodePlacementChanged?

> `optional` **onNodePlacementChanged?**: (`node`, `store`, `change`) => `void`

Called after a component's tree position changes. A removed component is detached but not yet disposed when the callback runs.
When a create also occurs for the same operation, this callback runs before
[ComponentMetadataEventListeners.onCreateNode](#oncreatenode).

#### Parameters

##### node

[`ComponentData`](../classes/ComponentData.md)

the component whose position changed.

##### store

[`IStore`](IStore.md)

the form viewer settings.

##### change

[`ComponentPlacementChange`](../type-aliases/ComponentPlacementChange.md)

the completed placement change.

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

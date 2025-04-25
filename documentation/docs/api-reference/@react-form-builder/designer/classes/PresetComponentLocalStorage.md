# Class: PresetComponentLocalStorage

Class for working with the preset components in the local storage.

## Constructors

### new PresetComponentLocalStorage()

> **new PresetComponentLocalStorage**(`presetsKey`): [`PresetComponentLocalStorage`](PresetComponentLocalStorage.md)

Creates an instance of preset storage in local storage.

#### Parameters

• **presetsKey**: `string` = `'presetComponents'`

the key for the preset components in the local storage.

#### Returns

[`PresetComponentLocalStorage`](PresetComponentLocalStorage.md)

## Methods

### loadPresets()

> **loadPresets**(): [`PresetComponent`](../interfaces/PresetComponent.md)[]

Loads the preset components from the local storage.

#### Returns

[`PresetComponent`](../interfaces/PresetComponent.md)[]

the preset components.

***

### removePreset()

> **removePreset**(`name`): `void`

Removes the preset component from the local storage.

#### Parameters

• **name**: `string`

the name of the preset component.

#### Returns

`void`

***

### savePreset()

> **savePreset**(`preset`): `void`

Saves the preset component to the local storage.

#### Parameters

• **preset**: [`PresetComponent`](../interfaces/PresetComponent.md)

the preset component to save.

#### Returns

`void`

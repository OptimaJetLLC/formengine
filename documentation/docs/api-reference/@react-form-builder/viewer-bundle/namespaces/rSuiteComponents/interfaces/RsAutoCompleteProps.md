# Interface: RsAutoCompleteProps

The properties of the RsAutoComplete component.

## Extends

- `AutoCompleteProps`

## Properties

### appearance?

> `optional` **appearance**: `PickerAppearance`

A picker can have different appearances.

#### Inherited from

`AutoCompleteProps.appearance`

***

### as?

> `optional` **as**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`AutoCompleteProps.as`

***

### autoComplete?

> `optional` **autoComplete**: `string`

AutoComplete Content

#### Inherited from

`AutoCompleteProps.autoComplete`

***

### block?

> `optional` **block**: `boolean`

Format picker to appear inside a content block

#### Inherited from

`AutoCompleteProps.block`

***

### children?

> `optional` **children**: `ReactNode`

Primary content

#### Inherited from

`AutoCompleteProps.children`

***

### childrenKey?

> `optional` **childrenKey**: `string`

The key to use for setting the children in the data.

#### Default

```ts
children
```

#### Inherited from

`AutoCompleteProps.childrenKey`

***

### className?

> `optional` **className**: `string`

The component class name.

#### Overrides

`AutoCompleteProps.className`

***

### classPrefix?

> `optional` **classPrefix**: `string`

The prefix of the component CSS class

#### Inherited from

`AutoCompleteProps.classPrefix`

***

### cleanable?

> `optional` **cleanable**: `boolean`

A picker that can clear values

#### Inherited from

`AutoCompleteProps.cleanable`

***

### container?

> `optional` **container**: () => `HTMLElement` \| `HTMLElement`

Sets the rendering container

#### Inherited from

`AutoCompleteProps.container`

***

### containerPadding?

> `optional` **containerPadding**: `number`

Set the padding of the container.

#### Inherited from

`AutoCompleteProps.containerPadding`

***

### data

> **data**: (`ItemDataType`\<`number` \| `string`\> \| `string`)[]

The data of the component.

#### Inherited from

`AutoCompleteProps.data`

***

### defaultOpen?

> `optional` **defaultOpen**: `boolean`

Initial open menu

#### Inherited from

`AutoCompleteProps.defaultOpen`

***

### defaultValue?

> `optional` **defaultValue**: `string`

Initial value

#### Inherited from

`AutoCompleteProps.defaultValue`

***

### disabled?

> `optional` **disabled**: `boolean`

A picker can show it is currently unable to be interacted with

#### Inherited from

`AutoCompleteProps.disabled`

***

### disabledItemValues?

> `optional` **disabledItemValues**: `string`[]

Disabled items

#### Inherited from

`AutoCompleteProps.disabledItemValues`

***

### filterBy()?

> `optional` **filterBy**: (`value`, `item`) => `boolean`

Custom filter function to determine whether the item will be displayed

#### Parameters

##### value

`string`

##### item

`ItemDataType`

#### Returns

`boolean`

#### Inherited from

`AutoCompleteProps.filterBy`

***

### id?

> `optional` **id**: `string`

#### Inherited from

`AutoCompleteProps.id`

***

### label?

> `optional` **label**: `string`

The component label.

***

### labelKey?

> `optional` **labelKey**: `string`

The key to use for displaying the options in the data.

#### Default

```ts
label
```

#### Inherited from

`AutoCompleteProps.labelKey`

***

### locale?

> `optional` **locale**: `Partial`\<`any`\>

Custom locale

#### Inherited from

`AutoCompleteProps.locale`

***

### menuAutoWidth?

> `optional` **menuAutoWidth**: `boolean`

The width of the menu will automatically follow the width of the input box

#### Inherited from

`AutoCompleteProps.menuAutoWidth`

***

### menuClassName?

> `optional` **menuClassName**: `string`

Additional classes for menu

#### Inherited from

`AutoCompleteProps.menuClassName`

***

### menuMaxHeight?

> `optional` **menuMaxHeight**: `number`

Picker menu max Height

#### Inherited from

`AutoCompleteProps.menuMaxHeight`

***

### menuStyle?

> `optional` **menuStyle**: `CSSProperties`

A style to apply to the Menu DOM node.

#### Inherited from

`AutoCompleteProps.menuStyle`

***

### name?

> `optional` **name**: `string`

Name of the form field

#### Inherited from

`AutoCompleteProps.name`

***

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`Element`\>

Called on blur

#### Inherited from

`AutoCompleteProps.onBlur`

***

### onChange()?

> `optional` **onChange**: (`value`) => `void`

Called after the value has been changed.

#### Parameters

##### value

`string`

the value.

#### Returns

`void`

#### Overrides

`AutoCompleteProps.onChange`

***

### onClose()?

> `optional` **onClose**: () => `void`

Called on close

#### Returns

`void`

#### Inherited from

`AutoCompleteProps.onClose`

***

### onEnter()?

> `optional` **onEnter**: (`node`) => `void`

Callback fired before the Modal transitions in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`AutoCompleteProps.onEnter`

***

### onEntered()?

> `optional` **onEntered**: (`node`) => `void`

Callback fired after the Modal finishes transitioning in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`AutoCompleteProps.onEntered`

***

### onEntering()?

> `optional` **onEntering**: (`node`) => `void`

Callback fired as the Modal begins to transition in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`AutoCompleteProps.onEntering`

***

### onExit()?

> `optional` **onExit**: (`node`) => `void`

Callback fired right before the Modal transitions out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`AutoCompleteProps.onExit`

***

### onExited()?

> `optional` **onExited**: (`node`) => `void`

Callback fired after the Modal finishes transitioning out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`AutoCompleteProps.onExited`

***

### onExiting()?

> `optional` **onExiting**: (`node`) => `void`

Callback fired as the Modal begins to transition out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`AutoCompleteProps.onExiting`

***

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`Element`\>

Called on focus

#### Inherited from

`AutoCompleteProps.onFocus`

***

### onKeyDown()?

> `optional` **onKeyDown**: (`event`) => `void`

The callback triggered by keyboard events.

#### Parameters

##### event

`KeyboardEvent`

#### Returns

`void`

#### Inherited from

`AutoCompleteProps.onKeyDown`

***

### onMenuFocus()?

> `optional` **onMenuFocus**: (`focusItemValue`, `event`) => `void`

Called on menu focus

#### Parameters

##### focusItemValue

`any`

##### event

`KeyboardEvent`

#### Returns

`void`

#### Inherited from

`AutoCompleteProps.onMenuFocus`

***

### onOpen()?

> `optional` **onOpen**: () => `void`

Called on open

#### Returns

`void`

#### Inherited from

`AutoCompleteProps.onOpen`

***

### onSelect()?

> `optional` **onSelect**: (`value`, `item`, `event`) => `void`

Called when a option is selected

#### Parameters

##### value

`any`

##### item

`ItemDataType`

##### event

`SyntheticEvent`

#### Returns

`void`

#### Inherited from

`AutoCompleteProps.onSelect`

***

### open?

> `optional` **open**: `boolean`

Open the menu and control it

#### Inherited from

`AutoCompleteProps.open`

***

### placeholder?

> `optional` **placeholder**: `string`

Placeholder text

#### Inherited from

`AutoCompleteProps.placeholder`

***

### placement?

> `optional` **placement**: `Placement`

The placement of component

#### Inherited from

`AutoCompleteProps.placement`

***

### plaintext?

> `optional` **plaintext**: `boolean`

Render the control as plain text

#### Inherited from

`AutoCompleteProps.plaintext`

***

### preventOverflow?

> `optional` **preventOverflow**: `boolean`

Prevent floating element overflow

#### Inherited from

`AutoCompleteProps.preventOverflow`

***

### readOnly?

> `optional` **readOnly**: `boolean`

Make the control readonly

#### Inherited from

`AutoCompleteProps.readOnly`

***

### renderExtraFooter()?

> `optional` **renderExtraFooter**: () => `ReactNode`

Custom render extra footer

#### Returns

`ReactNode`

#### Inherited from

`AutoCompleteProps.renderExtraFooter`

***

### renderMenu()?

> `optional` **renderMenu**: (`menu`) => `ReactNode`

Customizing the Rendering Menu list

#### Parameters

##### menu

`ReactNode`

#### Returns

`ReactNode`

#### Inherited from

`AutoCompleteProps.renderMenu`

***

### renderMenuItem()?

> `optional` **renderMenuItem**: (`label`, `item`) => `ReactNode`

Custom selected option

#### Parameters

##### label

`ReactNode`

##### item

`ItemDataType`

#### Returns

`ReactNode`

#### Inherited from

`AutoCompleteProps.renderMenuItem`

***

### selectOnEnter?

> `optional` **selectOnEnter**: `boolean`

When set to false, the Enter key selection function is invalid

#### Inherited from

`AutoCompleteProps.selectOnEnter`

***

### size?

> `optional` **size**: `Size`

A component can have different sizes

#### Inherited from

`AutoCompleteProps.size`

***

### style?

> `optional` **style**: `CSSProperties`

The component styles.

#### Overrides

`AutoCompleteProps.style`

***

### toggleAs?

> `optional` **toggleAs**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`AutoCompleteProps.toggleAs`

***

### value?

> `optional` **value**: `string`

Current value of the component. Creates a controlled component

#### Inherited from

`AutoCompleteProps.value`

***

### valueKey?

> `optional` **valueKey**: `string`

The key to use for setting the option value in the data.

#### Default

```ts
value
```

#### Inherited from

`AutoCompleteProps.valueKey`

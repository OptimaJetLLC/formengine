# Interface: RsSearchProps

Props for the RsSearch component.

## Extends

- `InputPickerProps`
- `LoadDataProps`

## Properties

### appearance?

> `optional` **appearance?**: `PickerAppearance`

A picker can have different appearances.

#### Inherited from

`InputPickerProps.appearance`

***

### as?

> `optional` **as?**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`InputPickerProps.as`

***

### block?

> `optional` **block?**: `boolean`

Format picker to appear inside a content block

#### Inherited from

`InputPickerProps.block`

***

### cacheData?

> `optional` **cacheData?**: `InputItemDataType`\<`any`\>[]

Option to cache value when searching asynchronously

#### Inherited from

`InputPickerProps.cacheData`

***

### caretAs?

> `optional` **caretAs?**: `ElementType`\<`any`, keyof IntrinsicElements\>

Custom caret component

#### Inherited from

`InputPickerProps.caretAs`

***

### children?

> `optional` **children?**: `ReactNode`

Primary content

#### Inherited from

`InputPickerProps.children`

***

### childrenKey?

> `optional` **childrenKey?**: `string`

The key to use for setting the children in the data.

#### Default

```ts
children
```

#### Inherited from

`InputPickerProps.childrenKey`

***

### className?

> `optional` **className?**: `string`

Additional classes

#### Inherited from

`InputPickerProps.className`

***

### classPrefix?

> `optional` **classPrefix?**: `string`

The prefix of the component CSS class

#### Inherited from

`InputPickerProps.classPrefix`

***

### cleanable?

> `optional` **cleanable?**: `boolean`

A picker that can clear values

#### Inherited from

`InputPickerProps.cleanable`

***

### container?

> `optional` **container?**: (() => `HTMLElement`) \| `HTMLElement`

Sets the rendering container

#### Inherited from

`InputPickerProps.container`

***

### containerPadding?

> `optional` **containerPadding?**: `number`

Set the padding of the container.

#### Inherited from

`InputPickerProps.containerPadding`

***

### creatable?

> `optional` **creatable?**: `boolean`

Settings can create new options

#### Inherited from

`RsSearchProps`.[`creatable`](#creatable)

***

### data

> **data**: `InputItemDataType`\<`number` \| `string`\>[]

The data of the component.

#### Inherited from

`InputPickerProps.data`

***

### defaultOpen?

> `optional` **defaultOpen?**: `boolean`

Initial open menu

#### Inherited from

`InputPickerProps.defaultOpen`

***

### defaultValue?

> `optional` **defaultValue?**: `any`

Initial value

#### Inherited from

`InputPickerProps.defaultValue`

***

### disabled?

> `optional` **disabled?**: `boolean`

A picker can show it is currently unable to be interacted with

#### Inherited from

`InputPickerProps.disabled`

***

### disabledItemValues?

> `optional` **disabledItemValues?**: `any`

Disabled items

#### Inherited from

`InputPickerProps.disabledItemValues`

***

### disableVirtualized?

> `optional` **disableVirtualized?**: `boolean`

Flag, if true, the virtualized will be disabled, false otherwise.

#### Inherited from

`LoadDataProps.disableVirtualized`

***

### groupBy?

> `optional` **groupBy?**: `string`

Set group condition key in data

#### Inherited from

`InputPickerProps.groupBy`

***

### id?

> `optional` **id?**: `string`

#### Inherited from

`InputPickerProps.id`

***

### label

> **label**: `string`

The label for the search input.

***

### labelKey?

> `optional` **labelKey?**: `string`

The key to use for displaying the options in the data.

#### Default

```ts
label
```

#### Inherited from

`InputPickerProps.labelKey`

***

### listProps?

> `optional` **listProps?**: `Partial`\<`ListProps`\<`any`\>\>

Virtualized List Props

#### Inherited from

`InputPickerProps.listProps`

***

### loading?

> `optional` **loading?**: `boolean`

Whether to display an loading indicator on toggle button

#### Inherited from

`InputPickerProps.loading`

***

### locale?

> `optional` **locale?**: `Partial`\<`InputPickerLocale`\>

Custom locale

#### Inherited from

`InputPickerProps.locale`

***

### menuAutoWidth?

> `optional` **menuAutoWidth?**: `boolean`

Picker menu auto width

#### Inherited from

`InputPickerProps.menuAutoWidth`

***

### menuClassName?

> `optional` **menuClassName?**: `string`

A CSS class to apply to the Menu DOM node.

#### Inherited from

`InputPickerProps.menuClassName`

***

### menuMaxHeight?

> `optional` **menuMaxHeight?**: `number`

Picker menu max Height

#### Inherited from

`InputPickerProps.menuMaxHeight`

***

### menuStyle?

> `optional` **menuStyle?**: `CSSProperties`

A style to apply to the Menu DOM node.

#### Inherited from

`InputPickerProps.menuStyle`

***

### name?

> `optional` **name?**: `string`

Name of the form field

#### Inherited from

`InputPickerProps.name`

***

### onBlur?

> `optional` **onBlur?**: `FocusEventHandler`\<`Element`\>

The `onBlur` attribute for the `input` element.

#### Inherited from

`RsSearchProps`.[`onBlur`](#onblur)

***

### onChange?

> `optional` **onChange?**: (`value`) => `void`

Called after the value has been changed.

#### Parameters

##### value

`any`

the value.

#### Returns

`void`

#### Overrides

`InputPickerProps.onChange`

***

### onClean?

> `optional` **onClean?**: (`event`) => `void`

Called when clean

#### Parameters

##### event

`SyntheticEvent`

#### Returns

`void`

#### Inherited from

`InputPickerProps.onClean`

***

### onClose?

> `optional` **onClose?**: () => `void`

Called when Modal is closed

#### Returns

`void`

#### Inherited from

`InputPickerProps.onClose`

***

### onCreate?

> `optional` **onCreate?**: (`value`, `item`, `event`) => `void`

Called when the option is created

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

`InputPickerProps.onCreate`

***

### onEnter?

> `optional` **onEnter?**: (`node`) => `void`

Callback fired before the Modal transitions in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`InputPickerProps.onEnter`

***

### onEntered?

> `optional` **onEntered?**: (`node`) => `void`

Callback fired after the Modal finishes transitioning in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`InputPickerProps.onEntered`

***

### onEntering?

> `optional` **onEntering?**: (`node`) => `void`

Callback fired as the Modal begins to transition in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`InputPickerProps.onEntering`

***

### onExit?

> `optional` **onExit?**: (`node`) => `void`

Callback fired right before the Modal transitions out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`InputPickerProps.onExit`

***

### onExited?

> `optional` **onExited?**: (`node`) => `void`

Callback fired after the Modal finishes transitioning out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`InputPickerProps.onExited`

***

### onExiting?

> `optional` **onExiting?**: (`node`) => `void`

Callback fired as the Modal begins to transition out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`InputPickerProps.onExiting`

***

### onFocus?

> `optional` **onFocus?**: `FocusEventHandler`\<`Element`\>

The `onFocus` attribute for the `input` element.

#### Inherited from

`RsSearchProps`.[`onFocus`](#onfocus)

***

### onGroupTitleClick?

> `optional` **onGroupTitleClick?**: (`event`) => `void`

Called after clicking the group title

#### Parameters

##### event

`SyntheticEvent`

#### Returns

`void`

#### Inherited from

`InputPickerProps.onGroupTitleClick`

***

### onLoadData?

> `optional` **onLoadData?**: [`LoadDataHandler`](../type-aliases/LoadDataHandler.md)

The callback function called when data should be load.

#### Inherited from

`LoadDataProps.onLoadData`

***

### onOpen?

> `optional` **onOpen?**: () => `void`

Called when Modal is displayed

#### Returns

`void`

#### Inherited from

`InputPickerProps.onOpen`

***

### onSearch?

> `optional` **onSearch?**: (`searchKeyword`, `event?`) => `void`

Called when searching

#### Parameters

##### searchKeyword

`string`

##### event?

`SyntheticEvent`\<`Element`, `Event`\>

#### Returns

`void`

#### Inherited from

`InputPickerProps.onSearch`

***

### onSelect?

> `optional` **onSelect?**: (`value`, `item`, `event`) => `void`

Called when the option is selected

#### Parameters

##### value

`any`

##### item

`ItemDataType`\<`any`\>

##### event

`SyntheticEvent`

#### Returns

`void`

#### Inherited from

`InputPickerProps.onSelect`

***

### open?

> `optional` **open?**: `boolean`

Open the menu and control it

#### Inherited from

`InputPickerProps.open`

***

### placeholder?

> `optional` **placeholder?**: `ReactNode`

Placeholder text

#### Inherited from

`InputPickerProps.placeholder`

***

### placement?

> `optional` **placement?**: `Placement`

The placement of picker

#### Inherited from

`InputPickerProps.placement`

***

### plaintext?

> `optional` **plaintext?**: `boolean`

Render the control as plain text

#### Inherited from

`InputPickerProps.plaintext`

***

### preload?

> `optional` **preload?**: `boolean`

Flag, if true, the data will be loaded in advance, before opening the dropdown, false otherwise.

#### Inherited from

`LoadDataProps.preload`

***

### preventOverflow?

> `optional` **preventOverflow?**: `boolean`

Prevent floating element overflow

#### Inherited from

`InputPickerProps.preventOverflow`

***

### readOnly?

> `optional` **readOnly?**: `boolean`

Make the control readonly

#### Inherited from

`InputPickerProps.readOnly`

***

### renderExtraFooter?

> `optional` **renderExtraFooter?**: () => `ReactNode`

Custom render extra footer

#### Returns

`ReactNode`

#### Inherited from

`InputPickerProps.renderExtraFooter`

***

### renderMenu?

> `optional` **renderMenu?**: (`menu`) => `ReactNode`

Customizing the Rendering Menu list

#### Parameters

##### menu

`ReactNode`

#### Returns

`ReactNode`

#### Inherited from

`InputPickerProps.renderMenu`

***

### renderMenuGroup?

> `optional` **renderMenuGroup?**: (`title`, `item`) => `ReactNode`

Custom render menu group

#### Parameters

##### title

`ReactNode`

##### item

`ItemDataType`

#### Returns

`ReactNode`

#### Inherited from

`InputPickerProps.renderMenuGroup`

***

### renderMenuItem?

> `optional` **renderMenuItem?**: (`label`, `item`) => `ReactNode`

Custom render menuItems

#### Parameters

##### label

`ReactNode`

##### item

`ItemDataType`

#### Returns

`ReactNode`

#### Inherited from

`InputPickerProps.renderMenuItem`

***

### renderValue?

> `optional` **renderValue?**: (`value`, `item`, `selectedElement`) => `ReactNode`

#### Parameters

##### value

`any`

##### item

`ItemDataType`\<`any`\>

##### selectedElement

`ReactNode`

#### Returns

`ReactNode`

#### Inherited from

`InputPickerProps.renderValue`

***

### searchable?

> `optional` **searchable?**: `boolean`

Whether dispaly search input box

#### Inherited from

`InputPickerProps.searchable`

***

### searchBy?

> `optional` **searchBy?**: (`keyword`, `label`, `item`) => `boolean`

Custom search rules.

#### Parameters

##### keyword

`string`

##### label

`ReactNode`

##### item

`ItemDataType`

#### Returns

`boolean`

#### Inherited from

`InputPickerProps.searchBy`

***

### shouldDisplayCreateOption?

> `optional` **shouldDisplayCreateOption?**: (`searchKeyword`, `filteredData`) => `boolean`

Customize whether to display "Create option" action with given textbox value

By default, InputPicker hides "Create option" action when textbox value matches any filtered item's [valueKey] property

#### Parameters

##### searchKeyword

`string`

Value of the textbox

##### filteredData

`InputItemDataType`\<`any`\>[]

The items filtered by the searchKeyword

#### Returns

`boolean`

#### Inherited from

`InputPickerProps.shouldDisplayCreateOption`

***

### size?

> `optional` **size?**: `Size`

A picker can have different sizes

#### Inherited from

`InputPickerProps.size`

***

### sort?

> `optional` **sort?**: (`isGroup`) => (`a`, `b`) => `number`

Sort options

#### Parameters

##### isGroup

`boolean`

#### Returns

(`a`, `b`) => `number`

#### Inherited from

`InputPickerProps.sort`

***

### style?

> `optional` **style?**: `CSSProperties`

Additional style

#### Inherited from

`InputPickerProps.style`

***

### tabIndex?

> `optional` **tabIndex?**: `number`

#### Inherited from

`RsSearchProps`.[`tabIndex`](#tabindex)

***

### toggleAs?

> `optional` **toggleAs?**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`InputPickerProps.toggleAs`

***

### value?

> `optional` **value?**: `any`

Current value of the component. Creates a controlled component

#### Inherited from

`InputPickerProps.value`

***

### valueKey?

> `optional` **valueKey?**: `string`

The key to use for setting the option value in the data.

#### Default

```ts
value
```

#### Inherited from

`InputPickerProps.valueKey`

***

### virtualized?

> `optional` **virtualized?**: `boolean`

Whether using virtualized list

#### Inherited from

`InputPickerProps.virtualized`

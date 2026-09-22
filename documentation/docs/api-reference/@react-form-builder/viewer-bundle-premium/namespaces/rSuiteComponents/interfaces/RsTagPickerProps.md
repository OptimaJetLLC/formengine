# Interface: RsTagPickerProps

Props for the RsTagPicker component.

## Extends

- `TagPickerProps`

## Properties

### appearance?

> `optional` **appearance?**: `PickerAppearance`

A picker can have different appearances.

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`appearance`](RsDropdownProps.md#appearance)

***

### as?

> `optional` **as?**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`TagPickerProps.as`

***

### block?

> `optional` **block?**: `boolean`

Format picker to appear inside a content block

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`block`](RsDropdownProps.md#block)

***

### cacheData?

> `optional` **cacheData?**: `InputItemDataType`\<`any`\>[]

Option to cache value when searching asynchronously

#### Inherited from

`TagPickerProps.cacheData`

***

### caretAs?

> `optional` **caretAs?**: `ElementType`\<`any`, keyof IntrinsicElements\>

Custom caret component

#### Inherited from

`TagPickerProps.caretAs`

***

### children?

> `optional` **children?**: `ReactNode`

Primary content

#### Inherited from

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`children`](RsAutoCompleteProps.md#children)

***

### childrenKey?

> `optional` **childrenKey?**: `string`

The key to use for setting the children in the data.

#### Default

```ts
children
```

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`childrenKey`](RsDropdownProps.md#childrenkey)

***

### className?

> `optional` **className?**: `string`

Additional classes

#### Inherited from

[`RsBreadcrumbProps`](RsBreadcrumbProps.md).[`className`](RsBreadcrumbProps.md#classname)

***

### classPrefix?

> `optional` **classPrefix?**: `string`

The prefix of the component CSS class

#### Inherited from

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`classPrefix`](RsAutoCompleteProps.md#classprefix)

***

### cleanable?

> `optional` **cleanable?**: `boolean`

A picker that can clear values

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`cleanable`](RsDropdownProps.md#cleanable)

***

### container?

> `optional` **container?**: (() => `HTMLElement`) \| `HTMLElement`

Sets the rendering container

#### Inherited from

`TagPickerProps.container`

***

### containerPadding?

> `optional` **containerPadding?**: `number`

Set the padding of the container.

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`containerPadding`](RsDropdownProps.md#containerpadding)

***

### creatable?

> `optional` **creatable?**: `boolean`

Settings can create new options

#### Inherited from

[`RsSearchProps`](RsSearchProps.md).[`creatable`](RsSearchProps.md#creatable)

***

### data

> **data**: `InputItemDataType`\<`number` \| `string`\>[]

The data of the component.

#### Inherited from

`TagPickerProps.data`

***

### defaultOpen?

> `optional` **defaultOpen?**: `boolean`

Initial open menu

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`defaultOpen`](RsDropdownProps.md#defaultopen)

***

### defaultValue?

> `optional` **defaultValue?**: `any`

Initial value

#### Inherited from

`TagPickerProps.defaultValue`

***

### disabled?

> `optional` **disabled?**: `boolean`

A picker can show it is currently unable to be interacted with

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`disabled`](RsDropdownProps.md#disabled)

***

### disabledItemValues?

> `optional` **disabledItemValues?**: `any`

Disabled items

#### Inherited from

`TagPickerProps.disabledItemValues`

***

### groupBy?

> `optional` **groupBy?**: `string`

Set group condition key in data

#### Inherited from

`TagPickerProps.groupBy`

***

### id?

> `optional` **id?**: `string`

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`id`](RsDropdownProps.md#id)

***

### label

> **label**: `string`

Label for the tag picker.

***

### labelKey?

> `optional` **labelKey?**: `string`

The key to use for displaying the options in the data.

#### Default

```ts
label
```

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`labelKey`](RsDropdownProps.md#labelkey)

***

### listProps?

> `optional` **listProps?**: `Partial`\<`ListProps`\<`any`\>\>

Virtualized List Props

#### Inherited from

`TagPickerProps.listProps`

***

### loading?

> `optional` **loading?**: `boolean`

Whether to display an loading indicator on toggle button

#### Inherited from

`TagPickerProps.loading`

***

### locale?

> `optional` **locale?**: `Partial`\<`InputPickerLocale`\>

Custom locale

#### Inherited from

`TagPickerProps.locale`

***

### menuAutoWidth?

> `optional` **menuAutoWidth?**: `boolean`

Picker menu auto width

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`menuAutoWidth`](RsDropdownProps.md#menuautowidth)

***

### menuClassName?

> `optional` **menuClassName?**: `string`

A CSS class to apply to the Menu DOM node.

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`menuClassName`](RsDropdownProps.md#menuclassname)

***

### menuMaxHeight?

> `optional` **menuMaxHeight?**: `number`

Picker menu max Height

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`menuMaxHeight`](RsDropdownProps.md#menumaxheight)

***

### menuStyle?

> `optional` **menuStyle?**: `CSSProperties`

A style to apply to the Menu DOM node.

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`menuStyle`](RsDropdownProps.md#menustyle)

***

### name?

> `optional` **name?**: `string`

Name of the form field

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`name`](RsDropdownProps.md#name)

***

### onBlur?

> `optional` **onBlur?**: `FocusEventHandler`\<`Element`\>

The `onBlur` attribute for the `input` element.

#### Inherited from

[`RsSearchProps`](RsSearchProps.md).[`onBlur`](RsSearchProps.md#onblur)

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

`TagPickerProps.onChange`

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

`TagPickerProps.onClean`

***

### onClose?

> `optional` **onClose?**: () => `void`

Called when Modal is closed

#### Returns

`void`

#### Inherited from

`TagPickerProps.onClose`

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

`TagPickerProps.onCreate`

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

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`onEnter`](RsAutoCompleteProps.md#onenter)

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

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`onEntered`](RsAutoCompleteProps.md#onentered)

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

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`onEntering`](RsAutoCompleteProps.md#onentering)

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

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`onExit`](RsAutoCompleteProps.md#onexit)

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

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`onExited`](RsAutoCompleteProps.md#onexited)

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

[`RsAutoCompleteProps`](RsAutoCompleteProps.md).[`onExiting`](RsAutoCompleteProps.md#onexiting)

***

### onFocus?

> `optional` **onFocus?**: `FocusEventHandler`\<`Element`\>

The `onFocus` attribute for the `input` element.

#### Inherited from

[`RsSearchProps`](RsSearchProps.md).[`onFocus`](RsSearchProps.md#onfocus)

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

`TagPickerProps.onGroupTitleClick`

***

### onOpen?

> `optional` **onOpen?**: () => `void`

Called when Modal is displayed

#### Returns

`void`

#### Inherited from

`TagPickerProps.onOpen`

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

`TagPickerProps.onSearch`

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

`TagPickerProps.onSelect`

***

### onTagRemove?

> `optional` **onTagRemove?**: (`tag`, `event`) => `void`

Callback fired when a tag is removed.

#### Parameters

##### tag

`string`

##### event

`MouseEvent`

#### Returns

`void`

#### Inherited from

`TagPickerProps.onTagRemove`

***

### open?

> `optional` **open?**: `boolean`

Open the menu and control it

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`open`](RsDropdownProps.md#open)

***

### placeholder?

> `optional` **placeholder?**: `ReactNode`

Placeholder text

#### Inherited from

`TagPickerProps.placeholder`

***

### placement?

> `optional` **placement?**: `Placement`

The placement of picker

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`placement`](RsDropdownProps.md#placement)

***

### plaintext?

> `optional` **plaintext?**: `boolean`

Render the control as plain text

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`plaintext`](RsDropdownProps.md#plaintext)

***

### preventOverflow?

> `optional` **preventOverflow?**: `boolean`

Prevent floating element overflow

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`preventOverflow`](RsDropdownProps.md#preventoverflow)

***

### readOnly?

> `optional` **readOnly?**: `boolean`

Make the control readonly

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`readOnly`](RsDropdownProps.md#readonly)

***

### renderExtraFooter?

> `optional` **renderExtraFooter?**: () => `ReactNode`

Custom render extra footer

#### Returns

`ReactNode`

#### Inherited from

`TagPickerProps.renderExtraFooter`

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

`TagPickerProps.renderMenu`

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

`TagPickerProps.renderMenuGroup`

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

`TagPickerProps.renderMenuItem`

***

### renderMenuItemCheckbox?

> `optional` **renderMenuItemCheckbox?**: (`checkboxProps`) => `ReactNode`

Custom render checkbox on menu item

#### Parameters

##### checkboxProps

`CheckboxProps`

#### Returns

`ReactNode`

#### Version

5.47.0

#### Inherited from

`TagPickerProps.renderMenuItemCheckbox`

***

### renderValue?

> `optional` **renderValue?**: (`values`, `items`, `selectedElement`) => `ReactNode`

Custom render selected items

#### Parameters

##### values

`any`[]

##### items

`ItemDataType`\<`any`\>[]

##### selectedElement

`ReactNode`

#### Returns

`ReactNode`

#### Inherited from

`TagPickerProps.renderValue`

***

### searchable?

> `optional` **searchable?**: `boolean`

Whether dispaly search input box

#### Inherited from

`TagPickerProps.searchable`

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

`TagPickerProps.searchBy`

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

`TagPickerProps.shouldDisplayCreateOption`

***

### size?

> `optional` **size?**: `Size`

A picker can have different sizes

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`size`](RsDropdownProps.md#size)

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

`TagPickerProps.sort`

***

### style?

> `optional` **style?**: `CSSProperties`

Additional style

#### Inherited from

[`RsBreadcrumbProps`](RsBreadcrumbProps.md).[`style`](RsBreadcrumbProps.md#style)

***

### tabIndex?

> `optional` **tabIndex?**: `number`

#### Inherited from

[`RsSearchProps`](RsSearchProps.md).[`tabIndex`](RsSearchProps.md#tabindex)

***

### tagProps?

> `optional` **tagProps?**: `TagProps`

Tag related props.

#### Inherited from

`TagPickerProps.tagProps`

***

### toggleAs?

> `optional` **toggleAs?**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`toggleAs`](RsDropdownProps.md#toggleas)

***

### trigger?

> `optional` **trigger?**: `TriggerType`[] \| `TriggerType`

Set the trigger for creating tags. only valid when creatable

#### Inherited from

`TagPickerProps.trigger`

***

### value?

> `optional` **value?**: `any`

Current value of the component. Creates a controlled component

#### Inherited from

`TagPickerProps.value`

***

### valueKey?

> `optional` **valueKey?**: `string`

The key to use for setting the option value in the data.

#### Default

```ts
value
```

#### Inherited from

[`RsDropdownProps`](RsDropdownProps.md).[`valueKey`](RsDropdownProps.md#valuekey)

***

### virtualized?

> `optional` **virtualized?**: `boolean`

Whether using virtualized list

#### Inherited from

`TagPickerProps.virtualized`

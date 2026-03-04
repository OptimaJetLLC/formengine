# Interface: RsDatePickerProps

Props for the RsDatePicker component.

## Extends

- `DatePickerProps`

## Properties

### appearance?

> `optional` **appearance**: `PickerAppearance`

A picker can have different appearances.

#### Inherited from

`DatePickerProps.appearance`

***

### as?

> `optional` **as**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`DatePickerProps.as`

***

### block?

> `optional` **block**: `boolean`

Format picker to appear inside a content block

#### Inherited from

`DatePickerProps.block`

***

### calendarDefaultDate?

> `optional` **calendarDefaultDate**: `Date`

Calendar panel default presentation date and time

#### Inherited from

`DatePickerProps.calendarDefaultDate`

***

### caretAs?

> `optional` **caretAs**: `ElementType`\<`any`, keyof IntrinsicElements\> \| `null`

Custom caret component

#### Inherited from

`DatePickerProps.caretAs`

***

### children?

> `optional` **children**: `ReactNode`

Primary content

#### Inherited from

`DatePickerProps.children`

***

### className?

> `optional` **className**: `string`

Additional classes

#### Inherited from

`DatePickerProps.className`

***

### classPrefix?

> `optional` **classPrefix**: `string`

The prefix of the component CSS class

#### Inherited from

`DatePickerProps.classPrefix`

***

### cleanable?

> `optional` **cleanable**: `boolean`

A picker that can clear values

#### Inherited from

`DatePickerProps.cleanable`

***

### container?

> `optional` **container**: () => `HTMLElement` \| `HTMLElement`

Sets the rendering container

#### Inherited from

`DatePickerProps.container`

***

### containerPadding?

> `optional` **containerPadding**: `number`

Set the padding of the container.

#### Inherited from

`DatePickerProps.containerPadding`

***

### defaultOpen?

> `optional` **defaultOpen**: `boolean`

Initial open menu

#### Inherited from

`DatePickerProps.defaultOpen`

***

### defaultValue?

> `optional` **defaultValue**: `Date` \| `null`

Initial value

#### Inherited from

`DatePickerProps.defaultValue`

***

### disabled?

> `optional` **disabled**: `boolean`

Whether disabled the component

#### Inherited from

`DatePickerProps.disabled`

***

### ~~disabledDate()?~~

> `optional` **disabledDate**: (`date?`) => `boolean`

Whether to disable a date on the calendar view

#### Parameters

##### date?

`Date`

#### Returns

`boolean`

date should be disabled (not selectable)

#### Deprecated

Use [shouldDisableDate](#shoulddisabledate) instead

#### Inherited from

`DatePickerProps.disabledDate`

***

### ~~disabledHours()?~~

> `optional` **disabledHours**: (`hour`, `date`) => `boolean`

Disabled hours

#### Parameters

##### hour

`number`

##### date

`Date`

#### Returns

`boolean`

#### Deprecated

Use [shouldDisableHour](#shoulddisablehour) instead

#### Inherited from

`DatePickerProps.disabledHours`

***

### ~~disabledMinutes()?~~

> `optional` **disabledMinutes**: (`minute`, `date`) => `boolean`

Disabled minutes

#### Parameters

##### minute

`number`

##### date

`Date`

#### Returns

`boolean`

#### Deprecated

Use [shouldDisableMinute](#shoulddisableminute) instead

#### Inherited from

`DatePickerProps.disabledMinutes`

***

### ~~disabledSeconds()?~~

> `optional` **disabledSeconds**: (`second`, `date`) => `boolean`

Disabled seconds

#### Parameters

##### second

`number`

##### date

`Date`

#### Returns

`boolean`

#### Deprecated

Use [shouldDisableSecond](#shoulddisablesecond) instead

#### Inherited from

`DatePickerProps.disabledSeconds`

***

### editable?

> `optional` **editable**: `boolean`

Rendered as an input, the date can be entered via the keyboard

#### Inherited from

`DatePickerProps.editable`

***

### format?

> `optional` **format**: `string`

Format date string

#### Inherited from

`DatePickerProps.format`

***

### hideHours()?

> `optional` **hideHours**: (`hour`, `date`) => `boolean`

Hide specific hour options

#### Parameters

##### hour

`number`

##### date

`Date`

#### Returns

`boolean`

#### Inherited from

`DatePickerProps.hideHours`

***

### hideMinutes()?

> `optional` **hideMinutes**: (`minute`, `date`) => `boolean`

Hide specific minute options

#### Parameters

##### minute

`number`

##### date

`Date`

#### Returns

`boolean`

#### Inherited from

`DatePickerProps.hideMinutes`

***

### hideSeconds()?

> `optional` **hideSeconds**: (`second`, `date`) => `boolean`

Hide specific second options

#### Parameters

##### second

`number`

##### date

`Date`

#### Returns

`boolean`

#### Inherited from

`DatePickerProps.hideSeconds`

***

### id?

> `optional` **id**: `string`

#### Inherited from

`DatePickerProps.id`

***

### ~~inline?~~

> `optional` **inline**: `boolean`

#### Deprecated

#### Overrides

`DatePickerProps.inline`

***

### isoWeek?

> `optional` **isoWeek**: `boolean`

ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day

#### See

https://en.wikipedia.org/wiki/ISO_week_date

#### Inherited from

`DatePickerProps.isoWeek`

***

### label

> **label**: `string`

Label for the date picker.

#### Overrides

`DatePickerProps.label`

***

### limitEndYear?

> `optional` **limitEndYear**: `number`

Set the upper limit of the available year relative to the current selection date

#### Inherited from

`DatePickerProps.limitEndYear`

***

### limitStartYear?

> `optional` **limitStartYear**: `number`

Set the lower limit of the available year relative to the current selection date

#### Inherited from

`DatePickerProps.limitStartYear`

***

### loading?

> `optional` **loading**: `boolean`

Whether to display a loading state indicator

#### Inherited from

`DatePickerProps.loading`

***

### locale?

> `optional` **locale**: `Partial`\<`DatePickerLocale`\>

Custom locale

#### Inherited from

`DatePickerProps.locale`

***

### menuAutoWidth?

> `optional` **menuAutoWidth**: `boolean`

Picker menu auto width

#### Inherited from

`DatePickerProps.menuAutoWidth`

***

### menuClassName?

> `optional` **menuClassName**: `string`

A CSS class to apply to the Menu DOM node.

#### Inherited from

`DatePickerProps.menuClassName`

***

### menuMaxHeight?

> `optional` **menuMaxHeight**: `number`

Picker menu max Height

#### Inherited from

`DatePickerProps.menuMaxHeight`

***

### menuStyle?

> `optional` **menuStyle**: `CSSProperties`

A style to apply to the Menu DOM node.

#### Inherited from

`DatePickerProps.menuStyle`

***

### monthDropdownProps?

> `optional` **monthDropdownProps**: `MonthDropdownProps`

The props for the Month Dropdown component.

#### Inherited from

`DatePickerProps.monthDropdownProps`

***

### name?

> `optional` **name**: `string`

Name of the form field

#### Inherited from

`DatePickerProps.name`

***

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`any`\>

Called when the component is blurred.

#### Inherited from

`DatePickerProps.onBlur`

***

### onChange()?

> `optional` **onChange**: (`value`) => `void`

Called after the value has been changed.

#### Parameters

##### value

the value.

`Date` | `null`

#### Returns

`void`

#### Overrides

`DatePickerProps.onChange`

***

### onChangeCalendarDate()?

> `optional` **onChangeCalendarDate**: (`date`, `event?`) => `void`

Called when the calendar panel date changes

#### Parameters

##### date

`Date`

##### event?

`SyntheticEvent`\<`Element`, `Event`\>

#### Returns

`void`

#### Inherited from

`DatePickerProps.onChangeCalendarDate`

***

### onClean()?

> `optional` **onClean**: (`event`) => `void`

Called when clean

#### Parameters

##### event

`MouseEvent`

#### Returns

`void`

#### Inherited from

`DatePickerProps.onClean`

***

### onClose()?

> `optional` **onClose**: () => `void`

Called when Modal is closed

#### Returns

`void`

#### Inherited from

`DatePickerProps.onClose`

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

`DatePickerProps.onEnter`

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

`DatePickerProps.onEntered`

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

`DatePickerProps.onEntering`

***

### oneTap?

> `optional` **oneTap**: `boolean`

One-click selection date

#### Inherited from

`DatePickerProps.oneTap`

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

`DatePickerProps.onExit`

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

`DatePickerProps.onExited`

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

`DatePickerProps.onExiting`

***

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`any`\>

Called when the component is focused.

#### Inherited from

`DatePickerProps.onFocus`

***

### onNextMonth()?

> `optional` **onNextMonth**: (`date`) => `void`

Called after the next month

#### Parameters

##### date

`Date`

#### Returns

`void`

#### Inherited from

`DatePickerProps.onNextMonth`

***

### onOk()?

> `optional` **onOk**: (`date`, `event`) => `void`

Called after clicking the OK button

#### Parameters

##### date

`Date`

##### event

`SyntheticEvent`

#### Returns

`void`

#### Inherited from

`DatePickerProps.onOk`

***

### onOpen()?

> `optional` **onOpen**: () => `void`

Called when Modal is displayed

#### Returns

`void`

#### Inherited from

`DatePickerProps.onOpen`

***

### onPrevMonth()?

> `optional` **onPrevMonth**: (`date`) => `void`

Called after the prev month

#### Parameters

##### date

`Date`

#### Returns

`void`

#### Inherited from

`DatePickerProps.onPrevMonth`

***

### onSelect()?

> `optional` **onSelect**: (`date`, `event?`) => `void`

Called when the option is selected

#### Parameters

##### date

`Date`

##### event?

`SyntheticEvent`\<`Element`, `Event`\>

#### Returns

`void`

#### Inherited from

`DatePickerProps.onSelect`

***

### onShortcutClick()?

> `optional` **onShortcutClick**: (`range`, `event`) => `void`

Called after clicking the shortcut button

#### Parameters

##### range

`RangeType`\<`Date`\>

##### event

`MouseEvent`

#### Returns

`void`

#### Inherited from

`DatePickerProps.onShortcutClick`

***

### onToggleMonthDropdown()?

> `optional` **onToggleMonthDropdown**: (`toggle`) => `void`

Called when opening the month view

#### Parameters

##### toggle

`boolean`

#### Returns

`void`

#### Inherited from

`DatePickerProps.onToggleMonthDropdown`

***

### onToggleTimeDropdown()?

> `optional` **onToggleTimeDropdown**: (`toggle`) => `void`

Called when opening the time view

#### Parameters

##### toggle

`boolean`

#### Returns

`void`

#### Inherited from

`DatePickerProps.onToggleTimeDropdown`

***

### open?

> `optional` **open**: `boolean`

Open the menu and control it

#### Inherited from

`DatePickerProps.open`

***

### placeholder?

> `optional` **placeholder**: `ReactNode`

Placeholder text

#### Inherited from

`DatePickerProps.placeholder`

***

### placement?

> `optional` **placement**: `Placement`

The placement of picker

#### Inherited from

`DatePickerProps.placement`

***

### plaintext?

> `optional` **plaintext**: `boolean`

Whether plaintext the component

#### Inherited from

`DatePickerProps.plaintext`

***

### preventOverflow?

> `optional` **preventOverflow**: `boolean`

Prevent floating element overflow

#### Inherited from

`DatePickerProps.preventOverflow`

***

### ranges?

> `optional` **ranges**: `RangeType`\<`Date`\>[]

Predefined date Ranges

#### Inherited from

`DatePickerProps.ranges`

***

### readOnly?

> `optional` **readOnly**: `boolean`

Whether read only the component

#### Inherited from

`DatePickerProps.readOnly`

***

### renderCell()?

> `optional` **renderCell**: (`date`) => `ReactNode`

Custom rendering calendar cell content.

#### Parameters

##### date

`Date`

#### Returns

`ReactNode`

#### Version

5.54.0

#### Inherited from

`DatePickerProps.renderCell`

***

### renderExtraFooter()?

> `optional` **renderExtraFooter**: () => `ReactNode`

Custom render extra footer

#### Returns

`ReactNode`

#### Inherited from

`DatePickerProps.renderExtraFooter`

***

### renderValue()?

> `optional` **renderValue**: (`value`, `format`) => `string`

Custom rendering of the selected date.

#### Parameters

##### value

`Date`

##### format

`string`

#### Returns

`string`

#### Inherited from

`DatePickerProps.renderValue`

***

### shouldDisableDate()?

> `optional` **shouldDisableDate**: (`date`) => `boolean`

Whether a date on the calendar view should be disabled

#### Parameters

##### date

`Date`

#### Returns

`boolean`

date should be disabled (not selectable)

#### Inherited from

`DatePickerProps.shouldDisableDate`

***

### shouldDisableHour()?

> `optional` **shouldDisableHour**: (`hour`, `date`) => `boolean`

Disabled hours on the time view

#### Parameters

##### hour

`number`

##### date

`Date`

#### Returns

`boolean`

#### Inherited from

`DatePickerProps.shouldDisableHour`

***

### shouldDisableMinute()?

> `optional` **shouldDisableMinute**: (`minute`, `date`) => `boolean`

Disabled minutes on the time view

#### Parameters

##### minute

`number`

##### date

`Date`

#### Returns

`boolean`

#### Inherited from

`DatePickerProps.shouldDisableMinute`

***

### shouldDisableSecond()?

> `optional` **shouldDisableSecond**: (`second`, `date`) => `boolean`

Disabled seconds on the time view

#### Parameters

##### second

`number`

##### date

`Date`

#### Returns

`boolean`

#### Inherited from

`DatePickerProps.shouldDisableSecond`

***

### ~~showMeridian?~~

> `optional` **showMeridian**: `boolean`

#### Deprecated

Use `showMeridiem` instead

#### Inherited from

`DatePickerProps.showMeridian`

***

### showMeridiem?

> `optional` **showMeridiem**: `boolean`

Meridiem format for 12-hour time

#### Inherited from

`DatePickerProps.showMeridiem`

***

### showWeekNumbers?

> `optional` **showWeekNumbers**: `boolean`

Whether to show week numbers

#### Inherited from

`DatePickerProps.showWeekNumbers`

***

### size?

> `optional` **size**: `Size`

A picker can have different sizes

#### Inherited from

`DatePickerProps.size`

***

### style?

> `optional` **style**: `CSSProperties`

Additional style

#### Inherited from

`DatePickerProps.style`

***

### toggleAs?

> `optional` **toggleAs**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`DatePickerProps.toggleAs`

***

### value?

> `optional` **value**: `Date` \| `null`

Current value of the component. Creates a controlled component

#### Inherited from

`DatePickerProps.value`

***

### weekStart?

> `optional` **weekStart**: `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6`

The index of the first day of the week (0 - Sunday)
If `isoWeek` is `true`, the value of `weekStart` is ignored.

#### Default

```ts
0
```

#### Inherited from

`DatePickerProps.weekStart`

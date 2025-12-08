# Interface: RsTimePickerProps

Props for the RsTimePicker component.

## Extends

- `Omit`\<`DatePickerProps`, `"value"` \| `"onChange"`\>

## Properties

### appearance?

> `optional` **appearance**: `PickerAppearance`

A picker can have different appearances.

#### Inherited from

`Omit.appearance`

***

### as?

> `optional` **as**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`Omit.as`

***

### block?

> `optional` **block**: `boolean`

Format picker to appear inside a content block

#### Inherited from

`Omit.block`

***

### calendarDefaultDate?

> `optional` **calendarDefaultDate**: `Date`

Calendar panel default presentation date and time

#### Inherited from

`Omit.calendarDefaultDate`

***

### caretAs?

> `optional` **caretAs**: `null` \| `ElementType`\<`any`, keyof IntrinsicElements\>

Custom caret component

#### Inherited from

`Omit.caretAs`

***

### children?

> `optional` **children**: `ReactNode`

Primary content

#### Inherited from

`Omit.children`

***

### className?

> `optional` **className**: `string`

Additional classes

#### Inherited from

`Omit.className`

***

### classPrefix?

> `optional` **classPrefix**: `string`

The prefix of the component CSS class

#### Inherited from

`Omit.classPrefix`

***

### cleanable?

> `optional` **cleanable**: `boolean`

A picker that can clear values

#### Inherited from

`Omit.cleanable`

***

### container?

> `optional` **container**: `HTMLElement` \| () => `HTMLElement`

Sets the rendering container

#### Inherited from

`Omit.container`

***

### containerPadding?

> `optional` **containerPadding**: `number`

Set the padding of the container.

#### Inherited from

`Omit.containerPadding`

***

### defaultOpen?

> `optional` **defaultOpen**: `boolean`

Initial open menu

#### Inherited from

`Omit.defaultOpen`

***

### defaultValue?

> `optional` **defaultValue**: `null` \| `Date`

Initial value

#### Inherited from

`Omit.defaultValue`

***

### disabled?

> `optional` **disabled**: `boolean`

Whether disabled the component

#### Inherited from

`Omit.disabled`

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

`Omit.disabledDate`

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

`Omit.disabledHours`

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

`Omit.disabledMinutes`

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

`Omit.disabledSeconds`

***

### editable?

> `optional` **editable**: `boolean`

Rendered as an input, the date can be entered via the keyboard

#### Inherited from

`Omit.editable`

***

### format?

> `optional` **format**: `string`

Format date string

#### Inherited from

`Omit.format`

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

`Omit.hideHours`

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

`Omit.hideMinutes`

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

`Omit.hideSeconds`

***

### id?

> `optional` **id**: `string`

#### Inherited from

`Omit.id`

***

### ~~inline?~~

> `optional` **inline**: `boolean`

#### Deprecated

#### Overrides

`Omit.inline`

***

### isoWeek?

> `optional` **isoWeek**: `boolean`

ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day

#### See

https://en.wikipedia.org/wiki/ISO_week_date

#### Inherited from

`Omit.isoWeek`

***

### label

> **label**: `string`

Label for the time picker.

#### Overrides

`Omit.label`

***

### limitEndYear?

> `optional` **limitEndYear**: `number`

Set the upper limit of the available year relative to the current selection date

#### Inherited from

`Omit.limitEndYear`

***

### limitStartYear?

> `optional` **limitStartYear**: `number`

Set the lower limit of the available year relative to the current selection date

#### Inherited from

`Omit.limitStartYear`

***

### loading?

> `optional` **loading**: `boolean`

Whether to display a loading state indicator

#### Inherited from

`Omit.loading`

***

### locale?

> `optional` **locale**: `Partial`\<`DatePickerLocale`\>

Custom locale

#### Inherited from

`Omit.locale`

***

### menuAutoWidth?

> `optional` **menuAutoWidth**: `boolean`

Picker menu auto width

#### Inherited from

`Omit.menuAutoWidth`

***

### menuClassName?

> `optional` **menuClassName**: `string`

A CSS class to apply to the Menu DOM node.

#### Inherited from

`Omit.menuClassName`

***

### menuMaxHeight?

> `optional` **menuMaxHeight**: `number`

Picker menu max Height

#### Inherited from

`Omit.menuMaxHeight`

***

### menuStyle?

> `optional` **menuStyle**: `CSSProperties`

A style to apply to the Menu DOM node.

#### Inherited from

`Omit.menuStyle`

***

### monthDropdownProps?

> `optional` **monthDropdownProps**: `MonthDropdownProps`

The props for the Month Dropdown component.

#### Inherited from

`Omit.monthDropdownProps`

***

### name?

> `optional` **name**: `string`

Name of the form field

#### Inherited from

`Omit.name`

***

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`any`\>

Called when the component is blurred.

#### Inherited from

`Omit.onBlur`

***

### onChange()?

> `optional` **onChange**: (`value`, `event`) => `void`

Callback when value changes.

#### Parameters

##### value

`null` | `string`

##### event

`SyntheticEvent`

#### Returns

`void`

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

`Omit.onChangeCalendarDate`

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

`Omit.onClean`

***

### onClose()?

> `optional` **onClose**: () => `void`

Called when Modal is closed

#### Returns

`void`

#### Inherited from

`Omit.onClose`

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

`Omit.onEnter`

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

`Omit.onEntered`

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

`Omit.onEntering`

***

### oneTap?

> `optional` **oneTap**: `boolean`

One-click selection date

#### Inherited from

`Omit.oneTap`

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

`Omit.onExit`

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

`Omit.onExited`

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

`Omit.onExiting`

***

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`any`\>

Called when the component is focused.

#### Inherited from

`Omit.onFocus`

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

`Omit.onNextMonth`

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

`Omit.onOk`

***

### onOpen()?

> `optional` **onOpen**: () => `void`

Called when Modal is displayed

#### Returns

`void`

#### Inherited from

`Omit.onOpen`

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

`Omit.onPrevMonth`

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

`Omit.onSelect`

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

`Omit.onShortcutClick`

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

`Omit.onToggleMonthDropdown`

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

`Omit.onToggleTimeDropdown`

***

### open?

> `optional` **open**: `boolean`

Open the menu and control it

#### Inherited from

`Omit.open`

***

### placeholder?

> `optional` **placeholder**: `ReactNode`

Placeholder text

#### Inherited from

`Omit.placeholder`

***

### placement?

> `optional` **placement**: `Placement`

The placement of picker

#### Inherited from

`Omit.placement`

***

### plaintext?

> `optional` **plaintext**: `boolean`

Whether plaintext the component

#### Inherited from

`Omit.plaintext`

***

### preventOverflow?

> `optional` **preventOverflow**: `boolean`

Prevent floating element overflow

#### Inherited from

`Omit.preventOverflow`

***

### ranges?

> `optional` **ranges**: `RangeType`\<`Date`\>[]

Predefined date Ranges

#### Inherited from

`Omit.ranges`

***

### readOnly?

> `optional` **readOnly**: `boolean`

Whether read only the component

#### Inherited from

`Omit.readOnly`

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

`Omit.renderCell`

***

### renderExtraFooter()?

> `optional` **renderExtraFooter**: () => `ReactNode`

Custom render extra footer

#### Returns

`ReactNode`

#### Inherited from

`Omit.renderExtraFooter`

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

`Omit.renderValue`

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

`Omit.shouldDisableDate`

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

`Omit.shouldDisableHour`

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

`Omit.shouldDisableMinute`

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

`Omit.shouldDisableSecond`

***

### ~~showMeridian?~~

> `optional` **showMeridian**: `boolean`

#### Deprecated

Use `showMeridiem` instead

#### Inherited from

`Omit.showMeridian`

***

### showMeridiem?

> `optional` **showMeridiem**: `boolean`

Meridiem format for 12-hour time

#### Inherited from

`Omit.showMeridiem`

***

### showWeekNumbers?

> `optional` **showWeekNumbers**: `boolean`

Whether to show week numbers

#### Inherited from

`Omit.showWeekNumbers`

***

### size?

> `optional` **size**: `Size`

A picker can have different sizes

#### Inherited from

`Omit.size`

***

### style?

> `optional` **style**: `CSSProperties`

Additional style

#### Inherited from

`Omit.style`

***

### toggleAs?

> `optional` **toggleAs**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`Omit.toggleAs`

***

### value?

> `optional` **value**: `string`

Value of the time picker.

***

### weekStart?

> `optional` **weekStart**: `0` \| `1` \| `3` \| `2` \| `4` \| `5` \| `6`

The index of the first day of the week (0 - Sunday)
If `isoWeek` is `true`, the value of `weekStart` is ignored.

#### Default

```ts
0
```

#### Inherited from

`Omit.weekStart`

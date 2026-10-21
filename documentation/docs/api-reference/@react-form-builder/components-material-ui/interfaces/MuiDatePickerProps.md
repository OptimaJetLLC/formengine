# Interface: MuiDatePickerProps

Props for the MuiDatePicker component.

## Extends

- `Omit`\<`DatePickerProps`, `"defaultValue"` \| `"onChange"` \| `"reduceAnimations"` \| `"value"`\>.`Pick`\<[`MuiControlProps`](MuiControlProps.md), `"error"` \| `"helperText"` \| `"readOnly"` \| `"required"`\>

## Properties

### autoFocus?

> `optional` **autoFocus?**: `boolean`

If `true`, the main element is focused during the first mount.
This main element is:
- the element chosen by the visible view if any (i.e: the selected day on the `day` view).
- the `input` element if there is a field rendered.

#### Inherited from

`Omit.autoFocus`

***

### className?

> `optional` **className?**: `string`

#### Inherited from

`Omit.className`

***

### closeOnSelect?

> `optional` **closeOnSelect?**: `boolean`

If `true`, the Picker will close after submitting the full date.

#### Default

`true` for desktop, `false` for mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).

#### Inherited from

`Omit.closeOnSelect`

***

### dayOfWeekFormatter?

> `optional` **dayOfWeekFormatter?**: (`date`) => `string`

Formats the day of week displayed in the calendar header.

#### Parameters

##### date

`Dayjs`

The date of the day of week provided by the adapter.

#### Returns

`string`

The name to display.

#### Default

```ts
(date: PickerValidDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
```

#### Inherited from

`Omit.dayOfWeekFormatter`

***

### defaultValue?

> `optional` **defaultValue?**: `Date` \| `null`

The default selected date value.

***

### desktopModeMediaQuery?

> `optional` **desktopModeMediaQuery?**: `string`

CSS media query when `Mobile` mode will be changed to `Desktop`.

#### Default

```ts
'@media (pointer: fine)'
```

#### Example

```ts
'@media (min-width: 720px)' or theme.breakpoints.up("sm")
```

#### Inherited from

`Omit.desktopModeMediaQuery`

***

### disabled?

> `optional` **disabled?**: `boolean`

If `true`, the component is disabled.
When disabled, the value cannot be changed and no interaction is possible.

#### Default

```ts
false
```

#### Inherited from

`Omit.disabled`

***

### disableFuture?

> `optional` **disableFuture?**: `boolean`

If `true`, disable values after the current date for date components, time for time components and both for date time components.

#### Default

```ts
false
```

#### Inherited from

`Omit.disableFuture`

***

### disableHighlightToday?

> `optional` **disableHighlightToday?**: `boolean`

If `true`, today's day is not highlighted.

#### Default

```ts
false
```

#### Inherited from

`Omit.disableHighlightToday`

***

### ~~disableOpenPicker?~~

> `optional` **disableOpenPicker?**: `boolean`

If `true`, the button to open the Picker will not be rendered (it will only render the field).

#### Deprecated

Use the [field component](https://mui.com/x/react-date-pickers/fields/) instead.

#### Default

```ts
false
```

#### Inherited from

`Omit.disableOpenPicker`

***

### disablePast?

> `optional` **disablePast?**: `boolean`

If `true`, disable values before the current date for date components, time for time components and both for date time components.

#### Default

```ts
false
```

#### Inherited from

`Omit.disablePast`

***

### displayWeekNumber?

> `optional` **displayWeekNumber?**: `boolean`

If `true`, the week number will be display in the calendar.

#### Inherited from

`Omit.displayWeekNumber`

***

### error?

> `optional` **error?**: `boolean`

If `true`, the label is displayed in an error state.

#### Default

```ts
false
```

#### Inherited from

[`MuiFormControlProps`](MuiFormControlProps.md).[`error`](MuiFormControlProps.md#error)

***

### fixedWeekNumber?

> `optional` **fixedWeekNumber?**: `number`

The day view will show as many weeks as needed after the end of the current month to match this value.
Put it to 6 to have a fixed number of weeks in Gregorian calendars

#### Inherited from

`Omit.fixedWeekNumber`

***

### format?

> `optional` **format?**: `string`

Format of the date when rendered in the input(s).
Defaults to localized format based on the used `views`.

#### Inherited from

`Omit.format`

***

### formatDensity?

> `optional` **formatDensity?**: `"dense"` \| `"spacious"`

Density of the format when rendered in the input.
Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.

#### Default

```ts
"dense"
```

#### Inherited from

`Omit.formatDensity`

***

### helperText?

> `optional` **helperText?**: `string`

The helper text for the form control.

#### Inherited from

[`MuiControlProps`](MuiControlProps.md).[`helperText`](MuiControlProps.md#helpertext)

***

### inputRef?

> `optional` **inputRef?**: `Ref`\<`HTMLInputElement`\>

Pass a ref to the `input` element.

#### Inherited from

`Omit.inputRef`

***

### keepOpenDuringFieldFocus?

> `optional` **keepOpenDuringFieldFocus?**: `boolean`

If `true`, keep the picker open when the value is edited from the field.
Useful to prevent the popper/dialog from closing while typing in the input.
This only affects changes with `source = "field"` and does not alter view interactions.

#### Default

```ts
false
```

#### Inherited from

`Omit.keepOpenDuringFieldFocus`

***

### label?

> `optional` **label?**: `ReactNode`

The label content.

#### Inherited from

`Omit.label`

***

### loading?

> `optional` **loading?**: `boolean`

If `true`, calls `renderLoading` instead of rendering the day calendar.
Can be used to preload information and show it in calendar.

#### Default

```ts
false
```

#### Inherited from

`Omit.loading`

***

### localeText?

> `optional` **localeText?**: `PickersInputComponentLocaleText`

Locale for components texts.
Allows overriding texts coming from `LocalizationProvider` and `theme`.

#### Inherited from

`Omit.localeText`

***

### maxDate?

> `optional` **maxDate?**: `Dayjs`

Maximal selectable date.

#### Default

```ts
2099-12-31
```

#### Inherited from

`Omit.maxDate`

***

### minDate?

> `optional` **minDate?**: `Dayjs`

Minimal selectable date.

#### Default

```ts
1900-01-01
```

#### Inherited from

`Omit.minDate`

***

### monthsPerRow?

> `optional` **monthsPerRow?**: `3` \| `4`

Months rendered per row.

#### Default

```ts
3
```

#### Inherited from

`Omit.monthsPerRow`

***

### name?

> `optional` **name?**: `string`

Name attribute used by the `input` element in the Field.

#### Inherited from

`Omit.name`

***

### onAccept?

> `optional` **onAccept?**: (`value`, `context`) => `void`

Callback fired when the value is accepted.

#### Parameters

##### value

`PickerValue`

The value that was just accepted.

##### context

`PickerChangeHandlerContext`\<`DateValidationError`\>

Context about this acceptance:
- `validationError`: validation result of the current value
- `source`: source of the acceptance. One of 'field' | 'view' | 'unknown'
- `shortcut` (optional): the shortcut metadata if the value was accepted via a shortcut selection

#### Returns

`void`

#### Inherited from

`Omit.onAccept`

***

### onCancel?

> `optional` **onCancel?**: () => `void`

Callback fired when the Cancel action is triggered.

#### Returns

`void`

#### Inherited from

`Omit.onCancel`

***

### onChange?

> `optional` **onChange?**: (`value`, `context`) => `void`

Callback fired when the value changes.

#### Parameters

##### value

`Date` \| `null`

the new date value.

##### context

`PickerChangeHandlerContext`\<`DateValidationError`\>

the change context from the DatePicker.

#### Returns

`void`

***

### onClose?

> `optional` **onClose?**: () => `void`

Callback fired when the popup requests to be closed.
Use in controlled mode (see `open`).

#### Returns

`void`

#### Inherited from

`Omit.onClose`

***

### onError?

> `optional` **onError?**: (`error`, `value`) => `void`

Callback fired when the error associated with the current value changes.
When a validation error is detected, the `error` parameter contains a non-null value.
This can be used to render an appropriate form error.

#### Parameters

##### error

`DateValidationError`

The reason why the current value is not valid.

##### value

`PickerValue`

The value associated with the error.

#### Returns

`void`

#### Inherited from

`Omit.onError`

***

### onMonthChange?

> `optional` **onMonthChange?**: (`month`) => `void`

Callback fired on month change.

#### Parameters

##### month

`Dayjs`

The new month.

#### Returns

`void`

#### Inherited from

`Omit.onMonthChange`

***

### onOpen?

> `optional` **onOpen?**: () => `void`

Callback fired when the popup requests to be opened.
Use in controlled mode (see `open`).

#### Returns

`void`

#### Inherited from

`Omit.onOpen`

***

### onSelectedSectionsChange?

> `optional` **onSelectedSectionsChange?**: (`newValue`) => `void`

Callback fired when the selected sections change.

#### Parameters

##### newValue

`FieldSelectedSections`

The new selected sections.

#### Returns

`void`

#### Inherited from

`Omit.onSelectedSectionsChange`

***

### onViewChange?

> `optional` **onViewChange?**: (`view`) => `void`

Callback fired on view change.

#### Parameters

##### view

`DateView`

The new view.

#### Returns

`void`

#### Inherited from

`Omit.onViewChange`

***

### onYearChange?

> `optional` **onYearChange?**: (`year`) => `void`

Callback fired on year change.

#### Parameters

##### year

`Dayjs`

The new year.

#### Returns

`void`

#### Inherited from

`Omit.onYearChange`

***

### open?

> `optional` **open?**: `boolean`

Control the popup or dialog open state.

#### Default

```ts
false
```

#### Inherited from

`Omit.open`

***

### openTo?

> `optional` **openTo?**: `DateView`

The default visible view.
Used when the component view is not controlled.
Must be a valid option from `views` list.

#### Inherited from

`Omit.openTo`

***

### orientation?

> `optional` **orientation?**: `PickerOrientation`

Force rendering in particular orientation.

#### Inherited from

`Omit.orientation`

***

### readOnly?

> `optional` **readOnly?**: `boolean`

If `true`, the component is read-only.
When read-only, the value cannot be changed but the user can interact with the interface.

#### Default

```ts
false
```

#### Inherited from

`Omit.readOnly`

***

### referenceDate?

> `optional` **referenceDate?**: `Dayjs`

The date used to generate the new value when both `value` and `defaultValue` are empty.

#### Default

The closest valid date-time using the validation props, except callbacks like `shouldDisable<...>`.

#### Inherited from

`Omit.referenceDate`

***

### renderLoading?

> `optional` **renderLoading?**: () => `ReactNode`

Component displaying when passed `loading` true.

#### Returns

`ReactNode`

The node to render when loading.

#### Default

```ts
() => <span>…</span>
```

#### Inherited from

`Omit.renderLoading`

***

### required?

> `optional` **required?**: `boolean`

If `true`, the label will indicate that the `input` is required.

#### Default

```ts
false
```

#### Inherited from

[`MuiControlProps`](MuiControlProps.md).[`required`](MuiControlProps.md#required)

***

### selectedSections?

> `optional` **selectedSections?**: `FieldSelectedSections`

The currently selected sections.
This prop accepts four formats:
1. If a number is provided, the section at this index will be selected.
2. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
3. If `"all"` is provided, all the sections will be selected.
4. If `null` is provided, no section will be selected.
If not provided, the selected sections will be handled internally.

#### Inherited from

`Omit.selectedSections`

***

### shouldDisableDate?

> `optional` **shouldDisableDate?**: (`day`) => `boolean`

Disable specific date.

Warning: This function can be called multiple times (for example when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.

#### Parameters

##### day

`Dayjs`

The date to test.

#### Returns

`boolean`

If `true` the date will be disabled.

#### Inherited from

`Omit.shouldDisableDate`

***

### shouldDisableMonth?

> `optional` **shouldDisableMonth?**: (`month`) => `boolean`

Disable specific month.

#### Parameters

##### month

`Dayjs`

The month to test.

#### Returns

`boolean`

If `true`, the month will be disabled.

#### Inherited from

`Omit.shouldDisableMonth`

***

### shouldDisableYear?

> `optional` **shouldDisableYear?**: (`year`) => `boolean`

Disable specific year.

#### Parameters

##### year

`Dayjs`

The year to test.

#### Returns

`boolean`

If `true`, the year will be disabled.

#### Inherited from

`Omit.shouldDisableYear`

***

### showDaysOutsideCurrentMonth?

> `optional` **showDaysOutsideCurrentMonth?**: `boolean`

If `true`, days outside the current month are rendered:

- if `fixedWeekNumber` is defined, renders days to have the weeks requested.

- if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.

- ignored if `calendars` equals more than `1` on range pickers.

#### Default

```ts
false
```

#### Inherited from

`Omit.showDaysOutsideCurrentMonth`

***

### slotProps?

> `optional` **slotProps?**: `DatePickerSlotProps`

The props used for each component slot.

#### Default

```ts
{}
```

#### Inherited from

`Omit.slotProps`

***

### slots?

> `optional` **slots?**: `DatePickerSlots`

Overridable component slots.

#### Default

```ts
{}
```

#### Inherited from

`Omit.slots`

***

### sx?

> `optional` **sx?**: `SxProps`\<`Theme`\>

The system prop that allows defining system overrides as well as additional CSS styles.

#### Inherited from

`Omit.sx`

***

### timezone?

> `optional` **timezone?**: `string`

Choose which timezone to use for the value.
Example: "default", "system", "UTC", "America/New_York".
If you pass values from other timezones to some props, they will be converted to this timezone before being used.

#### See

See the [timezones documentation](https://mui.com/x/react-date-pickers/timezone/) for more details.

#### Default

The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.

#### Inherited from

`Omit.timezone`

***

### value?

> `optional` **value?**: `Date` \| `null`

The selected date value.

***

### view?

> `optional` **view?**: `DateView`

The visible view.
Used when the component view is controlled.
Must be a valid option from `views` list.

#### Inherited from

`Omit.view`

***

### viewRenderers?

> `optional` **viewRenderers?**: `Partial`\<`DatePickerViewRenderers`\<`DateView`\>\>

Define custom view renderers for each section.
If `null`, the section will only have field editing.
If `undefined`, internally defined view will be used.

#### Inherited from

`Omit.viewRenderers`

***

### views?

> `optional` **views?**: readonly `DateView`[]

Available views.

#### Inherited from

`Omit.views`

***

### yearsOrder?

> `optional` **yearsOrder?**: `"asc"` \| `"desc"`

Years are displayed in ascending (chronological) order by default.
If `desc`, years are displayed in descending order.

#### Default

```ts
'asc'
```

#### Inherited from

`Omit.yearsOrder`

***

### yearsPerRow?

> `optional` **yearsPerRow?**: `3` \| `4`

Years rendered per row.

#### Default

```ts
4 on desktop, 3 on mobile
```

#### Inherited from

`Omit.yearsPerRow`

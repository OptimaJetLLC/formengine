# Interface: RsCalendarProps

Props for the RsCalendar component.

## Extends

- `CalendarProps`

## Properties

### as?

> `optional` **as**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`CalendarProps.as`

***

### bordered?

> `optional` **bordered**: `boolean`

Show border

#### Inherited from

`CalendarProps.bordered`

***

### cellClassName()?

> `optional` **cellClassName**: (`date`) => `string` \| `undefined`

Custom cell classes base on it's date

#### Parameters

##### date

`Date`

#### Returns

`string` \| `undefined`

#### Inherited from

`CalendarProps.cellClassName`

***

### children?

> `optional` **children**: `ReactNode`

Primary content

#### Inherited from

`CalendarProps.children`

***

### className?

> `optional` **className**: `string`

Additional classes

#### Inherited from

`CalendarProps.className`

***

### classPrefix?

> `optional` **classPrefix**: `string`

The prefix of the component CSS class

#### Inherited from

`CalendarProps.classPrefix`

***

### compact?

> `optional` **compact**: `boolean`

Display a compact calendar

#### Inherited from

`CalendarProps.compact`

***

### defaultValue?

> `optional` **defaultValue**: `Date`

Default value

#### Inherited from

`CalendarProps.defaultValue`

***

### isoWeek?

> `optional` **isoWeek**: `boolean`

ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day

#### See

https://en.wikipedia.org/wiki/ISO_week_date

#### Inherited from

`CalendarProps.isoWeek`

***

### label?

> `optional` **label**: `string`

Label for the calendar.

***

### locale?

> `optional` **locale**: `CalendarLocale`

Custom locale object

#### See

https://rsuitejs.com/guide/i18n/#calendar

#### Inherited from

`CalendarProps.locale`

***

### monthDropdownProps?

> `optional` **monthDropdownProps**: `MonthDropdownProps`

The props for the Month Dropdown component.

#### Inherited from

`CalendarProps.monthDropdownProps`

***

### onChange()?

> `optional` **onChange**: (`date`) => `void`

Callback fired before the value changed

#### Parameters

##### date

`Date`

#### Returns

`void`

#### Inherited from

`CalendarProps.onChange`

***

### onMonthChange()?

> `optional` **onMonthChange**: (`date`) => `void`

Callback fired before the month changed
@todo-Doma Change signature to `onMonthChange(year: number, month: number, reason: string)`?

#### Parameters

##### date

`Date`

#### Returns

`void`

#### Inherited from

`CalendarProps.onMonthChange`

***

### onSelect()?

> `optional` **onSelect**: (`date`) => `void`

Callback fired before the date selected

#### Parameters

##### date

`Date`

#### Returns

`void`

#### Inherited from

`CalendarProps.onSelect`

***

### readOnly

> **readOnly**: `boolean`

Whether the calendar is read only.

***

### renderCell()?

> `optional` **renderCell**: (`date`) => `ReactNode`

Custom render calendar cells

#### Parameters

##### date

`Date`

#### Returns

`ReactNode`

#### Inherited from

`CalendarProps.renderCell`

***

### style?

> `optional` **style**: `CSSProperties`

Additional style

#### Inherited from

`CalendarProps.style`

***

### value?

> `optional` **value**: `Date`

Controlled value

#### Inherited from

`CalendarProps.value`

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

`CalendarProps.weekStart`

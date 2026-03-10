# Interface: RsWizardProps

Props for the RsWizard component.

## Extends

- `PropsWithChildren`\<`any`\>

## Indexable

\[`key`: `string`\]: `any`

## Properties

### activeIndex?

> `optional` **activeIndex**: `number`

Active step index.

***

### finishButtonLabel?

> `optional` **finishButtonLabel**: `string`

Label for finish button.

***

### nextButtonLabel?

> `optional` **nextButtonLabel**: `string`

Label for next button.

***

### onChange()?

> `optional` **onChange**: (`activeIndex?`) => `void`

Callback when step changes.

#### Parameters

##### activeIndex?

`number`

#### Returns

`void`

***

### onFinish()?

> `optional` **onFinish**: (`event`) => `void`

Callback when finish button is clicked.

#### Parameters

##### event

`SyntheticEvent`

#### Returns

`void`

***

### onNext()?

> `optional` **onNext**: (`event`) => `void`

Callback when next button is clicked.

#### Parameters

##### event

`SyntheticEvent`

#### Returns

`void`

***

### onPrev()?

> `optional` **onPrev**: (`event`) => `void`

Callback when previous button is clicked.

#### Parameters

##### event

`SyntheticEvent`

#### Returns

`void`

***

### prevButtonLabel?

> `optional` **prevButtonLabel**: `string`

Label for previous button.

***

### showSteps?

> `optional` **showSteps**: `boolean`

Whether to show steps.

***

### showStepsLabels?

> `optional` **showStepsLabels**: `boolean`

Whether to show step labels.

***

### stepsNavigation?

> `optional` **stepsNavigation**: `"any"` \| `"disable"` \| `"onlyVisited"`

Navigation mode for steps.

***

### validateOnFinish?

> `optional` **validateOnFinish**: `boolean`

Whether to validate on finish.

***

### validateOnNext?

> `optional` **validateOnNext**: `boolean`

Whether to validate on next.

***

### verticalSteps?

> `optional` **verticalSteps**: `boolean`

Whether steps are vertical.

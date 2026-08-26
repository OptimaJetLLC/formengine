# Function: getValidationRuleDefinition()

> **getValidationRuleDefinition**(`rules`, `settings`): `ResolvedValidationRuleDefinition` \| `undefined`

Returns the validation rule definition for the persisted rule settings.

## Parameters

### rules

[`FormViewerValidationRules`](../type-aliases/FormViewerValidationRules.md)

the validation rules for the component value type.

### settings

[`ValidationRuleSettings`](../type-aliases/ValidationRuleSettings.md)

the persisted validation rule settings.

## Returns

`ResolvedValidationRuleDefinition` \| `undefined`

the rule definition when found, otherwise undefined.

---
sidebar_position: 4
title: Tracking component add and remove events
slug: /formengine-designer/faq/tracking-component-add-and-remove-events
description: Learn how to use onFormElementAdd and onFormElementRemove callbacks to track when components are added or removed from your form in FormEngine Designer
---

# Tracking component add and remove events

## Overview

FormEngine Designer provides two powerful callback functions that allow you to track when components are added to or removed from your form:
[onFormElementAdd][on-form-element-add] and [onFormElementRemove][on-form-element-remove]. These callbacks are essential for implementing
logic that needs to respond to changes in your form structure.

## Common use cases

- **Analytics**: Track which components are most frequently added to forms
- **Logging**: Maintain audit trails of form design changes
- **Validation**: Enforce business rules about component combinations
- **Limits**: Restrict the number of specific component types
- **Integration**: Sync form changes with external systems

## The onFormElementAdd callback

The `onFormElementAdd` callback is invoked whenever a component is added to the form,
whether through drag-and-drop, the components modal, or any other method.

### Callback signature

```typescript
function onFormElementAdd(payload: {
  source: ComponentData;
  target: ComponentData;
  insertPosition?: InsertPosition;
  slot?: string;
  slotCondition?: string;
})
```

### Parameters

- **source**: The component data being added to the form
- **target**: The parent component where the new component is being added
- **insertPosition**: Where the component is being inserted relative to the target (`'before'`, `'after'`, or `'inside'`)
- **slot**: The slot name if the component is being added to a specific slot
- **slotCondition**: The condition associated with the slot

### Example usage

```tsx
import {FormBuilder} from '@react-form-builder/designer'

const FormBuilderApp = () => {
  return (
    <FormBuilder
      // ... other props
      onFormElementAdd={(payload) => {
        console.log('Component added:', {
          componentType: payload.source.model.type,
          componentKey: payload.source.key,
          parentType: payload.target.model.type,
          parentKey: payload.target.key,
          position: payload.insertPosition,
          timestamp: new Date().toISOString()
        })

        // Send to analytics service
        analytics.track('component_added', {
          componentType: payload.source.model.type,
          insertionMethod: 'designer'
        })

        // Enforce business rules
        if (payload.source.model.type === 'RsInput') {
          const inputCount = countComponentsByType('RsInput')
          if (inputCount > 10) {
            console.warn('Maximum number of input fields reached')
          }
        }
      }}
    />
  )
}
```

## The onFormElementRemove callback

The `onFormElementRemove` callback is invoked whenever a component is removed from the form, typically when the user deletes a component.

### Callback signature

```typescript
function onFormElementRemove(payload: { source: ComponentData })
```

### Parameters

- **source**: The component data being removed from the form

### Example usage

```tsx
import {FormBuilder} from '@react-form-builder/designer'

const FormBuilderApp = () => {
  return (
    <FormBuilder
      // ... other props
      onFormElementRemove={(payload) => {
        console.log('Component removed:', {
          componentType: payload.source.model.type,
          componentKey: payload.source.key,
          timestamp: new Date().toISOString()
        })

        // Send to analytics service
        analytics.track('component_removed', {
          componentType: payload.source.model.type
        })

        // Clean up external resources
        cleanupComponentResources(payload.source.key)
      }}
    />
  )
}
```

## Best practices

1. **Keep callbacks lightweight**: Avoid heavy computations in callbacks as they execute during user interactions.
2. **Handle errors gracefully**: Wrap your callback logic in try-catch blocks to prevent UI disruptions.
3. **Use useCallback for performance**: Wrap callback functions in `useCallback` with appropriate dependencies to prevent unnecessary
   re-renders.
4. **Consider debouncing**: For analytics or external API calls, consider debouncing to avoid excessive requests.
5. **Respect user privacy**: When tracking analytics, ensure compliance with privacy regulations and provide opt-out mechanisms.

## Common issues and solutions

### Callback not firing

- Ensure you're passing the callback correctly to the `FormBuilder` component
- Check that the component is actually being added/removed (not just moved)
- Verify there are no errors in your callback that might be silently failing

### Performance concerns

- If callbacks are causing performance issues, consider throttling or debouncing
- Move heavy computations to Web Workers or defer them
- Use `useCallback` to prevent unnecessary re-renders

## Related resources

- [FormBuilderProps API reference][on-form-element-add]
- [ComponentData type](/api-reference/@react-form-builder/core/classes/ComponentData)
- [Getting form JSON](/formengine-designer/faq/getting-form-json)
- [Form storage](/formengine-designer/features/form-storage)

## Summary

The `onFormElementAdd` and `onFormElementRemove` callbacks provide powerful hooks into the form design process,
enabling you to build sophisticated features on top of FormEngine Designer.
Whether you need analytics, validation, integration, or custom business logic,
these callbacks give you the visibility and control you need.

**Key takeaways:**

- Use `onFormElementAdd` to track component additions with detailed context
- Use `onFormElementRemove` to track component removals
- Both callbacks receive `ComponentData` with full component information
- Implement error handling to prevent UI disruptions
- Consider performance implications for complex operations

With these callbacks, you can transform FormEngine Designer from a simple form builder
into a fully integrated part of your application ecosystem.

[on-form-element-add]: /api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onformelementadd
[on-form-element-remove]: /api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onformelementremove

---
id: "react_form_builder_core.ComponentDataEvents"
title: "Class: ComponentDataEvents"
sidebar_label: "ComponentDataEvents"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).ComponentDataEvents

Represents a class that holds events related to component data.

## Constructors

### constructor

• **new ComponentDataEvents**()

## Properties

### onAfterKeyChanged

• `Readonly` **onAfterKeyChanged**: [`SyncEvent`](react_form_builder_core.SyncEvent.md)<[`ComponentData`](react_form_builder_core.ComponentData.md), [`ComponentKeyChangedEventArgs`](react_form_builder_core.ComponentKeyChangedEventArgs.md)\>

An event that occurs after a component key change.

___

### onBeforeDelete

• `Readonly` **onBeforeDelete**: [`SyncEvent`](react_form_builder_core.SyncEvent.md)<[`ComponentData`](react_form_builder_core.ComponentData.md), `undefined`\>

An event that occurs before a component is removed from the component tree.

## Methods

### dispose

▸ **dispose**(): `void`

Unsubscribe from all events.

#### Returns

`void`

---
sidebar_position: 5
title: Validation
slug: /validation
---

# Validation

:::info

Documentation in the process of writing.

:::

There are two types of validation in FormBuilder:

1. Field validation - this type of validator will validate only one form field, obviously.
2. Form validation - this type of validator validates the whole form.

## Field validation

Field validators come in different types:

1. Built-in FormBuilder. There are a number of predefined validators for different data types (string, number, etc.).
2. Defined by code inside the FormBuilder.
3. Passed externally to the FormBuilder/FormViewer component via
   the [validators](/api-reference/interfaces/react_form_builder_core.FormViewerProps#validators) parameter.

## Form validation

Whole form validation can be implemented if validators have been passed to the FormBuilder/FormViewer properties in
the [formValidators](/api-reference/interfaces/react_form_builder_core.FormViewerProps#formvalidators) property.

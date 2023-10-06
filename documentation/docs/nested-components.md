---
sidebar_position: 7
title: Nested components
slug: /nested-components
---

# Nested components

Form Builder supports nested components out of the box. There are two types of nested components:

1. Simple nested components.
2. Templates.

## Simple nested components

Simple nested component is a React component, that binds to one of the component property.

For example your have your React component, where one of the properties described as
the [node](/api-reference/modules/react_form_builder_core#node). The `children` property is also treated as a `node` property. A component
that is specified in the `node` property is considered a nested component.

## Templates

A template is simply a form within another form. The template is treated as a normal component, but with some features:

1. The [FormViewer](/api-reference/modules/react_form_builder_core#formviewer) component is used to display the template.
2. The data inside the template is isolated from the parent form.
3. Data can be transferred to the parent form as a nested object, or as a part of the parent form (regulated by the "Store data in parent
   form" flag).

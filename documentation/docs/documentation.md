---
sidebar_position: 1
title: Form Builder
slug: /
---

# Form Builder

Form Builder is a React library for creating web forms with a simple but powerful web interface.

## Key features of Form Builder

1. Web interface with drag and drop functionality.
2. [Adaptive layout](/adaptive-layout).
3. [Built-in form validation or optional external validation](/validation).
4. Built-in web components based on React Suite library.
5. [Easy integration of custom components](/custom-components).
6. [Export form to JSON and import form from JSON](/forms-json).
7. [Powerful internationalization](/localization).
8. [Custom actions](/actions).
9. [Computable properties](/computed-properties).
10. [Templates](/nested-components#templates) (forms within a form).
11. [Camunda FormBuilder](/camunda-integration).
12. [Designer customization](/designer-customization).

<iframe width="560" height="315" src="https://www.youtube.com/embed/bixsIOB-8S8?si=3upJ5irMpKhG5Wu2" title="YouTube video player" 
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen=""></iframe>

## Overview

The basic idea behind the Form Builder is simple - an online form is a number of components organized in a tree structure.

Each component has a set of properties:

1. Different CSS styles for different screen resolutions.
2. Simple properties (`string`, `boolean`, `number`, etc.).
3. Events (`onClick`, `onSelect`, `onClose`, etc.).
4. Actions are simply functions that are called when some event occurs.
5. A set of rules for validating the value of a component.

Some component properties can be calculated using a JavaScript function or translated using the [Fluent](https://projectfluent.org/)
localization system.

**Form Builder allows you to declaratively describe such components and then use them to create forms in the form designer.**

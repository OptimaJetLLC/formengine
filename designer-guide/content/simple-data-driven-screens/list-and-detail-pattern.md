---
title: "List and detail pattern"
description: "Build a lightweight list-and-detail layout in which selecting a row opens fields for editing."
---

# List and detail pattern

A **list + detail** screen shows a list of items on one side (or top) and a form for the selected item on the other. Authors often use a **List**, **Repeater**, or table-style component plus a detail stack.

## When to use it

- Pick a record and edit its fields
- Review submissions one at a time
- Simple CRUD-style UIs inside a larger app

## Build in Designer (concept)

1. Add a **List** or repeater for rows.
2. Add a **Stack** of fields for the detail area.
3. Use **Actions** or application logic to load the detail when the selection changes. Advanced wiring usually needs developers.

## Author vs developer split

| Task                      | Owner     |
| ------------------------- | --------- |
| Layout of list and fields | Author    |
| Loading rows from server  | Developer |
| Saving selection changes  | Developer |

## Summary

List + detail is a common app pattern. Designer supplies layout components. Plan integration early and use
[Hand off to developers](/help/hand-off-to-your-technical-team).

## See also

- [Show or hide fields](/simple-data-driven-screens/show-or-hide-fields)
- [Components library](docs:components-library)

---
title: "Form structure and containers"
description: "Use containers, stacks, and grids to group fields: organize your form before you style or validate."
---

# Form structure and containers

A form is more than a flat list of fields. **Containers** group related inputs to help users scan sections such as contact details, ticket
options, and payment information.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Layout building blocks

| Component (typical name) | Use for                     |
| ------------------------ | --------------------------- |
| **Stack**                | Vertical list of fields     |
| **Container** / **Box**  | Section with padding        |
| **Grid**                 | Rows and columns            |
| **Card**                 | Bordered section with title |

Names depend on your **Component library**.

## Example: event registration form

This walkthrough builds a small **Event registration** form with two **Card** sections: **Contact details** and **Ticket options**.

### Step 1: Add a Card container

<img src="/assets/guide/structure/highlight-containers-palette.png" alt="Components palette with Card highlighted after search." />

1. Open **Components**.
2. Search for **Card**.
3. Drag **Card** onto the canvas under the form title.

### Step 2: Nest a Stack inside the Card

1. Search for **Stack** in **Components**.
2. Drag **Stack** into the **Card** drop zone.
3. Add a **Typography** row for the section title (for example **Contact details**).

### Step 3: Add fields inside the Stack

1. Drag **Text field** components into the **Stack**.
2. Add **Full name**, **Email**, and **Phone**.
3. Repeat steps 1–3 for a second **Card** named **Ticket options** with **Ticket type** and **Quantity**.

### Step 4: Check the canvas

<img src="/assets/guide/structure/containers-canvas-plain.png" alt="Event registration form with Contact and Ticket Card sections on the canvas." />

Confirm each section is visually grouped and fields sit inside their container.

### Step 5: Verify in Tree

<img src="/assets/guide/structure/highlight-containers-tree-final.png" alt="Tree tab with Card and Stack parents wrapping nested text fields." />

1. Open **Tree** → **Expand all**.
2. Each **Card** row should wrap a **Stack** and its **Text field** children.

## Summary

Group fields with layout containers before fine-tuning style. **Tree** shows parent/child relationships clearly.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJmb3JtVGl0bGUiLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNSJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IkV2ZW50IHJlZ2lzdHJhdGlvbiIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoiY29udGFjdFNlY3Rpb24iLCJ0eXBlIjoiTXVpQ2FyZCIsInByb3BzIjp7fSwiY2hpbGRyZW4iOlt7ImtleSI6ImNvbnRhY3RTdGFjayIsInR5cGUiOiJNdWlTdGFjayIsInByb3BzIjp7InNwYWNpbmciOnsidmFsdWUiOiIxMnB4In19LCJjaGlsZHJlbiI6W3sia2V5IjoiY29udGFjdEhlYWRpbmciLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNiJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IkNvbnRhY3QgZGV0YWlscyIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoiZnVsbE5hbWUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJGdWxsIG5hbWUifX19LHsia2V5IjoiZW1haWwiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJFbWFpbCJ9fX0seyJrZXkiOiJwaG9uZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlBob25lIn19fV19XX0seyJrZXkiOiJ0aWNrZXRTZWN0aW9uIiwidHlwZSI6Ik11aUNhcmQiLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJ0aWNrZXRTdGFjayIsInR5cGUiOiJNdWlTdGFjayIsInByb3BzIjp7InNwYWNpbmciOnsidmFsdWUiOiIxMnB4In19LCJjaGlsZHJlbiI6W3sia2V5IjoidGlja2V0SGVhZGluZyIsInR5cGUiOiJNdWlUeXBvZ3JhcGh5IiwicHJvcHMiOnsidmFyaWFudCI6eyJ2YWx1ZSI6Img2In0sImNoaWxkcmVuIjp7InZhbHVlIjoiVGlja2V0IG9wdGlvbnMiLCJlZGl0b3JUeXBlIjoic3RyaW5nIn19fSx7ImtleSI6InRpY2tldFR5cGUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJUaWNrZXQgdHlwZSJ9fX0seyJrZXkiOiJxdWFudGl0eSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlF1YW50aXR5In0sInR5cGUiOnsidmFsdWUiOiJudW1iZXIifX19XX1dfV19LCJsYW5ndWFnZXMiOlt7ImNvZGUiOiJlbiIsImRpYWxlY3QiOiJVUyIsIm5hbWUiOiJFbmdsaXNoIiwiZGVzY3JpcHRpb24iOiJBbWVyaWNhbiBFbmdsaXNoIiwiYmlkaSI6Imx0ciJ9XSwiZGVmYXVsdExhbmd1YWdlIjoiZW4tVVMifQ&formName=event-registration&view=mui'); return false;">Open Event registration in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Parent and child in the Tree](/form-structure-and-layout/parent-and-child-in-the-tree)
- [Nested components (developers)](docs:formengine-designer/features/nested-components)

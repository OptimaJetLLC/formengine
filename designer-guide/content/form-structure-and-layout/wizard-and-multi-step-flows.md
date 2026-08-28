---
title: "Wizard and multi-step flows"
description: "Guide users through long forms step by step with the RSuite Wizard component, using the same employee onboarding example as the tabs guide."
---

# Wizard and multi-step flows

A **wizard** walks users through a form one step at a time. **Previous** and **Next** buttons control movement; the last step shows a **Finish** button (here labeled **Submit onboarding**).

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=rsuite-inject-css'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

:::tip

This guide uses the **RSuite** component library and its **Wizard** component (`RsWizard`). Select **RSuite UI inject** (or **RSuite UI**) in the top **Component library** menu before you start.

:::

For the same **Employee onboarding** example built with horizontal **tabs** instead, see [Tabs and multi-step layouts](/form-structure-and-layout/tabs-and-multi-step-layouts).

## When to use a wizard

- Users should complete sections in order
- Each step should validate before moving on
- You want built-in **Previous** / **Next** / **Finish** controls
- A progress indicator (step numbers) helps orientation

## Example: employee onboarding

This walkthrough builds the same **Employee onboarding** form as the tabs guide, but with three wizard steps: **Profile**, **Job details**,
and **Documents**. A single **Wizard** component holds the step navigation. Each step is a **Wizard step** container with fields.

### How wizard steps combine components

| Layer      | Component                | Role                                                         |
| ---------- | ------------------------ | ------------------------------------------------------------ |
| Screen     | **Screen**               | Root container for the whole form                            |
| Navigation | **Wizard**               | Step indicator, **Previous** / **Next** / **Finish** buttons |
| Step       | **Wizard step**          | One step block (**Profile**, **Job details**, **Documents**) |
| Input      | **Input** / **Checkbox** | Fields nested inside each **Wizard step**                    |

Build each step the same way: select the step in **Wizard** properties → drag fields into the active **Wizard step** on the canvas.

### Step 1: Select the RSuite component library

<img src="/assets/guide/structure/highlight-wizard-sections-library.png" alt="Top toolbar with RSuite UI inject selected in the Component library menu." />

1. Open the **Component library** menu in the top toolbar.
2. Choose **RSuite UI inject** (or **RSuite UI**).
3. The palette and canvas now show RSuite components.

### Step 2: Add a Wizard component

<img src="/assets/guide/structure/highlight-wizard-sections-palette.png" alt="Components tab open with Wizard highlighted in the palette search." />

1. Open **Components**.
2. Search for **Wizard**.
3. Drag **Wizard** onto the canvas below the form title.
4. The wizard starts with three default steps you can rename.

### Step 3: Configure steps and add fields to Profile

<img
  src="/assets/guide/structure/highlight-wizard-sections-profile-tree.png"
  alt="Tree tab showing onboardingWizard with profileStep and nested input fields."
/>

1. Select the **Wizard** on the canvas.
2. In **Main** properties, rename **Steps** to **Profile**, **Job details**, and **Documents**.
3. Set **Finish button label** to **Submit onboarding**.
4. Click circle **1** in the Wizard step indicator to open **Profile**.
5. Drag **Input** fields into the **Profile** step (**Full name**, **Work email**, **Phone**).
6. Open **Tree** → **Expand all** to confirm nesting: `onboardingWizard` → `profileStep` → fields.

### Step 4: Repeat for other steps

1. Click circle **2** in the Wizard step indicator to open **Job details**.
2. Add **Department**, **Start date**, and **Manager** fields inside the **Job details** step.
3. Click circle **3** in the Wizard step indicator to open **Documents** directly on the canvas.
4. Add **ID document number** and **Employment contract signed** checkbox inside the **Documents** step.

### Step 5: Add field rules and enable wizard validation

<img
  src="/assets/guide/structure/highlight-wizard-sections-validation-settings.png"
  alt="Main properties for the Onboarding wizard with Validate on next and Validate on finish enabled."
/>

1. Select **Full name**, open **Main**, and enable **Required**. The same `required` rule is now listed on **Rules**.
2. Repeat for **Department** and **ID document number** so every step has a rule to validate.
3. Select **Onboarding wizard** and return to **Main**.
4. Enable **Validate on next** so an invalid current step cannot advance.
5. Enable **Validate on finish** so the whole wizard is checked before **Submit onboarding** runs.

The two Wizard settings do not make fields required by themselves. They run the rules that you add to fields inside the Wizard.

### Step 6: Check the canvas

<img src="/assets/guide/structure/highlight-wizard-sections-canvas.png" alt="Components tab selected with Employee onboarding wizard showing Profile step fields and Next button." />

1. Stay on **Components** or switch to the canvas.
2. Confirm the step indicator shows **Profile**, **Job details**, and **Documents**.
3. Click the numbered step circles in Designer to check each step's fields.
4. Confirm **Next** appears on early steps and **Submit onboarding** on the last step.

### Step 7: Verify the component tree

<img
  src="/assets/guide/structure/highlight-wizard-sections-tree-final.png"
  alt="Tree tab showing formTitle, onboardingWizard, three Wizard step branches, and their fields."
/>

1. Open **Tree** → **Expand all**.
2. The tree should list `formTitle`, then `onboardingWizard` with `profileStep`, `jobDetailsStep`, and `documentsStep` branches and their
   child fields indented underneath.

## Test the flow

<img
  src="/assets/guide/structure/highlight-wizard-sections-validation-blocked.png"
  alt="Preview mode showing Required under an empty Full name field while the wizard remains on Profile after Next is clicked."
/>

1. Click **Preview**.
2. Leave **Full name** empty and click **Next**.
3. Confirm that **Required** appears under **Full name** and the Wizard stays on **Profile**.
4. Enter a full name and click **Next**. The Wizard can now open **Job details**.
5. Leave **Department** empty and click **Next**. Confirm that **Required** appears and the Wizard stays on **Job details**.
6. Enter a department and continue to **Documents**.
7. Leave **ID document number** empty and click **Submit onboarding**.
8. Confirm that **Required** appears and the Wizard stays on **Documents**. Enter an ID document number to clear the error.

## Summary

Select **RSuite UI** in the component library, then guide users through long forms with the **Wizard** component. Add field rules, enable
**Validate on next** and **Validate on finish**, and test that invalid steps cannot advance or finish. Use **Tree** to verify the hierarchy
before you preview.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJlcnJvclR5cGUiOiJSc0Vycm9yTWVzc2FnZSIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJmb3JtVGl0bGUiLCJ0eXBlIjoiUnNIZWFkZXIiLCJwcm9wcyI6eyJjb250ZW50Ijp7InZhbHVlIjoiRW1wbG95ZWUgb25ib2FyZGluZyJ9LCJoZWFkZXJTaXplIjp7InZhbHVlIjoiaDQifX19LHsia2V5Ijoib25ib2FyZGluZ1dpemFyZCIsInR5cGUiOiJSc1dpemFyZCIsInByb3BzIjp7ImFjdGl2ZUluZGV4Ijp7InZhbHVlIjowfSwiZmluaXNoQnV0dG9uTGFiZWwiOnsidmFsdWUiOiJTdWJtaXQgb25ib2FyZGluZyJ9LCJ2YWxpZGF0ZU9uTmV4dCI6eyJ2YWx1ZSI6dHJ1ZX0sInZhbGlkYXRlT25GaW5pc2giOnsidmFsdWUiOnRydWV9fSwiY2hpbGRyZW4iOlt7ImtleSI6InByb2ZpbGVTdGVwIiwidHlwZSI6IlJzV2l6YXJkU3RlcCIsInByb3BzIjp7ImxhYmVsIjp7InZhbHVlIjoiUHJvZmlsZSJ9fSwiY2hpbGRyZW4iOlt7ImtleSI6ImZ1bGxOYW1lIiwidHlwZSI6IlJzSW5wdXQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkZ1bGwgbmFtZSJ9fSwic2NoZW1hIjp7InR5cGUiOiJzdHJpbmciLCJ2YWxpZGF0aW9ucyI6W3sia2V5IjoicmVxdWlyZWQifV0sImF1dG9WYWxpZGF0ZSI6dHJ1ZX19LHsia2V5Ijoid29ya0VtYWlsIiwidHlwZSI6IlJzSW5wdXQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IldvcmsgZW1haWwifX19LHsia2V5IjoicGhvbmUiLCJ0eXBlIjoiUnNJbnB1dCIsInByb3BzIjp7ImxhYmVsIjp7InZhbHVlIjoiUGhvbmUifX19XX0seyJrZXkiOiJqb2JEZXRhaWxzU3RlcCIsInR5cGUiOiJSc1dpemFyZFN0ZXAiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkpvYiBkZXRhaWxzIn19LCJjaGlsZHJlbiI6W3sia2V5IjoiZGVwYXJ0bWVudCIsInR5cGUiOiJSc0lucHV0IiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJEZXBhcnRtZW50In19LCJzY2hlbWEiOnsidHlwZSI6InN0cmluZyIsInZhbGlkYXRpb25zIjpbeyJrZXkiOiJyZXF1aXJlZCJ9XSwiYXV0b1ZhbGlkYXRlIjp0cnVlfX0seyJrZXkiOiJzdGFydERhdGUiLCJ0eXBlIjoiUnNJbnB1dCIsInByb3BzIjp7ImxhYmVsIjp7InZhbHVlIjoiU3RhcnQgZGF0ZSJ9fX0seyJrZXkiOiJtYW5hZ2VyIiwidHlwZSI6IlJzSW5wdXQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6Ik1hbmFnZXIifX19XX0seyJrZXkiOiJkb2N1bWVudHNTdGVwIiwidHlwZSI6IlJzV2l6YXJkU3RlcCIsInByb3BzIjp7ImxhYmVsIjp7InZhbHVlIjoiRG9jdW1lbnRzIn19LCJjaGlsZHJlbiI6W3sia2V5IjoiaWREb2N1bWVudCIsInR5cGUiOiJSc0lucHV0IiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJJRCBkb2N1bWVudCBudW1iZXIifX0sInNjaGVtYSI6eyJ0eXBlIjoic3RyaW5nIiwidmFsaWRhdGlvbnMiOlt7ImtleSI6InJlcXVpcmVkIn1dLCJhdXRvVmFsaWRhdGUiOnRydWV9fSx7ImtleSI6ImNvbnRyYWN0U2lnbmVkIiwidHlwZSI6IlJzQ2hlY2tib3giLCJwcm9wcyI6eyJjaGlsZHJlbiI6eyJ2YWx1ZSI6IkVtcGxveW1lbnQgY29udHJhY3Qgc2lnbmVkIn19fV19XX1dfX0&formName=employee-onboarding-wizard&view=rsuite-inject-css'); return false;">Open finished form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Tabs and multi-step layouts](/form-structure-and-layout/tabs-and-multi-step-layouts)
- [Form structure and containers](/form-structure-and-layout/form-structure-and-containers)

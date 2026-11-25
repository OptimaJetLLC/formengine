---
title: "Form-level actions in Settings"
description: "Create reusable Code actions and a form validator in Settings, then attach actions to component events."
---

# Form-level actions in Settings

The **Settings** tab stores reusable **Code** action definitions and the **Form validator**. Saving a Code action does not run it; a button
or another component event must reference that action.

## Settings vs button Actions

<img src="/assets/guide/workspace/overview-zones.png" alt="Workspace zones: left Settings tab and right button Actions." />

| Where                             | What it does                                |
| --------------------------------- | ------------------------------------------- |
| **Settings** → **Actions**        | Stores reusable **Code** action definitions |
| Selected component → **Actions**  | Attaches actions to a component event       |
| **Settings** → **Form validator** | Runs validation across the entire form      |

Field-level validation still lives on each field's **Rules** tab.

## Open Settings

<img src="/assets/guide/workspace/settings-tab-plain.png" alt="Settings tab on the left panel." />

1. Click **Settings** on the left panel.
2. Scroll to the **Actions** block.

## Add a form action

<img src="/assets/guide/behavior/highlight-add-form-code-action.png" alt="Settings Actions block with an arrow pointing to Add a code action." />

1. Click **Add a code action**.
2. The bottom panel opens the code editor for the new form action.

<img src="/assets/guide/behavior/highlight-form-action-code-editor.png" alt="Bottom panel code editor open for a new form-level code action." />

3. Enter a **Name**, write or paste the script, then click **Save** (or press
   <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>S</kbd></span> /
   <span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>S</kbd></span> while the cursor is in the editor).
4. Select the button or other component that should run the action.
5. Open its **Actions** tab and click **Add an action** under the event you want to use, such as **onClick**.
6. Open **Code** and select the saved action by name.
7. Coordinate with developers for production logic.

## Form validator (optional)

<img src="/assets/guide/behavior/highlight-form-validator-edit.png" alt="Form validator block with an arrow pointing to Edit code." />

1. In **Settings**, find **Form validator**.
2. Click **Edit code**.

<img src="/assets/guide/behavior/highlight-form-validator-code-editor.png" alt="Bottom panel code editor open for Edit form validation code." />

3. Edit validator code only when your team assigns you that task. Many teams restrict this to developers.
4. Click **Save** when finished (or use the code editor save shortcut).

## Test

<img src="/assets/guide/preview-and-handoff/preview-data-panel-plain.png" alt="Preview with Data and Errors panels." />

1. Click **Preview**.
2. Trigger the component event to which you attached the action.
3. Use [Preview mode tools](/preview-and-handoff/use-preview-mode-tools-data-validate-reset) to inspect **Errors**.

## Summary

**Settings** stores reusable **Code** actions and the **Form validator**. Attach a saved action to a component event on the right, then
trigger that event in **Preview**.

## See also

- [Keyboard shortcuts](/help/keyboard-shortcuts)
- [Actions basics](/behavior-and-validation/actions-basics)
- [Actions (developer depth)](docs:formengine-designer/features/actions)

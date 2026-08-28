---
title: "Load options from external data"
description: "Overview of dropdowns fed by APIs or databases: what authors design vs what developers connect."
---

# Load options from external data

Dropdown and radio lists can be **typed in Designer** or **loaded at runtime** from your systems (CRM, database, REST API).

## What authors do

1. Place a **Select** or **Radio group** on the form.
2. Set **Label**, **Key**, and placeholder text.
3. For static lists, enter options on **Main**.
4. For a dynamic list, note "Options from API X" in your handoff document.

## What developers do

- Bind option lists to data sources
- Handle loading and error states in the host app

Developers: See [External API access](docs:formengine-designer/faq/external-api-access) for integration patterns.

## Test without the full API

1. Ask developers for a **Preview** build with sample options.
2. Or use static options until integration is ready, then switch.

## Summary

Authors own layout, keys, and labels. Developers own live data feeds. Document dynamic fields during
[handoff to your technical team](/help/hand-off-to-your-technical-team).

## See also

- [Choice fields](/fields-and-data/choice-fields)
- [List and detail pattern](/simple-data-driven-screens/list-and-detail-pattern)

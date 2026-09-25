# Function: warnMisplacedNonVisualComponents()

> **warnMisplacedNonVisualComponents**(`root`): `void`

Warns when non-visual components are nested under a non-root parent.
Non-visual instances must be direct children of the form root so NonVisualHost can mount them.

## Parameters

### root

[`ComponentData`](../classes/ComponentData.md)

the form component tree root.

## Returns

`void`

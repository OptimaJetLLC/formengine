# Type Alias: ComponentPlacementChange

> **ComponentPlacementChange** = \{ `current`: [`ComponentNodeLocation`](../interfaces/ComponentNodeLocation.md); `type`: `"insert"`; \} \| \{ `current`: [`ComponentNodeLocation`](../interfaces/ComponentNodeLocation.md); `previous`: [`ComponentNodeLocation`](../interfaces/ComponentNodeLocation.md); `type`: `"move"`; \} \| \{ `previous`: [`ComponentNodeLocation`](../interfaces/ComponentNodeLocation.md); `type`: `"remove"`; \}

A completed change to a component's position in the component tree.

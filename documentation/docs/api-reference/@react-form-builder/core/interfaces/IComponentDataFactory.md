# Interface: IComponentDataFactory

The factory for creating ComponentData instances. **Internal use only.**

## Methods

### createComponentData()

> **createComponentData**(`componentStore`, `deferFieldCalculation`, `model`?, `dataContext`?): [`ComponentData`](../classes/ComponentData.md)

Creates the element for the component tree. **Internal use only.**

#### Parameters

• **componentStore**: [`ComponentStore`](../classes/ComponentStore.md)

the component settings.

• **deferFieldCalculation**: `boolean`

if true, then the calculated field must be explicitly initialized.

• **model?**: [`Model`](../classes/Model.md)\<`any`\>

the component's metadata.

• **dataContext?**: [`IDataContext`](IDataContext.md)

the context for working with data.

#### Returns

[`ComponentData`](../classes/ComponentData.md)

the element for the component tree.

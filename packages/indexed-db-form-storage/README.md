# OptimaJet React Form Builder IndexedDB Form storage

This library is part of the [React Form Builder](https://formengine.io/) project.

This package contains the Form storage implementation based on IndexedDB.
To learn how to use the package, see our [documentation](https://formengine.io/documentation/formengine-designer/features/form-storage/).

## Usage

```typescript jsx
import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
const formStorage = new IndexedDbFormStorage('example-db', 'example-store')

const view = new BuilderView([
  // your components
])

function MyDesignerApp() {
  return <FormBuilder view={view} formStorage={formStorage} />
}
```

## License

For commercial use contact our sales at [sales@optimajet.com](mailto:sales@optimajet.com).
